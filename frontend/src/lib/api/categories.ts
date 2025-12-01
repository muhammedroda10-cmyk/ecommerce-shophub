import apiClient from './client';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products_count?: number;
}

export const getCategories = async () => {
    const response = await apiClient.get('/categories');
    return response.data;
};

export const getCategory = async (slug: string) => {
    const response = await apiClient.get(`/categories/${slug}`);
    return response.data;
};
