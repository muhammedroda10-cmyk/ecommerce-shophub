'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/api/auth';
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister } from '@/lib/api/auth';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isHydrated: boolean;
    error: string | null;

    // Actions
    setHydrated: (state: boolean) => void;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isHydrated: false,
            error: null,

            setHydrated: (state) => set({ isHydrated: state }),
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await apiLogin({ email, password });
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    const message = error.response?.data?.message || 'Login failed';
                    set({ error: message, isLoading: false });
                    throw error;
                }
            },

            register: async (name, email, password, passwordConfirmation) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await apiRegister({
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                    });
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    const message = error.response?.data?.message || 'Registration failed';
                    set({ error: message, isLoading: false });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await apiLogout();
                    set({ user: null, isAuthenticated: false, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                }
            },

            fetchUser: async () => {
                set({ isLoading: true });
                try {
                    const user = await getCurrentUser();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    // If 401, ensure we clear the state
                    if (error.response?.status === 401) {
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    } else {
                        // For other errors, we might want to keep the state or handle differently
                        // But generally if fetchUser fails, we assume not authenticated
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    }
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
