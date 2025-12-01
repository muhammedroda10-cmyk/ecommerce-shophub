<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Search products
     */
    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $perPage = $request->input('per_page', 20);

        if (empty($query)) {
            return response()->json([
                'data' => [],
                'meta' => [
                    'total' => 0,
                    'query' => $query,
                ],
            ]);
        }

        // Search using Meilisearch
        $results = Product::search($query)
            ->where('status', 'active')
            ->with(['images', 'category', 'brand', 'seller'])
            ->paginate($perPage);

        return response()->json([
            'data' => $results->items(),
            'meta' => [
                'total' => $results->total(),
                'current_page' => $results->currentPage(),
                'last_page' => $results->lastPage(),
                'per_page' => $results->perPage(),
                'query' => $query,
            ],
        ]);
    }

    /**
     * Get autocomplete suggestions
     */
    public function autocomplete(Request $request)
    {
        $query = $request->input('q', '');
        $limit = $request->input('limit', 5);

        if (strlen($query) < 2) {
            return response()->json([
                'data' => [],
            ]);
        }

        // Get search suggestions
        $suggestions = Product::search($query)
            ->where('status', 'active')
            ->take($limit)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'image' => $product->images->first()?->url,
                ];
            });

        return response()->json([
            'data' => $suggestions,
        ]);
    }

    /**
     * Get search suggestions (popular/trending)
     */
    public function suggestions()
    {
        // Return popular products or trending searches
        $popular = Product::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'title', 'slug']);

        return response()->json([
            'data' => $popular,
        ]);
    }
}
