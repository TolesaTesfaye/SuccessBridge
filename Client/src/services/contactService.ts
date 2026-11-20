import api from "./api";

export type ContactStatus = "new" | "read" | "archived";
export type ContactCategory = "general" | "bug" | "feature" | "other";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  category: ContactCategory;
  message: string;
}

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const contactService = {
  send: async (input: ContactInput): Promise<ContactMessage> =>
    unwrap(await api.post("/contact", input)),

  list: async (status?: ContactStatus): Promise<ContactMessage[]> =>
    unwrap(
      await api.get("/contact", {
        params: status ? { status } : undefined,
        skipCache: true,
      } as any),
    ),

  updateStatus: async (
    id: string,
    status: ContactStatus,
  ): Promise<ContactMessage> =>
    unwrap(await api.patch(`/contact/${id}/status`, { status })),
};

export default contactService;
