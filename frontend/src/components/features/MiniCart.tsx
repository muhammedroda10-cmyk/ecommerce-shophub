'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCart';

interface MiniCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
    const { items, removeItem, getTotalPrice } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black"
                    />

                    {/* Cart Dropdown */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="text-lg font-semibold">Shopping Cart</h2>
                            <button
                                onClick={onClose}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <svg className="mb-4 h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                                    <p className="mt-1 text-sm text-gray-500">Add items to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Link
                                                    href={`/products/${item.slug}`}
                                                    onClick={onClose}
                                                    className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-primary-600"
                                                >
                                                    {item.title}
                                                </Link>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                                                </p>
                                                <p className="mt-1 text-sm font-bold text-gray-900">
                                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="text-gray-400 hover:text-error-600"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-200 p-4">
                                <div className="mb-4 flex items-center justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="btn btn-primary mb-2 w-full"
                                >
                                    View Cart
                                </Link>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="btn w-full border-2 border-primary-600 bg-white text-primary-600 hover:bg-primary-50"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
