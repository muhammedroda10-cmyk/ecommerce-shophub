'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCategory } from '@/lib/api/categories';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';

export default function CategoryPage() {
    const params = useParams();
    const [category, setCategory] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.slug) {
            loadCategory(params.slug as string);
        }
    }, [params.slug]);

    const loadCategory = async (slug: string) => {
        setLoading(true);
        try {
            const data = await getCategory(slug);
            setCategory(data.data);
            // Assuming the API returns products included in the category resource or we might need a separate call
            // For now, let's assume the category resource includes 'products'
            setProducts(data.data.products || []);
        } catch (error) {
            console.error('Failed to load category:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
                <Link href="/categories" className="mt-4 text-blue-600 hover:underline">
                    Back to Categories
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        {category.description || `Explore our ${category.name} collection`}
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                slug={product.slug}
                                title={product.title || product.name} // Handle potential API naming differences
                                price={product.price}
                                comparePrice={product.compare_price}
                                image={product.images?.[0]?.url || '/placeholder.jpg'}
                                rating={product.rating}
                                reviewCount={product.review_count}
                                badge={product.is_on_sale ? 'Sale' : undefined}
                                maxQuantity={product.quantity}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
                        <div className="mb-4 text-4xl">📦</div>
                        <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                        <p className="mt-1 text-gray-500">
                            We couldn't find any products in this category.
                        </p>
                        <Link href="/products" className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
