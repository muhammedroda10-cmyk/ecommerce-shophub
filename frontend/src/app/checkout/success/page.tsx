'use client';

import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 rounded-full bg-success-100 p-6 text-success-600">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
            <p className="mb-8 max-w-md text-gray-600">
                Thank you for your purchase. We have received your order and will begin processing it right away.
            </p>
            <div className="flex gap-4">
                <Link href="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
                <Link href="/orders" className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                    View Orders
                </Link>
            </div>
        </div>
    );
}
