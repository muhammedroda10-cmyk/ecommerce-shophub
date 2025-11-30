<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'brand', 'images', 'seller'])
            ->where('status', 'active');

        // Search
        if ($request->has('search')) {
            $query->whereFullText(['title', 'description'], $request->search);
        }

        // Category filter
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        return $query->paginate($request->get('per_page', 20));
    }

    public function show($slug)
    {
        $product = Product::with(['category', 'brand', 'images', 'variants', 'seller', 'reviews'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($product);
    }
}
