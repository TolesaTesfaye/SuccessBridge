import api from "./api";

export type ConversationRole = "member" | "admin";

export interface ConversationUser {
  id: string;
  name: string;
  role: "student" | "admin" | "super_admin";
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: "text" | "system";
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  attachmentType?: string | null;
  attachmentSize?: number | null;
  createdAt: string;
  sender: ConversationUser | null;
}

export interface MessageSearchResult extends ConversationMessage {
  conversation: { id: string; title: string | null; type: "direct" | "group" } | null;
}

export interface ConversationParticipant {
  id: string;
  role: ConversationRole;
  lastReadAt: string | null;
  user: ConversationUser | null;
}

export interface Conversation {
  id: string;
  title: string | null;
  type: "direct" | "group";
  createdBy: string;
  lastMessageAt: string | null;
  participants: ConversationParticipant[];
  unreadCount: number;
  lastMessage: ConversationMessage | null;
}

export interface MessagePage {
  messages: ConversationMessage[];
  total: number;
  page: number;
  limit: number;
  aroundId?: string;
}

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const conversationService = {
  listConversations: async (): Promise<Conversation[]> =>
    unwrap(await api.get("/conversations", { skipCache: true } as any)),

  getConversation: async (id: string): Promise<Conversation> =>
    unwrap(await api.get(`/conversations/${id}`, { skipCache: true } as any)),

  createConversation: async (
    participantIds: string[],
    title?: string,
  ): Promise<Conversation> =>
    unwrap(
      await api.post("/conversations", { participantIds, title }),
    ),

  listMessages: async (
    id: string,
    page = 1,
    limit = 50,
    aroundId?: string,
  ): Promise<MessagePage> =>
    unwrap(
      await api.get(`/conversations/${id}/messages`, {
        params: { page, limit, ...(aroundId ? { aroundId } : {}) },
        skipCache: true,
      } as any),
    ),

  sendMessage: async (
    id: string,
    content: string,
  ): Promise<ConversationMessage> =>
    unwrap(await api.post(`/conversations/${id}/messages`, { content })),

  uploadAttachment: async (
    id: string,
    file: File,
  ): Promise<ConversationMessage> => {
    const form = new FormData();
    form.append("file", file);
    return unwrap(
      await api.post(`/conversations/${id}/attachments`, form),
    );
  },

  searchMessages: async (
    query: string,
    limit = 25,
  ): Promise<MessageSearchResult[]> =>
    unwrap(
      await api.get("/conversations/search", {
        params: { q: query, limit },
        skipCache: true,
      } as any),
    ),

  markRead: async (id: string): Promise<void> => {
    await api.post(`/conversations/${id}/read`);
  },
};

export default conversationService;
