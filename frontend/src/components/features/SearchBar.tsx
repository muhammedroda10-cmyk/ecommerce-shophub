'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getAutocomplete } from '@/lib/api/search';

export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounced autocomplete
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 2) {
                loadSuggestions();
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadSuggestions = async () => {
        setLoading(true);
        try {
            const data = await getAutocomplete(query);
            setSuggestions(data.data || []);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Autocomplete error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (slug: string) => {
        router.push(`/products/${slug}`);
        setShowSuggestions(false);
        setQuery('');
    };

    return (
        <div ref={searchRef} className="relative w-full">
            <form onSubmit={handleSearch}>
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search products..."
                        className="input w-full pr-12"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {loading && (
                        <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
                    )}
                    {!loading && (
                        <ul className="py-2">
                            {suggestions.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleSuggestionClick(item.slug)}
                                        className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-50"
                                    >
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-10 w-10 rounded object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500">${item.price}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
