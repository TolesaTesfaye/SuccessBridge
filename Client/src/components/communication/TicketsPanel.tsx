import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  LifeBuoy,
  Loader2,
  Plus,
  RefreshCw,
  Send,
} from "lucide-react";
import { Modal } from "@components/common/Modal";
import { useAuthStore } from "@store/authStore";
import {
  ticketService,
  type SupportTicket,
  type TicketPriority,
  type TicketStatus,
} from "@services/ticketService";
import { formatDistanceToNow } from "@utils/dateUtils";

const STATUS_STYLES: Record<TicketStatus, string> = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  resolved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
  closed: "Closed",
};

const PRIORITY_STYLES: Record<TicketPriority, string> = {
  low: "text-slate-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-rose-600 dark:text-rose-400",
};

const errorText = (error: any, fallback: string) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.userFriendlyError?.message ||
  fallback;

interface TicketsPanelProps {
  refreshKey?: number;
}

export const TicketsPanel: React.FC<TicketsPanelProps> = ({
  refreshKey = 0,
}) => {
  const me = useAuthStore((state) => state.user);
  const isStaff = me?.role === "admin" || me?.role === "super_admin";

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"" | TicketStatus>("");

  const [activeId, setActiveId] = useState<string | null>(null);
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [statusSaving, setStatusSaving] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "medium" as TicketPriority,
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setTickets(
        await ticketService.list(statusFilter === "" ? undefined : statusFilter),
      );
    } catch (error) {
      setLoadError(errorText(error, "Couldn't load tickets."));
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    setActiveId(null);
    setTicket(null);
    setMobileThreadOpen(false);
  }, [statusFilter]);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets, refreshKey]);

  const loadTicket = useCallback(async (id: string) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      setTicket(await ticketService.get(id));
    } catch (error) {
      setDetailError(errorText(error, "Couldn't load this ticket."));
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeId) return;
    void loadTicket(activeId);
  }, [activeId, loadTicket, refreshKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [ticket?.messages?.length, activeId]);

  const openTicket = (id: string) => {
    setActiveId(id);
    setMobileThreadOpen(true);
    setReply("");
    setReplyError(null);
  };

  const handleReply = async () => {
    const text = reply.trim();
    if (!text || !activeId || replying) return;

    setReplying(true);
    setReplyError(null);
    try {
      const result = await ticketService.reply(activeId, text);
      setTicket((previous) =>
        previous
          ? {
              ...previous,
              status: result.status,
              lastReplyAt: result.message.createdAt,
              messages: [...(previous.messages || []), result.message],
            }
          : previous,
      );
      setTickets((previous) =>
        previous.map((item) =>
          item.id === activeId
            ? {
                ...item,
                status: result.status,
                lastReplyAt: result.message.createdAt,
              }
            : item,
        ),
      );
      setReply("");
    } catch (error) {
      setReplyError(errorText(error, "Reply didn't send. Please try again."));
    } finally {
      setReplying(false);
    }
  };

  const handleStatusChange = async (status: TicketStatus) => {
    if (!activeId || statusSaving) return;
    setStatusSaving(true);
    try {
      const updated = await ticketService.updateStatus(activeId, status);
      setTicket((previous) =>
        previous ? { ...previous, status: updated.status } : previous,
      );
      setTickets((previous) =>
        previous.map((item) =>
          item.id === activeId ? { ...item, status: updated.status } : item,
        ),
      );
    } catch (error) {
      setDetailError(errorText(error, "Couldn't update the status."));
    } finally {
      setStatusSaving(false);
    }
  };

  const openCreate = () => {
    setForm({ subject: "", category: "", priority: "medium", description: "" });
    setCreateError(null);
    setCreateOpen(true);
  };

  const handleCreate = async () => {
    if (creating) return;
    if (!form.subject.trim() || !form.description.trim()) {
      setCreateError("Subject and description are required.");
      return;
    }

    setCreating(true);
    setCreateError(null);
    try {
      const created = await ticketService.create({
        subject: form.subject.trim(),
        description: form.description.trim(),
        category: form.category.trim() || undefined,
        priority: form.priority,
      });
      setTickets((previous) =>
        previous.some((item) => item.id === created.id)
          ? previous
          : [created, ...previous],
      );
      setCreateOpen(false);
      setStatusFilter("");
      openTicket(created.id);
    } catch (error) {
      setCreateError(errorText(error, "Couldn't open the ticket."));
    } finally {
      setCreating(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500/50 dark:border-[#263653] dark:bg-white/5 dark:text-white";

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={`${
          mobileThreadOpen ? "hidden lg:flex" : "flex"
        } w-full shrink-0 flex-col border-r border-slate-200/80 dark:border-[#263653] lg:flex lg:w-80 xl:w-96`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div>
            <h2 className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Support
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {isStaff ? "All support tickets" : "Your support tickets"}
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            New
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 px-3 pb-3">
          {(["" , "open", "in_progress", "resolved", "closed"] as const).map(
            (status) => (
              <button
                key={status || "all"}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                {status === "" ? "All" : STATUS_LABEL[status]}
              </button>
            ),
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center gap-2 py-10 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-xs font-medium">Loading tickets…</p>
            </div>
          ) : loadError ? (
            <div className="mx-2 rounded-xl border border-rose-500/20 bg-rose-50 px-3 py-4 text-center dark:bg-rose-500/10">
              <AlertCircle className="mx-auto mb-1.5 h-5 w-5 text-rose-500" />
              <p className="text-xs font-medium text-rose-700 dark:text-rose-300">
                {loadError}
              </p>
              <button
                type="button"
                onClick={() => void loadTickets()}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            </div>
          ) : tickets.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <LifeBuoy className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                No tickets yet.
              </p>
              <button
                type="button"
                onClick={openCreate}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Open one
              </button>
            </div>
          ) : (
            tickets.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openTicket(item.id)}
                className={`mb-1 flex w-full flex-col gap-1 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  item.id === activeId
                    ? "bg-blue-50 dark:bg-blue-500/10"
                    : "hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {item.subject}
                  </span>
                  <span className="shrink-0 text-[10px] font-medium text-slate-400">
                    {formatDistanceToNow(item.lastReplyAt || item.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase ${PRIORITY_STYLES[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                  {isStaff && item.user && (
                    <span className="truncate text-[10px] text-slate-400">
                      {item.user.name}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <section
        className={`${
          mobileThreadOpen ? "flex" : "hidden lg:flex"
        } min-w-0 flex-1 flex-col bg-[#F8FAFF] dark:bg-[#0B1428]/40`}
      >
        {!activeId ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <LifeBuoy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                No ticket selected
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Pick a ticket or open a new one.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95"
            >
              New ticket
            </button>
          </div>
        ) : detailLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p className="text-xs font-medium">Loading ticket…</p>
          </div>
        ) : detailError || !ticket ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <AlertCircle className="h-6 w-6 text-rose-500" />
            <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
              {detailError || "Ticket not found."}
            </p>
            <button
              type="button"
              onClick={() => activeId && void loadTicket(activeId)}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        ) : (
          <>
            <header className="flex items-center gap-3 border-b border-slate-200/80 bg-white/70 px-3 py-3 dark:border-[#263653] dark:bg-[#101A32]/50 md:px-5">
              <button
                type="button"
                onClick={() => setMobileThreadOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
                aria-label="Back to tickets"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white md:text-base">
                  {ticket.subject}
                </h2>
                <p className="truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {ticket.user?.name || "You"} ·{" "}
                  {formatDistanceToNow(ticket.createdAt)}
                  {ticket.category ? ` · ${ticket.category}` : ""}
                </p>
              </div>
              {isStaff ? (
                <select
                  value={ticket.status}
                  onChange={(event) =>
                    void handleStatusChange(event.target.value as TicketStatus)
                  }
                  disabled={statusSaving}
                  className="shrink-0 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 outline-none disabled:opacity-60 dark:border-[#263653] dark:bg-[#0B1428] dark:text-slate-200"
                >
                  {(Object.keys(STATUS_LABEL) as TicketStatus[]).map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABEL[status]}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLES[ticket.status]}`}
                >
                  {STATUS_LABEL[ticket.status]}
                </span>
              )}
            </header>

            <div className="flex-1 space-y-2 overflow-y-auto px-3 py-4 custom-scrollbar md:px-5">
              {(ticket.messages || []).map((message) => {
                const mine = message.senderId === me?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
                        mine
                          ? "rounded-br-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20"
                          : "rounded-bl-md bg-slate-100 text-slate-800 dark:border dark:border-[#263653] dark:bg-[#101A32] dark:text-slate-100"
                      }`}
                    >
                      {!mine && (
                        <p className="mb-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                          {message.sender?.name || "Support"}
                          {message.isStaff ? " · Support" : ""}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p
                        className={`mt-1 text-right text-[10px] ${
                          mine
                            ? "text-blue-100/80"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>

            <div className="border-t border-slate-200/80 bg-white/80 p-2.5 dark:border-[#263653] dark:bg-[#101A32]/50 md:p-3">
              {ticket.status === "closed" ? (
                <p className="px-1 py-2 text-center text-[11px] font-medium text-slate-400">
                  This ticket is closed.
                </p>
              ) : (
                <>
                  {replyError && (
                    <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {replyError}
                    </p>
                  )}
                  <div className="flex items-end gap-2 rounded-2xl border border-slate-200/80 bg-white px-2 py-1.5 transition-colors focus-within:border-blue-500/50 dark:border-[#263653] dark:bg-[#0B1428]">
                    <textarea
                      value={reply}
                      onChange={(event) => {
                        setReply(event.target.value);
                        if (replyError) setReplyError(null);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void handleReply();
                        }
                      }}
                      rows={1}
                      placeholder="Write a reply…"
                      className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-2 text-sm text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => void handleReply()}
                      disabled={!reply.trim() || replying}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Send reply"
                    >
                      {replying ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </section>

      <Modal
        isOpen={createOpen}
        onClose={() => {
          if (!creating) setCreateOpen(false);
        }}
        title="New support ticket"
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
              {creating ? "Opening…" : "Open ticket"}
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
            value={form.subject}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                subject: event.target.value,
              }))
            }
            placeholder="Subject"
            className={inputClass}
          />
          <div className="flex gap-2">
            <input
              value={form.category}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  category: event.target.value,
                }))
              }
              placeholder="Category (optional)"
              className={inputClass}
            />
            <select
              value={form.priority}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  priority: event.target.value as TicketPriority,
                }))
              }
              className="w-32 shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none dark:border-[#263653] dark:bg-white/5 dark:text-slate-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                description: event.target.value,
              }))
            }
            rows={5}
            placeholder="Describe the issue…"
            className={`${inputClass} resize-none`}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TicketsPanel;
