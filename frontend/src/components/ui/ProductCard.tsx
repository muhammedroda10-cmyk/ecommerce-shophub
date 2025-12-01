'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/hooks/useCart';

interface ProductCardProps {
    id: string;
    title: string;
    slug: string;
    price: number;
    comparePrice?: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    maxQuantity?: number;
}

export default function ProductCard({
    id,
    title,
    slug,
    price,
    comparePrice,
    image,
    rating = 0,
    reviewCount = 0,
    badge,
    maxQuantity = 100,
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addItem } = useCartStore();

    const discount = comparePrice
        ? Math.round(((Number(comparePrice) - Number(price)) / Number(comparePrice)) * 100)
        : 0;

    const handleAddToCart = () => {
        addItem({
            id: String(id),
            productId: String(id),
            slug,
            title,
            price: Number(price),
            image,
            maxQuantity,
        });
        alert('✅ Added to cart!');
    };

    return (
        <motion.div
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Badge */}
            {badge && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                    {badge}
                </div>
            )}

            {discount > 0 && (
                <div className="absolute right-3 top-3 z-10 rounded-full bg-error-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                    -{discount}%
                </div>
            )}

            {/* Image */}
            <Link href={`/products/${slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
            </Link>
            <motion.div
                className="absolute right-3 top-16 flex flex-col gap-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
            >
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-500 hover:text-white" title="Add to Wishlist">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-500 hover:text-white" title="Quick View">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
            </motion.div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <Link href={`/products/${slug}`} className="mb-1">
                    <h3 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-primary-600">
                        {title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="mb-3 flex items-center gap-1">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200'}`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs font-medium text-gray-400">({reviewCount})</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        {comparePrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ${Number(comparePrice).toFixed(2)}
                            </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                            ${Number(price).toFixed(2)}
                        </span>
                    </div>

                    <motion.button
                        onClick={handleAddToCart}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors hover:bg-primary-600 hover:text-white"
                        whileTap={{ scale: 0.9 }}
                        title="Add to Cart"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
