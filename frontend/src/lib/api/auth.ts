import apiClient from './client';
import axios from 'axios';

const CSRF_COOKIE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
    created_at: string;
}

// Get CSRF cookie before authentication requests
export const initCsrf = async () => {
    return axios.get(`${CSRF_COOKIE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
};

export const register = async (data: RegisterData): Promise<User> => {
    await initCsrf();
    const response = await apiClient.post('/auth/register', data);
    return response.data.data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
    await initCsrf();
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data;
};

export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await apiClient.get('/auth/user');
    return response.data.data;
};

export const updateProfile = async (data: { name: string; email: string }) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data.data;
};

export const updatePassword = async (data: { current_password: string; password: string; password_confirmation: string }) => {
    const response = await apiClient.put('/auth/password', data);
    return response.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
};

export const resetPassword = async (data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
};
