import apiClient from './client';
import { Resource, PaginatedResponse } from '../types';

export const resourcesApi = {
  getAll: async (params?: {
    subjectId?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Resource>> => {
    const res = await apiClient.get('/resources', { params });
    return res.data;
  },

  getById: async (id: string): Promise<Resource> => {
    const res = await apiClient.get(`/resources/${id}`);
    return res.data.resource || res.data;
  },

  getSignedUrl: async (id: string): Promise<{ url: string }> => {
    const res = await apiClient.get(`/resources/${id}/signed-url`);
    return res.data;
  },
};
