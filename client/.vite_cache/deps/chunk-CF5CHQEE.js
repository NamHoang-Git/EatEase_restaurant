import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require_interop_require_wildcard = __commonJS({
  "node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"(exports) {
    "use strict";
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) return obj;
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = { __proto__: null };
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
          else newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      if (cache) cache.set(obj, newObj);
      return newObj;
    }
    exports._ = _interop_require_wildcard;
  }
});

// node_modules/next/dist/shared/lib/segment.js
var require_segment = __commonJS({
  "node_modules/next/dist/shared/lib/segment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports, {
      DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
      },
      PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
      },
      addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
      },
      computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
      },
      getSegmentValue: function() {
        return getSegmentValue;
      },
      getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
      },
      isGroupSegment: function() {
        return isGroupSegment;
      },
      isParallelRouteSegment: function() {
        return isParallelRouteSegment;
      }
    });
    function getSegmentValue(segment) {
      return Array.isArray(segment) ? segment[1] : segment;
    }
    function isGroupSegment(segment) {
      return segment[0] === "(" && segment.endsWith(")");
    }
    function isParallelRouteSegment(segment) {
      return segment.startsWith("@") && segment !== "@children";
    }
    function addSearchParamsIfPageSegment(segment, searchParams) {
      const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
      if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
      }
      return segment;
    }
    function computeSelectedLayoutSegment(segments, parallelRouteKey) {
      if (!segments || segments.length === 0) {
        return null;
      }
      const rawSegment = parallelRouteKey === "children" ? segments[0] : segments[segments.length - 1];
      return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
    }
    function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
      let node;
      if (first) {
        node = tree[1][parallelRouteKey];
      } else {
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
      }
      if (!node) return segmentPath;
      const segment = node[0];
      let segmentValue = getSegmentValue(segment);
      if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
      }
      segmentPath.push(segmentValue);
      return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
    }
    var PAGE_SEGMENT_KEY = "__PAGE__";
    var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
  }
});

// node_modules/next/dist/shared/lib/invariant-error.js
var require_invariant_error = __commonJS({
  "node_modules/next/dist/shared/lib/invariant-error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "InvariantError", {
      enumerable: true,
      get: function() {
        return InvariantError;
      }
    });
    var InvariantError = class extends Error {
      constructor(message, options) {
        super(`Invariant: ${message.endsWith(".") ? message : message + "."} This is a bug in Next.js.`, options);
        this.name = "InvariantError";
      }
    };
  }
});

// node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require_interop_require_default = __commonJS({
  "node_modules/@swc/helpers/cjs/_interop_require_default.cjs"(exports) {
    "use strict";
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports._ = _interop_require_default;
  }
});

export {
  require_interop_require_wildcard,
  require_segment,
  require_invariant_error,
  require_interop_require_default
};
//# sourceMappingURL=chunk-CF5CHQEE.js.map
