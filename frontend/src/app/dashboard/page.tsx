'use client';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/api/dashboard';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load dashboard stats:', error);
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

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-2xl">
                            📦
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.total_orders || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-2xl">
                            💰
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Spent</p>
                            <p className="text-2xl font-bold text-gray-900">${Number(stats?.total_spent || 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-2xl">
                            ⭐
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Reward Points</p>
                            <p className="text-2xl font-bold text-gray-900">0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <Link href="/dashboard/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View All
                    </Link>
                </div>
                <div className="p-6">
                    {stats?.recent_orders?.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recent_orders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-colors hover:bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-900">{order.order_number}</p>
                                        <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${order.status === 'completed' ? 'bg-success-100 text-success-800' :
                                                order.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No orders found. <Link href="/products" className="text-primary-600 hover:underline">Start shopping!</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
