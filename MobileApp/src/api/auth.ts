import apiClient from './client';
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../types';

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', payload);
    const payloadData = res.data?.data || res.data;
    return {
      token: payloadData?.token,
      user: payloadData?.user,
      message: res.data?.message || payloadData?.message,
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', payload);
    const payloadData = res.data?.data || res.data;
    return {
      token: payloadData?.token,
      user: payloadData?.user,
      message: res.data?.message || payloadData?.message,
    };
  },

  me: async (): Promise<User> => {
    const res = await apiClient.get('/auth/me');
    return res.data.user || res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.post('/auth/reset-password', { token, password });
    return res.data;
  },

  verifyEmail: async (token: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.get(`/auth/verify-email?token=${token}`);
    return res.data;
  },

  resendVerification: async (email: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.post('/auth/resend-verification', { email });
    return res.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const res = await apiClient.post('/auth/refresh-token');
    return res.data;
  },
};
