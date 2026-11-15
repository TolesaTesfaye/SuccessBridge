import { useRef, useEffect, useState, type ReactNode } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Testimonials } from "@components/common/Testimonials";
import { ResourceCard } from "@components/resources/ResourceCard";

type Grade = "grade_9" | "grade_10" | "grade_11" | "grade_12";
type Stream = "natural" | "social" | null;

interface HighSchoolOverviewProps {
  user: any;
  activeGrade: Grade;
  selectedStream: Stream;
  homeLoading: boolean;
  homeResources: any[];
  setActiveTab: (tab: "home" | "learning" | "hub") => void;
}

// ── Animated Counter ──────────────────────────────────────────────
const AnimatedCounter = ({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ── Section label ─────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 mb-3 md:mb-4">
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
      {children}
    </span>
    <span className="h-px flex-1 bg-slate-200 dark:bg-white/[0.08]" />
  </div>
);

// ── Main Component ────────────────────────────────────────────────
export const HighSchoolOverview: React.FC<HighSchoolOverviewProps> = ({
  user,
  activeGrade,
  selectedStream,
  homeLoading,
  homeResources,
  setActiveTab,
}) => {
  const firstName = user?.name?.split(" ")[0] || "Scholar";
  const videoCount = homeResources.filter(
    (r: any) => r?.type === "Video",
  ).length;
  const subjectCount = new Set(
    homeResources.map((r: any) => r?.subject).filter(Boolean),
  ).size;

  const gradeLabel = activeGrade.replace("grade_", "Grade ").toUpperCase();

  const quickActions = [
    {
      eyebrow: "Learn",
      title: "Smart Learning Center",
      description:
        "Chapter-by-chapter lessons with guided notes, worked examples and interactive practice.",
      action: () => setActiveTab("learning"),
    },
    {
      eyebrow: "Explore",
      title: "Complete Resource Hub",
      description:
        "Past EUEE exams, textbooks, worksheets and study guides, organised by subject.",
      action: () => setActiveTab("hub"),
    },
    {
      eyebrow: "Prepare",
      title: "Exam Prep Zone",
      description:
        "Timed practice, performance analytics and weak-spot detection before exam day.",
      action: () => setActiveTab("hub"),
    },
  ];

  const overviewStats: { label: string; value: string | number }[] = [
    { label: "Grade", value: gradeLabel },
    { label: "Materials", value: homeResources.length },
    { label: "Subjects", value: subjectCount },
    { label: "Videos", value: videoCount },
  ];

  const tips = [
    "Review your notes within 24 hours to boost retention by 60%.",
    "Practice with past EUEE exams to build exam-day confidence.",
    "Form study groups — teaching others reinforces your understanding.",
  ];

  const weeklyProgress = [
    { label: "Topics completed", value: "5 / 7", width: "71%", tone: "bg-emerald-500 dark:bg-emerald-400" },
    { label: "Study hours", value: "12.5 / 15 hrs", width: "83%", tone: "bg-indigo-500 dark:bg-indigo-400" },
    { label: "Quiz score average", value: "85%", width: "85%", tone: "bg-violet-500 dark:bg-violet-400" },
  ];

  const weeklyCounts = [
    { label: "Resources", value: "12" },
    { label: "Quizzes", value: "8" },
    { label: "Streak", value: "4" },
  ];

  return (
    <div className="relative isolate space-y-6 md:space-y-9 pb-6 md:pb-10 selection:bg-indigo-500/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.10),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_65%)]" />
      {/* ═══════════════════════════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-none mx-0 md:mx-2 lg:mx-3 bg-white text-slate-900 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80 dark:bg-[#070C18] dark:text-white dark:shadow-2xl dark:shadow-black/20 dark:ring-white/10">
        {/* Layered gradient base */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,#ECFDF5_0%,#FFFFFF_46%,#F0FDFA_100%)] dark:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(118deg,#0C1A38_0%,#0A1226_42%,#070C18_100%)] dark:block" />
        <div className="pointer-events-none absolute -top-32 right-[-8%] h-[24rem] w-[24rem] rounded-full bg-emerald-300/40 blur-[120px] dark:bg-emerald-500/20" />
        <div className="pointer-events-none absolute -bottom-44 left-[12%] h-[22rem] w-[22rem] rounded-full bg-teal-200/50 blur-[120px] dark:bg-teal-500/15" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-[16rem] w-[32rem] -translate-y-1/2 rounded-full bg-emerald-200/40 blur-[120px] dark:bg-emerald-400/10" />

        {/* Fine dot grid, fading from the right */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(5,150,105,0.22) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at 78% 30%, black 0%, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 78% 30%, black 0%, transparent 68%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-50 dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at 78% 30%, black 0%, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 78% 30%, black 0%, transparent 68%)",
          }}
        />

        {/* Edge lights */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent dark:via-emerald-400/50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent dark:via-white/25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent dark:via-emerald-400/30" />

        <div className="relative z-10 p-5 md:p-10 lg:p-12 xl:p-14">
          <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] dark:bg-emerald-400 dark:shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                {selectedStream
                  ? `${gradeLabel} · ${selectedStream.toUpperCase()} STREAM`
                  : `${gradeLabel} · HIGH SCHOOL`}
              </span>

              <h1 className="mt-4 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-200 dark:via-teal-200 dark:to-emerald-300">
                  {firstName}
                </span>
              </h1>

              <p className="mt-3 md:mt-4 max-w-xl text-sm md:text-base text-slate-600 leading-relaxed dark:text-slate-400">
                Your workspace is ready — curated materials, structured lessons
                and a clear view of your progress this week.
              </p>

              <div className="mt-6 md:mt-8 flex flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setActiveTab("learning")}
                  className="group inline-flex flex-1 md:flex-none items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 md:px-6 py-2.5 md:py-3 text-[11px] md:text-sm font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-[0_14px_34px_-16px_rgba(5,150,105,0.75)] active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]"
                >
                  Start learning
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => setActiveTab("hub")}
                  className="inline-flex flex-1 md:flex-none items-center justify-center rounded-xl border border-slate-200 bg-white px-4 md:px-6 py-2.5 md:py-3 text-[11px] md:text-sm font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-white/25 dark:hover:bg-white/[0.07]"
                >
                  Browse resources
                </button>
              </div>
            </div>

            {/* Graphic — student success curve */}
            <div className="relative mt-8 flex w-full flex-col items-center justify-center lg:mt-0">
              <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-emerald-300/30 blur-[90px] sm:h-64 sm:w-64 dark:bg-emerald-500/20" />
              <div className="relative w-full max-w-[520px]">
                <div className="mb-2 flex items-baseline justify-between px-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Success curve
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    Steady growth
                  </span>
                </div>

                <svg
                  viewBox="0 0 560 380"
                  fill="none"
                  className="relative w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="hero-line-green"
                      x1="40"
                      y1="330"
                      x2="520"
                      y2="70"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#10b981" stopOpacity="0.55" />
                      <stop offset="0.5" stopColor="#10b981" />
                      <stop offset="1" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient
                      id="hero-area-green"
                      x1="280"
                      y1="90"
                      x2="280"
                      y2="380"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#10b981" stopOpacity="0.30" />
                      <stop offset="1" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="hero-glow-green" cx="0.5" cy="0.5" r="0.5">
                      <stop stopColor="#a7f3d0" stopOpacity="0.9" />
                      <stop offset="1" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Performance grid */}
                  {[130, 200, 270].map((y) => (
                    <line
                      key={y}
                      x1="30"
                      y1={y}
                      x2="528"
                      y2={y}
                      strokeDasharray="3 8"
                      className="stroke-slate-400/30 dark:stroke-white/[0.06]"
                    />
                  ))}

                  {/* Timeline baseline */}
                  <line
                    x1="30"
                    y1="332"
                    x2="528"
                    y2="332"
                    className="stroke-slate-300 dark:stroke-white/10"
                  />

                  {/* Progress area */}
                  <path
                    d="M30 332 C 120 318, 168 296, 226 276 S 330 216, 388 172 S 480 116, 528 66 L528 380 L30 380 Z"
                    fill="url(#hero-area-green)"
                  />
                  <path
                    d="M30 332 C 120 318, 168 296, 226 276 S 330 216, 388 172 S 480 116, 528 66"
                    stroke="url(#hero-line-green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Guides to the timeline */}
                  <line x1="226" y1="276" x2="226" y2="332" strokeDasharray="3 6" className="stroke-emerald-700/20 dark:stroke-emerald-300/20" />
                  <line x1="388" y1="172" x2="388" y2="332" strokeDasharray="3 6" className="stroke-emerald-700/20 dark:stroke-emerald-300/20" />
                  <line x1="528" y1="66" x2="528" y2="332" strokeDasharray="3 6" className="stroke-emerald-700/25 dark:stroke-emerald-300/25" />

                  {/* Milestones */}
                  <circle cx="30" cy="332" r="6" className="fill-white stroke-emerald-500 dark:fill-[#070C18] dark:stroke-emerald-300" />
                  <circle cx="226" cy="276" r="6" className="fill-white stroke-emerald-500 dark:fill-[#070C18] dark:stroke-emerald-300" />
                  <circle cx="388" cy="172" r="6" className="fill-white stroke-emerald-500 dark:fill-[#070C18] dark:stroke-emerald-300" />
                  <circle cx="528" cy="66" r="16" fill="url(#hero-glow-green)" className="animate-pulse" />
                  <circle cx="528" cy="66" r="6" className="fill-emerald-600 dark:fill-emerald-50" />

                  {/* Milestone labels */}
                  <text x="226" y="296" textAnchor="middle" className="fill-slate-500 text-[16px] font-semibold sm:text-[10px] dark:fill-slate-400">
                    Practice
                  </text>
                  <text x="388" y="192" textAnchor="middle" className="fill-slate-500 text-[16px] font-semibold sm:text-[10px] dark:fill-slate-400">
                    Consistency
                  </text>
                  <text x="528" y="40" textAnchor="end" className="fill-slate-500 text-[16px] font-semibold sm:text-[10px] dark:fill-slate-400">
                    Exam ready
                  </text>

                  {/* Timeline labels */}
                  <text x="30" y="360" textAnchor="start" className="fill-slate-400 text-[13px] font-medium uppercase tracking-[0.12em] sm:text-[9px] dark:fill-slate-500">
                    Start
                  </text>
                  <text x="226" y="360" textAnchor="middle" className="fill-slate-400 text-[13px] font-medium uppercase tracking-[0.12em] sm:text-[9px] dark:fill-slate-500">
                    Week 4
                  </text>
                  <text x="388" y="360" textAnchor="middle" className="fill-slate-400 text-[13px] font-medium uppercase tracking-[0.12em] sm:text-[9px] dark:fill-slate-500">
                    Week 6
                  </text>
                  <text x="528" y="360" textAnchor="end" className="fill-slate-400 text-[13px] font-medium uppercase tracking-[0.12em] sm:text-[9px] dark:fill-slate-500">
                    Week 8
                  </text>

                  {/* Sparsely placed stars */}
                  <circle cx="96" cy="96" r="1.6" className="fill-slate-500/40 dark:fill-white/[0.45]" />
                  <circle cx="452" cy="52" r="1.8" className="fill-slate-500/35 dark:fill-white/[0.35]" />
                  <circle cx="486" cy="300" r="1.4" className="fill-slate-500/30 dark:fill-white/[0.28]" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-8 md:mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200/80 pt-5 md:pt-6 sm:grid-cols-4 sm:divide-x sm:divide-slate-200 dark:border-white/10 dark:divide-white/10">
            {overviewStats.map((stat) => (
              <div key={stat.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {typeof stat.value === "number" ? (
                    <AnimatedCounter value={stat.value} />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WORKSPACE
         ═══════════════════════════════════════════════════════════════ */}
      <section className="px-2 md:px-4 lg:px-5">
        <SectionLabel>Workspace</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={action.action}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#0E1524] p-4 md:p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-white/[0.14] dark:hover:bg-[#121B2E] hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] dark:hover:shadow-[0_18px_40px_-24px_rgba(79,70,229,0.55)] active:translate-y-0"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                {action.eyebrow}
              </span>
              <h3 className="mt-2 text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                {action.title}
              </h3>
              <p className="mt-1.5 text-[11px] md:text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {action.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold text-slate-900 dark:text-white">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TRENDING MATERIALS
         ═══════════════════════════════════════════════════════════════ */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#0D1422] overflow-hidden">
          <div className="flex items-end justify-between gap-4 p-4 md:p-5 border-b border-slate-100 dark:border-white/[0.06]">
            <div>
              <h2 className="text-sm md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Trending materials
              </h2>
              <p className="mt-0.5 text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                Most popular resources this week
              </p>
            </div>
            <button
              onClick={() => setActiveTab("hub")}
              className="group inline-flex items-center gap-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              View all
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="p-3 md:p-5">
            {homeLoading ? (
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="min-w-[75vw] md:min-w-0 rounded-xl bg-slate-100 dark:bg-white/[0.04] animate-pulse overflow-hidden snap-center shrink-0"
                  >
                    <div className="h-28 md:h-40 bg-slate-200 dark:bg-white/[0.08]" />
                    <div className="p-3 md:p-4 space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-white/[0.08] rounded w-3/4" />
                      <div className="h-2 bg-slate-200 dark:bg-white/[0.08] rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : homeResources.length === 0 ? (
              <div className="text-center py-10 md:py-14 rounded-xl border border-dashed border-slate-200 dark:border-white/[0.08]">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-slate-500 text-xs md:text-sm font-medium">
                  No resources uploaded yet
                </p>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1">
                  New content will appear here once available
                </p>
              </div>
            ) : (
              <>
                {/* Mobile carousel */}
                <div className="flex md:hidden gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                  {homeResources
                    .slice(0, 3)
                    .map((resource: any) => (
                      <div
                        key={resource.id}
                        className="min-w-[75vw] snap-center shrink-0"
                      >
                        <ResourceCard resource={resource} />
                      </div>
                    ))}
                  <button
                    onClick={() => setActiveTab("hub")}
                    className="min-w-[60vw] snap-center shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-white/[0.1] p-4 text-slate-600 dark:text-slate-300 transition-colors active:scale-95"
                  >
                    <span className="text-xs font-semibold">
                      Browse all materials
                    </span>
                    <span className="text-[10px] text-slate-400">
                      See everything in the Resource Hub
                    </span>
                  </button>
                </div>
                {/* Desktop grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {homeResources
                    .slice(0, 3)
                    .map((resource: any) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THIS WEEK
         ═══════════════════════════════════════════════════════════════ */}
      <section className="px-2 md:px-4 lg:px-5">
        <SectionLabel>This week</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {/* Insights */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#0E1524] p-4 md:p-6">
            <h3 className="text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Study insights
            </h3>
            <p className="mt-0.5 text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
              Small habits that compound
            </p>

            <ol className="mt-4 md:mt-5 divide-y divide-slate-100 dark:divide-white/[0.06]">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-3 md:gap-4 py-3 md:py-3.5 first:pt-0 last:pb-0"
                >
                  <span className="pt-0.5 text-[11px] font-semibold tabular-nums text-slate-300 dark:text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Weekly progress */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#0E1524] p-4 md:p-6">
            <h3 className="text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Weekly progress
            </h3>
            <p className="mt-0.5 text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
              Your learning momentum
            </p>

            <div className="mt-5 space-y-4">
              {weeklyProgress.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="text-[11px] md:text-xs font-semibold tabular-nums text-slate-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.tone} transition-all duration-1000`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] grid grid-cols-3">
              {weeklyCounts.map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center ${i > 0 ? "border-l border-slate-100 dark:border-white/[0.06]" : ""}`}
                >
                  <div className="text-base md:text-lg font-semibold tabular-nums text-slate-900 dark:text-white">
                    {item.value}
                  </div>
                  <div className="mt-0.5 text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
         ═══════════════════════════════════════════════════════════════ */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white/60 dark:bg-[#0B1220]/70 p-3 md:p-5 lg:p-6 overflow-hidden">
          <Testimonials />
        </div>
      </section>
    </div>
  );
};

export default HighSchoolOverview;
