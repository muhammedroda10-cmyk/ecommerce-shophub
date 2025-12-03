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

    const saveAmount = comparePrice ? Number(comparePrice) - Number(price) : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addItem({
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
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Badges */}
            <div className="absolute top-0 left-0 z-10 w-full flex justify-between p-3 pointer-events-none">
                {badge ? (
                    <div className="rounded-r-full bg-blue-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm -ml-3">
                        {badge}
                    </div>
                ) : (
                    <div></div>
                )}

                {/* Wishlist Button (Visible on Hover) */}
                <motion.button
                    className="pointer-events-auto h-8 w-8 rounded-full bg-white text-gray-400 shadow-md flex items-center justify-center hover:text-red-500 hover:bg-red-50 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </motion.button>
            </div>

            {/* Image */}
            <Link href={`/products/${slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50 p-4">
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4 border-t border-gray-50">
                {/* Price */}
                <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{Number(price).toFixed(0)}
                    </span>
                    {comparePrice && (
                        <span className="text-xs text-gray-400 line-through decoration-gray-400">
                            ₹{Number(comparePrice).toFixed(0)}
                        </span>
                    )}
                </div>

                <Link href={`/products/${slug}`} className="mb-2">
                    <h3 className="line-clamp-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 h-10">
                        {title}
                    </h3>
                </Link>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    {saveAmount > 0 && (
                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                            Save ₹{saveAmount.toFixed(0)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
