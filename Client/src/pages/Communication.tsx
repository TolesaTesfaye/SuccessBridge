import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Modal } from "@components/common/Modal";
import { AnnouncementsPanel } from "@components/communication/AnnouncementsPanel";
import { TicketsPanel } from "@components/communication/TicketsPanel";
import { useAuthStore } from "@store/authStore";
import { userService } from "@services/userService";
import {
  conversationService,
  type Conversation,
  type ConversationMessage,
  type ConversationUser,
  type MessageSearchResult,
} from "@services/conversationService";
import { connectSocket, disconnectSocket, getSocket } from "@services/socket";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCheck,
  FileText,
  LifeBuoy,
  Loader2,
  Megaphone,
  Paperclip,
  RefreshCw,
  Search,
  Send,
  SquarePen,
  Users,
} from "lucide-react";

type CommunicationTab = "chats" | "announcements" | "support";

const TABS: {
  id: CommunicationTab;
  label: string;
  icon: typeof Megaphone;
}[] = [
  { id: "chats", label: "Chats", icon: SquarePen },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "support", label: "Support", icon: LifeBuoy },
];

const ROLE_LABEL: Record<string, string> = {
  student: "Student",
  admin: "Admin",
  super_admin: "Super Admin",
};

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
];

const gradientFor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  }
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("") || "?";

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const formatConversationTime = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const days = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86400000);
  if (days <= 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (days === 1) return "Yesterday";
  if (days < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { day: "2-digit", month: "short" });
};

const formatMessageTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDayLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Earlier";
  const days = Math.round((startOfDay(new Date()) - startOfDay(date)) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString([], { day: "2-digit", month: "long", year: "numeric" });
};

const formatFileSize = (bytes?: number | null) => {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const isImageMessage = (message: ConversationMessage) =>
  Boolean(message.attachmentType?.startsWith("image/"));

const errorText = (error: any, fallback: string) =>
  error?.userFriendlyError?.message ||
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  fallback;

const othersIn = (conversation: Conversation, meId?: string) =>
  conversation.participants.filter(
    (participant) => participant.user && participant.user.id !== meId,
  );

const conversationName = (conversation: Conversation, meId?: string) => {
  if (conversation.type === "group" && conversation.title) {
    return conversation.title;
  }
  const names = othersIn(conversation, meId)
    .map((participant) => participant.user?.name)
    .filter((name): name is string => Boolean(name));
  if (names.length > 0) return names.join(", ");
  return conversation.title || "Conversation";
};

const conversationSubtitle = (conversation: Conversation, meId?: string) => {
  if (conversation.type === "group") {
    const count = conversation.participants.length;
    return `${count} member${count === 1 ? "" : "s"}`;
  }
  const other = othersIn(conversation, meId)[0]?.user;
  return other ? ROLE_LABEL[other.role] || other.role : "Direct message";
};

const bubbleBase =
  "max-w-[85%] sm:max-w-[75%] px-3.5 py-2.5 text-sm leading-relaxed break-words";
const myBubble = `${bubbleBase} rounded-2xl rounded-br-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20`;
const theirBubble = `${bubbleBase} rounded-2xl rounded-bl-md bg-slate-100 text-slate-800 dark:bg-[#101A32] dark:border dark:border-[#263653] dark:text-slate-100`;

const inputClass =
  "w-full rounded-xl border border-slate-200/80 bg-slate-100/70 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-blue-500/50 focus:bg-white dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-white/10";

export const Communication: React.FC = () => {
  const me = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<CommunicationTab>(() => {
    const tab = searchParams.get("tab");
    return tab === "announcements" || tab === "support" ? tab : "chats";
  });
  const [announcementTick, setAnnouncementTick] = useState(0);
  const [ticketTick, setTicketTick] = useState(0);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [messagesReloadKey, setMessagesReloadKey] = useState(0);
  const [messagesTotal, setMessagesTotal] = useState(0);
  const [loadedPage, setLoadedPage] = useState(1);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [jumpTo, setJumpTo] = useState<{
    conversationId: string;
    messageId: string;
  } | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MessageSearchResult[]>([]);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [composerError, setComposerError] = useState<string | null>(null);
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [directory, setDirectory] = useState<ConversationUser[]>([]);
  const [directoryLoading, setDirectoryLoading] = useState(false);
  const [directoryError, setDirectoryError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [onlineIds, setOnlineIds] = useState<Set<string>>(() => new Set());
  const [typingBy, setTypingBy] = useState<
    Record<string, { userId: string; name: string }>
  >({});

  const activeIdRef = useRef<string | null>(null);
  const conversationsRef = useRef<Conversation[]>([]);
  const typingStopRef = useRef<number | null>(null);
  const typingClearRef = useRef<Record<string, number>>({});

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) ?? null,
    [conversations, activeId],
  );

  const visibleConversations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((conversation) => {
      const name = conversationName(conversation, me?.id).toLowerCase();
      const last = (conversation.lastMessage?.content || "").toLowerCase();
      return name.includes(q) || last.includes(q);
    });
  }, [conversations, query, me?.id]);

  const messageGroups = useMemo(() => {
    const groups: { label: string; messages: ConversationMessage[] }[] = [];
    messages.forEach((message) => {
      const label = formatDayLabel(message.createdAt);
      const current = groups[groups.length - 1];
      if (current && current.label === label) current.messages.push(message);
      else groups.push({ label, messages: [message] });
    });
    return groups;
  }, [messages]);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await conversationService.listConversations();
      setConversations(data);
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      setActiveId((previous) => {
        if (previous && data.some((conversation) => conversation.id === previous)) {
          return previous;
        }
        return isDesktop ? data[0]?.id ?? null : null;
      });
    } catch (error) {
      setLoadError(errorText(error, "Couldn't load conversations."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    setActiveTab(
      tab === "announcements" || tab === "support" ? tab : "chats",
    );
  }, [searchParams]);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setSearchResults([]);
      setSearchResultsLoading(false);
      return;
    }

    let cancelled = false;
    setSearchResultsLoading(true);
    const timer = window.setTimeout(() => {
      conversationService
        .searchMessages(trimmedQuery)
        .then((results) => {
          if (!cancelled) setSearchResults(results);
        })
        .catch(() => {
          if (!cancelled) setSearchResults([]);
        })
        .finally(() => {
          if (!cancelled) setSearchResultsLoading(false);
        });
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [trimmedQuery]);

  const selectTab = (tab: CommunicationTab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    if (tab === "chats") next.delete("tab");
    else next.set("tab", tab);
    setSearchParams(next, { replace: true });
  };

  const refreshConversations = useCallback(async () => {
    try {
      const data = await conversationService.listConversations();
      setConversations(data);
    } catch {
      // Keep the current list; the next event or reload will retry.
    }
  }, []);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    const handleMessage = (message: ConversationMessage) => {
      if (
        !conversationsRef.current.some(
          (conversation) => conversation.id === message.conversationId,
        )
      ) {
        void refreshConversations();
      }

      setConversations((previous) => {
        if (
          !previous.some(
            (conversation) => conversation.id === message.conversationId,
          )
        ) {
          return previous;
        }
        const updated = previous.map((conversation) =>
          conversation.id === message.conversationId
            ? {
                ...conversation,
                lastMessage: message,
                lastMessageAt: message.createdAt,
                unreadCount:
                  conversation.id === activeIdRef.current ||
                  message.senderId === me?.id
                    ? 0
                    : conversation.unreadCount + 1,
              }
            : conversation,
        );
        return [...updated].sort(
          (a, b) =>
            new Date(b.lastMessageAt || 0).getTime() -
            new Date(a.lastMessageAt || 0).getTime(),
        );
      });

      if (message.conversationId === activeIdRef.current) {
        setMessages((previous) =>
          previous.some((item) => item.id === message.id)
            ? previous
            : [...previous, message],
        );
        if (message.senderId !== me?.id) {
          conversationService
            .markRead(message.conversationId)
            .catch(() => undefined);
        }
      }
    };

    const handleNotify = (payload: { conversationId?: string }) => {
      if (
        payload?.conversationId &&
        payload.conversationId !== activeIdRef.current
      ) {
        void refreshConversations();
      }
    };

    const handleRead = (payload: {
      conversationId: string;
      userId: string;
      lastReadAt: string;
    }) => {
      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id !== payload.conversationId
            ? conversation
            : {
                ...conversation,
                participants: conversation.participants.map((participant) =>
                  participant.id === payload.userId
                    ? { ...participant, lastReadAt: payload.lastReadAt }
                    : participant,
                ),
              },
        ),
      );
    };

    const clearTyping = (conversationId: string, userId?: string) => {
      window.clearTimeout(typingClearRef.current[conversationId]);
      delete typingClearRef.current[conversationId];
      setTypingBy((previous) => {
        const current = previous[conversationId];
        if (!current || (userId && current.userId !== userId)) return previous;
        const next = { ...previous };
        delete next[conversationId];
        return next;
      });
    };

    const handleTyping = (payload: {
      conversationId: string;
      userId: string;
      name: string;
      isTyping: boolean;
    }) => {
      if (!payload.isTyping) {
        clearTyping(payload.conversationId, payload.userId);
        return;
      }
      setTypingBy((previous) => ({
        ...previous,
        [payload.conversationId]: {
          userId: payload.userId,
          name: payload.name,
        },
      }));
      window.clearTimeout(typingClearRef.current[payload.conversationId]);
      typingClearRef.current[payload.conversationId] = window.setTimeout(
        () => clearTyping(payload.conversationId, payload.userId),
        4000,
      );
    };

    const handlePresence = (payload: { userId: string; online: boolean }) => {
      setOnlineIds((previous) => {
        const next = new Set(previous);
        if (payload.online) next.add(payload.userId);
        else next.delete(payload.userId);
        return next;
      });
    };

    const handlePresenceState = (payload: { online: string[] }) => {
      setOnlineIds(new Set(payload.online));
    };

    const handleConversationNew = () => {
      void refreshConversations();
    };

    const handleAnnouncement = () => {
      setAnnouncementTick((value) => value + 1);
    };

    const handleTicketEvent = () => {
      setTicketTick((value) => value + 1);
    };

    socket.on("message:new", handleMessage);
    socket.on("message:notify", handleNotify);
    socket.on("read:update", handleRead);
    socket.on("typing:update", handleTyping);
    socket.on("presence:update", handlePresence);
    socket.on("presence:state", handlePresenceState);
    socket.on("conversation:new", handleConversationNew);
    socket.on("announcement:new", handleAnnouncement);
    socket.on("ticket:new", handleTicketEvent);
    socket.on("ticket:message", handleTicketEvent);
    socket.on("ticket:status", handleTicketEvent);

    return () => {
      socket.off("message:new", handleMessage);
      socket.off("message:notify", handleNotify);
      socket.off("read:update", handleRead);
      socket.off("typing:update", handleTyping);
      socket.off("presence:update", handlePresence);
      socket.off("presence:state", handlePresenceState);
      socket.off("conversation:new", handleConversationNew);
      socket.off("announcement:new", handleAnnouncement);
      socket.off("ticket:new", handleTicketEvent);
      socket.off("ticket:message", handleTicketEvent);
      socket.off("ticket:status", handleTicketEvent);
      if (typingStopRef.current) window.clearTimeout(typingStopRef.current);
      Object.values(typingClearRef.current).forEach((timer) =>
        window.clearTimeout(timer),
      );
      typingClearRef.current = {};
      disconnectSocket();
    };
  }, [token, me?.id, refreshConversations]);

  useEffect(() => {
    if (!activeId) return;
    const socket = getSocket();
    if (!socket) return;

    const join = () => socket.emit("conversation:join", activeId);
    join();
    socket.on("connect", join);

    return () => {
      socket.off("connect", join);
      socket.emit("typing:stop", activeId);
      socket.emit("conversation:leave", activeId);
    };
  }, [activeId]);

  const presenceIds = useMemo(() => {
    const ids = new Set<string>();
    conversations.forEach((conversation) =>
      conversation.participants.forEach((participant) => {
        if (participant.user?.id && participant.user.id !== me?.id) {
          ids.add(participant.user.id);
        }
      }),
    );
    return Array.from(ids).sort();
  }, [conversations, me?.id]);
  const presenceKey = presenceIds.join(",");

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !presenceKey) return;
    const ids = presenceKey.split(",");
    const sync = () => socket.emit("presence:sync", ids);
    sync();
    socket.on("connect", sync);
    return () => {
      socket.off("connect", sync);
    };
  }, [presenceKey, token]);

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      setMessagesError(null);
      setMessagesTotal(0);
      setLoadedPage(1);
      return;
    }

    let cancelled = false;
    setMessages([]);
    setMessagesLoading(true);
    setMessagesError(null);
    setComposerError(null);

    const aroundId =
      jumpTo && jumpTo.conversationId === activeId
        ? jumpTo.messageId
        : undefined;

    conversationService
      .listMessages(activeId, 1, 50, aroundId)
      .then((page) => {
        if (cancelled) return;
        setMessages(page.messages);
        setMessagesTotal(page.total);
        setLoadedPage(1);
      })
      .catch((error) => {
        if (!cancelled) setMessagesError(errorText(error, "Couldn't load messages."));
      })
      .finally(() => {
        if (!cancelled) setMessagesLoading(false);
      });

    conversationService
      .markRead(activeId)
      .then(() => {
        if (!cancelled) {
          setConversations((previous) =>
            previous.map((conversation) =>
              conversation.id === activeId
                ? { ...conversation, unreadCount: 0 }
                : conversation,
            ),
          );
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [activeId, messagesReloadKey, jumpTo]);

  useEffect(() => {
    if (
      jumpTo &&
      jumpTo.conversationId === activeId &&
      messages.some((message) => message.id === jumpTo.messageId)
    ) {
      document
        .getElementById(`message-${jumpTo.messageId}`)
        ?.scrollIntoView({ block: "center" });
      setHighlightId(jumpTo.messageId);
      const timer = window.setTimeout(() => setHighlightId(null), 2500);
      return () => window.clearTimeout(timer);
    }
    endRef.current?.scrollIntoView({ block: "end" });
    return undefined;
  }, [activeId, messages, jumpTo]);

  const openConversation = (id: string) => {
    if (id !== activeId) setJumpTo(null);
    setActiveId(id);
    setMobileThreadOpen(true);
  };

  const openSearchResult = (result: MessageSearchResult) => {
    setJumpTo({ conversationId: result.conversationId, messageId: result.id });
    if (result.conversationId !== activeId) {
      setActiveId(result.conversationId);
    } else {
      setMessagesReloadKey((key) => key + 1);
    }
    setMobileThreadOpen(true);
  };

  const handleLoadOlder = async () => {
    if (!activeId || loadingOlder || jumpTo) return;

    const container = messagesContainerRef.current;
    const previousHeight = container?.scrollHeight ?? 0;
    const previousTop = container?.scrollTop ?? 0;

    setLoadingOlder(true);
    try {
      const page = await conversationService.listMessages(
        activeId,
        loadedPage + 1,
      );
      setMessages((previous) => {
        const existing = new Set(previous.map((message) => message.id));
        return [
          ...page.messages.filter((message) => !existing.has(message.id)),
          ...previous,
        ];
      });
      setLoadedPage((value) => value + 1);
      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop =
            container.scrollHeight - previousHeight + previousTop;
        }
      });
    } catch (error) {
      setMessagesError(errorText(error, "Couldn't load earlier messages."));
    } finally {
      setLoadingOlder(false);
    }
  };

  const applySentMessage = (message: ConversationMessage) => {
    setMessages((previous) =>
      previous.some((item) => item.id === message.id)
        ? previous
        : [...previous, message],
    );
    setMessagesTotal((value) => value + 1);
    setConversations((previous) => {
      const updated = previous.map((conversation) =>
        conversation.id === message.conversationId
          ? {
              ...conversation,
              lastMessage: message,
              lastMessageAt: message.createdAt,
              unreadCount: 0,
            }
          : conversation,
      );
      return [...updated].sort(
        (a, b) =>
          new Date(b.lastMessageAt || 0).getTime() -
          new Date(a.lastMessageAt || 0).getTime(),
      );
    });
  };

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || !activeId || sending) return;

    if (typingStopRef.current) window.clearTimeout(typingStopRef.current);
    getSocket()?.emit("typing:stop", activeId);

    setSending(true);
    setComposerError(null);
    setDraft("");
    try {
      const message = await conversationService.sendMessage(activeId, text);
      applySentMessage(message);
    } catch (error) {
      setDraft(text);
      setComposerError(errorText(error, "Message didn't send. Please try again."));
    } finally {
      setSending(false);
    }
  };

  const handleFilePicked = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !activeId || uploading) return;

    setUploading(true);
    setComposerError(null);
    try {
      const message = await conversationService.uploadAttachment(
        activeId,
        file,
      );
      applySentMessage(message);
    } catch (error) {
      setComposerError(
        errorText(error, "File didn't upload. Please try again."),
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDraftChange = (value: string) => {
    setDraft(value);
    if (composerError) setComposerError(null);

    const socket = getSocket();
    if (!socket || !activeId) return;
    socket.emit("typing:start", activeId);
    if (typingStopRef.current) window.clearTimeout(typingStopRef.current);
    typingStopRef.current = window.setTimeout(() => {
      socket.emit("typing:stop", activeId);
    }, 1800);
  };

  const openPicker = async () => {
    setPickerOpen(true);
    setSelectedIds([]);
    setGroupTitle("");
    setCreateError(null);

    if (directory.length > 0 || directoryLoading) return;

    setDirectoryLoading(true);
    setDirectoryError(null);
    try {
      const [superAdmins, admins] = await Promise.all([
        userService.getAllUsers(1, 100, "super_admin"),
        userService.getAllUsers(1, 100, "admin"),
      ]);

      const seen = new Set<string>();
      const people: ConversationUser[] = [];
      [...superAdmins.data, ...admins.data].forEach((user) => {
        if (!user.id || user.id === me?.id || seen.has(user.id)) return;
        seen.add(user.id);
        people.push({ id: user.id, name: user.name, role: user.role });
      });
      setDirectory(people);
    } catch (error) {
      setDirectoryError(errorText(error, "Couldn't load the team directory."));
    } finally {
      setDirectoryLoading(false);
    }
  };

  const toggleSelected = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id],
    );
    setCreateError(null);
  };

  const handleCreateConversation = async () => {
    if (selectedIds.length === 0 || creating) return;

    setCreating(true);
    setCreateError(null);
    try {
      const conversation = await conversationService.createConversation(
        selectedIds,
        selectedIds.length > 1 ? groupTitle.trim() || undefined : undefined,
      );
      setConversations((previous) =>
        previous.some((item) => item.id === conversation.id)
          ? previous
          : [conversation, ...previous],
      );
      setActiveId(conversation.id);
      setMobileThreadOpen(true);
      setPickerOpen(false);
      setSelectedIds([]);
      setGroupTitle("");
    } catch (error) {
      setCreateError(errorText(error, "Couldn't start the conversation."));
    } finally {
      setCreating(false);
    }
  };

  const activeName = activeConversation
    ? conversationName(activeConversation, me?.id)
    : "";

  const activeTyping = activeId ? typingBy[activeId] : undefined;

  const isDirectOnline = (conversation: Conversation) =>
    conversation.type === "direct" &&
    othersIn(conversation, me?.id).some(
      (participant) => participant.user && onlineIds.has(participant.user.id),
    );

  const activeIsOnline = activeConversation
    ? isDirectOnline(activeConversation)
    : false;

  const lastOwnMessageId = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].senderId === me?.id) return messages[index].id;
    }
    return null;
  }, [messages, me?.id]);

  const isMessageSeen = (message: ConversationMessage) => {
    if (!activeConversation || message.id !== lastOwnMessageId) return false;
    const createdAt = new Date(message.createdAt).getTime();
    return activeConversation.participants.some(
      (participant) =>
        participant.user?.id !== me?.id &&
        participant.lastReadAt &&
        new Date(participant.lastReadAt).getTime() >= createdAt,
    );
  };

  return (
    <DashboardLayout noPadding showFooter={false}>
      <div className="flex h-full w-full overflow-hidden p-2 md:p-4">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-[#263653] dark:bg-[#0B1428]/80">
          <div className="flex shrink-0 items-center gap-1 border-b border-slate-200/80 bg-white/70 px-2 py-2 dark:border-[#263653] dark:bg-[#0B1121]/40">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            {activeTab === "chats" ? (
              <>
                {/* Conversation sidebar */}
                <aside
            className={`${
              mobileThreadOpen ? "hidden lg:flex" : "flex"
            } w-full shrink-0 flex-col border-r border-slate-200/80 bg-white/80 dark:border-[#263653] dark:bg-[#0B1121]/60 lg:flex lg:w-80 xl:w-96`}
          >
            <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-4">
              <div className="min-w-0">
                <h1 className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Communication
                </h1>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Messages & announcements
                </p>
              </div>
              <button
                type="button"
                onClick={openPicker}
                title="New conversation"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <SquarePen className="h-4 w-4" />
              </button>
            </div>

            <div className="px-3 pb-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search conversations & messages"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 custom-scrollbar">
              {trimmedQuery.length >= 2 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between px-3 pb-1 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Messages
                    </p>
                    {searchResultsLoading && (
                      <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
                    )}
                  </div>
                  {searchResults.length === 0 ? (
                    !searchResultsLoading && (
                      <p className="px-3 py-1 text-[11px] text-slate-400">
                        No matching messages.
                      </p>
                    )
                  ) : (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => openSearchResult(result)}
                        className="mb-1 flex w-full flex-col gap-0.5 rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                            {result.sender?.name || "Unknown"}
                          </span>
                          <span className="shrink-0 text-[10px] text-slate-400">
                            {formatConversationTime(result.createdAt)}
                          </span>
                        </div>
                        <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {result.content || result.attachmentName || "Attachment"}
                        </span>
                      </button>
                    ))
                  )}
                  <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Conversations
                  </p>
                </div>
              )}
              {loading ? (
                <div className="flex flex-col items-center gap-2 px-3 py-10 text-slate-400">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p className="text-xs font-medium">Loading conversations…</p>
                </div>
              ) : loadError ? (
                <div className="mx-2 rounded-xl border border-rose-500/20 bg-rose-50 px-3 py-4 text-center dark:bg-rose-500/10">
                  <AlertCircle className="mx-auto mb-1.5 h-5 w-5 text-rose-500" />
                  <p className="text-xs font-medium text-rose-700 dark:text-rose-300">
                    {loadError}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadConversations()}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Retry
                  </button>
                </div>
              ) : conversations.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <Users className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-600" />
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    No conversations yet.
                  </p>
                  <button
                    type="button"
                    onClick={openPicker}
                    className="mt-2 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Start one
                  </button>
                </div>
              ) : visibleConversations.length === 0 ? (
                <p className="px-3 py-8 text-center text-xs text-slate-400">
                  No conversations match “{query}”.
                </p>
              ) : (
                visibleConversations.map((conversation) => {
                  const isActive = conversation.id === activeId;
                  const name = conversationName(conversation, me?.id);
                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => openConversation(conversation.id)}
                      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-500/10"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFor(
                            conversation.id,
                          )} text-xs font-bold text-white shadow-sm`}
                        >
                          {conversation.type === "group" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            initials(name)
                          )}
                        </div>
                        {isDirectOnline(conversation) && (
                          <span
                            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#0B1121]"
                            aria-label="Online"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={`truncate text-sm font-semibold ${
                              isActive
                                ? "text-blue-700 dark:text-blue-200"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {name}
                          </span>
                          <span className="shrink-0 text-[10px] font-medium text-slate-400">
                            {formatConversationTime(
                              conversation.lastMessageAt ||
                                conversation.lastMessage?.createdAt,
                            )}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {conversation.lastMessage
                              ? `${
                                  conversation.lastMessage.senderId === me?.id
                                    ? "You: "
                                    : ""
                                }${conversation.lastMessage.content}`
                              : "No messages yet"}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <p className="border-t border-slate-200/70 px-4 py-2.5 text-[10px] font-medium text-slate-400 dark:border-[#263653] dark:text-slate-500">
              Messages are saved to your account.
            </p>
          </aside>

          {/* Message thread */}
          <section
            className={`${
              mobileThreadOpen ? "flex" : "hidden lg:flex"
            } min-w-0 flex-1 flex-col bg-[#F8FAFF] dark:bg-[#0B1428]/40`}
          >
            {!activeConversation ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <SquarePen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    No conversation selected
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Pick a conversation or start a new one.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openPicker}
                  className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95"
                >
                  New conversation
                </button>
              </div>
            ) : (
              <>
                <header className="flex items-center gap-3 border-b border-slate-200/80 bg-white/70 px-3 py-3 dark:border-[#263653] dark:bg-[#101A32]/50 md:px-5">
                  <button
                    type="button"
                    onClick={() => setMobileThreadOpen(false)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFor(
                        activeConversation.id,
                      )} text-xs font-bold text-white`}
                    >
                      {activeConversation.type === "group" ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        initials(activeName)
                      )}
                    </div>
                    {activeIsOnline && (
                      <span
                        className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#101A32]"
                        aria-label="Online"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white md:text-base">
                      {activeName}
                    </h2>
                    <p
                      className={`truncate text-[11px] font-medium ${
                        activeTyping
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {activeTyping
                        ? `${activeTyping.name.split(" ")[0]} is typing…`
                        : activeConversation.type === "direct"
                          ? activeIsOnline
                            ? "Online"
                            : "Offline"
                          : conversationSubtitle(activeConversation, me?.id)}
                    </p>
                  </div>
                </header>

                <div
                  ref={messagesContainerRef}
                  className="flex-1 space-y-2 overflow-y-auto px-3 py-4 custom-scrollbar md:px-5"
                >
                  {messagesLoading ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <p className="text-xs font-medium">Loading messages…</p>
                    </div>
                  ) : messagesError ? (
                    <div className="mx-auto max-w-sm rounded-xl border border-rose-500/20 bg-rose-50 px-4 py-3 text-center dark:bg-rose-500/10">
                      <p className="text-xs font-medium text-rose-700 dark:text-rose-300">
                        {messagesError}
                      </p>
                      <button
                        type="button"
                        onClick={() => setMessagesReloadKey((key) => key + 1)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Retry
                      </button>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-1.5 text-center">
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        No messages yet
                      </p>
                      <p className="text-xs text-slate-400">
                        Send the first message to {activeName.split(" ")[0]}.
                      </p>
                    </div>
                  ) : (
                    <>
                      {!jumpTo && messages.length < messagesTotal && (
                        <div className="flex justify-center pb-1">
                          <button
                            type="button"
                            onClick={() => void handleLoadOlder()}
                            disabled={loadingOlder}
                            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-60 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                          >
                            {loadingOlder ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                            Load older messages
                          </button>
                        </div>
                      )}
                      {messageGroups.map((group) => (
                      <div key={group.label} className="space-y-2">
                        <div className="flex items-center gap-3 py-1">
                          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {group.label}
                          </span>
                          <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                        </div>
                        {group.messages.map((message) => {
                          const mine = message.senderId === me?.id;
                          return (
                            <div
                              key={message.id}
                              id={`message-${message.id}`}
                              className={`flex ${mine ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`${mine ? myBubble : theirBubble} ${
                                  highlightId === message.id
                                    ? "ring-2 ring-amber-400/80"
                                    : ""
                                }`}
                              >
                                {!mine && activeConversation.type === "group" && (
                                  <p className="mb-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                                    {message.sender?.name || "Unknown"}
                                  </p>
                                )}
                                {message.attachmentUrl &&
                                  (isImageMessage(message) ? (
                                    <a
                                      href={message.attachmentUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="mb-1 block overflow-hidden rounded-xl"
                                    >
                                      <img
                                        src={message.attachmentUrl}
                                        alt={message.attachmentName || "Attachment"}
                                        loading="lazy"
                                        className="max-h-60 w-full object-cover"
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      href={message.attachmentUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`mb-1 flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold transition-opacity hover:opacity-90 ${
                                        mine
                                          ? "bg-white/15 text-white"
                                          : "bg-white text-slate-700 dark:bg-white/10 dark:text-slate-200"
                                      }`}
                                    >
                                      <FileText className="h-4 w-4 shrink-0" />
                                      <span className="min-w-0 flex-1 truncate">
                                        {message.attachmentName || "Attachment"}
                                      </span>
                                      <span
                                        className={`shrink-0 text-[10px] ${
                                          mine
                                            ? "text-blue-100/80"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        {formatFileSize(message.attachmentSize)}
                                      </span>
                                    </a>
                                  ))}
                                {message.content && (
                                  <p className="whitespace-pre-wrap">{message.content}</p>
                                )}
                                <div
                                  className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                                    mine
                                      ? "text-blue-100/80"
                                      : "text-slate-400 dark:text-slate-500"
                                  }`}
                                >
                                  {formatMessageTime(message.createdAt)}
                                  {mine &&
                                    (isMessageSeen(message) ? (
                                      <CheckCheck
                                        className="h-3 w-3 text-sky-100"
                                        aria-label="Seen"
                                      />
                                    ) : (
                                      <Check
                                        className="h-3 w-3 opacity-70"
                                        aria-label="Sent"
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      ))}
                    </>
                  )}
                  <div ref={endRef} />
                </div>

                <div className="border-t border-slate-200/80 bg-white/80 p-2.5 dark:border-[#263653] dark:bg-[#101A32]/50 md:p-3">
                  {composerError && (
                    <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {composerError}
                    </p>
                  )}
                  <div className="flex items-end gap-2 rounded-2xl border border-slate-200/80 bg-white px-2 py-1.5 transition-colors focus-within:border-blue-500/50 dark:border-[#263653] dark:bg-[#0B1428]">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(event) => void handleFilePicked(event)}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      title="Attach a file"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 dark:hover:bg-white/5 dark:hover:text-slate-200"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Paperclip className="h-4 w-4" />
                      )}
                    </button>
                    <textarea
                      value={draft}
                      onChange={(event) => {
                        handleDraftChange(event.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void handleSend();
                        }
                      }}
                      rows={1}
                      placeholder={`Message ${activeName.split(" ")[0]}…`}
                      className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-2 text-sm text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => void handleSend()}
                      disabled={!draft.trim() || sending}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Send message"
                    >
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 px-1 text-[10px] text-slate-400 dark:text-slate-500">
                    Enter to send · Shift + Enter for a new line
                  </p>
                </div>
              </>
            )}
          </section>
              </>
            ) : activeTab === "announcements" ? (
              <div className="min-h-0 flex-1">
                <AnnouncementsPanel refreshKey={announcementTick} />
              </div>
            ) : (
              <div className="min-h-0 flex-1">
                <TicketsPanel refreshKey={ticketTick} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={pickerOpen}
        onClose={() => {
          if (!creating) setPickerOpen(false);
        }}
        title="New conversation"
        size="sm"
        fullScreenOnMobile
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              disabled={creating}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-[#263653] dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleCreateConversation()}
              disabled={selectedIds.length === 0 || creating}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {creating ? "Starting…" : "Create"}
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select one person for a direct message, or several to start a group.
          </p>

          {selectedIds.length > 1 && (
            <input
              value={groupTitle}
              onChange={(event) => setGroupTitle(event.target.value)}
              placeholder="Group name (optional)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500/50 dark:border-[#263653] dark:bg-white/5 dark:text-white"
            />
          )}

          {createError && (
            <p className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {createError}
            </p>
          )}

          <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
            {directoryLoading ? (
              <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-xs font-medium">Loading team…</p>
              </div>
            ) : directoryError ? (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                {directoryError}
              </p>
            ) : directory.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">
                No other admins are registered yet.
              </p>
            ) : (
              directory.map((person) => {
                const selected = selectedIds.includes(person.id);
                return (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => toggleSelected(person.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      selected
                        ? "border-blue-500/50 bg-blue-50 dark:bg-blue-500/10"
                        : "border-slate-200 hover:bg-slate-50 dark:border-[#263653] dark:hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradientFor(
                        person.id,
                      )} text-[11px] font-bold text-white`}
                    >
                      {initials(person.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ROLE_LABEL[person.role] || person.role}
                      </p>
                    </div>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selected && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Communication;
