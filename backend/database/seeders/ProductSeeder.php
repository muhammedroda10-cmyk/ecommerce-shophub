<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\User;
use App\Models\Seller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Create a default user and seller
        $user = User::firstOrCreate(
            ['email' => 'seller@shophub.com'],
            [
                'name' => 'ShopHub Store',
                'password' => Hash::make('password'),
            ]
        );

        $seller = Seller::firstOrCreate(
            ['user_id' => $user->id],
            [
                'store_name' => 'ShopHub Official Store',
                'store_slug' => 'shophub-official',
                'description' => 'Official ShopHub store with verified products',
                'status' => 'active',
            ]
        );

        // Create Categories
        $electronics = Category::firstOrCreate(
            ['slug' => 'electronics'],
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and accessories',
                'is_active' => true,
                'position' => 1,
            ]
        );

        $fashion = Category::firstOrCreate(
            ['slug' => 'fashion'],
            [
                'name' => 'Fashion',
                'description' => 'Clothing and accessories',
                'is_active' => true,
                'position' => 2,
            ]
        );

        $homeLiving = Category::firstOrCreate(
            ['slug' => 'home-living'],
            [
                'name' => 'Home & Living',
                'description' => 'Furniture and home decor',
                'is_active' => true,
                'position' => 3,
            ]
        );

        $sports = Category::firstOrCreate(
            ['slug' => 'sports'],
            [
                'name' => 'Sports',
                'description' => 'Sports equipment and gear',
                'is_active' => true,
                'position' => 4,
            ]
        );

        // Create Brands
        $brands = [
            'Apple' => 'apple',
            'Samsung' => 'samsung',
            'Nike' => 'nike',
            'Adidas' => 'adidas',
            'Sony' => 'sony',
            'LG' => 'lg',
            'IKEA' => 'ikea',
        ];

        $brandModels = [];
        foreach ($brands as $name => $slug) {
            $brandModels[$slug] = Brand::firstOrCreate(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'is_active' => true,
                ]
            );
        }

        // Create Products
        $products = [
            [
                'category' => $electronics,
                'brand' => $brandModels['apple'],
                'title' => 'iPhone 15 Pro Max',
                'description' => 'Latest iPhone with A17 Pro chip and titanium design.',
                'price' => 1199.00,
                'compare_price' => 1299.00,
                'sku' => 'IPHONE-15-PRO-MAX',
                'quantity' => 50,
            ],
            [
                'category' => $electronics,
                'brand' => $brandModels['samsung'],
                'title' => 'Samsung Galaxy S24 Ultra',
                'description' => 'Flagship Android phone with S Pen and 200MP camera.',
                'price' => 1099.00,
                'compare_price' => 1199.00,
                'sku' => 'GALAXY-S24-ULTRA',
                'quantity' => 45,
            ],
            [
                'category' => $electronics,
                'brand' => $brandModels['sony'],
                'title' => 'Sony WH-1000XM5 Headphones',
                'description' => 'Industry-leading noise canceling wireless headphones.',
                'price' => 399.00,
                'compare_price' => 449.00,
                'sku' => 'SONY-WH1000XM5',
                'quantity' => 100,
            ],
            [
                'category' => $fashion,
                'brand' => $brandModels['nike'],
                'title' => 'Nike Air Max 270',
                'description' => 'Comfortable running shoes with Air Max cushioning.',
                'price' => 149.99,
                'compare_price' => 179.99,
                'sku' => 'NIKE-AIRMAX-270',
                'quantity' => 150,
            ],
            [
                'category' => $fashion,
                'brand' => $brandModels['adidas'],
                'title' => 'Adidas Ultraboost 23',
                'description' => 'Premium running shoes with responsive Boost cushioning.',
                'price' => 189.99,
                'compare_price' => null,
                'sku' => 'ADIDAS-ULTRABOOST-23',
                'quantity' => 120,
            ],
        ];

        foreach ($products as $productData) {
            $product = Product::firstOrCreate(
                ['sku' => $productData['sku']],
                [
                    'seller_id' => $seller->id,
                    'category_id' => $productData['category']->id,
                    'brand_id' => $productData['brand']->id,
                    'title' => $productData['title'],
                    'slug' => Str::slug($productData['title']),
                    'description' => $productData['description'],
                    'price' => $productData['price'],
                    'compare_price' => $productData['compare_price'],
                    'quantity' => $productData['quantity'],
                    'status' => 'active',
                ]
            );

            if ($product->images()->count() === 0) {
                $product->images()->create([
                    'url' => 'https://placehold.co/600x600/png?text=' . urlencode($productData['title']),
                    'position' => 1,
                    'is_primary' => true,
                ]);
            }
        }

        $this->command->info('✅ Created ' . count($products) . ' products!');
    }
}
