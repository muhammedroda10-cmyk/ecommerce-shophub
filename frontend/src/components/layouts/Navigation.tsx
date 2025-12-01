'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/hooks/useAuth';
import SearchBar from '@/components/features/SearchBar';
import MiniCart from '@/components/features/MiniCart';
import { useCartStore } from '@/hooks/useCart';

export default function Navigation() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();
    const { getTotalItems } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Home & Living', slug: 'home-living' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Books', slug: 'books' },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="bg-primary-900 text-white">
                <div className="container-custom flex items-center justify-between py-2 text-xs font-medium tracking-wide">
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse"></span>
                        Free shipping on orders over $50!
                    </span>
                    <div className="flex gap-6 text-primary-200">
                        <Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link>
                        <Link href="/help" className="hover:text-white transition-colors">Help</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-all">
                <div className="container-custom">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft group-hover:shadow-glow transition-all duration-300">
                                <span className="text-xl font-bold">S</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">ShopHub</span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden flex-1 max-w-xl mx-12 md:block">
                            <SearchBar />
                        </div>

                        {/* Right Menu */}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                                        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white pl-1 pr-4 py-1 transition-all hover:border-primary-300 hover:shadow-soft"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden text-sm font-medium text-gray-700 md:block">{user?.name}</span>
                                        <svg className={`h-4 w-4 text-gray-400 transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === 'user' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-medium"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                                    <p className="text-sm text-gray-500">Signed in as</p>
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                                                </div>
                                                <Link href="/account" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    My Account
                                                </Link>
                                                <Link href="/orders" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                    Orders
                                                </Link>
                                                <Link href="/wishlist" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                    Wishlist
                                                </Link>
                                                <div className="my-2 border-t border-gray-100"></div>
                                                <button
                                                    onClick={() => logout()}
                                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-error-600 hover:bg-error-50 transition-colors"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href="/login" className="btn btn-primary shadow-soft hover:shadow-glow">
                                    Sign In
                                </Link>
                            )}

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all hover:border-primary-300 hover:text-primary-600 hover:shadow-soft"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {mounted && getTotalItems() > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white shadow-sm ring-2 ring-white">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="hidden md:block">
                        <div className="flex gap-8 pb-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/category/${category.slug}`}
                                    className="text-sm font-medium text-gray-500 transition-colors hover:text-primary-600 hover:font-semibold"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* MiniCart */}
            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
