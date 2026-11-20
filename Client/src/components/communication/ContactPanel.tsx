import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  Inbox,
  Loader2,
  Mail,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import {
  contactService,
  type ContactMessage,
  type ContactStatus,
} from "@services/contactService";
import { getSocket } from "@services/socket";
import { formatDistanceToNow } from "@utils/dateUtils";

const STATUS_LABEL: Record<ContactStatus, string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

const STATUS_STYLES: Record<ContactStatus, string> = {
  new: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  read: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  archived: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const CATEGORY_LABEL: Record<string, string> = {
  general: "General inquiry",
  bug: "Report an issue",
  feature: "Feature request",
  other: "Other",
};

const FILTERS: { id: "" | ContactStatus; label: string }[] = [
  { id: "", label: "All" },
  { id: "new", label: "New" },
  { id: "read", label: "Read" },
  { id: "archived", label: "Archived" },
];

const errorText = (error: any, fallback: string) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.userFriendlyError?.message ||
  fallback;

interface ContactPanelProps {
  refreshKey?: number;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({
  refreshKey = 0,
}) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"" | ContactStatus>("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setMessages(await contactService.list());
    } catch (error) {
      setLoadError(errorText(error, "Couldn't load contact messages."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages, refreshKey]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNew = () => {
      void loadMessages();
    };
    socket.on("contact:new", handleNew);
    return () => {
      socket.off("contact:new", handleNew);
    };
  }, [loadMessages]);

  const counts = useMemo(
    () => ({
      new: messages.filter((item) => item.status === "new").length,
      read: messages.filter((item) => item.status === "read").length,
      archived: messages.filter((item) => item.status === "archived").length,
    }),
    [messages],
  );

  const visible = useMemo(
    () =>
      filter === ""
        ? messages
        : messages.filter((item) => item.status === filter),
    [messages, filter],
  );

  const active = useMemo(
    () => messages.find((item) => item.id === activeId) ?? null,
    [messages, activeId],
  );

  const updateStatus = async (
    message: ContactMessage,
    status: ContactStatus,
  ) => {
    setSaving(true);
    setActionError(null);
    try {
      const updated = await contactService.updateStatus(message.id, status);
      setMessages((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
    } catch (error) {
      setActionError(errorText(error, "Couldn't update this message."));
    } finally {
      setSaving(false);
    }
  };

  const openMessage = (message: ContactMessage) => {
    setActiveId(message.id);
    setMobileOpen(true);
    setActionError(null);
    if (message.status === "new") void updateStatus(message, "read");
  };

  const replyHref = active
    ? `mailto:${active.email}?subject=${encodeURIComponent(
        `Re: ${active.subject}`,
      )}&body=${encodeURIComponent(
        `\n\n---\nOriginal message from ${active.name}:\n${active.message}`,
      )}`
    : "";

  const filteredCount = (id: "" | ContactStatus) =>
    id === "" ? messages.length : counts[id];

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`${
          mobileOpen ? "hidden lg:flex" : "flex"
        } w-full shrink-0 flex-col border-r border-slate-200/80 dark:border-[#263653] lg:flex lg:w-80 xl:w-96`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div>
            <h2 className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Contact
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Messages from the contact page
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadMessages()}
            disabled={loading}
            title="Refresh"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 px-3 pb-3">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id || "all"}
              type="button"
              onClick={() => setFilter(id)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                filter === id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {label} ({filteredCount(id)})
            </button>
          ))}
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3">
          {loading ? (
            <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-xs font-medium">Loading messages…</p>
            </div>
          ) : loadError ? (
            <div className="mx-2 rounded-xl border border-rose-500/20 bg-rose-50 px-3 py-4 text-center dark:bg-rose-500/10">
              <AlertCircle className="mx-auto mb-1.5 h-5 w-5 text-rose-500" />
              <p className="text-xs font-medium text-rose-700 dark:text-rose-300">
                {loadError}
              </p>
              <button
                type="button"
                onClick={() => void loadMessages()}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            </div>
          ) : visible.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <Inbox className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                No contact messages.
              </p>
            </div>
          ) : (
            visible.map((item) => {
              const unread = item.status === "new";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openMessage(item)}
                  className={`mb-1 flex w-full flex-col gap-1 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    item.id === activeId
                      ? "bg-blue-50 dark:bg-blue-500/10"
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {unread && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    )}
                    <span
                      className={`min-w-0 flex-1 truncate text-sm ${
                        unread
                          ? "font-bold text-slate-900 dark:text-white"
                          : "font-medium text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {item.subject}
                    </span>
                    <span className="shrink-0 text-[10px] font-medium text-slate-400">
                      {formatDistanceToNow(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[item.status]}`}
                    >
                      {STATUS_LABEL[item.status]}
                    </span>
                    <span className="truncate text-[10px] text-slate-400">
                      {item.name} · {CATEGORY_LABEL[item.category] || item.category}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <section
        className={`${
          mobileOpen ? "flex" : "hidden lg:flex"
        } min-w-0 flex-1 flex-col bg-[#F8FAFF] dark:bg-[#0B1428]/40`}
      >
        {!active ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Inbox className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                No message selected
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Pick a message from the contact page.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-[#263653]">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-white/5"
                aria-label="Back to messages"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {active.subject}
                </h2>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {active.name} · {active.email} ·{" "}
                  {formatDistanceToNow(active.createdAt)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[active.status]}`}
              >
                {STATUS_LABEL[active.status]}
              </span>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
                  {CATEGORY_LABEL[active.category] || active.category}
                </span>
                <a
                  href={replyHref}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-700 transition-colors hover:bg-blue-500/20 dark:text-blue-300"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Reply by email
                </a>
              </div>

              <p className="whitespace-pre-wrap rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-[#263653] dark:bg-[#101A32] dark:text-slate-100">
                {active.message}
              </p>

              {actionError && (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {actionError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200/80 px-4 py-2.5 dark:border-[#263653]">
              {active.status !== "new" && (
                <button
                  type="button"
                  onClick={() => void updateStatus(active, "new")}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-[#263653] dark:text-slate-300 dark:hover:bg-white/5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Mark as new
                </button>
              )}
              {active.status !== "archived" && (
                <button
                  type="button"
                  onClick={() => void updateStatus(active, "archived")}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
                >
                  <Archive className="h-3.5 w-3.5" />
                  Archive
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ContactPanel;
