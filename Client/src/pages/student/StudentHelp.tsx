import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  CreditCard,
  HelpCircle,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageSquare,
  PenTool,
  ShieldCheck,
} from "lucide-react";

const helpChannels = [
  {
    title: "Message the system owner",
    description:
      "You can communicate directly with the system owner from your Chats tab. Start a private conversation any time.",
    action: "Open chats",
    icon: ShieldCheck,
    accent: "from-slate-700 to-slate-900 dark:from-blue-500 dark:to-indigo-600",
    to: "/student/communication",
  },
  {
    title: "Support tickets",
    description:
      "Open a private ticket and chat directly with your admin or super admin team.",
    action: "Open support",
    icon: LifeBuoy,
    accent: "from-blue-500 to-indigo-600",
    to: "/student/communication?tab=support",
  },
  {
    title: "Announcements",
    description:
      "Platform updates, schedule changes, and important notices from the SuccessBridge team.",
    action: "View announcements",
    icon: Megaphone,
    accent: "from-violet-500 to-fuchsia-600",
    to: "/student/communication?tab=announcements",
  },
  {
    title: "Send a message",
    description:
      "Share a question, idea, or comment through the contact form. It reaches the team directly.",
    action: "Open contact form",
    icon: Mail,
    accent: "from-emerald-500 to-teal-600",
    to: "/contact",
  },
];

const systemSections = [
  {
    title: "Learning resources",
    icon: BookOpen,
    body: "Notes, exams, and modules are organized by education level, grade, subject, and chapter.",
  },
  {
    title: "Quizzes & practice",
    icon: PenTool,
    body: "Practice with quizzes, get instant scores, and revisit any topic you want to strengthen.",
  },
  {
    title: "Progress tracking",
    icon: BarChart3,
    body: "Follow your study streak, quiz history, and subject-by-subject progress in one place.",
  },
  {
    title: "Payments & access",
    icon: CreditCard,
    body: "Submit payment requests and track approval. Subjects unlock once your payment is approved.",
  },
  {
    title: "Communication",
    icon: MessageSquare,
    body: "Message your admin team, follow announcements, and keep every support thread in one inbox.",
  },
  {
    title: "Privacy & security",
    icon: ShieldCheck,
    body: "Your account is protected with secure sign-in, and support conversations stay private.",
  },
];

const faqs = [
  {
    question: "How do I get access to my subjects?",
    answer:
      "Access is granted by your admin or super admin after your payment is approved. If a subject is still locked, open Payments, submit the payment request, and track its status from the same page.",
  },
  {
    question: "Where do I find notes, exams, and modules?",
    answer:
      "Your dashboard opens the resource hub for your education level. Resources are grouped by grade, subject, and chapter so you can move straight to what you need.",
  },
  {
    question: "Why did a resource or quiz not open?",
    answer:
      "Most content unlocks with the access package assigned to your account. If something stays locked after your payment is approved, send a support ticket with the subject name and we will check it.",
  },
  {
    question: "How do I contact an admin or the super admin?",
    answer:
      "Open Communication and choose the Support tab, then create a ticket or reply on an existing one. Replies from the team arrive in the same thread, and you can also reach them from this Help page.",
  },
  {
    question: "Can I message the system owner directly?",
    answer:
      "Yes. In Communication, open the Chats tab and select “Message the system owner”. You can communicate directly with the system owner in a private conversation.",
  },
  {
    question: "How do I update my name, photo, or password?",
    answer:
      "Open My Profile from the sidebar to update your details and password. If you need to change your email address, send a support ticket so the team can verify and update it for you.",
  },
  {
    question: "Where can I see my results?",
    answer:
      "Open Progress from the sidebar. It shows your quiz history, scores, study streak, and subject progress.",
  },
  {
    question: "Are my messages private?",
    answer:
      "Yes. Direct messages and support tickets are only visible to you and the people in that conversation.",
  },
];

export const StudentHelp: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <DashboardLayout
      title="Help & Support"
      subtitle="Answers about SuccessBridge, plus a direct line to your admin team"
    >
      <div className="mx-auto w-full max-w-6xl space-y-3 md:space-y-6">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-blue-500/20 md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-50">
                <HelpCircle className="h-3.5 w-3.5" />
                Help Center
              </span>
              <h1 className="font-display text-xl font-black tracking-tight md:text-3xl">
                How can we help you today?
              </h1>
              <p className="max-w-xl text-xs leading-relaxed text-blue-50/90 md:text-sm">
                Learn how the system works, find answers to common questions,
                and reach your admin or super admin when you need a hand.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate("/student/communication?tab=support")
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm transition-all hover:bg-blue-50 active:scale-95 md:text-sm"
              >
                <LifeBuoy className="h-4 w-4" />
                Message support
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate("/student/communication?tab=announcements")
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20 md:text-sm"
              >
                <Megaphone className="h-4 w-4" />
                Announcements
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3 md:gap-4">
          {helpChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.title}
                type="button"
                onClick={() => navigate(channel.to)}
                className="group flex h-full flex-col items-start gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-[#263653] dark:bg-[#101A32]/70 dark:hover:border-blue-500/40 md:p-5"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${channel.accent} text-white shadow-sm md:h-10 md:w-10`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {channel.title}
                </span>
                <span className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {channel.description}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[11px] font-bold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                  {channel.action}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-[#263653] dark:bg-[#101A32]/70 md:p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white md:text-base">
              About SuccessBridge
            </h2>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 md:text-sm">
            SuccessBridge brings your study material, practice, progress, and
            support into one place.
          </p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 md:gap-3">
            {systemSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400" />
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 md:text-sm">
                      {section.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 md:text-xs">
                    {section.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-[#263653] dark:bg-[#101A32]/70 md:p-6">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white md:text-base">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-3 divide-y divide-slate-200/80 dark:divide-[#263653]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="py-2 md:py-2.5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 md:text-sm">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-1.5 pr-7 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 md:text-xs">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-blue-200/70 bg-blue-50/70 p-3 shadow-sm dark:border-blue-500/20 dark:bg-blue-500/10 md:flex-row md:items-center md:justify-between md:p-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white md:text-base">
              Still need help?
            </h2>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-xs">
              Your admins and super admins monitor Communication. Open a ticket
              and the team will reply in the same thread.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate("/student/communication?tab=support")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95 md:text-sm"
            >
              <LifeBuoy className="h-4 w-4" />
              Open a ticket
            </button>
            <button
              type="button"
              onClick={() => navigate("/student/profile")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#263653] dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/5 md:text-sm"
            >
              My profile
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentHelp;
