'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from '@/components/ui/ImageGallery';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductCard from '@/components/ui/ProductCard';
import { getProduct } from '@/lib/api/products';

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        if (params.slug) {
            loadProduct(params.slug as string);
        }
    }, [params.slug]);

    const loadProduct = async (slug: string) => {
        try {
            const data = await getProduct(slug);
            setProduct(data);
        } catch (error) {
            console.error('Failed to load product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <a href="/products" className="mt-4 text-primary-600 hover:underline">
                    Back to products
                </a>
            </div>
        );
    }

    const images = product.images?.map((img: any) => img.url) || ['/placeholder.jpg'];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container-custom py-4">
                    <Breadcrumbs
                        items={[
                            { label: 'Products', href: '/products' },
                            { label: product.category?.name, href: `/category/${product.category?.slug}` },
                            { label: product.title },
                        ]}
                    />
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Images */}
                    <div>
                        <ImageGallery images={images} productName={product.title} />
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

                        {/* Rating */}
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.review_count || 0} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mt-6 flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                            {product.compare_price && (
                                <>
                                    <span className="text-xl text-gray-500 line-through">${product.compare_price}</span>
                                    <span className="rounded-full bg-error-500 px-3 py-1 text-sm font-bold text-white">
                                        -{product.discount_percentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4">
                            {product.is_in_stock ? (
                                <div className="flex items-center gap-2 text-success-600">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="font-medium">In Stock ({product.quantity} available)</span>
                                </div>
                            ) : (
                                <div className="text-error-600 font-medium">Out of Stock</div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                <div className="flex items-center rounded-lg border border-gray-300">
                                    <button
                                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-2 font-medium">{selectedQuantity}</span>
                                    <button
                                        onClick={() => setSelectedQuantity(Math.min(product.quantity, selectedQuantity + 1))}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={!product.is_in_stock}
                                className="btn btn-primary w-full py-4 text-lg disabled:opacity-50"
                            >
                                Add to Cart
                            </button>

                            <button className="btn w-full border-2 border-gray-300 bg-white py-4 text-lg text-gray-700 hover:bg-gray-50">
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Seller Info */}
                        {product.seller && (
                            <div className="mt-8 rounded-lg border border-gray-200 p-4">
                                <h3 className="font-semibold text-gray-900">Sold by</h3>
                                <p className="mt-1 text-primary-600">{product.seller.store_name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
