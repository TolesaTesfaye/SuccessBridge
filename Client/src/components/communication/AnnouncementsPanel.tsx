import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Megaphone,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Modal } from "@components/common/Modal";
import { useAuthStore } from "@store/authStore";
import {
  announcementService,
  type Announcement,
} from "@services/announcementService";
import { formatDistanceToNow } from "@utils/dateUtils";

const TYPE_STYLES: Record<string, string> = {
  info: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  update: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

const ROLE_OPTIONS = [
  { value: "student", label: "Students" },
  { value: "admin", label: "Admins" },
  { value: "super_admin", label: "Super admins" },
];

const errorText = (error: any, fallback: string) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.userFriendlyError?.message ||
  fallback;

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
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "info",
    targetRoles: [] as string[],
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
    setForm({ title: "", content: "", type: "info", targetRoles: [] });
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

  const handleCreate = async () => {
    if (creating) return;
    if (!form.title.trim() || !form.content.trim()) {
      setCreateError("Title and message are required.");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      const created = await announcementService.create({
        title: form.title.trim(),
        content: form.content.trim(),
        type: form.type,
        targetRoles: form.targetRoles,
      });
      setAnnouncements((previous) =>
        previous.some((item) => item.id === created.id)
          ? previous
          : [created, ...previous],
      );
      setCreateOpen(false);
    } catch (error) {
      setCreateError(errorText(error, "Couldn't publish the announcement."));
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

  const canDelete = (announcement: Announcement) =>
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
              <article
                key={announcement.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-[#263653] dark:bg-[#101A32]/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          TYPE_STYLES[announcement.type] || TYPE_STYLES.info
                        }`}
                      >
                        {announcement.type}
                      </span>
                      {announcement.targetRoles &&
                        announcement.targetRoles.length > 0 && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                            {announcement.targetRoles
                              .map(
                                (role) =>
                                  ROLE_OPTIONS.find(
                                    (option) => option.value === role,
                                  )?.label || role,
                              )
                              .join(" · ")}
                          </span>
                        )}
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                      {announcement.title}
                    </h3>
                  </div>
                  {canDelete(announcement) && (
                    <button
                      type="button"
                      onClick={() => void handleDelete(announcement)}
                      disabled={deletingId === announcement.id}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-600 disabled:opacity-50 dark:hover:text-rose-400"
                      aria-label="Delete announcement"
                    >
                      {deletingId === announcement.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {announcement.content}
                </p>
                <p className="mt-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  {announcement.creator?.name || "SuccessBridge"} ·{" "}
                  {formatDistanceToNow(announcement.createdAt)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={createOpen}
        onClose={() => {
          if (!creating) setCreateOpen(false);
        }}
        title="New announcement"
        size="md"
        fullScreenOnMobile
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
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
              {creating ? "Publishing…" : "Publish"}
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
        </div>
      </Modal>
    </div>
  );
};

export default AnnouncementsPanel;
