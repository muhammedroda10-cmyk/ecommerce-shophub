'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/hooks/useAuth';
import SearchBar from '@/components/features/SearchBar';

export default function Navigation() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { isAuthenticated, user, logout } = useAuthStore();

    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Home & Living', slug: 'home-living' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Books', slug: 'books' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            {/* Top Bar */}
            <div className="bg-gradient-primary">
                <div className="container-custom flex items-center justify-between py-2 text-xs text-white">
                    <span>✨ Free shipping on orders over $50!</span>
                    <div className="flex gap-4">
                        <Link href="/track-order" className="hover:underline">Track Order</Link>
                        <Link href="/help" className="hover:underline">Help</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container-custom">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-gradient">
                        ShopHub
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden flex-1 max-w-2xl mx-8 md:block">
                        <SearchBar />
                    </div>

                    {/* Right Menu */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden text-sm font-medium md:block">{user?.name}</span>
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === 'user' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
                                        >
                                            <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                                My Account
                                            </Link>
                                            <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                                Orders
                                            </Link>
                                            <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50">
                                                Wishlist
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={() => logout()}
                                                className="w-full px-4 py-2 text-left text-sm text-error-600 hover:bg-gray-50"
                                            >
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className="btn btn-primary">
                                Sign In
                            </Link>
                        )}

                        {/* Cart */}
                        <button className="relative rounded-lg p-2 transition-colors hover:bg-gray-100">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                                0
                            </span>
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="hidden border-t border-gray-200 md:block">
                    <div className="flex gap-8 py-3">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
