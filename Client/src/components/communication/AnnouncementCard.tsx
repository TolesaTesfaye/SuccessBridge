import {
  AlertTriangle,
  CheckCircle2,
  GraduationCap,
  Info,
  Loader2,
  Pencil,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { formatDistanceToNow } from "@utils/dateUtils";

export const TYPE_STYLES: Record<string, string> = {
  info: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  update: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

const TYPE_META: Record<
  string,
  {
    label: string;
    Icon: typeof Info;
    tile: string;
    accent: string;
  }
> = {
  info: {
    label: "Info",
    Icon: Info,
    tile: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
    accent: "from-blue-500 to-indigo-500",
  },
  warning: {
    label: "Warning",
    Icon: AlertTriangle,
    tile: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
    accent: "from-amber-400 to-orange-500",
  },
  success: {
    label: "Success",
    Icon: CheckCircle2,
    tile: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    accent: "from-emerald-400 to-teal-500",
  },
  update: {
    label: "Update",
    Icon: Sparkles,
    tile: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
    accent: "from-violet-500 to-fuchsia-500",
  },
};

const typeMeta = (type: string) => TYPE_META[type] || TYPE_META.info;

export const ROLE_OPTIONS = [
  { value: "student", label: "Students" },
  { value: "admin", label: "Admins" },
  { value: "super_admin", label: "Super admins" },
];

export const LEVEL_OPTIONS = [
  { value: "grade_9", label: "Grade 9" },
  { value: "grade_10", label: "Grade 10" },
  { value: "grade_11", label: "Grade 11" },
  { value: "grade_12", label: "Grade 12" },
  { value: "freshman", label: "Freshman" },
  { value: "remedial", label: "Remedial" },
];

const roleLabels = (roles: string[]) =>
  roles
    .map(
      (role) =>
        ROLE_OPTIONS.find((option) => option.value === role)?.label || role,
    )
    .join(" · ");

const levelLabels = (levels: string[]) =>
  levels
    .map(
      (level) =>
        LEVEL_OPTIONS.find((option) => option.value === level)?.label || level,
    )
    .join(" · ");

const initialsOf = (name?: string | null) => {
  const initials = (name || "SuccessBridge")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
  return initials || "SB";
};

export interface AnnouncementCardData {
  id: string;
  title: string;
  content: string;
  type: string;
  targetRoles?: string[] | null;
  targetEducationLevels?: string[] | null;
  targetPaymentStatus?: "paid" | "unpaid" | null;
  isActive: boolean;
  scheduledAt?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  creator?: { name: string } | null;
}

interface AnnouncementCardProps<T extends AnnouncementCardData> {
  announcement: T;
  deleting?: boolean;
  onEdit?: (announcement: T) => void;
  onDelete?: (announcement: T) => void;
}

export const AnnouncementCard = <T extends AnnouncementCardData>({
  announcement,
  deleting = false,
  onEdit,
  onDelete,
}: AnnouncementCardProps<T>) => {
  const meta = typeMeta(announcement.type);
  const isScheduled =
    Boolean(announcement.scheduledAt) &&
    new Date(announcement.scheduledAt as string).getTime() > Date.now();
  const isExpired =
    Boolean(announcement.expiresAt) &&
    new Date(announcement.expiresAt as string).getTime() <= Date.now();
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-[#263653] dark:bg-[#101A32]/70">
      <span
        className={`absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b ${meta.accent}`}
      />
      <div className="p-3 pl-4 md:p-4 md:pl-5">
        <div className="flex items-start gap-2.5 md:gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl md:h-9 md:w-9 ${meta.tile}`}
          >
            <meta.Icon
              className="h-4 w-4 md:h-[18px] md:w-[18px]"
              strokeWidth={2}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      TYPE_STYLES[announcement.type] || TYPE_STYLES.info
                    }`}
                  >
                    {meta.label}
                  </span>
                  {isScheduled && (
                    <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                      Scheduled
                    </span>
                  )}
                  {isExpired && (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/10 dark:text-slate-400">
                      Expired
                    </span>
                  )}
                  {!announcement.isActive && (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/10 dark:text-slate-400">
                      Inactive
                    </span>
                  )}
                  {announcement.targetRoles &&
                    announcement.targetRoles.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                        <Users className="h-2.5 w-2.5" />
                        {roleLabels(announcement.targetRoles)}
                      </span>
                    )}
                  {announcement.targetEducationLevels &&
                    announcement.targetEducationLevels.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-semibold text-indigo-700 dark:text-indigo-300">
                        <GraduationCap className="h-2.5 w-2.5" />
                        {levelLabels(announcement.targetEducationLevels)}
                      </span>
                    )}
                  {announcement.targetPaymentStatus && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        announcement.targetPaymentStatus === "paid"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {announcement.targetPaymentStatus === "paid"
                        ? "Paid students"
                        : "Unpaid students"}
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug tracking-tight text-slate-900 md:text-base dark:text-white">
                  {announcement.title}
                </h3>
              </div>
              {hasActions && (
                <div className="flex shrink-0 items-center gap-1">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(announcement)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label="Edit announcement"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(announcement)}
                      disabled={deleting}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-600 disabled:opacity-50 dark:hover:text-rose-400"
                      aria-label="Delete announcement"
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-slate-600 md:text-sm md:leading-relaxed dark:text-slate-300">
              {announcement.content}
            </p>
            <div className="mt-3 flex items-center gap-2.5 border-t border-slate-100 pt-3 dark:border-white/5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-[10px] font-bold text-white dark:from-blue-500 dark:to-indigo-600">
                {initialsOf(announcement.creator?.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  {announcement.creator?.name || "SuccessBridge"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {formatDistanceToNow(announcement.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AnnouncementCard;
