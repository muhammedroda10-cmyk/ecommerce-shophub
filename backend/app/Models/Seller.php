<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_name',
        'store_slug',
        'description',
        'logo_url',
        'banner_url',
        'rating',
        'total_sales',
        'commission_rate',
        'status',
        'verified_at',
        'metadata',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'verified_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Get the user that owns the seller account
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
