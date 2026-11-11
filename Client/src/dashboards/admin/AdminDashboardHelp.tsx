import React from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

const helpSections = [
  {
    title: "Getting Started",
    icon: Rocket,
    accent: "from-sky-500 to-cyan-500",
    items: [
      "Review the Overview tab to monitor platform health and key metrics.",
      "Use Students, Universities, and Subjects tabs to manage academic structures.",
      "Upload resources from the Upload tab and organize them by subject and grade.",
    ],
  },
  {
    title: "Managing Students",
    icon: Users,
    accent: "from-violet-500 to-fuchsia-500",
    items: [
      "Search students by name or email using the search bar.",
      "Filter by student type and verification status.",
      "Track verified vs. unverified accounts using the stat cards.",
    ],
  },
  {
    title: "Managing Content",
    icon: BookOpen,
    accent: "from-amber-500 to-orange-500",
    items: [
      "Add and edit subjects in the Subjects tab.",
      "Register universities and manage locations.",
      "Upload notes, exams, and modules with proper metadata.",
    ],
  },
  {
    title: "Security & Access",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-500",
    items: [
      "Only authorized admins can upload or delete resources.",
      "Review audit logs and security tabs for sensitive actions.",
      "Keep credentials and API keys stored in environment variables only.",
    ],
  },
];

const faqs = [
  {
    question: "Why is a resource not showing for students?",
    answer:
      "Ensure the resource has the correct education level, grade, and subject. Check that the file was uploaded successfully to storage.",
  },
  {
    question: "How do I reset a student's access?",
    answer:
      "Use the Users management tools to review account status. Verification and role changes are handled through the admin services.",
  },
  {
    question: "Where can I see platform analytics?",
    answer:
      "Open the Analytics tab for performance metrics, usage trends, and reporting insights.",
  },
];

export const AdminDashboardHelp: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl dark:border-white/10 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-100 backdrop-blur">
              <HelpCircle className="h-4 w-4 text-sky-300" />
              Help Center
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Admin Help & Documentation
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Everything you need to manage SuccessBridge efficiently, from
              onboarding students to publishing learning resources.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:support@successbridge.com"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Feedback
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {helpSections.map((section) => (
          <Card
            key={section.title}
            className="overflow-hidden rounded-2xl border-slate-200/70 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${section.accent} text-white shadow-lg`}
                >
                  <section.icon className="h-5 w-5" />
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {section.title}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden rounded-2xl border-slate-200/70 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-slate-500" />
            <span>Frequently Asked Questions</span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-slate-200/70 bg-white/90 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <CardBody className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Upload Resources
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add files with metadata
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border-slate-200/70 bg-white/90 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <CardBody className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Manage Academics
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Subjects, grades, streams
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="rounded-2xl border-slate-200/70 bg-white/90 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
          <CardBody className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Support Students
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verify and assist learners
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};