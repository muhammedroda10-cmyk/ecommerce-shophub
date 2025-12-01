<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Get user's cart
     */
    public function index()
    {
        $cart = Auth::user()->cart()->with(['items.product.images'])->first();

        if (!$cart) {
            return response()->json([
                'data' => [
                    'items' => [],
                    'total' => 0,
                ],
            ]);
        }

        $total = $cart->items->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'data' => [
                'items' => $cart->items,
                'total' => $total,
            ],
        ]);
    }

    /**
     * Add item to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check stock
        if ($product->quantity < $request->quantity) {
            return response()->json([
                'message' => 'Insufficient stock',
            ], 400);
        }

        // Get or create cart
        $cart = Auth::user()->cart()->firstOrCreate([
            'user_id' => Auth::id(),
        ]);

        // Check if item already in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            // Update quantity
            $newQuantity = $cartItem->quantity + $request->quantity;

            if ($newQuantity > $product->quantity) {
                return response()->json([
                    'message' => 'Quantity exceeds available stock',
                ], 400);
            }

            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // Add new item
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);
        }

        return response()->json([
            'message' => 'Item added to cart',
        ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Auth::user()->cart;
        $cartItem = $cart->items()->findOrFail($itemId);

        if ($request->quantity > $cartItem->product->quantity) {
            return response()->json([
                'message' => 'Quantity exceeds available stock',
            ], 400);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart updated',
        ]);
    }

    /**
     * Remove item from cart
     */
    public function destroy($itemId)
    {
        $cart = Auth::user()->cart;
        $cartItem = $cart->items()->findOrFail($itemId);
        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart',
        ]);
    }

    /**
     * Clear cart
     */
    public function clear()
    {
        $cart = Auth::user()->cart;

        if ($cart) {
            $cart->items()->delete();
        }

        return response()->json([
            'message' => 'Cart cleared',
        ]);
    }
}
