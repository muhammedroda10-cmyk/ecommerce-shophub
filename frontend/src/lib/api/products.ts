import apiClient from './client';

export interface ProductFilters {
    category_id?: string;
    brand_id?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by?: 'created_at' | 'price' | 'title';
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

export const getProducts = async (filters: ProductFilters = {}) => {
    const response = await apiClient.get('/products', { params: filters });
    return response.data;
};

export const getProduct = async (slug: string) => {
    const response = await apiClient.get(`/products/${slug}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await apiClient.get('/categories');
    return response.data;
};

export const getCategory = async (slug: string) => {
    const response = await apiClient.get(`/categories/${slug}`);
    return response.data;
};
