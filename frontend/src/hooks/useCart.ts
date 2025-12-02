import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuth';
import apiClient from '@/lib/api/client';

export interface CartItem {
    id: string;
    productId: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    maxQuantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity' | 'id'> & { quantity?: number }) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    fetchCart: () => Promise<void>;
    mergeCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            fetchCart: async () => {
                try {
                    const { data } = await apiClient.get('/cart');
                    // Map backend items to frontend format
                    const mappedItems = data.data.items.map((item: any) => ({
                        id: item.id, // Database ID
                        productId: item.product_id,
                        slug: item.product.slug,
                        title: item.product.title,
                        price: Number(item.product.price),
                        quantity: item.quantity,
                        image: item.product.images?.[0]?.image_path || '/images/placeholder.jpg',
                        maxQuantity: item.product.quantity,
                    }));
                    set({ items: mappedItems });
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                }
            },

            mergeCart: async () => {
                const localItems = get().items;
                try {
                    // 1. Send all local items to server
                    for (const item of localItems) {
                        await apiClient.post('/cart', {
                            product_id: item.productId,
                            quantity: item.quantity,
                        });
                    }
                    // 2. Fetch updated cart from server
                    await get().fetchCart();
                } catch (error) {
                    console.error('Failed to merge cart:', error);
                }
            },

            addItem: async (item) => {
                const { isAuthenticated } = useAuthStore.getState();

                if (isAuthenticated) {
                    try {
                        const { data } = await apiClient.post('/cart', {
                            product_id: item.productId,
                            quantity: item.quantity || 1,
                        });

                        // If successful, we could either re-fetch or optimistically update.
                        // For simplicity and correctness, let's re-fetch or use the returned data.
                        // Using returned data is better but we need to match the format.
                        // Let's re-fetch for now to ensure consistency.
                        await get().fetchCart();
                        return;
                    } catch (error) {
                        console.error('Failed to add item to server cart:', error);
                        // Fallback to local? Or show error?
                        // For now, let's allow local update as fallback or just return
                    }
                }

                const items = get().items;
                const existingItem = items.find((i) => i.productId === item.productId);

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.productId === item.productId
                                ? { ...i, quantity: Math.min(i.quantity + (item.quantity || 1), i.maxQuantity) }
                                : i
                        ),
                    });
                } else {
                    set({
                        items: [...items, { ...item, quantity: item.quantity || 1, id: item.productId }], // Use productId as temp ID for guest
                    });
                }
            },

            removeItem: async (productId) => {
                const { isAuthenticated } = useAuthStore.getState();
                const items = get().items;
                const itemToRemove = items.find(i => i.productId === productId);

                if (isAuthenticated && itemToRemove?.id) {
                    try {
                        // We need the cart_item_id (database ID), which is stored in item.id
                        await apiClient.delete(`/cart/${itemToRemove.id}`);
                        await get().fetchCart();
                        return;
                    } catch (error) {
                        console.error('Failed to remove item from server cart:', error);
                    }
                }

                set({
                    items: items.filter((i) => i.productId !== productId),
                });
            },

            updateQuantity: async (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                const { isAuthenticated } = useAuthStore.getState();
                const items = get().items;
                const itemToUpdate = items.find(i => i.productId === productId);

                if (isAuthenticated && itemToUpdate?.id) {
                    try {
                        await apiClient.put(`/cart/${itemToUpdate.id}`, {
                            quantity: quantity,
                        });
                        await get().fetchCart();
                        return;
                    } catch (error) {
                        console.error('Failed to update quantity on server:', error);
                    }
                }

                set({
                    items: items.map((i) =>
                        i.productId === productId
                            ? { ...i, quantity: Math.min(quantity, i.maxQuantity) }
                            : i
                    ),
                });
            },

            clearCart: async () => {
                const { isAuthenticated } = useAuthStore.getState();

                if (isAuthenticated) {
                    try {
                        await apiClient.post('/cart/clear');
                    } catch (error) {
                        console.error('Failed to clear server cart:', error);
                    }
                }

                set({ items: [] });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
