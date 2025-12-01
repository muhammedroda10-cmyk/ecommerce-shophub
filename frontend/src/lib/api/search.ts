import apiClient from './client';

export const searchProducts = async (query: string, page: number = 1) => {
    const response = await apiClient.get('/search', {
        params: { q: query, page, per_page: 20 },
    });
    return response.data;
};

export const getAutocomplete = async (query: string) => {
    const response = await apiClient.get('/search/autocomplete', {
        params: { q: query, limit: 5 },
    });
    return response.data;
};

export const getSuggestions = async () => {
    const response = await apiClient.get('/search/suggestions');
    return response.data;
};
