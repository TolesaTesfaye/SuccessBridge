import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  Play,
  CheckCircle2,
  Wand2,
  Zap,
  Search,
  Loader2,
  Bot,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@components/common/Button";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Textarea,
} from "@components/common";
import { cn } from "@/lib/utils";
import { type Quiz, type Question } from "@types";
import api from "@services/api";
import { useAuth } from "@hooks/useAuth";

type Difficulty = "Easy" | "Medium" | "Hard";

const diffStyle: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const ACCENT_GRADIENTS = [
  "from-violet-600 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-rose-500 to-red-600",
];

const SUBJECT_ICONS = ["📐", "🧬", "⚗️", "📚", "💻", "🌍", "🎨", "📊"];

export function getQuizDifficulty(quiz: Quiz): Difficulty {
  const n = quiz.questions?.length ?? 0;
  if (n > 10) return "Hard";
  if (n > 5) return "Medium";
  return "Easy";
}

export function getQuizCompletion(
  quiz: Quiz,
  userScores: Record<string, number>,
  completedQuizzes: string[],
): number {
  const score = userScores[quiz.id];
  if (score === undefined) return 0;
  if (completedQuizzes.includes(quiz.id) && score >= quiz.passingScore) {
    return 1;
  }
  return Math.min(1, score / 100);
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * 31) | 0;
  return Math.abs(h);
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 p-2.5 sm:p-4 lg:p-5"
    >
      <div
        className={cn(
          "absolute -right-6 sm:-right-8 -top-6 sm:-top-8 h-20 sm:h-28 w-20 sm:w-28 rounded-full blur-2xl opacity-40",
          accent,
        )}
      />
      <div className="relative flex flex-col items-start justify-between gap-2">
        <div>
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
            {label}
          </p>
          <p className="mt-1 sm:mt-2 text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground line-clamp-1">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-7 sm:h-9 lg:h-10 w-7 sm:w-9 lg:w-10 items-center justify-center rounded-lg sm:rounded-xl text-white",
            accent,
          )}
        >
          <Icon className="h-3.5 sm:h-4 lg:h-5 w-3.5 sm:w-4 lg:w-5" />
        </div>
      </div>
    </motion.div>
  );
}

function QuizCard({
  quiz,
  index,
  userScores,
  completedQuizzes,
  onStart,
}: {
  quiz: Quiz;
  index: number;
  userScores: Record<string, number>;
  completedQuizzes: string[];
  onStart: (quiz: Quiz) => void;
}) {
  const completion = getQuizCompletion(quiz, userScores, completedQuizzes);
  const started = completion > 0;
  const done = completion >= 1;
  const difficulty = getQuizDifficulty(quiz);
  const icon = SUBJECT_ICONS[hashString(quiz.title) % SUBJECT_ICONS.length];
  const accent = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];
  const subjectLabel =
    quiz.description?.split(" ")[0] || quiz.educationLevel.replace("_", " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      {/* Glow Background Effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-3xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50 -z-10",
          accent,
        )}
      />

      {/* Main Card Container */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-2xl transition-all duration-300 group-hover:border-border/60 group-hover:shadow-2xl group-hover:shadow-primary/20">
        {/* Header Section - Premium Gradient */}
        <div className={cn("relative h-12 sm:h-16 bg-gradient-to-br", accent)}>
          {/* Animated Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)",
            }}
          />

          {/* Subject Icon with Glassmorphism */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-2 top-2 sm:left-3 sm:top-3 flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/15 text-lg sm:text-xl backdrop-blur-md ring-1 ring-white/40 transition-all"
          >
            {icon}
          </motion.div>

          {/* Badge Container - Top Right */}
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex flex-col gap-1">
            {quiz.isAiGenerated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-white/20 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/30"
              >
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> AI
              </motion.div>
            )}
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-emerald-500/90 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white ring-1 ring-emerald-400/30"
              >
                <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Mastered
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between p-2 sm:p-2.5 lg:p-3">
          {/* Title & Description */}
          <div className="space-y-1 sm:space-y-1.5">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 truncate">
              {subjectLabel}
            </p>
            <h3 className="line-clamp-1 text-xs sm:text-sm font-bold leading-tight tracking-tight text-foreground lg:text-base">
              {quiz.title}
            </h3>
            <p className="line-clamp-1 text-[10px] sm:text-xs text-muted-foreground/80 lg:text-sm hidden sm:block">
              {quiz.description}
            </p>
          </div>

          {/* Metadata Row - Icons with Labels */}
          <div className="my-1 grid grid-cols-2 gap-0.5 sm:gap-1">
            <motion.div
              className={cn(
                "flex items-center gap-1 sm:gap-1.5 rounded-lg bg-border/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium transition-colors",
                diffStyle[difficulty],
              )}
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">{difficulty}</span>
              <span className="inline sm:hidden">{difficulty.slice(0, 1)}</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-border/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium text-muted-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {quiz.timeLimit}m
            </motion.div>

            <motion.div
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-border/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium text-muted-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {quiz.questions?.length ?? 0}Q
            </motion.div>

            <motion.div
              className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-border/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-xs font-medium text-muted-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {quiz.passingScore}%
            </motion.div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-0.5 px-2 sm:px-2.5 lg:px-3">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="font-medium text-muted-foreground min-w-fit">
              {done ? "✓ Done" : started ? "↻ Prog" : "○ New"}
            </span>
            <span className="font-semibold text-foreground text-right">
              {Math.round(completion * 100)}%
              {userScores[quiz.id] !== undefined && (
                <span className="text-muted-foreground/70 hidden sm:inline">
                  {" "}
                  · {userScores[quiz.id]}%
                </span>
              )}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1.5 overflow-hidden rounded-full bg-border/40"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                done
                  ? "from-emerald-500 to-teal-500"
                  : started
                    ? "from-amber-500 to-orange-500"
                    : "from-muted to-muted-foreground",
              )}
            />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 sm:gap-1.5 border-t border-border/30 p-1.5 sm:p-2 lg:p-2.5">
          {/* Primary CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(quiz)}
            className="flex-1 inline-flex items-center justify-center gap-0.5 sm:gap-1 rounded-lg sm:rounded-lg bg-gradient-to-r from-primary to-secondary px-1.5 sm:px-2 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:opacity-90 sm:text-xs"
          >
            <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>Start</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/40 p-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
        <BookOpen className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        No Assessments Available
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        New quizzes will appear here based on your academic profile.
      </p>
    </div>
  );
}

function AIStudio({
  onQuizGenerated,
}: {
  onQuizGenerated: (quiz: Quiz) => void;
}) {
  const [subject, setSubject] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [count, setCount] = useState([10]);
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("mcq");
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const stages = [
    "Analyzing curriculum…",
    "Selecting question patterns…",
    "Generating questions…",
    "Calibrating difficulty…",
  ];

  const generate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic for your practice quiz.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      for (let i = 0; i < stages.length - 1; i++) {
        setStep(i);
        await new Promise((r) => setTimeout(r, 500));
      }
      setStep(stages.length - 1);

      const response = await api.post("/ai/quiz", {
        topic: objective ? `${topic} — ${objective}` : topic,
        subjectName: subject,
        difficulty: difficulty.toLowerCase(),
        questionCount: count[0],
      });

      if (!response.data.success) {
        throw new Error("Failed to generate quiz");
      }

      const questions: Question[] = response.data.data;
      const mockQuiz: Quiz = {
        id: `ai-quiz-${Date.now()}`,
        title: `AI Practice: ${topic}`,
        description: `Personalized ${subject} quiz · ${type} format`,
        subjectId: "ai-generated",
        educationLevel: "high_school",
        timeLimit: Math.max(15, count[0] * 2),
        passingScore: 60,
        questions,
        isAiGenerated: true,
        createdAt: new Date().toISOString(),
      };

      onQuizGenerated(mockQuiz);
      setTopic("");
      setObjective("");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data
              ?.error
          : undefined;
      setError(message || "Could not generate quiz. Please try again.");
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ai-border relative overflow-hidden rounded-3xl bg-card/80 p-6 backdrop-blur-xl md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 300px at 80% -10%, color-mix(in oklab, var(--color-secondary) 25%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
            <Wand2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              <span className="text-gradient-ai">AI Practice Studio</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Generate personalized quizzes tailored to your learning goals.
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Subject
            </label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Mathematics",
                  "Biology",
                  "Physics",
                  "Literature",
                  "Computer Science",
                  "Chemistry",
                  "Economics",
                  "Art History",
                ].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Difficulty
            </label>
            <Select
              value={difficulty}
              onValueChange={(v) => setDifficulty(v as Difficulty)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">
                Number of questions
              </label>
              <span className="text-sm font-semibold text-foreground">
                {count[0]}
              </span>
            </div>
            <Slider
              value={count}
              onValueChange={setCount}
              min={5}
              max={30}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Question type
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple choice</SelectItem>
                <SelectItem value="short">Short answer</SelectItem>
                <SelectItem value="essay">Essay</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Topic
            </label>
            <Input
              placeholder="e.g. Derivatives & chain rule"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">
              Learning objective
            </label>
            <Textarea
              placeholder="What should you be able to do after this practice?"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            <Bot className="mr-1 inline h-3.5 w-3.5" /> Personalized to your
            recent attempts and weak areas.
          </p>
          <Button
            onClick={generate}
            disabled={loading}
            size="lg"
            className="relative gap-2 overflow-hidden bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] text-primary-foreground shadow-lg hover:opacity-95"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {loading ? "Generating…" : "Create Personalized Quiz"}
          </Button>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-5"
            >
              <div className="space-y-2">
                {stages.map((s, i) => (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    {i < step ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : i === step ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-border" />
                    )}
                    <span
                      className={cn(
                        i <= step ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 overflow-hidden rounded-xl bg-muted"
                  >
                    <div className="shimmer h-full w-full" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export interface StudentQuizDiscoveryProps {
  userName: string;
  officialQuizzes: Quiz[];
  aiQuizzes: Quiz[];
  userScores: Record<string, number>;
  completedQuizzes: string[];
  onStartQuiz: (quiz: Quiz) => void;
}

export const StudentQuizDiscovery: React.FC<StudentQuizDiscoveryProps> = ({
  userName,
  officialQuizzes,
  aiQuizzes,
  userScores,
  completedQuizzes,
  onStartQuiz,
}) => {
  const [query, setQuery] = useState("");
  const [localAiQuizzes, setLocalAiQuizzes] = useState<Quiz[]>([]);
  const { user } = useAuth();
  // Only super_admin can generate AI quizzes (limited credits)
  const canGenerateAiQuiz = user?.role === "super_admin";

  const allAiQuizzes = useMemo(
    () => [...localAiQuizzes, ...aiQuizzes.filter((q) => q.isAiGenerated)],
    [localAiQuizzes, aiQuizzes],
  );

  const filteredOfficial = useMemo(
    () =>
      officialQuizzes
        .filter((q) => !q.isAiGenerated || q.isAiGenerated === undefined)
        .filter(
          (q) =>
            q.title.toLowerCase().includes(query.toLowerCase()) ||
            q.description?.toLowerCase().includes(query.toLowerCase()),
        ),
    [officialQuizzes, query],
  );

  const stats = useMemo(() => {
    const scores = Object.values(userScores);
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    const passed = completedQuizzes.filter(
      (id) =>
        (userScores[id] ?? 0) >=
        (officialQuizzes.find((q) => q.id === id)?.passingScore ?? 60),
    ).length;
    const mastery =
      officialQuizzes.length > 0
        ? Math.round((passed / officialQuizzes.length) * 100)
        : 0;
    return {
      completed: completedQuizzes.length,
      average: avg,
      mastery,
    };
  }, [userScores, completedQuizzes, officialQuizzes]);

  const handleAiGenerated = (quiz: Quiz) => {
    setLocalAiQuizzes((prev) => [quiz, ...prev]);
  };

  const firstName = userName.split(" ")[0] || "Scholar";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-8">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-secondary p-6 shadow-xl shadow-primary/20 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Quiz Hub
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back, {firstName}{" "}
            <span className="inline-block" aria-hidden>
              👋
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
            Official assessments and AI practice — all in one place. Pick a quiz
            below or generate a custom set.
          </p>
        </motion.div>
      </section>

      <section>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <StatCard
            icon={Flame}
            label="Practice streak"
            value={
              stats.completed > 0 ? `${stats.completed} quizzes` : "Start today"
            }
            accent="bg-gradient-to-br from-orange-500 to-rose-500"
          />
          <StatCard
            icon={Trophy}
            label="Quizzes completed"
            value={String(stats.completed)}
            accent="bg-gradient-to-br from-amber-400 to-orange-500"
            delay={0.05}
          />
          <StatCard
            icon={TrendingUp}
            label="Average score"
            value={stats.average > 0 ? `${stats.average}%` : "—"}
            accent="bg-gradient-to-br from-emerald-500 to-teal-500"
            delay={0.1}
          />
          <StatCard
            icon={Target}
            label="Mastery"
            value={`${stats.mastery}%`}
            accent="bg-gradient-to-br from-primary to-secondary"
            delay={0.15}
          />
        </div>
      </section>

      <section>
        <div className="mb-6 space-y-6">
          {canGenerateAiQuiz ? (
            <AIStudio
              onQuizGenerated={(quiz) => {
                handleAiGenerated(quiz);
                onStartQuiz(quiz);
              }}
            />
          ) : null}

          <div className="mb-5 flex flex-col items-center justify-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quizzes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-2 sm:gap-3 grid-cols-3 lg:grid-cols-5">
            {[...allAiQuizzes, ...filteredOfficial].length === 0 ? (
              <EmptyState />
            ) : (
              [...allAiQuizzes, ...filteredOfficial].map((q, i) => (
                <QuizCard
                  key={q.id}
                  quiz={q}
                  index={i}
                  userScores={userScores}
                  completedQuizzes={completedQuizzes}
                  onStart={onStartQuiz}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
