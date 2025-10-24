import mongoose from "mongoose";
import OrderModel from "./order.model.js";

const pointsHistorySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: "order",
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['earned', 'redemption', 'expired', 'admin_adjustment'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        index: { expires: 0 } // Auto-remove expired points
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Provide password"],
    },
    avatar: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: null,
    },
    // 🔗 Các đơn hàng của người dùng
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: "order"
    }],
    
    // 🏷️ Các đơn đặt bàn
    reservations: [{
        type: mongoose.Schema.ObjectId,
        ref: "reservation"
    }],
    
    // 🏷️ Các bàn đang phục vụ (dành cho nhân viên)
    assignedTables: [{
        type: mongoose.Schema.ObjectId,
        ref: "table"
    }],
    
    // 💳 Thông tin thành viên
    membership: {
        level: {
            type: String,
            enum: ["BRONZE", "SILVER", "GOLD", "PLATINUM"],
            default: "BRONZE"
        },
        points: {
            type: Number,
            default: 0,
            min: 0
        },
        pointsHistory: [pointsHistorySchema],
        lastEarnedPoints: Date,
        totalSpent: {
            type: Number,
            default: 0
        },
        favoriteItems: [{
            type: mongoose.Schema.ObjectId,
            ref: "product"
        }],
        dietaryPreferences: [String],
        allergies: [String]
    },
    
    // 🔄 Thông tin xác thực
    refresh_token: {
        type: String,
        default: "",
    },
    verify_email: {
        type: Boolean,
        default: false,
    },
    last_login_date: {
        type: Date,
        default: "",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active",
    },

    // 🧩 Vai trò và chức vụ
    role: {
        type: String,
        enum: ["ADMIN", "MANAGER", "STAFF", "USER"],
        default: "USER",
    },
    position: {
        type: String,
        enum: [null, "WAITER", "CHEF", "CASHIER"],
        default: null,
    },

    // 🧾 Liên kết hoạt động
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    reservationHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'reservation'
        }
    ],

    // 🔐 Bảo mật
    forgot_password_otp: {
        type: String,
        default: null,
    },
    forgot_password_expiry: {
        type: Date,
        default: "",
    },

    // 💎 Tích điểm thưởng
    rewardsPoint: {
        type: Number,
        default: 0,
        min: 0,
    },
    pointsHistory: [pointsHistorySchema],

}, { timestamps: true });

// ✅ Tự động cập nhật điểm thưởng khi có đơn hàng
OrderModel.schema.post('save', async function (doc) {
    try {
        if (doc.earnedPoints && doc.earnedPoints > 0) {
            await mongoose.model('user').findByIdAndUpdate(
                doc.userId,
                {
                    $inc: { rewardsPoint: doc.earnedPoints },
                    $push: {
                        orderHistory: doc._id,
                        pointsHistory: {
                            orderId: doc.orderId,
                            points: doc.earnedPoints,
                            type: 'earned',
                            description: `Tích điểm từ đơn hàng ${doc.orderId}`,
                            createdAt: new Date()
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            );
        }
    } catch (error) {
        console.error('Error updating user points from order:', error);
    }
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
