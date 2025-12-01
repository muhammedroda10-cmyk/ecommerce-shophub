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
            id,
            productId: id,
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
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            {/* Badge */}
            {badge && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                    {badge}
                </div>
            )}

            {discount > 0 && (
                <div className="absolute right-3 top-3 z-10 rounded-full bg-error-500 px-2 py-1 text-xs font-bold text-white">
                    -{discount}%
                </div>
            )}

            {/* Image */}
            <Link href={`/products/${slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Link>

            {/* Quick Actions */}
            <motion.div
                className="absolute right-3 top-16 flex flex-col gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                transition={{ duration: 0.2 }}
            >
                <button className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-primary-50">
                    <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                <button className="rounded-full bg-white p-2 shadow-md transition-colors hover:bg-primary-50">
                    <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
            </motion.div>

            {/* Content */}
            <div className="p-4">
                <Link href={`/products/${slug}`}>
                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary-600">
                        {title}
                    </h3>
                </Link>

                {/* Rating */}
                {rating > 0 && (
                    <div className="mb-2 flex items-center gap-1">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-300'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">({reviewCount})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${Number(price).toFixed(2)}
                    </span>
                    {comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ${Number(comparePrice).toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    onClick={handleAddToCart}
                    className="mt-3 w-full rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                    whileTap={{ scale: 0.98 }}
                >
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
}
