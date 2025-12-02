'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getOrder } from '@/lib/api/orders';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function OrderDetailsPage() {
    const params = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            loadOrder(params.id as string);
        }
    }, [params.id]);

    const loadOrder = async (id: string) => {
        try {
            const data = await getOrder(id);
            setOrder(data);
        } catch (error) {
            console.error('Failed to load order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-bold">Order not found</h1>
                <Link href="/dashboard/orders" className="text-primary-600 hover:underline">Back to Orders</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Breadcrumbs items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'My Orders', href: '/dashboard/orders' },
                { label: order.order_number }
            ]} />

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Main Order Info */}
                <div className="flex-1 space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Order #{order.order_number}</h1>
                                <p className="text-sm text-gray-500">
                                    Placed on {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize ${order.status === 'completed' ? 'bg-success-100 text-success-800' :
                                    order.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {order.status}
                            </span>
                        </div>

                        {/* Items */}
                        <div className="space-y-6">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                        {/* Placeholder for image */}
                                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                            No Img
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">${Number(item.total).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t border-gray-100 pt-6">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>${Number(order.total_amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="w-full lg:w-80 space-y-6">
                    {/* Shipping Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold text-gray-900">Shipping Address</h3>
                        <div className="text-sm text-gray-600">
                            <p className="font-medium text-gray-900">{order.shipping_name}</p>
                            <p>{order.shipping_address}</p>
                            <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                            <p className="mt-2">{order.shipping_phone}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-semibold text-gray-900">Payment Method</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl">
                                💵
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 capitalize">{order.payment_method}</p>
                                <p className="text-xs text-gray-500 capitalize">{order.payment_status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
