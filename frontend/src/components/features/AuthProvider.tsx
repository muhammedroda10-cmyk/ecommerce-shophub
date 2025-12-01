'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { fetchUser } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // Skip auth check on public pages to prevent loops
            const publicPages = ['/', '/login', '/register', '/products', '/search'];
            const isPublicPage = publicPages.some(page => pathname.startsWith(page));

            if (!isPublicPage) {
                try {
                    await fetchUser();
                } catch (error) {
                    // Silently fail for public pages
                    console.log('Not authenticated');
                }
            }

            setLoading(false);
        };

        initAuth();
    }, [fetchUser, pathname]);

    // Don't show anything while loading on first mount
    if (loading) {
        return <>{children}</>;
    }

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
