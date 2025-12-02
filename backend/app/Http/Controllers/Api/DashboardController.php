<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function stats()
    {
        $user = Auth::user();

        $totalOrders = $user->orders()->count();
        $totalSpent = $user->orders()->where('payment_status', 'paid')->sum('total_amount');
        $recentOrders = $user->orders()->with('items.product')->latest()->take(5)->get();

        return response()->json([
            'total_orders' => $totalOrders,
            'total_spent' => $totalSpent,
            'recent_orders' => $recentOrders
        ]);
    }
}
