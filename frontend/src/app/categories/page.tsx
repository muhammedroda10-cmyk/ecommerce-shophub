import Link from 'next/link';
import { getCategories } from '@/lib/api/categories';

export default async function CategoriesPage() {
    const categoriesData = await getCategories();
    const categories = categoriesData.data || [];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">All Categories</h1>
                    <p className="mt-2 text-lg text-gray-600">Browse our wide selection of products by category</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                {/* Placeholder for category image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-6xl text-blue-200 transition-transform duration-500 group-hover:scale-110">
                                    {category.name.charAt(0)}
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col justify-between p-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                        {category.description || `Explore our ${category.name} collection`}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-sm font-medium text-gray-500">
                                        {category.products_count || 0} Products
                                    </span>
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 group-hover:bg-blue-100">
                                        View Collection
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
