import apiClient from './client';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const aiApi = {
  chat: async (messages: AIMessage[], subject?: string): Promise<{ reply: string }> => {
    const res = await apiClient.post('/ai/chat', { messages, subject });
    return res.data;
  },

  summarize: async (text: string): Promise<{ summary: string }> => {
    const res = await apiClient.post('/ai/summarize', { text });
    return res.data;
  },
};
