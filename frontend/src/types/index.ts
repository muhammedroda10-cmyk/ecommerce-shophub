// User roles
export type UserRole = 'customer' | 'seller' | 'admin';

// User types
export interface User {
    id: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: 'active' | 'inactive' | 'suspended';
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    dateOfBirth?: Date;
    preferences?: Record<string, any>;
}

// Product types
export interface Product {
    id: string;
    sellerId: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    sku: string;
    barcode?: string;
    quantity: number;
    categoryId: string;
    brandId?: string;
    status: 'active' | 'draft' | 'archived';
    images: ProductImage[];
    variants?: ProductVariant[];
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductImage {
    id: string;
    productId: string;
    url: string;
    altText?: string;
    position: number;
    isPrimary: boolean;
}

export interface ProductVariant {
    id: string;
    productId: string;
    title: string;
    price: number;
    sku: string;
    quantity: number;
    options: Record<string, string>;
    images?: string[];
}

// Category types
export interface Category {
    id: string;
    parentId?: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    position: number;
    isActive: boolean;
}

// Cart types
export interface CartItem {
    id: string;
    productId: string;
    variantId?: string;
    quantity: number;
    product: Product;
    variant?: ProductVariant;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    total: number;
}

// Order types
export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    notes?: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    variantId?: string;
    sellerId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: string;
}

// Address types
export interface Address {
    id?: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

// Review types
export interface Review {
    id: string;
    userId: string;
    productId: string;
    orderId?: string;
    rating: number;
    title?: string;
    content: string;
    images?: string[];
    isVerifiedPurchase: boolean;
    helpfulCount: number;
    createdAt: Date;
}

// Seller types
export interface Seller {
    id: string;
    userId: string;
    storeName: string;
    storeSlug: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    rating: number;
    totalSales: number;
    commissionRate: number;
    status: 'pending' | 'active' | 'suspended';
    verifiedAt?: Date;
    metadata?: Record<string, any>;
}

// Filter types
export interface ProductFilters {
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'rating';
}

// Pagination types
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
