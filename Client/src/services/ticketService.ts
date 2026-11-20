import api from "./api";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export interface TicketUser {
  id: string;
  name: string;
  role: "student" | "admin" | "super_admin";
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  content: string;
  isStaff: boolean;
  createdAt: string;
  sender: TicketUser | null;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  lastReplyAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: TicketUser | null;
  messages?: TicketMessage[];
}

export interface CreateTicketInput {
  subject: string;
  description: string;
  category?: string;
  priority?: TicketPriority;
}

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const ticketService = {
  list: async (status?: TicketStatus): Promise<SupportTicket[]> =>
    unwrap(
      await api.get("/tickets", {
        params: status ? { status } : undefined,
        skipCache: true,
      } as any),
    ),

  get: async (id: string): Promise<SupportTicket> =>
    unwrap(
      await api.get(`/tickets/${id}`, { skipCache: true } as any),
    ),

  create: async (input: CreateTicketInput): Promise<SupportTicket> =>
    unwrap(await api.post("/tickets", input)),

  reply: async (
    id: string,
    content: string,
  ): Promise<{ message: TicketMessage; status: TicketStatus }> =>
    unwrap(await api.post(`/tickets/${id}/messages`, { content })),

  updateStatus: async (
    id: string,
    status: TicketStatus,
  ): Promise<SupportTicket> =>
    unwrap(await api.patch(`/tickets/${id}/status`, { status })),
};

export default ticketService;
