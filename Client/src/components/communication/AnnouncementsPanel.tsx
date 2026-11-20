import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Megaphone,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Modal } from "@components/common/Modal";
import { useAuthStore } from "@store/authStore";
import {
  announcementService,
  type Announcement,
} from "@services/announcementService";
import {
  AnnouncementCard,
  LEVEL_OPTIONS,
  ROLE_OPTIONS,
  TYPE_STYLES,
} from "@components/communication/AnnouncementCard";

const errorText = (error: any, fallback: string) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.userFriendlyError?.message ||
  fallback;

const PAYMENT_OPTIONS = [
  { value: "", label: "Everyone" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
] as const;

interface AnnouncementsPanelProps {
  refreshKey?: number;
}

export const AnnouncementsPanel: React.FC<AnnouncementsPanelProps> = ({
  refreshKey = 0,
}) => {
  const me = useAuthStore((state) => state.user);
  const canPublish = me?.role === "admin" || me?.role === "super_admin";

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "info",
    targetRoles: [] as string[],
    targetEducationLevels: [] as string[],
    targetPaymentStatus: "" as "" | "paid" | "unpaid",
    isActive: true,
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setAnnouncements(await announcementService.list());
    } catch (error) {
      setLoadError(errorText(error, "Couldn't load announcements."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      title: "",
      content: "",
      type: "info",
      targetRoles: [],
      targetEducationLevels: [],
      targetPaymentStatus: "",
      isActive: true,
    });
    setCreateError(null);
    setCreateOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setForm({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type || "info",
      targetRoles: announcement.targetRoles || [],
      targetEducationLevels: announcement.targetEducationLevels || [],
      targetPaymentStatus: announcement.targetPaymentStatus || "",
      isActive: announcement.isActive,
    });
    setCreateError(null);
    setCreateOpen(true);
  };

  const toggleRole = (role: string) => {
    setForm((previous) => ({
      ...previous,
      targetRoles: previous.targetRoles.includes(role)
        ? previous.targetRoles.filter((value) => value !== role)
        : [...previous.targetRoles, role],
    }));
  };

  const toggleLevel = (level: string) => {
    setForm((previous) => ({
      ...previous,
      targetEducationLevels: previous.targetEducationLevels.includes(level)
        ? previous.targetEducationLevels.filter((value) => value !== level)
        : [...previous.targetEducationLevels, level],
    }));
  };

  const handleCreate = async () => {
    if (creating) return;
    if (!form.title.trim() || !form.content.trim()) {
      setCreateError("Title and message are required.");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      if (editingId) {
        const updated = await announcementService.update(editingId, {
          title: form.title.trim(),
          content: form.content.trim(),
          type: form.type,
          targetRoles: form.targetRoles,
          targetEducationLevels: form.targetEducationLevels,
          targetPaymentStatus: form.targetPaymentStatus || null,
          isActive: form.isActive,
        });
        setAnnouncements((previous) =>
          previous.map((item) => (item.id === updated.id ? updated : item)),
        );
      } else {
        const created = await announcementService.create({
          title: form.title.trim(),
          content: form.content.trim(),
          type: form.type,
          targetRoles: form.targetRoles,
          targetEducationLevels: form.targetEducationLevels,
          targetPaymentStatus: form.targetPaymentStatus || null,
        });
        setAnnouncements((previous) =>
          previous.some((item) => item.id === created.id)
            ? previous
            : [created, ...previous],
        );
      }
      setCreateOpen(false);
      setEditingId(null);
    } catch (error) {
      setCreateError(
        errorText(
          error,
          editingId
            ? "Couldn't save the announcement."
            : "Couldn't publish the announcement.",
        ),
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (announcement: Announcement) => {
    if (deletingId) return;
    setDeletingId(announcement.id);
    try {
      await announcementService.remove(announcement.id);
      setAnnouncements((previous) =>
        previous.filter((item) => item.id !== announcement.id),
      );
    } catch (error) {
      setLoadError(errorText(error, "Couldn't delete the announcement."));
    } finally {
      setDeletingId(null);
    }
  };

  const canManage = (announcement: Announcement) =>
    me?.role === "super_admin" ||
    (Boolean(me?.id) && announcement.createdBy === me?.id);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-[#263653] md:px-6">
        <div>
          <h2 className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Announcements
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Updates from the SuccessBridge team
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Refresh announcements"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          {canPublish && (
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar md:px-6">
        {loading ? (
          <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="text-xs font-medium">Loading announcements…</p>
          </div>
        ) : loadError ? (
          <div className="mx-auto max-w-sm rounded-xl border border-rose-500/20 bg-rose-50 px-4 py-3 text-center dark:bg-rose-500/10">
            <p className="text-xs font-medium text-rose-700 dark:text-rose-300">
              {loadError}
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Megaphone className="h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              No announcements yet
            </p>
            <p className="text-xs text-slate-400">
              {canPublish
                ? "Publish an update to reach your users."
                : "Check back later for updates."}
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                deleting={deletingId === announcement.id}
                onEdit={canManage(announcement) ? openEdit : undefined}
                onDelete={
                  canManage(announcement)
                    ? (item) => void handleDelete(item)
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={createOpen}
        onClose={() => {
          if (!creating) {
            setCreateOpen(false);
            setEditingId(null);
          }
        }}
        title={editingId ? "Edit announcement" : "New announcement"}
        size="md"
        fullScreenOnMobile
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setCreateOpen(false);
                setEditingId(null);
              }}
              disabled={creating}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-[#263653] dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleCreate()}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {creating
                ? editingId
                  ? "Saving…"
                  : "Publishing…"
                : editingId
                  ? "Save changes"
                  : "Publish"}
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          {createError && (
            <p className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {createError}
            </p>
          )}
          <input
            value={form.title}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, title: event.target.value }))
            }
            placeholder="Title"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500/50 dark:border-[#263653] dark:bg-white/5 dark:text-white"
          />
          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                content: event.target.value,
              }))
            }
            rows={5}
            placeholder="Write the announcement…"
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500/50 dark:border-[#263653] dark:bg-white/5 dark:text-white"
          />
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Style
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(TYPE_STYLES).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((previous) => ({ ...previous, type }))}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold capitalize transition-colors ${
                    form.type === type
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Audience
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ROLE_OPTIONS.map((option) => {
                const selected = form.targetRoles.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleRole(option.value)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400">
              Leave empty to reach everyone.
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Grade / level
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LEVEL_OPTIONS.map((option) => {
                const selected = form.targetEducationLevels.includes(
                  option.value,
                );
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleLevel(option.value)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400">
              Leave empty for all grades and levels. Applies to students.
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Payment status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENT_OPTIONS.map((option) => (
                <button
                  key={option.value || "all"}
                  type="button"
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      targetPaymentStatus: option.value,
                    }))
                  }
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                    form.targetPaymentStatus === option.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400">
              Target students who have paid or not paid. Applies to the student
              audience only.
            </p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={() =>
                setForm((previous) => ({
                  ...previous,
                  isActive: !previous.isActive,
                }))
              }
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left dark:border-[#263653] dark:bg-white/5"
            >
              <span>
                <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Visible to audience
                </span>
                <span className="block text-[10px] text-slate-400">
                  {form.isActive
                    ? "Currently shown to the selected audience."
                    : "Hidden from everyone until you turn it back on."}
                </span>
              </span>
              <span
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  form.isActive
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    form.isActive ? "left-[18px]" : "left-0.5"
                  }`}
                />
              </span>
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AnnouncementsPanel;
