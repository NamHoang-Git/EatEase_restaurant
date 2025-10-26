'use client';
import { Notifications } from './notifications';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/contexts/settings-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
    const pathname = usePathname() || '';
    const { settings, isLoading } = useSettings();
    
    // Get path segments safely
    const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];
    
    // Safely get initials from fullName
    const getInitials = (name: string | null | undefined) => {
        if (!name || typeof name !== 'string') return 'U';
        const words = name.trim().split(/\s+/);
        return words
            .slice(0, 2) // Take first two words max
            .map(word => word[0] || '')
            .filter(Boolean)
            .join('')
            .toUpperCase() || 'U';
    };
    
    // Show loading state if settings are not yet loaded
    if (isLoading || !settings) {
        return (
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="h-8 w-8" />
                    <div className="h-8 w-8 rounded-full bg-muted" />
                </div>
            </header>
        );
    }
    
    // Get safe values from settings
    const safeSettings = {
        fullName: settings?.fullName || 'User',
        email: settings?.email || 'No email',
        avatar: settings?.avatar || undefined
    };

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="hidden md:block">
                    <nav className="flex items-center space-x-2">
                        <Link href="/" className="text-sm font-medium">
                            Home
                        </Link>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={segment}>
                                <span className="text-muted-foreground">/</span>
                                <Link
                                    href={`/${pathSegments
                                        .slice(0, index + 1)
                                        .join('/')}`}
                                    className="text-sm font-medium"
                                >
                                    {segment.charAt(0).toUpperCase() +
                                        segment.slice(1)}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Notifications />
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={safeSettings.avatar || undefined}
                                        alt={safeSettings.fullName || 'User'}
                                    />
                                    <AvatarFallback>
                                        {getInitials(safeSettings.fullName)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {safeSettings.fullName}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {safeSettings.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/settings">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
