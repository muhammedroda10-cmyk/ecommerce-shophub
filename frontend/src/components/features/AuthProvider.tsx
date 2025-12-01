'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuth';

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, fetchUser, isLoading } = useAuthStore();

    useEffect(() => {
        // Fetch user on mount if not loaded
        if (!isAuthenticated && !isLoading) {
            fetchUser().catch(() => {
                // If not authenticated and trying to access protected route, redirect to login
                if (!PUBLIC_ROUTES.includes(pathname)) {
                    router.push('/login');
                }
            });
        }
    }, []);

    useEffect(() => {
        // Redirect authenticated users away from auth pages
        if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
            router.push('/account');
        }
    }, [isAuthenticated, pathname]);

    return <>{children}</>;
}

// HOC for protected routes
export function withAuth<P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> {
    return function ProtectedRoute(props: P) {
        const router = useRouter();
        const { isAuthenticated, isLoading } = useAuthStore();

        useEffect(() => {
            if (!isLoading && !isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, isLoading, router]);

        if (isLoading) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };
}
