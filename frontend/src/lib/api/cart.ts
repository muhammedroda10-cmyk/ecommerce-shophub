import apiClient from './client';

export const getCart = async () => {
    const response = await apiClient.get('/cart');
    return response.data;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
    const response = await apiClient.post('/cart', {
        product_id: productId,
        quantity,
    });
    return response.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
    const response = await apiClient.put(`/cart/${itemId}`, {
        quantity,
    });
    return response.data;
};

export const removeFromCart = async (itemId: string) => {
    const response = await apiClient.delete(`/cart/${itemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
};
