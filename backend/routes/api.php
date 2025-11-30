<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::prefix('v1')->group(function () {
    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

    // Categories
    // Route::get('/categories', [CategoryController::class, 'index']);

    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
        // Cart
        // Route::apiResource('cart', CartController::class);

        // Orders
        // Route::apiResource('orders', OrderController::class);

        // User
        // Route::get('/user', function (Request $request) {
        //     return $request->user();
        // });
    });
});
