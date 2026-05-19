import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'

export const About: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">

      {/* ── Hero ── */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-slate-50 dark:bg-[#0a0f1c]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-600 to-indigo-600 blur-[100px] rounded-full mix-blend-screen opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500 to-blue-500 blur-[100px] rounded-full mix-blend-screen opacity-40" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] md:text-xs font-semibold uppercase tracking-widest mb-5 md:mb-7">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            About SuccessBridge
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-5 md:mb-7 leading-tight">
            Empowering Ethiopian Students
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              With World-Class Learning
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            SuccessBridge is a fully-featured digital learning ecosystem purpose-built for students
            across Ethiopian high schools and universities — bridging the gap between aspiration and
            achievement with premium content, smart assessments, and accelerated progress tracking.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                SuccessBridge was founded to democratize education in Ethiopia by removing the
                barriers that prevent hardworking students from accessing the study materials, expert
                instruction, and personalized feedback they need to succeed academically.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                By consolidating nationwide exam past papers, freshman-year common courseware,
                faculty-level digital modules, quiz engines with automated scoring, and detailed
                analytics — into one single sign-on, student-first platform — we empower thousands of
                learners to study smarter, track progress consistently, and enter their exams with
                genuine confidence.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="text-sm sm:text-base italic text-slate-700 dark:text-slate-300">
                  &ldquo;Education is the foundation of progress — and technology is its greatest
                  equalizer.&rdquo;
                </p>
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "1M+", label: "Student Capacity" },
                { stat: "10K+", label: "Active Learners" },
                { stat: "50+", label: "Universities" },
                { stat: "12K+", label: "Resources Online" },
              ].map(({ stat, label }) => (
                <div
                  key={stat}
                  className="p-4 md:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 text-center hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 transition-all group"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    {stat}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Values ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
            What Drives Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "🎓",
                title: "Academic Excellence",
                description:
                  "Partnering with faculty and subject-matter experts across Ethiopia's leading universities to produce rigorously reviewed, curriculum-aligned content that students can trust.",
              },
              {
                icon: "🔓",
                title: "Universal Accessibility",
                description:
                  "SuccessBridge is free at its core. Every motivated student — regardless of income, geography, or institution — deserves the same opportunity to reach their full academic potential.",
              },
              {
                icon: "🚀",
                title: "Innovation First",
                description:
                  "Our team is continuously building: from AI-powered personalized recommendations, adaptive quiz algorithms, to real-time performance dashboards that show every student their path forward.",
              },
              {
                icon: "🌍",
                title: "Ethiopia-First",
                description:
                  "Built specifically for the Ethiopian National Curriculum, the EUEE & EHEECE exams, and the structures of African universities. We don't translate — we localize from the ground up.",
              },
              {
                icon: "🛡️",
                title: "Privacy & Security",
                description:
                  "Authentication is handled by Supabase, passwords are hashed with bcrypt, and data in transit is protected with TLS. Nodemailer-powered transactional emails keep users informed, never spammed.",
              },
              {
                icon: "🔧",
                title: "Open Roadmap",
                description:
                  "The AI Tutor, mentorship system, student discussion forum, recommendation engine and more are already planned. The platform is modular, extensible, and grows with every release.",
              },
            ].map(({ icon, title, description }) => (
              <div
                key={title}
                className="p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 text-center mb-3 md:mb-4">
            Under the Hood
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
            SuccessBridge is built on a modern, production-grade technology stack combining
            a React 18 + TypeScript frontend with a secure Node.js backend.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                label: "Frontend",
                color: "from-blue-500 to-sky-500",
                techs: ["React 18", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "Vite"],
              },
              {
                label: "Backend",
                color: "from-emerald-500 to-teal-500",
                techs: ["Node.js", "Express", "TypeScript", "Sequelize ORM", "PostgreSQL", "Redis"],
              },
              {
                label: "Infrastructure",
                color: "from-violet-500 to-purple-500",
                techs: ["Docker", "Kubernetes", "Cloudflare CDN", "Backblaze B2", "GitHub Actions"],
              },
              {
                label: "Security",
                color: "from-amber-500 to-orange-500",
                techs: ["JWT Auth", "bcryptjs", "CORS", "Rate Limiting", "TLS / HTTPS"],
              },
            ].map(({ label, color, techs }) => (
              <div
                key={label}
                className="p-4 md:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 text-white font-black text-xs`}
                >
                  {label.slice(0, 2)}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {label}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {techs.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 text-center mb-3 md:mb-4">
            Meet the Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
            SuccessBridge is built and maintained by a passionate group of technologists and
            educators committed to student success in Ethiopia.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                initials: "AB",
                name: "Abebe Kebede",
                role: "Founder & CEO",
                description:
                  "Leading SuccessBridge's vision to bring world-class digital education to every Ethiopian student.",
                colors: "from-blue-500 to-sky-600",
              },
              {
                initials: "AT",
                name: "Almaz Tadesse",
                role: "Head of Content",
                description:
                  "Curating high-quality, curriculum-aligned educational resources for every subject and grade level.",
                colors: "from-violet-500 to-purple-600",
              },
              {
                initials: "TT",
                name: "Tolesa Tesfaye",
                role: "Head of Technology",
                description:
                  "Architecting the full-stack platform — React, Node.js, PostgreSQL, and Redis — with a focus on security and scalability.",
                colors: "from-emerald-500 to-teal-600",
              },
            ].map(({ initials, name, role, description, colors }) => (
              <div
                key={name}
                className="p-6 md:p-7 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-center hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-18 h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-br ${colors} flex items-center justify-center text-white text-xl md:text-2xl font-black mx-auto mb-3.5 group-hover:scale-105 transition-transform`}
                >
                  {initials}
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {name}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2.5">
                  {role}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 text-center mb-3 md:mb-4">
            Platform Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
            Beyond learning materials — SuccessBridge is a complete academic toolchain built to
            support every stage of a student's journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                icon: "📚",
                title: "Curated Educational Resources",
                bullets: ["High-quality PDFs & worksheets", "Video lectures across all subjects", "Summary notes & study guides", "Past national exam archives"],
              },
              {
                icon: "🧠",
                title: "Adaptive Smart Quizzes",
                bullets: ["Dynamically generated question banks", "Adaptive difficulty settings", "Instant scoring & explanations", "Performance-based recommendations"],
              },
              {
                icon: "📊",
                title: "Deep Progress Analytics",
                bullets: ["Dashboard & trend charts", "Subject-by-subject breakdowns", "Goal setting & milestones", "Automated progress tracking"],
              },
              {
                icon: "🧭",
                title: "Personalized Learning Paths",
                bullets: ["Hierarchical content organization", "Stream → Subject → Chapter routing", "AI-powered recommendations", "Adaptive module suggestions"],
              },
              {
                icon: "🎓",
                title: "Multi-Role Dashboard",
                bullets: ["Student learning dashboard", "Admin resource & quiz management", "Super Admin university & user oversight", "Role-based content visibility"],
              },
              {
                icon: "💳",
                title: "Payment & Subscription Tracking",
                bullets: ["Track your subscription status", "Payment history & invoices", "Plan management interface", "Transparent billing"],
              },
            ].map(({ icon, title, bullets }) => (
              <div
                key={title}
                className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 mb-2.5">
                  {title}
                </h3>
                <ul className="space-y-1.5">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">&#x2022;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-[#0a0f1c] transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 md:mb-6 leading-tight">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Your Academic Journey?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of Ethiopian students already using SuccessBridge to master new subjects,
            ace their entrance exams, and build the academic foundation for a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Button
              variant="primary"
              onClick={() => navigate("/register")}
              className="px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-bold rounded-full bg-blue-600 hover:bg-blue-500 text-white"
            >
              Create Free Account
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-bold rounded-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
