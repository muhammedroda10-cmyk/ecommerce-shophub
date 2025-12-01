'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterSidebarProps {
    onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const categories = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Fashion' },
        { id: '3', name: 'Home & Living' },
        { id: '4', name: 'Sports' },
        { id: '5', name: 'Books' },
    ];

    const brands = [
        { id: '1', name: 'Apple' },
        { id: '2', name: 'Samsung' },
        { id: '3', name: 'Nike' },
        { id: '4', name: 'Adidas' },
    ];

    const handlePriceChange = () => {
        onFilterChange({ min_price: priceRange.min, max_price: priceRange.max });
    };

    return (
        <div className="space-y-6">
            {/* Price Range */}
            <div>
                <h3 className="mb-4 font-semibold text-gray-900">Price Range</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            className="input w-full"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        />
                        <span className="text-gray-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            className="input w-full"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        />
                    </div>
                    <button onClick={handlePriceChange} className="btn btn-primary w-full">
                        Apply
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="mb-4 font-semibold text-gray-900">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                checked={selectedCategories.includes(category.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedCategories([...selectedCategories, category.id]);
                                    } else {
                                        setSelectedCategories(selectedCategories.filter((id) => id !== category.id));
                                    }
                                }}
                            />
                            <span className="text-sm text-gray-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="mb-4 font-semibold text-gray-900">Brands</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                checked={selectedBrands.includes(brand.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedBrands([...selectedBrands, brand.id]);
                                    } else {
                                        setSelectedBrands(selectedBrands.filter((id) => id !== brand.id));
                                    }
                                }}
                            />
                            <span className="text-sm text-gray-700">{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => {
                    setPriceRange({ min: 0, max: 1000 });
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    onFilterChange({});
                }}
                className="w-full text-sm text-primary-600 hover:text-primary-700"
            >
                Clear All Filters
            </button>
        </div>
    );
}
