'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import FilterSidebar from '@/components/features/FilterSidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getProducts } from '@/lib/api/products';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('created_at');

    useEffect(() => {
        loadProducts();
    }, [filters, sortBy]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts({ ...filters, sort_by: sortBy });
            setProducts(data.data || []);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container-custom py-4">
                    <Breadcrumbs items={[{ label: 'Products' }]} />
                    <h1 className="mt-2 text-3xl font-bold text-gray-900">All Products</h1>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="hidden w-64 flex-shrink-0 lg:block">
                        <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6">
                            <FilterSidebar onFilterChange={setFilters} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                {loading ? 'Loading...' : `${products.length} products found`}
                            </p>
                            <select
                                className="input w-48"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="created_at">Newest First</option>
                                <option value="price">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="title">Name: A to Z</option>
                            </select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                                : products.map((product: any) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        title={product.title}
                                        price={product.price}
                                        comparePrice={product.compare_price}
                                        image={product.images?.[0]?.url || '/placeholder.jpg'}
                                        rating={product.rating}
                                        reviewCount={product.review_count}
                                        badge={product.is_on_sale ? 'Sale' : undefined}
                                    />
                                ))}
                        </div>

                        {/* Empty State */}
                        {!loading && products.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <svg
                                    className="mb-4 h-24 w-24 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                </svg>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">No products found</h3>
                                <p className="text-sm text-gray-500">Try adjusting your filters</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
