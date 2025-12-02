import api from './client';

export const getOrders = async (page = 1) => {
    const response = await api.get(`/orders?page=${page}`);
    return response.data;
};

export const getOrder = async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const createOrder = async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
};
