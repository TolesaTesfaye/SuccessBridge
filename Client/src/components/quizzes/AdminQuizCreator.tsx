import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Input, Textarea, Label, Badge, Progress, Slider, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Collapsible, CollapsibleContent, CollapsibleTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/common";
import { cn } from "@/lib/utils";
import { quizService, Quiz } from "@services/quizService";
import { subjectService } from "@services/subjectService";
import type { Subject } from "@types";
import { Plus, Trash2, Save, X, ChevronDown, BookOpen, Clock, Target, Layers, Trophy, Hash, Pencil, ListChecks, AlignLeft, FileText, Settings2, CheckCircle2, Circle, GraduationCap, Search } from "lucide-react";
import { UNIVERSITIES, DEPARTMENTS, UNIVERSITY_CATEGORIES } from "@utils/constants";
import { useAuth } from "@hooks/useAuth";

type QType = "mcq" | "short" | "essay";
type Difficulty = "Easy" | "Medium" | "Hard";

interface DraftQuestion {
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

const diffTone: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const typeMeta: Record<QType, { label: string; icon: React.ReactNode }> = {
  mcq: { label: "Multiple Choice", icon: <ListChecks className="size-3.5" /> },
  short: { label: "Short Answer", icon: <AlignLeft className="size-3.5" /> },
  essay: { label: "Essay", icon: <FileText className="size-3.5" /> },
};

interface AdminQuizCreatorProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminQuizCreator: React.FC<AdminQuizCreatorProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [existingQuizzes, setExistingQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showExistingQuizzes, setShowExistingQuizzes] = useState(true);

  const [educationLevel, setEducationLevel] = useState<"high_school" | "university">("high_school");
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

  const [qType, setQType] = useState<QType>("mcq");
  const [qText, setQText] = useState("");
  const [qOptions, setQOptions] = useState<{ id: string; text: string }[]>([
    { id: newId(), text: "" }, { id: newId(), text: "" }, { id: newId(), text: "" }, { id: newId(), text: "" },
  ]);
  const [qCorrect, setQCorrect] = useState<string | undefined>();
  const [qPoints, setQPoints] = useState(5);
  const [qDifficulty, setQDifficulty] = useState<Difficulty>("Medium");
  const [qExplanation, setQExplanation] = useState("");
  const [qTags, setQTags] = useState("");
  const [qTime, setQTime] = useState(45);
  const [settingsOpen, setSettingsOpen] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setQuizzesLoading(true);
        const data = await quizService.getAll();
        setExistingQuizzes(data);
        const list = await subjectService.getSubjects();
        setSubjectsList(list);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setQuizzesLoading(false);
      }
    };
    load();
  }, []);

  const selectedSubject = useMemo(() => subjectsList.find((s) => s.id === subjectId), [subjectsList, subjectId]);
  const subjectName = selectedSubject ? selectedSubject.name : "None";

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

  useEffect(() => { setSubjectId(""); }, [educationLevel, grade, stream, departmentId]);

  const totals = useMemo(() => {
    const total = questions.length;
    const points = questions.reduce((a, q) => a + q.points, 0);
    const seconds = questions.reduce((a, q) => a + q.timeEstimate, 0);
    return { total, points, mins: Math.max(1, Math.round(seconds / 60)) };
  }, [questions]);

  const completion = Math.min(100, Math.round(
    (title.trim() ? 15 : 0) + (description.trim() ? 10 : 0) + (subjectId ? 10 : 0) + Math.min(65, questions.length * 10),
  ));

  const addQuestion = () => {
    if (!qText.trim()) return;
    const q: DraftQuestion = {
      id: newId(), type: qType, text: qText.trim(),
      options: qType === "mcq" ? qOptions.filter((o) => o.text.trim()) : [],
      correctId: qType === "mcq" ? qCorrect : undefined,
      points: qPoints, difficulty: qDifficulty, explanation: qExplanation,
      tags: qTags.split(",").map((t) => t.trim()).filter(Boolean), timeEstimate: qTime,
    };
    setQuestions((qs) => [...qs, q]);
    setQText(""); setQExplanation(""); setQTags(""); setQCorrect(undefined);
    setQOptions([{ id: newId(), text: "" }, { id: newId(), text: "" }, { id: newId(), text: "" }, { id: newId(), text: "" }]);
  };

  const handlePublish = async () => {
    if (!title.trim()) { alert("Quiz title is required"); return; }
    if (!subjectId) { alert("Please select a target subject"); return; }
    if (questions.length === 0) { alert("Please add at least one question"); return; }
    if (educationLevel === "high_school") {
      if (!grade) { alert("Please select a target grade"); return; }
      if (["grade_11", "grade_12"].includes(grade) && !stream) { alert("Please select a stream for Grade 11 or 12"); return; }
    } else {
      if (!universityId) { alert("Please select a target university"); return; }
      if (!category) { alert("Please select a student category"); return; }
      if (["senior", "gc"].includes(category) && !departmentId) { alert("Please select a department for Senior / GC students"); return; }
    }

    setLoading(true);
    try {
      const formattedQuestions = questions.map((q) => {
        let answerText = "";
        if (q.type === "mcq") {
          const correctOpt = q.options.find((o) => o.id === q.correctId);
          answerText = correctOpt ? correctOpt.text : "";
        } else {
          answerText = q.explanation || "";
        }
        return {
          id: q.id, text: q.text,
          type: q.type === "mcq" ? "multiple_choice" : q.type === "short" ? "short_answer" : "essay",
          options: q.type === "mcq" ? q.options.map((o) => o.text).filter(Boolean) : [],
          correctAnswer: answerText, points: q.points || 5,
        };
      });

      await quizService.create({
        title: title.trim(), description: description.trim(), educationLevel,
        grade: educationLevel === "high_school" ? grade : category || undefined,
        stream: educationLevel === "high_school" && ["grade_11", "grade_12"].includes(grade) ? stream : undefined,
        university: educationLevel === "university" ? universityId : undefined,
        department: educationLevel === "university" && ["senior", "gc"].includes(category) ? departmentId : undefined,
        subjectId, questions: formattedQuestions as any, timeLimit: timeLimit || 30, passingScore: passing || 60,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err?.response?.data?.error || err?.message || "Failed to publish quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizService.delete(quizId);
      setExistingQuizzes((qs) => qs.filter((q) => q.id !== quizId));
      setDeleteConfirmId(null);
    } catch (err: any) {
      alert(err?.message || "Failed to delete quiz");
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
    const draft: DraftQuestion[] = (quiz.questions || []).map((q: any) => {
      const opts: { id: string; text: string }[] = (q.options || []).map((o: string, i: number) => ({ id: `opt_${i}_${newId()}`, text: o }));
      const correctOption = opts.find((o) => o.text === q.correctAnswer);
      return {
        id: q.id || newId(),
        type: q.type === "multiple_choice" ? "mcq" : q.type === "short_answer" ? "short" : "essay",
        text: q.text || "", options: opts, correctId: correctOption?.id, points: q.points || 5,
        difficulty: "Medium" as Difficulty, explanation: "", tags: [], timeEstimate: 60,
      };
    });
    setQuestions(draft);
    setShowExistingQuizzes(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create New Quiz</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Build engaging assessments for students</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" onClick={handlePublish} loading={loading} className="h-12 px-6 rounded-2xl shadow-lg shadow-blue-500/20">
            <Save className="size-4 mr-2" /> Publish Quiz
          </Button>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <X className="size-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-7">
          {/* Existing Quizzes */}
          <SectionCard>
            <div className="border-b border-slate-200 dark:border-white/10 p-6">
              <button onClick={() => setShowExistingQuizzes(!showExistingQuizzes)} className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                    <ListChecks className="size-4" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-white">Manage Published Quizzes</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{existingQuizzes.length} quiz{existingQuizzes.length !== 1 ? "zes" : ""} published</p>
                  </div>
                </div>
                <ChevronDown className={cn("size-5 text-slate-400 transition-transform", showExistingQuizzes && "rotate-180")} />
              </button>
            </div>
            {showExistingQuizzes && (
              <div className="p-4 sm:p-6">
                {quizzesLoading ? (
                  <div className="py-8 text-center text-sm text-slate-400">Loading quizzes…</div>
                ) : existingQuizzes.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-400">No quizzes published yet.</div>
                ) : (
                  <div className="space-y-3">
                    {existingQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 p-4 transition-all hover:border-blue-500/30">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{quiz.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{quiz.description || "No description"}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <Badge variant="outline" className="text-[10px]">{quiz.questions?.length || 0} Qs</Badge>
                            <Badge variant="outline" className="text-[10px]">Pass: {quiz.passingScore}%</Badge>
                            <Badge variant="outline" className="text-[10px]">{quiz.timeLimit}m</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="secondary" size="sm" onClick={() => { handleEditQuiz(quiz); }}>
                            <Pencil className="mr-1 size-3.5" /> Edit
                          </Button>
                          {quiz.createdBy === currentUserId ? (
                            deleteConfirmId === quiz.id ? (
                              <div className="flex items-center gap-1">
                                <Button variant="secondary" size="sm" onClick={() => handleDeleteQuiz(quiz.id)}>Confirm</Button>
                                <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(quiz.id)} className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-500/10">
                                <Trash2 className="size-3.5" />
                              </Button>
                            )
                          ) : (
                            <span className="text-[10px] text-slate-400 italic px-2">locked</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          {/* Quiz Details */}
          <SectionCard>
            <div className="border-b border-slate-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quiz Details</h2>
                  <p className="text-xs text-slate-500">Core information shown to students</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <FloatingField label="Quiz title">
                  <Input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 80))} placeholder="e.g. Grade 10 — Algebra mid-term" className="h-11" />
                </FloatingField>
              </div>
              <div className="md:col-span-2">
                <FloatingField label="Description" hint="A short summary shown on the student dashboard.">
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, 240))} placeholder="Describe what this quiz covers…" className="min-h-[88px] resize-none" />
                </FloatingField>
              </div>
              <FloatingField label="Education level">
                <Select value={educationLevel} onValueChange={(v) => setEducationLevel(v as "high_school" | "university")}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </FloatingField>
              {educationLevel === "high_school" ? (
                <>
                  <FloatingField label="Grade">
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade_9">Grade 9</SelectItem>
                        <SelectItem value="grade_10">Grade 10</SelectItem>
                        <SelectItem value="grade_11">Grade 11</SelectItem>
                        <SelectItem value="grade_12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </FloatingField>
                  {["grade_11", "grade_12"].includes(grade) && (
                    <FloatingField label="Stream">
                      <Select value={stream} onValueChange={setStream}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
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
                    <Select value={universityId} onValueChange={setUniversityId}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select university" /></SelectTrigger>
                      <SelectContent>
                        {UNIVERSITIES.map((u) => (<SelectItem key={u} value={u}>{u}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </FloatingField>
                  <FloatingField label="Student Category">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.keys(UNIVERSITY_CATEGORIES).map((c) => (
                          <SelectItem key={c} value={c}>{(UNIVERSITY_CATEGORIES as any)[c].label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FloatingField>
                  {["senior", "gc"].includes(category) && (
                    <FloatingField label="Department Group">
                      <Select value={departmentId} onValueChange={setDepartmentId}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.keys(DEPARTMENTS).map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </FloatingField>
                  )}
                </>
              )}
              <FloatingField label="Subject / Module">
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select a subject" /></SelectTrigger>
                  <SelectContent>
                    {getDynamicSubjects().length === 0 ? (
                      <SelectItem value="no_subjects" disabled>No subjects found</SelectItem>
                    ) : (
                      getDynamicSubjects().map((s) => (<SelectItem key={s.id} value={s.id}>{s.name} ({s.code})</SelectItem>))
                    )}
                  </SelectContent>
                </Select>
              </FloatingField>
              <FloatingField label="Difficulty">
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </FloatingField>
              <FloatingField label="Time limit (minutes)">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 px-3 py-2">
                  <Clock className="size-4 text-slate-400" />
                  <Input type="number" min={1} value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value) || 0)} className="h-7 border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent" />
                  <span className="text-xs text-slate-400">min</span>
                </div>
              </FloatingField>
              <FloatingField label={`Passing score - ${passing}%`}>
                <div className="px-1 pt-3">
                  <Slider value={[passing]} onValueChange={(v) => setPassing(v[0])} min={0} max={100} step={5} />
                </div>
              </FloatingField>
            </div>
          </SectionCard>

          {/* Question Composer */}
          <SectionCard>
            <div className="border-b border-slate-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600">
                  <Pencil className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Question Composer</h2>
                  <p className="text-xs text-slate-500">Craft a question with answer choices</p>
                </div>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <Textarea value={qText} onChange={(e) => setQText(e.target.value)} placeholder="Type your question here…" className="min-h-[100px] resize-none text-base" />

              <div className="flex flex-wrap items-center gap-3">
                {(["mcq", "short", "essay"] as QType[]).map((t) => (
                  <button key={t} onClick={() => setQType(t)}
                    className={cn("flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all",
                      qType === t ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-200" : "border-slate-200 dark:border-white/10 text-slate-500 hover:border-slate-300 dark:hover:border-white/20")}>
                    {typeMeta[t].icon} {typeMeta[t].label}
                  </button>
                ))}
              </div>

              {qType === "mcq" && (
                <div className="space-y-3">
                  {qOptions.map((opt, idx) => {
                    const selected = qCorrect === opt.id;
                    return (
                      <div key={opt.id} className={cn("flex items-center gap-3 rounded-xl border p-3 transition-all",
                        selected ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20" : "border-slate-200 dark:border-white/10")}>
                        <button onClick={() => setQCorrect(opt.id)}
                          className={cn("grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                            selected ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white dark:bg-slate-700")}>
                          {selected ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3 opacity-0" />}
                        </button>
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-slate-100 dark:bg-slate-700 text-[11px] font-medium text-slate-500">{String.fromCharCode(65 + idx)}</span>
                        <Input value={opt.text} onChange={(e) => setQOptions((arr) => arr.map((o) => o.id === opt.id ? { ...o, text: e.target.value } : o))}
                          placeholder={`Option ${String.fromCharCode(65 + idx)}`} className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0" />
                        <button onClick={() => setQOptions((arr) => arr.length > 2 ? arr.filter((o) => o.id !== opt.id) : arr)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="size-3.5" /></button>
                      </div>
                    );
                  })}
                  <Button variant="secondary" size="sm" onClick={() => setQOptions((arr) => [...arr, { id: newId(), text: "" }])}>
                    <Plus className="size-3.5 mr-1" /> Add option
                  </Button>
                </div>
              )}

              {qType === "short" && (
                <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800/30 p-6 text-center">
                  <AlignLeft className="mx-auto mb-2 size-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Short answer input</p>
                  <p className="text-xs text-slate-400">Students will type a 1–3 sentence response.</p>
                </div>
              )}

              {qType === "essay" && (
                <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800/30 p-6 text-center">
                  <FileText className="mx-auto mb-2 size-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Essay response</p>
                  <p className="text-xs text-slate-400">Students write a long-form answer evaluated manually.</p>
                </div>
              )}

              <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/30 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50">
                    <span className="flex items-center gap-2"><Settings2 className="size-4 text-slate-400" /> Question Settings</span>
                    <ChevronDown className={cn("size-4 text-slate-400 transition-transform", settingsOpen && "rotate-180")} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-3 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/30 p-4 md:grid-cols-3">
                    <FloatingField label="Points">
                      <Input type="number" min={0} value={qPoints} onChange={(e) => setQPoints(Number(e.target.value) || 0)} className="h-10" />
                    </FloatingField>
                    <FloatingField label="Difficulty">
                      <Select value={qDifficulty} onValueChange={(v) => setQDifficulty(v as Difficulty)}>
                        <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FloatingField>
                    <FloatingField label="Time estimate (sec)">
                      <Input type="number" min={5} value={qTime} onChange={(e) => setQTime(Number(e.target.value) || 0)} className="h-10" />
                    </FloatingField>
                    <div className="md:col-span-2">
                      <FloatingField label="Explanation (shown after submission)">
                        <Textarea value={qExplanation} onChange={(e) => setQExplanation(e.target.value)} placeholder="Why is the correct answer correct?" className="min-h-[60px] resize-none" />
                      </FloatingField>
                    </div>
                    <FloatingField label="Tags" hint="Comma separated">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800/50 px-3">
                        <Hash className="size-4 text-slate-400" />
                        <Input value={qTags} onChange={(e) => setQTags(e.target.value)} placeholder="algebra, equations" className="h-10 border-0 p-0 shadow-none focus-visible:ring-0 bg-transparent" />
                      </div>
                    </FloatingField>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex justify-end">
                <Button onClick={addQuestion} disabled={!qText.trim()} className="h-12 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 rounded-2xl shadow-lg shadow-blue-500/20">
                  <Plus className="size-4" /> Add Question
                </Button>
              </div>
            </div>
          </SectionCard>

          {/* Questions Library */}
          <SectionCard>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
                  <Layers className="size-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Questions Library</h2>
                  <p className="text-xs text-slate-500">{questions.length} question{questions.length !== 1 && "s"}</p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {questions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800/30 p-12 text-center">
                  <GraduationCap className="mx-auto size-10 text-slate-300 dark:text-slate-600" />
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">No questions added yet</h3>
                  <p className="mt-1 text-sm text-slate-500">Create your first question using the composer above.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="flex gap-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 p-4 transition-all hover:border-blue-500/30">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-500">{String(idx + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-slate-900 dark:text-white">{q.text}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge variant="outline" className="gap-1 font-normal">{typeMeta[q.type].icon}{typeMeta[q.type].label}</Badge>
                          <Badge variant="outline" className={cn("font-normal", diffTone[q.difficulty])}>{q.difficulty}</Badge>
                          <Badge variant="outline" className="gap-1 font-normal"><Trophy className="size-3" />{q.points} pts</Badge>
                          <Badge variant="outline" className="gap-1 font-normal"><Clock className="size-3" />~{q.timeEstimate}s</Badge>
                          {q.tags.slice(0, 2).map((t) => (<Badge key={t} variant="secondary" className="font-normal">#{t}</Badge>))}
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        <button onClick={() => setQuestions((qs) => { const found = qs.find((x) => x.id === q.id); return found ? [...qs, { ...found, id: newId() }] : qs; })}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                          <CopyIcon className="size-3.5" />
                        </button>
                        <button onClick={() => setQuestions((qs) => qs.filter((x) => x.id !== q.id))}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-6 space-y-6">
            {/* Summary Card */}
            <SectionCard>
              <div className="border-b border-slate-200 dark:border-white/10 p-5">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quiz Summary</h3>
                <p className="text-xs text-slate-500">Live overview of this assessment</p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5">
                {[
                  { label: "Questions", value: totals.total, icon: <Layers className="size-4" /> },
                  { label: "Total Points", value: totals.points, icon: <Trophy className="size-4" /> },
                  { label: "Est. Duration", value: `${totals.mins}m`, icon: <Clock className="size-4" /> },
                  { label: "Passing", value: `${passing}%`, icon: <Target className="size-4" /> },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/30 p-3">
                    <div className="flex items-center gap-1.5 text-slate-400"><span className="text-[11px] uppercase tracking-wider">{m.label}</span></div>
                    <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-slate-200 dark:border-white/10 px-5 py-4 text-xs">
                <Row k="Subject" v={subjectName} />
                <Row k="Difficulty" v={<Badge variant="outline" className={cn("font-normal", diffTone[difficulty])}>{difficulty}</Badge>} />
                <Row k="Time limit" v={`${timeLimit} min`} />
              </div>
            </SectionCard>

            {/* Progress Card */}
            <SectionCard>
              <div className="flex items-center gap-5 p-5">
                <div className="relative grid size-24 shrink-0 place-items-center">
                  <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(0.92 0.013 255.5)" strokeWidth="8" className="dark:stroke-white/10" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ringGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 38}
                      strokeDashoffset={2 * Math.PI * 38 - (completion / 100) * 2 * Math.PI * 38} className="transition-all duration-700" />
                    <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="oklch(0.6 0.22 277)" /><stop offset="1" stopColor="oklch(0.7 0.22 303)" /></linearGradient></defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white tabular-nums">{completion}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Completion Progress</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Add questions and fill details to publish.</p>
                  <div className="mt-2"><Progress value={completion} className="h-1.5" /></div>
                </div>
              </div>
            </SectionCard>
          </div>
        </aside>
      </div>
    </div>
  );
};

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm", className)}>
      {children}
    </div>
  );
}

function FloatingField({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium text-slate-900 dark:text-white">{v}</span>
    </div>
  );
}
