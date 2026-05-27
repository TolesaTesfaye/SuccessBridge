import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Flag,
  Send,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@components/common/Button";
import { Input, Textarea, Badge } from "@components/common";
import { cn } from "@/lib/utils";
import { type Quiz } from "@services/quizService";
import { Loading } from "@components/common/Loading";

interface QuizTakerProps {
  quiz: Quiz;
  onSubmit: (results: {
    score: number;
    totalPoints: number;
    timeSpent: number;
    answers: Record<string, string>;
  }) => void;
  onCancel?: () => void;
  loading?: boolean;
  /** When true, fills the dashboard main panel (sidebar + header stay visible). */
  embedded?: boolean;
}

type Status = "unanswered" | "answered" | "skipped" | "review";

function TimerRing({
  remaining,
  total,
}: {
  remaining: number;
  total: number;
}) {
  const pct = total > 0 ? remaining / total : 0;
  const color =
    pct > 0.5
      ? "stroke-emerald-500"
      : pct > 0.2
        ? "stroke-amber-500"
        : "stroke-rose-500";
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          className="fill-none stroke-muted"
          strokeWidth="4"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          className={cn("fill-none transition-colors", color)}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] font-semibold tabular-nums">
        <span>
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function OptionCard({
  letter,
  text,
  selected,
  feedback,
  onClick,
  disabled,
}: {
  letter: string;
  text: string;
  selected: boolean;
  feedback?: "correct" | "wrong";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      animate={feedback === "wrong" ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.35 }}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-all sm:p-5",
        !disabled && "hover:border-primary/50 hover:shadow-md",
        selected &&
          !feedback &&
          "border-primary bg-primary/5 shadow-md ring-2 ring-primary/30",
        feedback === "correct" &&
          "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/40",
        feedback === "wrong" &&
          "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/40",
        !selected && !feedback && "border-border/60",
        disabled && "cursor-default opacity-90",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-semibold transition-colors",
          selected &&
            !feedback &&
            "border-primary bg-primary text-primary-foreground",
          feedback === "correct" && "border-emerald-500 bg-emerald-500 text-white",
          feedback === "wrong" && "border-rose-500 bg-rose-500 text-white",
          !selected &&
            !feedback &&
            "border-border/60 bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground",
        )}
      >
        {feedback === "correct" ? (
          <Check className="h-5 w-5" />
        ) : feedback === "wrong" ? (
          <X className="h-5 w-5" />
        ) : (
          letter
        )}
      </div>
      <p className="flex-1 text-sm font-medium sm:text-base">{text}</p>
    </motion.button>
  );
}

function questionTypeLabel(type: string) {
  if (type === "multiple_choice") return "Multiple choice";
  if (type === "short_answer") return "Short answer";
  return "Essay";
}

export const QuizTaker: React.FC<QuizTakerProps> = ({
  quiz,
  onSubmit,
  onCancel,
  loading = false,
  embedded = false,
}) => {
  const totalSeconds = quiz.timeLimit * 60;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [showConfirm, setShowConfirm] = useState(false);

  const q = quiz.questions[idx];
  const progress = ((idx + 1) / quiz.questions.length) * 100;

  const calculateAndSubmit = useCallback(
    (finalAnswers: Record<string, string> = answers) => {
      let score = 0;
      let totalPoints = 0;

      quiz.questions.forEach((qq) => {
        totalPoints += qq.points;
        if (finalAnswers[qq.id] === qq.correctAnswer) {
          score += qq.points;
        }
      });

      const timeSpent = totalSeconds - remaining;
      onSubmit({
        score: totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0,
        totalPoints,
        timeSpent,
        answers: finalAnswers,
      });
    },
    [answers, onSubmit, quiz.questions, remaining, totalSeconds],
  );

  const submitRef = useRef(calculateAndSubmit);
  submitRef.current = calculateAndSubmit;

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          submitRef.current();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const status = (i: number): Status => {
    const qq = quiz.questions[i];
    if (review[qq.id]) return "review";
    if (answers[qq.id] === undefined || answers[qq.id] === "") {
      return i < idx ? "skipped" : "unanswered";
    }
    return "answered";
  };

  const correctCount = useMemo(() => {
    return quiz.questions.reduce((acc, qq) => {
      if (
        qq.type === "multiple_choice" &&
        answers[qq.id] === qq.correctAnswer
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [answers, quiz.questions]);

  const selectOption = (optionText: string) => {
    if (feedback || q.type !== "multiple_choice") return;

    setAnswers((a) => ({ ...a, [q.id]: optionText }));
    const isCorrect = optionText === q.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setTimeout(() => setFeedback(null), 900);
  };

  const next = () => setIdx((i) => Math.min(quiz.questions.length - 1, i + 1));
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  const handleSubmit = () => {
    const answeredCount = quiz.questions.filter(
      (qq) => answers[qq.id] !== undefined && answers[qq.id] !== "",
    ).length;
    if (answeredCount < quiz.questions.length) {
      setShowConfirm(true);
      return;
    }
    calculateAndSubmit();
  };

  if (loading) return <Loading message="Analyzing your brilliance..." />;

  if (!q) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6 text-center">
        <div>
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-4 text-xl font-semibold">This quiz has no questions</h1>
          {onCancel && (
            <Button className="mt-4" onClick={onCancel}>
              Go back
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-background",
        embedded ? "h-full min-h-0" : "min-h-screen",
      )}
    >
      <header className="sticky top-0 z-30 shrink-0 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          {onCancel ? (
            <Button
              variant="ghost"
              onClick={onCancel}
              aria-label="Exit quiz"
              className="h-10 w-10 shrink-0 rounded-xl p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {quiz.title}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {idx + 1}/{quiz.questions.length}
              </span>
            </div>
          </div>
          <TimerRing remaining={remaining} total={totalSeconds} />
        </div>
      </header>

      <div
        className={cn(
          "mx-auto grid max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_280px]",
          embedded && "min-h-0 overflow-y-auto",
        )}
      >
        <section>
          <AnimatePresence mode="wait">
            <motion.article
              key={q.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur-xl sm:p-10"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="border-border/60">
                  Question {idx + 1}
                </Badge>
                <span>{questionTypeLabel(q.type)}</span>
                <span className="text-muted-foreground/60">·</span>
                <span>{q.points} pts</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                {q.text}
              </h2>

              <div className="mt-8">
                {q.type === "multiple_choice" && q.options && (
                  <div className="grid gap-3">
                    {q.options.map((opt, i) => {
                      const selected = answers[q.id] === opt;
                      let fb: "correct" | "wrong" | undefined;
                      if (feedback && selected) fb = feedback;
                      else if (
                        feedback === "wrong" &&
                        opt === q.correctAnswer
                      ) {
                        fb = "correct";
                      }
                      return (
                        <OptionCard
                          key={`${q.id}-${i}`}
                          letter={String.fromCharCode(65 + i)}
                          text={opt}
                          selected={selected}
                          feedback={fb}
                          disabled={!!feedback}
                          onClick={() => selectOption(opt)}
                        />
                      );
                    })}
                  </div>
                )}

                {q.type === "short_answer" && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Type your answer…"
                      value={answers[q.id] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                      }
                      className="h-12 text-base"
                    />
                    <p className="text-right text-xs text-muted-foreground">
                      {(answers[q.id] ?? "").length}/240
                    </p>
                  </div>
                )}

                {q.type === "essay" && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write your response…"
                      rows={10}
                      value={answers[q.id] ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                      }
                      className="resize-none text-base"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-emerald-500" />{" "}
                        Auto-saved
                      </span>
                      <span>
                        {(answers[q.id] ?? "")
                          .trim()
                          .split(/\s+/)
                          .filter(Boolean).length}{" "}
                        words
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="secondary"
              onClick={prev}
              disabled={idx === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                onClick={() =>
                  setReview((r) => ({ ...r, [q.id]: !r[q.id] }))
                }
                className="gap-1"
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4",
                    review[q.id] && "fill-current text-amber-500",
                  )}
                />
                {review[q.id] ? "Marked" : "Mark for review"}
              </Button>
              <Button variant="ghost" onClick={next} className="gap-1">
                Skip <Flag className="h-4 w-4" />
              </Button>
              {idx < quiz.questions.length - 1 ? (
                <Button
                  onClick={next}
                  className="gap-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="success"
                  className="gap-1"
                >
                  Submit <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-foreground">
                Question Navigator
              </h3>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {quiz.questions.map((qq, i) => {
                  const s = status(i);
                  const isCurrent = i === idx;
                  return (
                    <button
                      key={qq.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={`Go to question ${i + 1}`}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-all",
                        isCurrent &&
                          "ring-2 ring-primary ring-offset-2 ring-offset-background",
                        s === "answered" && "bg-primary/15 text-primary",
                        s === "skipped" && "bg-muted text-muted-foreground",
                        s === "review" &&
                          "bg-amber-500/20 text-amber-600 dark:text-amber-400",
                        s === "unanswered" &&
                          "border border-border/60 bg-background text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Answered
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Marked
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                  Skipped
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-foreground">
                Live stats
              </h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Answered</dt>
                  <dd className="font-semibold text-foreground">
                    {
                      quiz.questions.filter(
                        (qq) =>
                          answers[qq.id] !== undefined &&
                          answers[qq.id] !== "",
                      ).length
                    }
                    /{quiz.questions.length}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">MCQ correct</dt>
                  <dd className="font-semibold text-foreground">
                    {quiz.questions.filter((qq) => qq.type === "multiple_choice")
                      .length > 0
                      ? Math.round(
                          (correctCount /
                            quiz.questions.filter(
                              (qq) => qq.type === "multiple_choice",
                            ).length) *
                            100,
                        )
                      : 0}
                    %
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Remaining
                  </dt>
                  <dd className="font-semibold tabular-nums text-foreground">
                    {Math.floor(remaining / 60)}:
                    {(remaining % 60).toString().padStart(2, "0")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 text-center shadow-xl">
            <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              Submit with unanswered questions?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You have answered{" "}
              {
                quiz.questions.filter(
                  (qq) =>
                    answers[qq.id] !== undefined && answers[qq.id] !== "",
                ).length
              }{" "}
              of {quiz.questions.length} questions.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
              >
                Keep going
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => calculateAndSubmit()}
              >
                Submit now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
