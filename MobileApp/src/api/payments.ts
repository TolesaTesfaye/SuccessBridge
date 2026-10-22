import apiClient from './client';
import { Payment } from '../types';

export const paymentsApi = {
  getMyPayments: async (): Promise<Payment[]> => {
    const res = await apiClient.get('/payments/my-payments');
    return res.data.payments || res.data;
  },

  initiate: async (plan: string): Promise<{ checkoutUrl: string; paymentId: string }> => {
    const res = await apiClient.post('/payments/initiate', { plan });
    return res.data;
  },

  getStatus: async (paymentId: string): Promise<Payment> => {
    const res = await apiClient.get(`/payments/${paymentId}/status`);
    return res.data.payment || res.data;
  },
};
