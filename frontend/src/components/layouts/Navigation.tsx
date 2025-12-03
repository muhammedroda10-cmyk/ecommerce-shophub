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
        { name: 'Groceries', slug: 'groceries' },
        { name: 'Premium Fruits', slug: 'premium-fruits' },
        { name: 'Home & Kitchen', slug: 'home-kitchen' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Beauty', slug: 'beauty' },
        { name: 'Home Improvement', slug: 'home-improvement' },
        { name: 'Sports, Toys & Luggage', slug: 'sports-toys-luggage' },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gray-50 text-gray-500">
                <div className="container-custom flex items-center justify-between py-2 text-xs font-medium">
                    <span className="hidden md:block">Welcome to worldwide MegaMart!</span>
                    <div className="flex gap-6 ml-auto md:ml-0">
                        <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Deliver to <span className="font-bold text-gray-700">423651</span>
                        </span>
                        <Link href="/track-order" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            Track your order
                        </Link>
                        <Link href="/offers" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                            All Offers
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white py-4 sticky top-0 z-50 shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between gap-8">
                        {/* Logo & Menu */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold text-xl">M</div>
                                <span className="text-2xl font-bold text-blue-600 tracking-tight">MegaMart</span>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden flex-1 max-w-2xl md:block">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-12 py-3 border-none rounded-lg bg-blue-50 text-gray-900 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                                    placeholder="Search essentials, groceries and more..."
                                />
                                <button className="absolute inset-y-0 right-0 px-4 text-blue-500 hover:text-blue-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-6">
                            {/* User */}
                            <div className="relative">
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden md:block">{user?.name}</span>
                                        <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                ) : (
                                    <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        <span>Sign Up/Sign In</span>
                                    </Link>
                                )}

                                <AnimatePresence>
                                    {activeDropdown === 'user' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-medium z-50"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                                <p className="text-sm text-gray-500">Signed in as</p>
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                                            </div>
                                            <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                My Profile
                                            </Link>
                                            <Link href="/dashboard/orders" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                Orders
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

                            <div className="w-px h-8 bg-gray-200"></div>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
                            >
                                <div className="relative">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    {mounted && getTotalItems() > 0 && (
                                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white shadow-sm ring-2 ring-white">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </div>
                                <span className="hidden md:block">Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Navbar */}
            <div className="bg-white hidden md:block shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/categories/${category.slug}`}
                                    className="px-4 py-1.5 rounded-full bg-gray-50 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap flex items-center gap-2"
                                >
                                    {category.name}
                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MiniCart */}
            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
