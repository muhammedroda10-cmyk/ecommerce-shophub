'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { searchProducts } from '@/lib/api/search';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (query) {
            loadResults();
        }
    }, [query]);

    const loadResults = async () => {
        setLoading(true);
        try {
            const data = await searchProducts(query);
            setProducts(data.data || []);
            setTotal(data.meta?.total || 0);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container-custom py-4">
                    <Breadcrumbs items={[{ label: 'Search Results' }]} />
                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                        Search Results for "{query}"
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        {loading ? 'Searching...' : `${total} products found`}
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">No products found</h3>
                        <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
                    </div>
                )}
            </div>
        </div>
    );
}
