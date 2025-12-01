export default function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Image Skeleton */}
            <div className="skeleton aspect-square w-full" />

            {/* Content Skeleton */}
            <div className="p-4">
                <div className="skeleton mb-2 h-4 w-3/4 rounded" />
                <div className="skeleton mb-2 h-4 w-1/2 rounded" />

                {/* Rating Skeleton */}
                <div className="skeleton mb-3 h-4 w-24 rounded" />

                {/* Price Skeleton */}
                <div className="skeleton mb-3 h-6 w-20 rounded" />

                {/* Button Skeleton */}
                <div className="skeleton h-10 w-full rounded-lg" />
            </div>
        </div>
    );
}
