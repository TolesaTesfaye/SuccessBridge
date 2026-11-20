import api from "./api";

export interface AnnouncementAuthor {
  id: string;
  name: string;
  role: "student" | "admin" | "super_admin";
}

export type PaymentAudience = "paid" | "unpaid";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetRoles: string[] | null;
  targetEducationLevels: string[] | null;
  targetPaymentStatus: PaymentAudience | null;
  isActive: boolean;
  createdBy: string | null;
  scheduledAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  creator: AnnouncementAuthor | null;
}

export interface CreateAnnouncementInput {
  title: string;
  content: string;
  type?: string;
  targetRoles?: string[];
  targetEducationLevels?: string[];
  targetPaymentStatus?: PaymentAudience | null;
  scheduledAt?: string | null;
  expiresAt?: string | null;
}

export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput> & {
  targetRoles?: string[] | null;
  targetEducationLevels?: string[] | null;
  isActive?: boolean;
};

const unwrap = <T>(response: { data: { data: T } }): T => response.data.data;

export const announcementService = {
  list: async (limit = 50): Promise<Announcement[]> =>
    unwrap(
      await api.get("/announcements", {
        params: { limit },
        skipCache: true,
      } as any),
    ),

  create: async (input: CreateAnnouncementInput): Promise<Announcement> =>
    unwrap(await api.post("/announcements", input)),

  update: async (
    id: string,
    input: UpdateAnnouncementInput,
  ): Promise<Announcement> =>
    unwrap(await api.put(`/announcements/${id}`, input)),

  remove: async (id: string): Promise<void> => {
    await api.delete(`/announcements/${id}`);
  },
};

export default announcementService;
