<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderPlacementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_place_order()
    {
        // Create user
        $user = User::factory()->create();

        // Create seller
        $seller = \App\Models\Seller::create([
            'user_id' => $user->id,
            'store_name' => 'Test Store',
            'store_slug' => 'test-store',
            'description' => 'Test Description',
            'status' => 'active'
        ]);

        // Create category
        $category = \App\Models\Category::create([
            'name' => 'Test Category',
            'slug' => 'test-category',
            'description' => 'Test Description'
        ]);

        // Create product
        $product = Product::create([
            'seller_id' => $seller->id,
            'title' => 'Test Product',
            'description' => 'Test Description',
            'price' => 100,
            'quantity' => 10,
            'slug' => 'test-product',
            'sku' => 'TEST-SKU-001',
            'image' => 'test.jpg',
            'category_id' => $category->id,
            'status' => 'active'
        ]);

        // Authenticate
        $this->actingAs($user);

        // Order data
        $orderData = [
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 1
                ]
            ],
            'shipping_name' => 'Test User',
            'shipping_address' => '123 Test St',
            'shipping_city' => 'Test City',
            'shipping_postal_code' => '12345',
            'shipping_phone' => '1234567890',
        ];

        // Send request
        $response = $this->postJson('/api/v1/orders', $orderData);

        $response->assertStatus(201);
    }
}
