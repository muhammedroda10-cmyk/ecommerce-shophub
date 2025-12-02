'use client';

import { useState, useEffect } from 'react';
import { getOrders } from '@/lib/api/orders';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<any>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async (page = 1) => {
        setLoading(true);
        try {
            const data = await getOrders(page);
            setOrders(data.data);
            setPagination(data.meta || data); // Handle Laravel pagination structure
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && orders.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-gray-900">{order.order_number}</h3>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${order.status === 'completed' ? 'bg-success-100 text-success-800' :
                                                order.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Placed on {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
                                    </div>
                                    <Link
                                        href={`/dashboard/orders/${order.id}`}
                                        className="btn btn-secondary text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            {/* Order Items Preview */}
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {order.items?.slice(0, 4).map((item: any) => (
                                        <div key={item.id} className="flex-shrink-0">
                                            <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                                {/* We would put an image here if we had it in the item resource, 
                                                    but for now we might just show product name or placeholder */}
                                                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                    Img
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items?.length > 4 && (
                                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-xs font-medium text-gray-500">
                                            +{order.items.length - 4} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                    <div className="mb-4 text-4xl">📦</div>
                    <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-gray-500">Start shopping to see your orders here.</p>
                    <Link href="/products" className="btn btn-primary mt-6">
                        Browse Products
                    </Link>
                </div>
            )}
        </div>
    );
}
