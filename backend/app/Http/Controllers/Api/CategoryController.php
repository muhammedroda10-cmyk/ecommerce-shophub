<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Get all categories
     */
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->whereNull('parent_id')
            ->with('children')
            ->orderBy('position')
            ->get();

        return response()->json([
            'data' => $categories,
        ]);
    }

    /**
     * Get a single category with its products
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'children',
                'products' => function ($query) {
                    $query->where('status', 'active')
                        ->with(['images', 'brand', 'seller']);
                }
            ])
            ->firstOrFail();

        return response()->json([
            'data' => $category,
        ]);
    }
}
