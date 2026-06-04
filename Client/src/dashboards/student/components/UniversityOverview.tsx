import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BookMarked,
  Brain,
  CalendarClock,
  Globe2,
  GraduationCap,
  Play,
  Sparkles,
  TrendingUp,
  Trophy,
  Zap,
  Target,
  Clock,
  Award,
  Flame,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Lightbulb,
  Rocket,
  School,
  Medal,
  Library,
  Users,
  Star,
  Network,
  CodeXml,
  FlaskConical,
  Infinity,
} from "lucide-react";
import { Testimonials } from "@components/common/Testimonials";
import { ResourceCard } from "@components/resources/ResourceCard";

interface UniversityOverviewProps {
  user: any;
  activeCategory: string;
  homeLoading: boolean;
  homeResources: any[];
  setActiveTab: (tab: "home" | "learning" | "hub") => void;
  handleLearningCenterClick: () => void;
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

// ── Floating Particles ────────────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 6,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20 animate-float-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// ── Circular Progress ─────────────────────────────────────────────
const CircularProgress = ({
  value,
  max,
  size = 56,
  strokeWidth = 4,
  color = "stroke-emerald-400",
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? value / max : 0;
  const offset = circumference * (1 - percentage);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="stroke-white/10 fill-none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={`fill-none ${color} transition-all duration-1000`}
        style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.3))" }}
      />
    </svg>
  );
};

// ── Glass Card ────────────────────────────────────────────────────
const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${className}`}
  >
    {children}
  </div>
);

// ── Category Badge Config ─────────────────────────────────────────
const categoryConfig: Record<
  string,
  { label: string; icon: React.ElementType; gradient: string }
> = {
  remedial: {
    label: "Remedial Program",
    icon: School,
    gradient: "from-cyan-500 to-blue-600",
  },
  freshman: {
    label: "Freshman Year",
    icon: BookMarked,
    gradient: "from-violet-600 to-purple-700",
  },
  senior: {
    label: "Senior Years",
    icon: CodeXml,
    gradient: "from-emerald-500 to-teal-600",
  },
  gc: {
    label: "Graduate Courses",
    icon: Award,
    gradient: "from-amber-500 to-orange-600",
  },
};

// ── Main Component ────────────────────────────────────────────────
export const UniversityOverview: React.FC<UniversityOverviewProps> = ({
  user,
  activeCategory,
  homeLoading,
  homeResources,
  setActiveTab,
  handleLearningCenterClick,
}) => {
  const firstName = user?.name?.split(" ")[0] || "Scholar";
  const videoCount = homeResources.filter(
    (r: any) => r?.type === "Video",
  ).length;
  const subjectCount = new Set(
    homeResources.map((r: any) => r?.subject).filter(Boolean),
  ).size;

  const catKey = activeCategory as keyof typeof categoryConfig;
  const categoryInfo = categoryConfig[catKey] || {
    label: activeCategory.toUpperCase(),
    icon: School,
    gradient: "from-blue-500 to-indigo-600",
  };

  // ── Quick actions ────────────────────────────────────────────────
  const quickActions = [
    {
      icon: Brain,
      label: "🎯 Smart Learning Center",
      sublabel:
        "AI-powered lessons · semester-aligned modules · video tutorials · interactive exercises",
      action: handleLearningCenterClick,
      gradient: "from-indigo-600 to-blue-600",
    },
    {
      icon: Library,
      label: "📚 Complete Resource Hub",
      sublabel:
        "500+ materials · past exam papers · textbooks · lecture notes · research papers & more",
      action: () => setActiveTab("hub"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Target,
      label: "🏆 Assignment & Exam Prep",
      sublabel:
        "Quiz practice · assignment guides · performance tracking · weak-area analysis",
      action: handleLearningCenterClick,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  // ── Stats data ───────────────────────────────────────────────────
  const overviewStats = [
    { icon: GraduationCap, label: "Level", value: categoryInfo.label },
    { icon: BookOpen, label: "Materials", value: homeResources.length },
    { icon: Globe2, label: "Subjects", value: subjectCount },
    { icon: Play, label: "Videos", value: videoCount },
  ];

  // ── Achievements ─────────────────────────────────────────────────
  const achievements = [
    {
      icon: Flame,
      label: "Study Streak",
      value: "12",
      unit: "Days",
      progress: 12,
      max: 14,
      color: "stroke-orange-400",
      accent: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      icon: Target,
      label: "Weekly Goal",
      value: "6",
      unit: "/ 8 Topics",
      progress: 6,
      max: 8,
      color: "stroke-blue-400",
      accent: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      icon: Medal,
      label: "Class Rank",
      value: "Top 10%",
      unit: "Excellent",
      progress: 90,
      max: 100,
      color: "stroke-amber-400",
      accent: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  // ── Daily tips ───────────────────────────────────────────────────
  const tips = [
    {
      icon: Lightbulb,
      text: "Review freshman courses alongside your major for better concept integration",
      gradient: "from-yellow-500/20 to-amber-500/5",
    },
    {
      icon: Rocket,
      text: "Use past exam papers to familiarize with university-style assessments",
      gradient: "from-blue-500/20 to-indigo-500/5",
    },
    {
      icon: Users,
      text: "Collaborate with peers — group discussions deepen your understanding",
      gradient: "from-emerald-500/20 to-teal-500/5",
    },
  ];

  // ── Resource helpers (kept for backward compat) ──────────────────
  const getSubjectText = (resource: any) => {
    const rawSubject = resource?.subject;
    if (typeof rawSubject === "string") return rawSubject;
    if (Array.isArray(rawSubject))
      return rawSubject.filter((item) => typeof item === "string").join(" ");
    if (rawSubject && typeof rawSubject === "object")
      return Object.values(rawSubject)
        .filter((item) => typeof item === "string")
        .join(" ");
    return "";
  };

  const getThumbnail = (resource: any) => {
    const subject = getSubjectText(resource).toLowerCase();
    if (subject.includes("math"))
      return "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700&h=400&fit=crop";
    if (subject.includes("physics") || subject.includes("chem"))
      return "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&h=400&fit=crop";
    if (resource?.type === "Video")
      return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=400&fit=crop";
    return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&h=400&fit=crop";
  };

  return (
    <div className="space-y-5 md:space-y-8 pb-6 md:pb-10 selection:bg-violet-500/30">
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          50% { transform: translateY(-60px) translateX(30px); opacity: 0.15; }
          90% { opacity: 0.1; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* SECTION 1 — PREMIUM HERO */}
      <section className="relative overflow-hidden rounded-none md:rounded-3xl mx-0 md:mx-2 lg:mx-3 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e1b4b] text-white shadow-2xl">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/15 to-cyan-500/15 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-indigo-500/10 blur-[80px]" />
        <FloatingParticles />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 p-5 md:p-10 lg:p-14">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-violet-200 mb-4 md:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {categoryInfo.label}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
            <div className="lg:col-span-3 space-y-4 md:space-y-5">
              <div className="animate-slide-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]">
                  Welcome back,
                  <span className="block bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mt-1">
                    {firstName}
                  </span>
                </h1>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-violet-100/80 max-w-xl leading-relaxed animate-slide-up animate-delay-100">
                Your university dashboard is ready. Access course materials,
                track your semester progress, and stay ahead in your academic
                journey.
              </p>
              <div className="flex flex-row gap-2 md:gap-3 animate-slide-up animate-delay-200 pt-1">
                <button
                  onClick={handleLearningCenterClick}
                  className="flex-1 md:flex-none group relative px-3 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl font-bold text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">
                    <Rocket className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Continue Learning</span>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => setActiveTab("hub")}
                  className="flex-1 md:flex-none px-3 md:px-6 py-2.5 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl font-bold text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-1 md:gap-2"
                >
                  <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Browse Resources</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 animate-slide-up animate-delay-300">
              {overviewStats.map((stat, i) => (
                <GlassCard
                  key={i}
                  className="p-3 md:p-4 hover:bg-white/[0.14] transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="w-5 h-5 md:w-6 md:h-6 text-violet-200 group-hover:scale-110 transition-transform">
                      <stat.icon className="w-full h-full" />
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-violet-200/60 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-black text-white">
                    {typeof stat.value === "number" ? (
                      <AnimatedCounter value={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK ACTIONS — Subtle Card Style */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {quickActions.map((action, i) => {
            const iconColors = [
              "from-indigo-500 to-blue-500",
              "from-emerald-500 to-teal-500",
              "from-amber-500 to-orange-500",
            ];
            return (
              <button
                key={i}
                onClick={action.action}
                className="group relative rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/60 p-4 md:p-5 text-left transition-all duration-300 active:scale-[0.97] hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:border-slate-300 dark:hover:border-slate-600"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${iconColors[i]} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-0.5 md:mb-1">
                      {action.label}
                    </h3>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {action.sublabel}
                    </p>
                  </div>
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-1 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — TRENDING MATERIALS */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-700/50 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">
                  Trending Materials
                </h2>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                  Most popular resources this week
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("hub")}
              className="group flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-all active:scale-95"
            >
              View All
              <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="p-3 md:p-5">
            {homeLoading ? (
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="min-w-[75vw] md:min-w-0 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse overflow-hidden snap-center shrink-0"
                  >
                    <div className="h-28 md:h-40 bg-slate-200 dark:bg-slate-700" />
                    <div className="p-3 md:p-4 space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : homeResources.length === 0 ? (
              <div className="text-center py-10 md:py-14 bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-800/30 dark:to-slate-800/10 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
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
                <div className="flex md:hidden gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                  {homeResources
                    .slice(0, 3)
                    .map((resource: any, idx: number) => (
                      <div
                        key={resource.id}
                        className="min-w-[75vw] snap-center shrink-0 animate-scale-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <ResourceCard resource={resource} />
                      </div>
                    ))}
                  <button
                    onClick={() => setActiveTab("hub")}
                    className="min-w-[60vw] snap-center shrink-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-dashed border-violet-200 dark:border-violet-800 p-4 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                      Browse All Materials
                    </span>
                    <span className="text-[9px] text-violet-400 dark:text-violet-300">
                      See everything in Resource Hub
                    </span>
                  </button>
                </div>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {homeResources
                    .slice(0, 3)
                    .map((resource: any, idx: number) => (
                      <div
                        key={resource.id}
                        className="animate-scale-in group"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <ResourceCard resource={resource} />
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4 — ACHIEVEMENTS */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl p-4 md:p-5 bg-white dark:bg-slate-900/60 border ${ach.border} hover:shadow-lg transition-all duration-300 group animate-slide-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${ach.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <ach.icon
                      className={`w-4 h-4 md:w-5 md:h-5 ${ach.accent}`}
                    />
                  </div>
                  <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {ach.label}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                      {ach.value}
                    </span>
                    <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                      {ach.unit}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 relative">
                  <CircularProgress
                    value={ach.progress}
                    max={ach.max}
                    size={56}
                    strokeWidth={4}
                    color={ach.color}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-[10px] font-bold ${ach.accent}`}>
                      {Math.round((ach.progress / ach.max) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — DAILY INSIGHTS & STUDY TIPS */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50/80 via-purple-50/50 to-slate-50 dark:from-violet-900/10 dark:via-purple-900/5 dark:to-slate-900/60 border border-violet-100/60 dark:border-violet-800/30 p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                  Daily Study Insights
                </h3>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                  Tips to maximize your learning
                </p>
              </div>
            </div>
            <div className="space-y-2.5 md:space-y-3">
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 md:p-3.5 rounded-xl bg-gradient-to-r ${tip.gradient} border border-white/50 dark:border-white/5 backdrop-blur-sm hover:scale-[1.01] transition-transform`}
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/80 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <tip.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 p-4 md:p-5 lg:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                  Semester Progress
                </h3>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                  Your academic momentum
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Courses Completed
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    4 / 6
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: "67%" }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Study Hours
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    18.5 / 25 hrs
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: "74%" }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Assignment Avg.
                  </span>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                    88%
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: "88%" }}
                  >
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center">
                  <div className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                    6
                  </div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Courses
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                    24
                  </div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Resources
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                    12
                  </div>
                  <div className="text-[9px] md:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Quizzes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      <section className="px-2 md:px-4 lg:px-5">
        <div className="rounded-2xl bg-gradient-to-br from-slate-50/80 to-violet-50/30 dark:from-slate-900/40 dark:to-slate-900/20 border border-slate-200/60 dark:border-slate-800/50 p-3 md:p-5 lg:p-6 overflow-hidden">
          <Testimonials />
        </div>
      </section>
    </div>
  );
};

export default UniversityOverview;
