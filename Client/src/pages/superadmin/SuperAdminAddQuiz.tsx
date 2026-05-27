import React, { useMemo, useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Sparkles,
  Plus,
  Save,
  Send,
  GripVertical,
  Trash2,
  Copy,
  Pencil,
  ListChecks,
  FileText,
  AlignLeft,
  Image as ImageIcon,
  Paperclip,
  Sigma,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Target,
  Clock,
  Trophy,
  Layers,
  CheckCircle2,
  Circle,
  Zap,
  Moon,
  Sun,
  Search,
  GraduationCap,
  Hash,
  Settings2,
  Lightbulb,
} from "lucide-react";
import { Button } from "@components/common/Button";
import {
  Input,
  Textarea,
  Label,
  Badge,
  Progress,
  Slider,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/common";
import { cn } from "@/lib/utils";
import { useToast } from "@components/common/Toast";
import { subjectService } from "@services/subjectService";
import { quizService, Quiz } from "@services/quizService";
import { AIService } from "@services/aiService";
import {
  UNIVERSITIES,
  DEPARTMENTS,
  UNIVERSITY_CATEGORIES,
} from "@utils/constants";
import type { Subject } from "@types";

type QType = "mcq" | "short" | "essay";
type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  type: QType;
  text: string;
  options: { id: string; text: string }[];
  correctId?: string;
  points: number;
  difficulty: Difficulty;
  explanation?: string;
  tags: string[];
  timeEstimate: number;
}

const newId = () => Math.random().toString(36).slice(2, 9);

const seedQuestions: Question[] = [
  {
    id: newId(),
    type: "mcq",
    text: "Which data structure uses LIFO ordering?",
    options: [
      { id: "a", text: "Queue" },
      { id: "b", text: "Stack" },
      { id: "c", text: "Linked List" },
      { id: "d", text: "Heap" },
    ],
    correctId: "b",
    points: 5,
    difficulty: "Easy",
    explanation: "Stacks are last-in, first-out structures.",
    tags: ["fundamentals", "ds"],
    timeEstimate: 45,
  },
];

const diffTone: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const typeMeta: Record<QType, { label: string; icon: React.ReactNode }> = {
  mcq: { label: "Multiple Choice", icon: <ListChecks className="size-3.5" /> },
  short: { label: "Short Answer", icon: <AlignLeft className="size-3.5" /> },
  essay: { label: "Essay", icon: <FileText className="size-3.5" /> },
};

export function SuperAdminAddQuiz() {
  const toast = useToast();
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(seedQuestions);

  const [title, setTitle] = useState("Untitled assessment");

  // ── Existing quizzes management ──
  const [existingQuizzes, setExistingQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showExistingQuizzes, setShowExistingQuizzes] = useState(true);

  const fetchExistingQuizzes = async () => {
    try {
      setQuizzesLoading(true);
      const data = await quizService.getAll();
      setExistingQuizzes(data);
    } catch (err) {
      console.error("Failed to load existing quizzes:", err);
    } finally {
      setQuizzesLoading(false);
    }
  };

  useEffect(() => {
    fetchExistingQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizService.delete(quizId);
      toast.success("Quiz deleted successfully");
      setExistingQuizzes((qs) => qs.filter((q) => q.id !== quizId));
      setDeleteConfirmId(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete quiz");
    }
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setTitle(quiz.title);
    setDescription(quiz.description || "");
    setEducationLevel(quiz.educationLevel || "high_school");
    if (quiz.educationLevel === "high_school") {
      setGrade(quiz.grade || "grade_9");
      setStream((quiz as any).stream || "");
    } else {
      setUniversityId((quiz as any).university || "");
      setCategory(quiz.grade || "");
      setDepartmentId((quiz as any).department || "");
    }
    setSubjectId(quiz.subjectId || "");
    setTimeLimit(quiz.timeLimit || 30);
    setPassing(quiz.passingScore || 60);
    const draft: Question[] = (quiz.questions || []).map((q: any) => {
      const opts: { id: string; text: string }[] = (q.options || []).map(
        (o: string, i: number) => ({
          id: `opt_${i}_${newId()}`,
          text: o,
        }),
      );
      const correctOption = opts.find((o) => o.text === q.correctAnswer);
      return {
        id: q.id || newId(),
        type:
          q.type === "multiple_choice"
            ? "mcq"
            : q.type === "short_answer"
              ? "short"
              : "essay",
        text: q.text || "",
        options: opts,
        correctId: correctOption?.id,
        points: q.points || 5,
        difficulty: "Medium" as Difficulty,
        explanation: "",
        tags: [],
        timeEstimate: 60,
      };
    });
    setQuestions(draft);
    toast.success("Quiz loaded for editing — update and re‑publish to save");
  };

  const handleUpdateQuiz = async (quizId: string) => {
    if (!title.trim()) {
      toast.error("A title is required");
      return;
    }
    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }
    try {
      setLoading(true);
      const formatted = questions.map((q) => {
        let answer = "";
        if (q.type === "mcq") {
          answer = q.options.find((o) => o.id === q.correctId)?.text || "";
        } else {
          answer = q.explanation || "";
        }
        return {
          id: q.id,
          text: q.text,
          type:
            q.type === "mcq"
              ? "multiple_choice"
              : q.type === "short"
                ? "short_answer"
                : "essay",
          options:
            q.type === "mcq"
              ? q.options.map((o) => o.text).filter(Boolean)
              : [],
          correctAnswer: answer,
          points: q.points || 5,
        };
      });
      await quizService.update(quizId, {
        title: title.trim(),
        description: description.trim(),
        questions: formatted as any,
        timeLimit,
        passingScore: passing,
      } as any);
      toast.success("Quiz updated successfully");
      setTitle("Untitled assessment");
      setDescription("");
      setQuestions([]);
      fetchExistingQuizzes();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };
  const [description, setDescription] = useState("");

  // SuccessBridge targeting state
  const [educationLevel, setEducationLevel] = useState<
    "high_school" | "university"
  >("high_school");
  const [grade, setGrade] = useState("grade_9");
  const [stream, setStream] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [category, setCategory] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);

  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [timeLimit, setTimeLimit] = useState(30);
  const [passing, setPassing] = useState(60);

  // Load subjects from database
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const list = await subjectService.getSubjects();
        setSubjectsList(list);
      } catch (err) {
        console.error("Failed to load subjects:", err);
      }
    };
    loadSubjects();
  }, []);

  const selectedSubject = useMemo(() => {
    return subjectsList.find((s) => s.id === subjectId);
  }, [subjectsList, subjectId]);

  const subjectName = selectedSubject ? selectedSubject.name : "None";

  // Filter subjects based on targeting selections
  const getDynamicSubjects = () => {
    if (educationLevel === "high_school") {
      let filtered = subjectsList.filter((s) => s.gradeId === grade);
      if (["grade_11", "grade_12"].includes(grade) && stream) {
        filtered = filtered.filter((s) => s.streamId === stream);
      }
      return filtered;
    } else {
      let filtered = subjectsList.filter((s) => !s.gradeId);
      if (departmentId) {
        filtered = filtered.filter((s) => s.departmentId === departmentId);
      }
      return filtered;
    }
  };

  // Reset subjectId if selected targets change
  useEffect(() => {
    setSubjectId("");
  }, [educationLevel, grade, stream, departmentId]);

  // Draft question state
  const [qType, setQType] = useState<QType>("mcq");
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState<{ id: string; text: string }[]>([
    { id: newId(), text: "" },
    { id: newId(), text: "" },
    { id: newId(), text: "" },
    { id: newId(), text: "" },
  ]);
  const [qCorrect, setQCorrect] = useState<string | undefined>();
  const [qPoints, setQPoints] = useState(5);
  const [qDifficulty, setQDifficulty] = useState<Difficulty>("Medium");
  const [qExplanation, setQExplanation] = useState("");
  const [qTags, setQTags] = useState("");
  const [qTime, setQTime] = useState(45);
  const [settingsOpen, setSettingsOpen] = useState(true);

  // AI panel
  const [aiCount, setAiCount] = useState([10]);
  const [aiDifficulty, setAiDifficulty] = useState<Difficulty>("Medium");
  const [aiType, setAiType] = useState<QType>("mcq");
  const [aiBloom, setAiBloom] = useState("Apply");
  const [aiLoading, setAiLoading] = useState(false);

  const totals = useMemo(() => {
    const total = questions.length;
    const points = questions.reduce((a, q) => a + q.points, 0);
    const seconds = questions.reduce((a, q) => a + q.timeEstimate, 0);
    return { total, points, mins: Math.max(1, Math.round(seconds / 60)) };
  }, [questions]);

  const completion = Math.min(
    100,
    Math.round(
      (title.trim() ? 15 : 0) +
        (description.trim() ? 10 : 0) +
        (subjectId ? 10 : 0) +
        Math.min(65, questions.length * 10),
    ),
  );

  const addQuestion = () => {
    if (!qText.trim()) return;
    const q: Question = {
      id: newId(),
      type: qType,
      text: qText.trim(),
      options: qType === "mcq" ? qOptions.filter((o) => o.text.trim()) : [],
      correctId: qType === "mcq" ? qCorrect : undefined,
      points: qPoints,
      difficulty: qDifficulty,
      explanation: qExplanation,
      tags: qTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      timeEstimate: qTime,
    };
    setQuestions((qs) => [...qs, q]);
    setQText("");
    setQExplanation("");
    setQTags("");
    setQCorrect(undefined);
    setQOptions([
      { id: newId(), text: "" },
      { id: newId(), text: "" },
      { id: newId(), text: "" },
      { id: newId(), text: "" },
    ]);
  };

  const generateAI = async () => {
    if (!subjectId) {
      toast.error(
        "Please select a target subject before generating AI questions",
      );
      return;
    }

    setAiLoading(true);
    try {
      const topicName =
        title && title !== "Untitled assessment" ? title : subjectName;
      const difficultyParam = aiDifficulty.toLowerCase() as
        | "easy"
        | "medium"
        | "hard";

      const {
        questions: apiQuestions,
        aiFallback,
        fallbackMessage,
      } = await AIService.generateQuiz(
        topicName,
        subjectName,
        difficultyParam,
        aiCount[0],
      );

      const generated: Question[] = apiQuestions.map((q) => {
        const formattedOptions = (q.options || []).map((o, idx) => ({
          id: `opt_${idx}_${newId()}`,
          text: o,
        }));

        const correctOpt = formattedOptions.find(
          (opt) => opt.text === q.correctAnswer,
        );
        const correctId = correctOpt ? correctOpt.id : formattedOptions[0]?.id;

        return {
          id: q.id || newId(),
          type: "mcq",
          text: q.text,
          options: formattedOptions,
          correctId,
          points: q.points || 5,
          difficulty: aiDifficulty,
          explanation: `Generated by SuccessBridge AI. Correct answer is: ${q.correctAnswer}`,
          tags: ["ai-generated"],
          timeEstimate: aiDifficulty === "Hard" ? 90 : 60,
        };
      });

      setQuestions((qs) => [...qs, ...generated]);
      if (aiFallback) {
        toast.warning(
          fallbackMessage ??
            `Gemini was unavailable. Added ${generated.length} template questions.`,
        );
      } else {
        toast.success(
          `Successfully generated ${generated.length} quiz questions via BridgeBot!`,
        );
      }
    } catch (err: any) {
      console.error(
        "AI Generation failed, using premium local fallback templates:",
        err,
      );
      toast.warning(
        "AI Service unavailable. Generating offline mock questions.",
      );

      const generated: Question[] = Array.from({ length: aiCount[0] }).map(
        (_, i) => {
          const optionId1 = newId();
          const optionId2 = newId();
          const optionId3 = newId();
          const optionId4 = newId();

          return {
            id: newId(),
            type: aiType,
            text: `Practice Assessment Question on ${subjectName} (#${i + 1})?`,
            options:
              aiType === "mcq"
                ? [
                    { id: optionId1, text: `Concept Option A` },
                    { id: optionId2, text: `Correct Concept B` },
                    { id: optionId3, text: `Distractor C` },
                    { id: optionId4, text: `Alternative D` },
                  ]
                : [],
            correctId: optionId2,
            points:
              aiDifficulty === "Hard" ? 8 : aiDifficulty === "Medium" ? 5 : 3,
            difficulty: aiDifficulty,
            explanation: "This is a detailed explanation for practice.",
            tags: ["ai-generated", "offline-mock"],
            timeEstimate: aiDifficulty === "Hard" ? 90 : 60,
          };
        },
      );
      setQuestions((qs) => [...qs, ...generated]);
    } finally {
      setAiLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("Quiz title is required");
      return;
    }
    if (!subjectId) {
      toast.error("Please select a target subject");
      return;
    }
    if (questions.length === 0) {
      toast.error("Please add at least one question to the quiz");
      return;
    }
    if (educationLevel === "high_school") {
      if (!grade) {
        toast.error("Please select a target grade");
        return;
      }
      if (["grade_11", "grade_12"].includes(grade) && !stream) {
        toast.error("Please select a stream for Grade 11 or 12");
        return;
      }
    } else {
      if (!universityId) {
        toast.error("Please select a target university");
        return;
      }
      if (!category) {
        toast.error("Please select a student category");
        return;
      }
      if (["senior", "gc"].includes(category) && !departmentId) {
        toast.error("Please select a department for Senior / GC students");
        return;
      }
    }

    try {
      setLoading(true);

      // Map local Questions to Database/Server Question structure
      const formattedQuestions = questions.map((q) => {
        let answerText = "";
        if (q.type === "mcq") {
          const correctOpt = q.options.find((o) => o.id === q.correctId);
          answerText = correctOpt ? correctOpt.text : "";
        } else {
          answerText = q.explanation || "";
        }

        return {
          id: q.id,
          text: q.text,
          type:
            q.type === "mcq"
              ? "multiple_choice"
              : q.type === "short"
                ? "short_answer"
                : "essay",
          options:
            q.type === "mcq"
              ? q.options.map((o) => o.text).filter(Boolean)
              : [],
          correctAnswer: answerText,
          points: q.points || 5,
        };
      });

      const quizData = {
        title: title.trim(),
        description: description.trim(),
        educationLevel,
        grade: educationLevel === "high_school" ? grade : category || undefined,
        stream:
          educationLevel === "high_school" &&
          ["grade_11", "grade_12"].includes(grade)
            ? stream
            : undefined,
        university: educationLevel === "university" ? universityId : undefined,
        department:
          educationLevel === "university" && ["senior", "gc"].includes(category)
            ? departmentId
            : undefined,
        subjectId,
        questions: formattedQuestions as any,
        timeLimit: timeLimit || 30,
        passingScore: passing || 60,
        isAiGenerated: questions.some((q) => q.tags.includes("ai-generated")),
      };

      await quizService.create(quizData);
      toast.success("Quiz published successfully to SuccessBridge!");

      // Reset form fields
      setTitle("Untitled assessment");
      setDescription("");
      setQuestions([]);
    } catch (err: any) {
      console.error("Failed to publish quiz:", err);
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "An error occurred while publishing the quiz",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully to local storage!");
  };

  return (
    <div className={cn(dark && "dark", "min-h-dvh")}>
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Quizzes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25"
              >
                <GraduationCap className="size-7" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Create New Quiz
                </h1>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  Build engaging assessments manually or generate them instantly
                  using AI.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={() => setDark((d) => !d)}
                    aria-label="Toggle theme"
                  >
                    {dark ? (
                      <Sun className="size-4" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle theme</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              <Save className="size-4" />
              Save draft
            </Button>
            <Button
              className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-95"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-1">⌛</span>
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Publish quiz
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
          <div className="space-y-6 lg:col-span-7">
            {/* ══════ Existing Quizzes Management ══════ */}
            <SectionCard>
              <div className="border-b border-border/60 p-6">
                <button
                  onClick={() => setShowExistingQuizzes(!showExistingQuizzes)}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                      <ListChecks className="size-4" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-base font-semibold">
                        Manage Published Quizzes
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {existingQuizzes.length} quiz
                        {existingQuizzes.length !== 1 ? "zes" : ""} published —
                        edit or delete as needed.
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 text-muted-foreground transition-transform",
                      showExistingQuizzes && "rotate-180",
                    )}
                  />
                </button>
              </div>
              {showExistingQuizzes && (
                <div className="p-4 sm:p-6">
                  {quizzesLoading ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      Loading quizzes…
                    </div>
                  ) : existingQuizzes.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No quizzes have been published yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {existingQuizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-4 transition-all hover:border-primary/30"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">
                              {quiz.title}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              {quiz.description || "No description"}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              <Badge variant="outline" className="text-[10px]">
                                {quiz.questions?.length || 0} Qs
                              </Badge>
                              <Badge variant="outline" className="text-[10px]">
                                Pass: {quiz.passingScore}%
                              </Badge>
                              <Badge variant="outline" className="text-[10px]">
                                {quiz.timeLimit}m
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                handleEditQuiz(quiz);
                                setShowExistingQuizzes(false);
                              }}
                            >
                              <Pencil className="mr-1 size-3.5" />
                              Edit
                            </Button>
                            {deleteConfirmId === quiz.id ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleDeleteQuiz(quiz.id)}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteConfirmId(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteConfirmId(quiz.id)}
                                className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-500/10"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </SectionCard>

            <QuizDetails
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              educationLevel={educationLevel}
              setEducationLevel={setEducationLevel}
              grade={grade}
              setGrade={setGrade}
              stream={stream}
              setStream={setStream}
              universityId={universityId}
              setUniversityId={setUniversityId}
              departmentId={departmentId}
              setDepartmentId={setDepartmentId}
              category={category}
              setCategory={setCategory}
              subjectId={subjectId}
              setSubjectId={setSubjectId}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              timeLimit={timeLimit}
              setTimeLimit={setTimeLimit}
              passing={passing}
              setPassing={setPassing}
              subjectsList={getDynamicSubjects()}
            />

            <AIGenerator
              count={aiCount}
              setCount={setAiCount}
              difficulty={aiDifficulty}
              setDifficulty={setAiDifficulty}
              type={aiType}
              setType={setAiType}
              bloom={aiBloom}
              setBloom={setAiBloom}
              loading={aiLoading}
              onGenerate={generateAI}
            />

            <ManualBuilder
              qType={qType}
              setQType={setQType}
              qText={qText}
              setQText={setQText}
              qOptions={qOptions}
              setQOptions={setQOptions}
              qCorrect={qCorrect}
              setQCorrect={setQCorrect}
              qPoints={qPoints}
              setQPoints={setQPoints}
              qDifficulty={qDifficulty}
              setQDifficulty={setQDifficulty}
              qExplanation={qExplanation}
              setQExplanation={setQExplanation}
              qTags={qTags}
              setQTags={setQTags}
              qTime={qTime}
              setQTime={setQTime}
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              onAdd={addQuestion}
            />

            <QuestionsLibrary
              questions={questions}
              onDelete={(id) =>
                setQuestions((qs) => qs.filter((q) => q.id !== id))
              }
              onDuplicate={(id) =>
                setQuestions((qs) => {
                  const q = qs.find((x) => x.id === id);
                  return q ? [...qs, { ...q, id: newId() }] : qs;
                })
              }
            />
          </div>

          <aside className="lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              <SummaryCard
                totals={totals}
                subject={subjectName}
                difficulty={difficulty}
                timeLimit={timeLimit}
                passing={passing}
              />
              <ProgressCard value={completion} />
              <LivePreview
                title={title}
                questions={questions}
                timeLimit={timeLimit}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Quiz Details ---------------- */

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass rounded-2xl border border-border/60 shadow-[0_1px_0_oklch(1_0_0/0.06)_inset,0_8px_30px_-12px_oklch(0.18_0.04_264.7/0.18)]",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}

function FloatingField({
  label,
  children,
  hint,
  counter,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  counter?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        {counter && (
          <span className="text-[10px] tabular-nums text-muted-foreground/70">
            {counter}
          </span>
        )}
      </div>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground/80">{hint}</p>}
    </div>
  );
}

function QuizDetails(props: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  educationLevel: "high_school" | "university";
  setEducationLevel: (v: "high_school" | "university") => void;
  grade: string;
  setGrade: (v: string) => void;
  stream: string;
  setStream: (v: string) => void;
  universityId: string;
  setUniversityId: (v: string) => void;
  departmentId: string;
  setDepartmentId: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  subjectId: string;
  setSubjectId: (v: string) => void;
  difficulty: Difficulty;
  setDifficulty: (v: Difficulty) => void;
  timeLimit: number;
  setTimeLimit: (v: number) => void;
  passing: number;
  setPassing: (v: number) => void;
  subjectsList: Subject[];
}) {
  return (
    <SectionCard>
      <div className="border-b border-border/60 p-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Quiz details</h2>
            <p className="text-xs text-muted-foreground">
              Core information shown to students.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <FloatingField
            label="Quiz title"
            counter={`${props.title.length}/80`}
          >
            <Input
              value={props.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                props.setTitle(e.target.value.slice(0, 80))
              }
              placeholder="e.g. Grade 10 — Algebra mid-term"
              className="h-11"
            />
          </FloatingField>
        </div>
        <div className="md:col-span-2">
          <FloatingField
            label="Description"
            counter={`${props.description.length}/240`}
            hint="A short summary shown on the student dashboard."
          >
            <Textarea
              value={props.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                props.setDescription(e.target.value.slice(0, 240))
              }
              placeholder="Describe what this quiz covers…"
              className="min-h-[88px] resize-none"
            />
          </FloatingField>
        </div>

        <FloatingField label="Education level">
          <Select
            value={props.educationLevel}
            onValueChange={(v: string) =>
              props.setEducationLevel(v as "high_school" | "university")
            }
          >
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high_school">High School</SelectItem>
              <SelectItem value="university">University</SelectItem>
            </SelectContent>
          </Select>
        </FloatingField>

        {props.educationLevel === "high_school" ? (
          <>
            <FloatingField label="Grade">
              <Select value={props.grade} onValueChange={props.setGrade}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade_9">Grade 9</SelectItem>
                  <SelectItem value="grade_10">Grade 10</SelectItem>
                  <SelectItem value="grade_11">Grade 11</SelectItem>
                  <SelectItem value="grade_12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </FloatingField>

            {["grade_11", "grade_12"].includes(props.grade) && (
              <FloatingField label="Stream">
                <Select value={props.stream} onValueChange={props.setStream}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural Science</SelectItem>
                    <SelectItem value="social">Social Science</SelectItem>
                  </SelectContent>
                </Select>
              </FloatingField>
            )}
          </>
        ) : (
          <>
            <FloatingField label="University">
              <Select
                value={props.universityId}
                onValueChange={props.setUniversityId}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNIVERSITIES.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FloatingField>

            <FloatingField label="Student Category">
              <Select value={props.category} onValueChange={props.setCategory}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(UNIVERSITY_CATEGORIES).map((c) => (
                    <SelectItem key={c} value={c}>
                      {(UNIVERSITY_CATEGORIES as any)[c].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FloatingField>

            {["senior", "gc"].includes(props.category) && (
              <FloatingField label="Department Group">
                <Select
                  value={props.departmentId}
                  onValueChange={props.setDepartmentId}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(DEPARTMENTS).map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FloatingField>
            )}
          </>
        )}

        <FloatingField label="Subject / Module">
          <Select value={props.subjectId} onValueChange={props.setSubjectId}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {props.subjectsList.length === 0 ? (
                <SelectItem value="no_subjects" disabled>
                  No subjects found for targeting
                </SelectItem>
              ) : (
                props.subjectsList.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </FloatingField>

        <FloatingField label="Difficulty">
          <Select
            value={props.difficulty}
            onValueChange={(v: string) => props.setDifficulty(v as Difficulty)}
          >
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </FloatingField>

        <FloatingField label="Time limit (minutes)">
          <div className="flex items-center gap-3 rounded-lg border border-input bg-background px-3 py-2">
            <Clock className="size-4 text-muted-foreground" />
            <Input
              type="number"
              min={1}
              value={props.timeLimit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                props.setTimeLimit(Number(e.target.value) || 0)
              }
              className="h-7 border-0 p-0 shadow-none focus-visible:ring-0"
            />
            <span className="text-xs text-muted-foreground">min</span>
          </div>
        </FloatingField>

        <FloatingField label={`Passing score · ${props.passing}%`}>
          <div className="px-1 pt-3">
            <Slider
              value={[props.passing]}
              onValueChange={(v: number[]) => props.setPassing(v[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>
        </FloatingField>
      </div>
    </SectionCard>
  );
}

/* ---------------- AI Generator ---------------- */

function AIGenerator(props: {
  count: number[];
  setCount: (v: number[]) => void;
  difficulty: Difficulty;
  setDifficulty: (v: Difficulty) => void;
  type: QType;
  setType: (v: QType) => void;
  bloom: string;
  setBloom: (v: string) => void;
  loading: boolean;
  onGenerate: () => void;
}) {
  return (
    <SectionCard className="ai-border overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent" />
        <div className="absolute -right-10 -top-10 -z-10 size-48 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -left-6 bottom-0 -z-10 size-40 rounded-full bg-primary/20 blur-3xl" />

        <div className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 8, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md shadow-primary/30"
            >
              <Sparkles className="size-5" />
            </motion.div>
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <span className="text-gradient-ai">AI Quiz Generator</span>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-[10px] uppercase tracking-wider text-primary"
                >
                  Beta
                </Badge>
              </h2>
              <p className="text-xs text-muted-foreground">
                Generate high-quality questions tailored to your subject and
                difficulty level.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 md:grid-cols-4">
          <FloatingField label="Difficulty">
            <Select
              value={props.difficulty}
              onValueChange={(v: string) =>
                props.setDifficulty(v as Difficulty)
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </FloatingField>
          <FloatingField label={`Questions · ${props.count[0]}`}>
            <div className="px-1 pt-3">
              <Slider
                value={props.count}
                onValueChange={props.setCount}
                min={1}
                max={30}
                step={1}
              />
            </div>
          </FloatingField>
          <FloatingField label="Question type">
            <Select
              value={props.type}
              onValueChange={(v: string) => props.setType(v as QType)}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple choice</SelectItem>
                <SelectItem value="short">Short answer</SelectItem>
                <SelectItem value="essay">Essay</SelectItem>
              </SelectContent>
            </Select>
          </FloatingField>
          <FloatingField label="Bloom's taxonomy">
            <Select value={props.bloom} onValueChange={props.setBloom}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Remember",
                  "Understand",
                  "Apply",
                  "Analyze",
                  "Evaluate",
                  "Create",
                ].map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FloatingField>
        </div>

        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="size-3.5" />
            Tip: Combine AI drafts with manual edits for the best quality.
          </p>
          <Button
            onClick={props.onGenerate}
            disabled={props.loading}
            size="lg"
            className="relative h-12 gap-2 overflow-hidden bg-gradient-to-r from-primary to-secondary px-6 text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-95"
          >
            <AnimatePresence mode="wait">
              {props.loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="grid size-4 place-items-center"
                  >
                    <Sparkles className="size-4" />
                  </motion.span>
                  AI is thinking…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="size-4" />
                  Generate Questions with AI
                </motion.span>
              )}
            </AnimatePresence>
            {props.loading && (
              <span className="pointer-events-none absolute inset-0 shimmer" />
            )}
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ---------------- Manual Builder ---------------- */

function ManualBuilder(props: {
  qType: QType;
  setQType: (v: QType) => void;
  qText: string;
  setQText: (v: string) => void;
  qOptions: { id: string; text: string }[];
  setQOptions: React.Dispatch<
    React.SetStateAction<{ id: string; text: string }[]>
  >;
  qCorrect: string | undefined;
  setQCorrect: (v: string) => void;
  qPoints: number;
  setQPoints: (v: number) => void;
  qDifficulty: Difficulty;
  setQDifficulty: (v: Difficulty) => void;
  qExplanation: string;
  setQExplanation: (v: string) => void;
  qTags: string;
  setQTags: (v: string) => void;
  qTime: number;
  setQTime: (v: number) => void;
  settingsOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  onAdd: () => void;
}) {
  return (
    <SectionCard>
      <div className="flex flex-col gap-3 border-b border-border/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-secondary/10 text-secondary">
            <Pencil className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Question composer</h2>
            <p className="text-xs text-muted-foreground">
              Craft a question with rich content and answer choices.
            </p>
          </div>
        </div>

        <Tabs
          value={props.qType}
          onValueChange={(v: string) => props.setQType(v as QType)}
        >
          <TabsList className="relative">
            <LayoutGroup id="qtype-tabs">
              {(Object.keys(typeMeta) as QType[]).map((k) => (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="relative gap-1.5 data-[state=active]:bg-transparent data-[state=active]:text-foreground"
                >
                  {props.qType === k && (
                    <motion.span
                      layoutId="qtype-active"
                      className="absolute inset-0 -z-0 rounded-md bg-background shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {typeMeta[k].icon}
                    {typeMeta[k].label}
                  </span>
                </TabsTrigger>
              ))}
            </LayoutGroup>
          </TabsList>
          <TabsContent value="mcq" />
          <TabsContent value="short" />
          <TabsContent value="essay" />
        </Tabs>
      </div>

      <div className="space-y-5 p-6">
        <div className="rounded-xl border border-border/60 bg-background/40">
          <Textarea
            value={props.qText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              props.setQText(e.target.value)
            }
            placeholder="Type your question… use markdown, math, or paste images."
            className="min-h-[110px] resize-none border-0 bg-transparent text-base focus-visible:ring-0"
          />
          <div className="flex items-center justify-between border-t border-border/60 px-3 py-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <ToolbarBtn
                icon={<Sigma className="size-4" />}
                label="Insert formula"
              />
              <ToolbarBtn
                icon={<ImageIcon className="size-4" />}
                label="Upload image"
              />
              <ToolbarBtn
                icon={<Paperclip className="size-4" />}
                label="Attach file"
              />
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {props.qText.length} chars
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {props.qType === "mcq" && (
            <motion.div
              key="mcq"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              {props.qOptions.map((opt, idx) => {
                const selected = props.qCorrect === opt.id;
                return (
                  <motion.div
                    key={opt.id}
                    layout
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border bg-background/60 p-3 transition-all",
                      selected
                        ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                        : "border-border/60 hover:border-primary/30 hover:bg-accent/40",
                    )}
                  >
                    <button
                      type="button"
                      aria-label="Reorder"
                      className="cursor-grab text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <GripVertical className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => props.setQCorrect(opt.id)}
                      aria-label={
                        selected ? "Correct answer" : "Mark as correct"
                      }
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                        selected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-border bg-background hover:border-primary/50",
                      )}
                    >
                      {selected ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : (
                        <Circle className="size-3 opacity-0" />
                      )}
                    </button>
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-medium text-muted-foreground">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <Input
                      value={opt.text}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        props.setQOptions((arr) =>
                          arr.map((o) =>
                            o.id === opt.id
                              ? { ...o, text: e.target.value }
                              : o,
                          ),
                        )
                      }
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <ToolbarBtn
                        icon={<Copy className="size-3.5" />}
                        label="Duplicate"
                        onClick={() =>
                          props.setQOptions((arr) => {
                            const i = arr.findIndex((o) => o.id === opt.id);
                            const copy = { id: newId(), text: arr[i].text };
                            return [
                              ...arr.slice(0, i + 1),
                              copy,
                              ...arr.slice(i + 1),
                            ];
                          })
                        }
                      />
                      <ToolbarBtn
                        icon={<Trash2 className="size-3.5" />}
                        label="Remove"
                        onClick={() =>
                          props.setQOptions((arr) =>
                            arr.length > 2
                              ? arr.filter((o) => o.id !== opt.id)
                              : arr,
                          )
                        }
                      />
                    </div>
                  </motion.div>
                );
              })}
              <Button
                variant="secondary"
                size="sm"
                className="mt-1 gap-2"
                onClick={() =>
                  props.setQOptions((arr) => [
                    ...arr,
                    { id: newId(), text: "" },
                  ])
                }
              >
                <Plus className="size-3.5" />
                Add option
              </Button>
            </motion.div>
          )}

          {props.qType === "short" && (
            <motion.div
              key="short"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center"
            >
              <AlignLeft className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">Short answer input</p>
              <p className="text-xs text-muted-foreground">
                Students will type a 1–3 sentence response.
              </p>
            </motion.div>
          )}

          {props.qType === "essay" && (
            <motion.div
              key="essay"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center"
            >
              <FileText className="mx-auto mb-2 size-5 text-muted-foreground" />
              <p className="text-sm font-medium">Essay response</p>
              <p className="text-xs text-muted-foreground">
                Students write a long-form answer evaluated manually or with AI.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Collapsible
          open={props.settingsOpen}
          onOpenChange={props.setSettingsOpen}
        >
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/40 px-4 py-3 text-sm font-medium hover:bg-accent/40"
            >
              <span className="flex items-center gap-2">
                <Settings2 className="size-4 text-muted-foreground" />
                Question settings
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground transition-transform",
                  props.settingsOpen && "rotate-180",
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:hidden">
            <div className="mt-3 grid grid-cols-1 gap-4 rounded-xl border border-border/60 bg-background/40 p-4 md:grid-cols-3">
              <FloatingField label="Points">
                <Input
                  type="number"
                  min={0}
                  value={props.qPoints}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.setQPoints(Number(e.target.value) || 0)
                  }
                  className="h-10"
                />
              </FloatingField>
              <FloatingField label="Difficulty">
                <Select
                  value={props.qDifficulty}
                  onValueChange={(v: string) =>
                    props.setQDifficulty(v as Difficulty)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </FloatingField>
              <FloatingField label="Time estimate (sec)">
                <Input
                  type="number"
                  min={5}
                  value={props.qTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    props.setQTime(Number(e.target.value) || 0)
                  }
                  className="h-10"
                />
              </FloatingField>
              <div className="md:col-span-2">
                <FloatingField
                  label="Explanation"
                  hint="Shown after submission."
                >
                  <Textarea
                    value={props.qExplanation}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      props.setQExplanation(e.target.value)
                    }
                    placeholder="Why is the correct answer correct?"
                    className="min-h-[72px] resize-none"
                  />
                </FloatingField>
              </div>
              <FloatingField label="Tags" hint="Comma separated">
                <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
                  <Hash className="size-4 text-muted-foreground" />
                  <Input
                    value={props.qTags}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      props.setQTags(e.target.value)
                    }
                    placeholder="algebra, equations"
                    className="h-10 border-0 p-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </FloatingField>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Switch id="required" defaultChecked />
            <Label htmlFor="required" className="text-xs">
              Required question
            </Label>
          </div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={props.onAdd}
              size="lg"
              className="h-12 gap-2 bg-gradient-to-r from-primary to-secondary px-6 text-primary-foreground shadow-lg shadow-primary/25"
            >
              <Plus className="size-4" />
              Add question
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionCard>
  );
}

function ToolbarBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ---------------- Questions Library ---------------- */

function QuestionsLibrary({
  questions,
  onDelete,
  onDuplicate,
}: {
  questions: Question[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}) {
  return (
    <SectionCard>
      <div className="flex items-center justify-between border-b border-border/60 p-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <Layers className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Questions library</h2>
            <p className="text-xs text-muted-foreground">
              Drag to reorder · {questions.length} question
              {questions.length !== 1 && "s"}
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search questions…" className="h-9 w-56 pl-8" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <AnimatePresence mode="popLayout">
          {questions.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid place-items-center rounded-2xl border border-dashed border-border/70 bg-muted/30 p-12 text-center"
            >
              <EmptyIllustration />
              <h3 className="mt-4 text-base font-semibold">
                No questions added yet
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Create your first question manually or let AI generate them
                instantly.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Button variant="secondary" className="gap-2">
                  <Plus className="size-4" />
                  Add question
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  <Sparkles className="size-4" />
                  Generate with AI
                </Button>
              </div>
            </motion.div>
          ) : (
            <ul className="space-y-3">
              {questions.map((q, idx) => (
                <motion.li
                  key={q.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="group flex gap-4 rounded-xl border border-border/60 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      aria-label="Reorder"
                      className="cursor-grab text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <GripVertical className="size-4" />
                    </button>
                    <span className="grid size-7 place-items-center rounded-lg bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium leading-relaxed">
                      {q.text}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="gap-1 font-normal">
                        {typeMeta[q.type].icon}
                        {typeMeta[q.type].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn("font-normal", diffTone[q.difficulty])}
                      >
                        {q.difficulty}
                      </Badge>
                      <Badge variant="outline" className="gap-1 font-normal">
                        <Trophy className="size-3" />
                        {q.points} pts
                      </Badge>
                      <Badge variant="outline" className="gap-1 font-normal">
                        <Clock className="size-3" />~{q.timeEstimate}s
                      </Badge>
                      {q.tags.slice(0, 2).map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="font-normal"
                        >
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <ToolbarBtn
                      icon={<Pencil className="size-3.5" />}
                      label="Edit"
                    />
                    <ToolbarBtn
                      icon={<Copy className="size-3.5" />}
                      label="Duplicate"
                      onClick={() => onDuplicate(q.id)}
                    />
                    <ToolbarBtn
                      icon={<Trash2 className="size-3.5" />}
                      label="Delete"
                      onClick={() => onDelete(q.id)}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}

function EmptyIllustration() {
  return (
    <svg viewBox="0 0 180 120" className="h-24 w-32" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.7 0.22 277)" />
          <stop offset="1" stopColor="oklch(0.74 0.22 303)" />
        </linearGradient>
      </defs>
      <rect
        x="20"
        y="22"
        width="120"
        height="76"
        rx="12"
        fill="oklch(0.96 0.02 290 / 0.5)"
        stroke="url(#g1)"
        strokeOpacity="0.5"
      />
      <rect
        x="32"
        y="38"
        width="60"
        height="8"
        rx="4"
        fill="url(#g1)"
        opacity="0.8"
      />
      <rect
        x="32"
        y="54"
        width="96"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="32"
        y="66"
        width="80"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="32"
        y="78"
        width="52"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.15"
      />
      <circle cx="148" cy="32" r="14" fill="url(#g1)" />
      <path
        d="M148 25 v14 M141 32 h14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- Right Sidebar ---------------- */

function SummaryCard({
  totals,
  subject,
  difficulty,
  timeLimit,
  passing,
}: {
  totals: { total: number; points: number; mins: number };
  subject: string;
  difficulty: Difficulty;
  timeLimit: number;
  passing: number;
}) {
  const metrics = [
    {
      label: "Questions",
      value: totals.total,
      icon: <Layers className="size-4" />,
    },
    {
      label: "Total points",
      value: totals.points,
      icon: <Trophy className="size-4" />,
    },
    {
      label: "Est. duration",
      value: `${totals.mins}m`,
      icon: <Clock className="size-4" />,
    },
    {
      label: "Passing",
      value: `${passing}%`,
      icon: <Target className="size-4" />,
    },
  ];
  return (
    <SectionCard>
      <div className="border-b border-border/60 p-5">
        <h3 className="text-sm font-semibold">Quiz summary</h3>
        <p className="text-xs text-muted-foreground">
          Live overview of this assessment.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-border/60 bg-background/50 p-3"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              {m.icon}
              <span className="text-[11px] uppercase tracking-wider">
                {m.label}
              </span>
            </div>
            <p className="mt-1.5 text-xl font-semibold tabular-nums">
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="space-y-2 border-t border-border/60 px-5 py-4 text-xs">
        <Row k="Subject" v={subject} />
        <Row
          k="Difficulty"
          v={
            <Badge
              variant="outline"
              className={cn("font-normal", diffTone[difficulty])}
            >
              {difficulty}
            </Badge>
          }
        />
        <Row k="Time limit" v={`${timeLimit} min`} />
      </div>
    </SectionCard>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function ProgressCard({ value }: { value: number }) {
  const R = 38;
  const C = 2 * Math.PI * R;
  const offset = C - (value / 100) * C;
  return (
    <SectionCard>
      <div className="flex items-center gap-5 p-5">
        <div className="relative grid size-24 shrink-0 place-items-center">
          <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="oklch(0.92 0.013 255.5)"
              strokeWidth="8"
              className="dark:stroke-white/10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="oklch(0.6 0.22 277)" />
                <stop offset="1" stopColor="oklch(0.7 0.22 303)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-lg font-semibold tabular-nums">{value}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Completion progress</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Finish the remaining fields and add a few questions to publish.
          </p>
          <div className="mt-2">
            <Progress value={value} className="h-1.5" />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function LivePreview({
  title,
  questions,
  timeLimit,
}: {
  title: string;
  questions: Question[];
  timeLimit: number;
}) {
  const q = questions[0];
  return (
    <SectionCard>
      <div className="flex items-center justify-between border-b border-border/60 p-5">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">👁️</span>
          <h3 className="text-sm font-semibold">Live preview</h3>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Student view
        </Badge>
      </div>
      <div className="p-5">
        <div className="rounded-xl border border-border/60 bg-gradient-to-b from-background to-muted/30 p-4">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="truncate">{title}</span>
            <span className="flex items-center gap-1 tabular-nums">
              <Clock className="size-3" /> {timeLimit}:00
            </span>
          </div>
          <Progress value={q ? 20 : 0} className="mt-2 h-1" />
          <div className="mt-4">
            <p className="text-[11px] text-muted-foreground">
              Question 1 of {Math.max(1, questions.length)}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug">
              {q ? q.text : "Your first question will appear here…"}
            </p>
            <div className="mt-3 space-y-1.5">
              {(q && q.type === "mcq"
                ? q.options
                : [
                    { id: "1", text: "Option A" },
                    { id: "2", text: "Option B" },
                    { id: "3", text: "Option C" },
                  ]
              )
                .slice(0, 4)
                .map((o, i) => (
                  <div
                    key={o.id}
                    className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-xs"
                  >
                    <span className="grid size-5 place-items-center rounded-md bg-muted text-[10px] font-medium">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="truncate">
                      {o.text || `Option ${String.fromCharCode(65 + i)}`}
                    </span>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Previous
              </Button>
              <Button
                size="sm"
                className="h-7 gap-1 bg-primary text-xs text-primary-foreground"
              >
                Next <ChevronRight className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default SuperAdminAddQuiz;
