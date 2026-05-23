import React, { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { subjectService, Subject } from "@services/subjectService";
import { AIService, ChatMessage, QuizQuestion } from "@services/aiService";
import api from "@services/api";
import {
  Sparkles,
  MessageSquare,
  HelpCircle,
  Clipboard,
  BookOpen,
  Calendar,
  Send,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Download,
  Save,
  Check,
} from "lucide-react";

// Native Markdown Renderer in React for simple, safe parsing of headers, lists, code, and bold text
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeContent: string[] = [];

  return (
    <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
      {lines.map((line, idx) => {
        // Handle code blocks
        if (line.trim().startsWith("```")) {
          if (inCodeBlock) {
            inCodeBlock = false;
            const code = codeContent.join("\n");
            codeContent = [];
            return (
              <pre
                key={idx}
                className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg overflow-x-auto font-mono text-xs border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 my-2"
              >
                <code>{code}</code>
              </pre>
            );
          } else {
            inCodeBlock = true;
            return null;
          }
        }

        if (inCodeBlock) {
          codeContent.push(line);
          return null;
        }

        const trimmed = line.trim();

        // Handle headers
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-1"
            >
              {trimmed.substring(4)}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3
              key={idx}
              className="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2 border-b border-slate-200 dark:border-slate-800 pb-1"
            >
              {trimmed.substring(3)}
            </h3>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h2
              key={idx}
              className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3"
            >
              {trimmed.substring(2)}
            </h2>
          );
        }

        // Handle checklists
        if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
          const checked = trimmed.startsWith("- [x] ");
          return (
            <div key={idx} className="flex items-start gap-2 my-1">
              <input
                type="checkbox"
                checked={checked}
                readOnly
                className="mt-1 accent-indigo-500 rounded cursor-default"
              />
              <span>{trimmed.substring(6)}</span>
            </div>
          );
        }

        // Handle bullet points
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-2">
              <span className="text-indigo-500 mt-1.5">•</span>
              <span>{trimmed.substring(2)}</span>
            </div>
          );
        }

        // Handle ordered list
        const matchNumbered = trimmed.match(/^(\d+)\.\s(.*)/);
        if (matchNumbered) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-2">
              <span className="text-indigo-500 font-semibold">
                {matchNumbered[1]}.
              </span>
              <span>{matchNumbered[2]}</span>
            </div>
          );
        }

        // Handle empty line
        if (trimmed === "") {
          return <div key={idx} className="h-2" />;
        }

        // Render paragraph with inline bold text (**text**)
        const parts = [];
        let cursor = 0;
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > cursor) {
            parts.push(line.substring(cursor, match.index));
          }
          parts.push(
            <strong
              key={match.index}
              className="font-semibold text-slate-900 dark:text-white"
            >
              {match[1]}
            </strong>,
          );
          cursor = boldRegex.lastIndex;
        }
        if (cursor < line.length) {
          parts.push(line.substring(cursor));
        }

        return <p key={idx}>{parts}</p>;
      })}
    </div>
  );
};

export const StudentAICompanion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "chat" | "explain" | "quiz" | "summarize" | "study-plan"
  >("chat");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load available subjects for quiz generation
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const list = await subjectService.getSubjects();
        setSubjects(list);
      } catch (err) {
        console.error("Failed to load subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerDownload = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // ----------------------------------------------------
  // TAB 1: BridgeBot Chat State & Methods
  // ----------------------------------------------------
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content:
        "Hi! I'm BridgeBot, your academic helper. Ask me any conceptual question, query about a subject, or homework topic!",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await AIService.chat([...chatMessages, userMsg]);
      setChatMessages((prev) => [
        ...prev,
        { role: "model", content: response },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to connect to the AI tutor.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // TAB 2: Concept Explainer State & Methods
  // ----------------------------------------------------
  const [explainerConcept, setExplainerConcept] = useState("");
  const [explainerSubject, setExplainerSubject] = useState("");
  const [explainerStyle, setExplainerStyle] = useState<
    "simple" | "analogy" | "deep_dive"
  >("simple");
  const [explainerResult, setExplainerResult] = useState<string | null>(null);

  const handleGenerateExplanation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explainerConcept.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setExplainerResult(null);

    try {
      const explanation = await AIService.explainConcept(
        explainerConcept,
        explainerSubject || undefined,
        explainerStyle,
      );
      setExplainerResult(explanation);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to generate concept explanation.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // TAB 3: Quiz Generator State & Methods
  // ----------------------------------------------------
  const [quizTopic, setQuizTopic] = useState("");
  const [quizSubjectId, setQuizSubjectId] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("medium");
  const [quizQuestionCount, setQuizQuestionCount] = useState(5);

  // Generated Quiz states
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>(
    [],
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Saving states
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTopic.trim() || !quizSubjectId || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setGeneratedQuestions([]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setSaveSuccess(false);

    const subjectObj = subjects.find((s) => s.id === quizSubjectId);
    const subjectName = subjectObj ? subjectObj.name : "General Study";
    setSaveTitle(`Quiz: ${quizTopic}`);
    setSaveDescription(
      `AI generated ${quizDifficulty} quiz about ${quizTopic}.`,
    );

    try {
      const questions = await AIService.generateQuiz(
        quizTopic,
        subjectName,
        quizDifficulty,
        quizQuestionCount,
      );
      setGeneratedQuestions(questions);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to generate AI quiz. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, option: string) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    if (generatedQuestions.length === 0 || quizSubmitted) return;

    let correctCount = 0;
    generatedQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round(
      (correctCount / generatedQuestions.length) * 100,
    );
    setQuizScore(percent);
    setQuizSubmitted(true);
  };

  const handleSaveQuizToDB = async () => {
    if (generatedQuestions.length === 0 || savingQuiz || !quizSubjectId) return;

    setSavingQuiz(true);
    setErrorMsg(null);

    try {
      // Re-map generated questions to match database expected format (where questions has options, points, type, text, correctAnswer)
      const dbQuestions = generatedQuestions.map((q, idx) => ({
        id: `q-${idx}`,
        text: q.text,
        type: "multiple_choice",
        options: q.options,
        correctAnswer: q.correctAnswer,
        points: q.points || 10,
      }));

      const payload = {
        title: saveTitle || `AI Quiz - ${quizTopic}`,
        description: saveDescription || `AI generated quiz about ${quizTopic}.`,
        subjectId: quizSubjectId,
        questions: dbQuestions,
        timeLimit: 20, // default time limit in minutes
        passingScore: 60,
        educationLevel: "university", // default
      };

      await api.post("/quizzes", payload);
      setSaveSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to save quiz to your database.",
      );
    } finally {
      setSavingQuiz(false);
    }
  };

  // ----------------------------------------------------
  // TAB 4: Lesson Summarizer State & Methods
  // ----------------------------------------------------
  const [summarizerText, setSummarizerText] = useState("");
  const [summarizerMaxLength, setSummarizerMaxLength] = useState(250);
  const [summarizerResult, setSummarizerResult] = useState<string | null>(null);

  const handleGenerateSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summarizerText.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setSummarizerResult(null);

    try {
      const summary = await AIService.summarizeText(
        summarizerText,
        summarizerMaxLength,
      );
      setSummarizerResult(summary);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to generate text summary.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // TAB 5: Study Planner State & Methods
  // ----------------------------------------------------
  const [planTopic, setPlanTopic] = useState("");
  const [planWeeks, setPlanWeeks] = useState(4);
  const [planHours, setPlanHours] = useState(2);
  const [planLevel, setPlanLevel] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [planResult, setPlanResult] = useState<string | null>(null);

  const handleGenerateStudyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planTopic.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setPlanResult(null);

    try {
      const plan = await AIService.generateStudyPlan(
        planTopic,
        planWeeks,
        planHours,
        planLevel,
      );
      setPlanResult(plan);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.userFriendlyError?.message ||
          err.userFriendlyError ||
          err.response?.data?.error ||
          "Failed to generate study plan.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Main Rendering
  // ----------------------------------------------------
  return (
    <DashboardLayout title="">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-10 space-y-4 sm:space-y-6">
        {/* Banner with modern dark/light gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white p-4 sm:p-6 md:p-10 shadow-xl border border-indigo-500/20">
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="space-y-1 sm:space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-black/20 rounded-full text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 animate-pulse" />
                <span className="text-xs sm:text-sm">
                  SuccessBridge AI Tutor
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">
                Your Academic AI Companion
              </h1>
              <p className="text-indigo-100 dark:text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Powered by Google Gemini. Instantly explain concepts, run custom
                quizzes, summarize lesson notes, and build tailored study
                schedules.
              </p>
            </div>
            <div className="hidden lg:flex w-full md:w-24 justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
                <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-indigo-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating error toast */}
        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 sm:p-4 rounded-xl flex items-start gap-3 shadow-md animate-fade-in text-sm">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 hidden sm:block" />
            <div className="flex-1">
              <span className="font-semibold">AI Service Notice:</span>{" "}
              {errorMsg}
            </div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-300 text-xs font-semibold flex-shrink-0 whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar scroll-smooth gap-0.5 sm:gap-1">
          {[
            { id: "chat", label: "Chat", icon: MessageSquare },
            { id: "explain", label: "Explain", icon: HelpCircle },
            { id: "quiz", label: "Quiz", icon: Clipboard },
            { id: "summarize", label: "Summary", icon: BookOpen },
            { id: "study-plan", label: "Plan", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setErrorMsg(null);
                }}
                className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 border-b-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`}
                />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Tabs Container */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[600px] sm:min-h-[700px] transition-all">
          {/* ----------------------------------------------------
              TAB 1: BridgeBot Chat UI
             ---------------------------------------------------- */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-[60vh] sm:h-[500px] max-h-[calc(100vh-300px)]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/20 custom-scrollbar">
                {chatMessages.map((msg, index) => {
                  const isBot = msg.role === "model";
                  return (
                    <div
                      key={index}
                      className={`flex gap-2 sm:gap-3 ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      {/* Avatar */}
                      {isBot && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-indigo-600 text-white shadow-md">
                          🤖
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl ${
                          isBot
                            ? "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-md"
                        }`}
                      >
                        {isBot ? (
                          <MarkdownRenderer content={msg.content} />
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        )}
                      </div>

                      {/* User Avatar */}
                      {!isBot && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                          👤
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading state indicator */}
                {loading && (
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 animate-pulse">
                      🤖
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-1">
                        Typing...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSendChatMessage}
                className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={loading}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white disabled:opacity-50 transition"
                />
                <button
                  type="submit"
                  disabled={loading || !chatInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center justify-center font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-h-[44px] min-w-[44px]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 2: Concept Explainer UI
             ---------------------------------------------------- */}
          {activeTab === "explain" && (
            <div className="p-4 sm:p-6 space-y-6">
              <form
                onSubmit={handleGenerateExplanation}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Concept Name
                  </label>
                  <input
                    type="text"
                    value={explainerConcept}
                    onChange={(e) => setExplainerConcept(e.target.value)}
                    placeholder="e.g. Recursion, Photosynthesis"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={explainerSubject}
                    onChange={(e) => setExplainerSubject(e.target.value)}
                    placeholder="e.g. Mathematics, Biology"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Style
                  </label>
                  <select
                    value={explainerStyle}
                    onChange={(e) => setExplainerStyle(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option value="simple">Simple</option>
                    <option value="analogy">Analogy</option>
                    <option value="deep_dive">Deep Dive</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading || !explainerConcept.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-h-[44px]"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span className="hidden xs:inline">Explain</span>
                  </button>
                </div>
              </form>

              {/* Explainer Result Display */}
              {explainerResult && (
                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest break-words">
                      Explanation: {explainerConcept}
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => triggerCopy(explainerResult)}
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          triggerDownload(
                            `explanation-${explainerConcept}.md`,
                            explainerResult,
                          )
                        }
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Download Markdown"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <MarkdownRenderer content={explainerResult} />
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 3: Quiz Generator UI
             ---------------------------------------------------- */}
          {activeTab === "quiz" && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Form Input (Show only if quiz questions not loaded or user wants to generate new) */}
              {generatedQuestions.length === 0 && (
                <form
                  onSubmit={handleGenerateQuiz}
                  className="space-y-4 max-w-4xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Academic Subject
                      </label>
                      <select
                        value={quizSubjectId}
                        onChange={(e) => setQuizSubjectId(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        required
                      >
                        <option value="">-- Choose Subject --</option>
                        {subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Difficulty
                      </label>
                      <select
                        value={quizDifficulty}
                        onChange={(e) =>
                          setQuizDifficulty(e.target.value as any)
                        }
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Topic / Chapter
                      </label>
                      <input
                        type="text"
                        value={quizTopic}
                        onChange={(e) => setQuizTopic(e.target.value)}
                        placeholder="e.g. Linear Algebra, Cellular Respiration"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Questions
                      </label>
                      <select
                        value={quizQuestionCount}
                        onChange={(e) =>
                          setQuizQuestionCount(parseInt(e.target.value, 10))
                        }
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                      >
                        <option value={3}>3 Questions</option>
                        <option value={5}>5 Questions</option>
                        <option value={8}>8 Questions</option>
                        <option value={10}>10 Questions</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !quizTopic.trim() || !quizSubjectId}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md min-h-[48px]"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Generate Interactive Quiz
                  </button>
                </form>
              )}

              {/* Interactive Quiz Active Execution UI */}
              {generatedQuestions.length > 0 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Header Title */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4 gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white capitalize">
                        {quizTopic} Quiz
                      </h2>
                      <p className="text-slate-500 text-xs mt-0.5">
                        Difficulty:{" "}
                        <span className="font-semibold uppercase text-indigo-500">
                          {quizDifficulty}
                        </span>{" "}
                        • {generatedQuestions.length} Questions
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setGeneratedQuestions([]);
                        setQuizSubmitted(false);
                      }}
                      className="px-3 sm:px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap min-h-[44px] flex items-center"
                    >
                      Generate New Quiz
                    </button>
                  </div>

                  {/* Score Banner (Post submission) */}
                  {quizSubmitted && (
                    <div
                      className={`p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-3 sm:gap-4 text-white shadow-lg ${
                        quizScore >= 70
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                          : quizScore >= 50
                            ? "bg-gradient-to-r from-amber-500 to-orange-600"
                            : "bg-gradient-to-r from-rose-500 to-red-600"
                      }`}
                    >
                      <div className="text-3xl sm:text-4xl flex-shrink-0">
                        {quizScore >= 70 ? "🎉" : quizScore >= 50 ? "⚡" : "📚"}
                      </div>
                      <div className="text-center md:text-left space-y-1 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold">
                          Quiz Results Submitted!
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90">
                          You scored{" "}
                          <span className="text-white font-extrabold text-base sm:text-lg">
                            {quizScore}%
                          </span>
                          . Passed{" "}
                          {Math.round(
                            (quizScore / 100) * generatedQuestions.length,
                          )}{" "}
                          out of {generatedQuestions.length} questions.
                        </p>
                      </div>

                      {/* Save to database options */}
                      <div className="md:ml-auto w-full md:w-auto flex flex-col items-stretch gap-2">
                        {saveSuccess ? (
                          <div className="bg-white/20 border border-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1 whitespace-nowrap">
                            <Check className="w-3.5 h-3.5" /> Saved!
                          </div>
                        ) : (
                          <button
                            onClick={handleSaveQuizToDB}
                            disabled={savingQuiz}
                            className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold py-2 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm disabled:opacity-50 min-h-[44px]"
                          >
                            {savingQuiz ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Save className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">
                              Save to "My Quizzes"
                            </span>
                            <span className="sm:hidden">Save</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Render Question List */}
                  <div className="space-y-4 sm:space-y-6">
                    {generatedQuestions.map((q, qIdx) => {
                      const selected = selectedAnswers[q.id];
                      const isCorrect = selected === q.correctAnswer;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                            quizSubmitted
                              ? isCorrect
                                ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50"
                                : selected
                                  ? "bg-rose-50/50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/50"
                                  : "bg-slate-50 dark:bg-slate-850/50 border-slate-200 dark:border-slate-800"
                              : selected
                                ? "bg-indigo-50/20 border-indigo-200 dark:border-indigo-800"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          {/* Question text */}
                          <div className="flex gap-2 items-start mb-4">
                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-2.5 py-1 rounded text-xs flex-shrink-0 min-w-fit">
                              Q{qIdx + 1}
                            </span>
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base leading-snug break-words">
                              {q.text}
                            </h3>
                          </div>

                          {/* Options Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pl-0 sm:pl-8">
                            {q.options.map((opt, optIdx) => {
                              const isOptSelected = selected === opt;
                              const isOptCorrect = opt === q.correctAnswer;

                              // Background coloring for quiz-results state
                              let optStyles =
                                "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                              if (isOptSelected) {
                                optStyles =
                                  "bg-indigo-50 border-indigo-400 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-600 dark:text-indigo-400";
                              }

                              if (quizSubmitted) {
                                if (isOptCorrect) {
                                  optStyles =
                                    "bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-400 font-semibold";
                                } else if (isOptSelected) {
                                  optStyles =
                                    "bg-rose-50 border-rose-400 text-rose-800 dark:bg-rose-950/40 dark:border-rose-600 dark:text-rose-400 line-through";
                                } else {
                                  optStyles =
                                    "opacity-60 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() => handleAnswerSelect(q.id, opt)}
                                  disabled={quizSubmitted}
                                  className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors min-h-[44px] ${optStyles}`}
                                >
                                  <span className="break-words flex-1">
                                    {opt}
                                  </span>
                                  {quizSubmitted && isOptCorrect && (
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                  )}
                                  {quizSubmitted &&
                                    isOptSelected &&
                                    !isOptCorrect && (
                                      <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                                    )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submission triggers */}
                  {!quizSubmitted && (
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800 gap-3">
                      <p className="text-slate-500 text-xs font-semibold order-2 sm:order-1">
                        {Object.keys(selectedAnswers).length} of{" "}
                        {generatedQuestions.length} questions answered
                      </p>

                      <button
                        onClick={handleSubmitQuiz}
                        disabled={
                          Object.keys(selectedAnswers).length <
                          generatedQuestions.length
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md w-full sm:w-auto order-1 sm:order-2 min-h-[48px]"
                      >
                        Submit Answers
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 4: Lesson Summarizer UI
             ---------------------------------------------------- */}
          {activeTab === "summarize" && (
            <div className="p-4 sm:p-6 space-y-6">
              <form onSubmit={handleGenerateSummary} className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Lesson Notes / Article
                    </label>
                    <span className="text-slate-500 text-xs">
                      {summarizerText.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={summarizerText}
                    onChange={(e) => setSummarizerText(e.target.value)}
                    placeholder="Paste your lesson content, lecture notes, or article here..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Length:
                    </span>
                    <select
                      value={summarizerMaxLength}
                      onChange={(e) =>
                        setSummarizerMaxLength(parseInt(e.target.value, 10))
                      }
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    >
                      <option value={100}>Ultra short</option>
                      <option value={250}>Standard</option>
                      <option value={500}>Detailed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !summarizerText.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md min-h-[44px] whitespace-nowrap"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span className="hidden xs:inline">Summarize</span>
                  </button>
                </div>
              </form>

              {/* Summarizer Result Display */}
              {summarizerResult && (
                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      AI Generated Summary
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => triggerCopy(summarizerResult)}
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          triggerDownload("notes-summary.md", summarizerResult)
                        }
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Download Markdown"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <MarkdownRenderer content={summarizerResult} />
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              TAB 5: Study Planner UI
             ---------------------------------------------------- */}
          {activeTab === "study-plan" && (
            <div className="p-4 sm:p-6 space-y-6">
              <form
                onSubmit={handleGenerateStudyPlan}
                className="space-y-4 max-w-4xl"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Target Topic or Goal
                  </label>
                  <input
                    type="text"
                    value={planTopic}
                    onChange={(e) => setPlanTopic(e.target.value)}
                    placeholder="e.g. Master React, Prepare for calculus exam"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Duration
                    </label>
                    <select
                      value={planWeeks}
                      onChange={(e) =>
                        setPlanWeeks(parseInt(e.target.value, 10))
                      }
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    >
                      <option value={2}>2 Weeks</option>
                      <option value={4}>4 Weeks</option>
                      <option value={8}>8 Weeks</option>
                      <option value={12}>12 Weeks</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Daily Hours
                    </label>
                    <select
                      value={planHours}
                      onChange={(e) =>
                        setPlanHours(parseInt(e.target.value, 10))
                      }
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    >
                      <option value={1}>1 hour</option>
                      <option value={2}>2 hours</option>
                      <option value={3}>3 hours</option>
                      <option value={5}>5 hours</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Skill Level
                    </label>
                    <select
                      value={planLevel}
                      onChange={(e) => setPlanLevel(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !planTopic.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md min-h-[48px]"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Calendar className="w-4 h-4" />
                  )}
                  Generate Study Plan
                </button>
              </form>

              {/* Study Plan Result Display */}
              {planResult && (
                <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      Your Study Plan
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => triggerCopy(planResult)}
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          triggerDownload(
                            `studyplan-${planTopic}.md`,
                            planResult,
                          )
                        }
                        className="p-2 sm:p-1.5 text-slate-500 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
                        title="Download Markdown"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <MarkdownRenderer content={planResult} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Chat Button - Mobile Only */}
      <button
        onClick={() => setActiveTab("chat")}
        className="fixed bottom-4 right-4 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40"
        title="Chat with AI"
        aria-label="Open AI chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </DashboardLayout>
  );
};

export default StudentAICompanion;
