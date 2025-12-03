'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/hooks/useCart';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const total = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-12">
                <div className="mb-6 rounded-full bg-gray-100 p-6">
                    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900">Your cart is empty</h1>
                <p className="mb-8 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/products" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex p-6">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link href={`/products/${item.slug}`} className="hover:text-blue-600">
                                                        {item.title}
                                                    </Link>
                                                </h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center rounded-lg border border-gray-300">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, Math.min(item.maxQuantity, item.quantity + 1))}
                                                    className="px-3 py-1 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.productId)}
                                                className="font-medium text-red-600 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="text-base font-medium text-gray-900">Order Total</div>
                                <div className="text-base font-medium text-gray-900">${total.toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/checkout"
                                className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700 transition-colors"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>

                        <div className="mt-4 text-center">
                            <button
                                onClick={clearCart}
                                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
