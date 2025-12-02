import api from './client';

export const getDashboardStats = async () => {
    const response = await api.get('/dashboard');
    return response.data;
};
