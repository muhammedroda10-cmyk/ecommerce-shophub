'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/hooks/useCart';
import { useAuthStore } from '@/hooks/useAuth';
import { createOrder } from '@/lib/api/orders';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        shipping_name: user?.name || '',
        shipping_address: '',
        shipping_city: '',
        shipping_postal_code: '',
        shipping_phone: '',
    });

    if (items.length === 0) {
        return (
            <div className="container-custom py-12 text-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/products" className="mt-4 inline-block text-primary-600 hover:underline">
                    Go shopping
                </Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!isAuthenticated) {
            setError('Please login to place an order');
            setIsSubmitting(false);
            return;
        }

        try {
            const orderData = {
                items: items.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity
                })),
                ...formData
            };

            await createOrder(orderData);

            clearCart();
            router.push('/checkout/success');
        } catch (err: any) {
            console.error('Order failed:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-custom py-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Shipping Form */}
                <div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">Shipping Details</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="shipping_name"
                                    required
                                    value={formData.shipping_name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="shipping_address"
                                    required
                                    value={formData.shipping_address}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="shipping_city"
                                        required
                                        value={formData.shipping_city}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        name="shipping_postal_code"
                                        required
                                        value={formData.shipping_postal_code}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="shipping_phone"
                                    required
                                    value={formData.shipping_phone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                />
                            </div>

                            <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                <h3 className="font-medium text-gray-900">Payment Method</h3>
                                <div className="mt-2 flex items-center">
                                    <input
                                        type="radio"
                                        checked
                                        readOnly
                                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-gray-700">Cash on Delivery (COD)</span>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-error-50 p-4 text-sm text-error-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full py-3 text-lg disabled:opacity-50"
                            >
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">Order Summary</h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
