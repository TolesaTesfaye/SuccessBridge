import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Shield,
  Eye,
  Lock,
  Database,
  User,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";

/* ── Scroll–Reveal ── */
function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(
      "[data-reveal]",
    );
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            const delay = Number(target.dataset.delay || 0);
            setTimeout(() => target.classList.add("reveal-visible"), delay);
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* ── Section nav items ── */
const SECTIONS = [
  { id: "s1",  label: "Overview" },
  { id: "s2",  label: "Info We Collect" },
  { id: "s3",  label: "How We Use Data" },
  { id: "s4",  label: "No Data Sales" },
  { id: "s5",  label: "Your Rights" },
  { id: "s6",  label: "Security" },
  { id: "s7",  label: "Cookies" },
  { id: "s8",  label: "3rd-Party Services" },
  { id: "s9",  label: "Children's Privacy" },
  { id: "s10", label: "Policy Changes" },
  { id: "s11", label: "Contact Us" },
];

function useSectionSpy() {
  const [active, setActive] = useState("s1");
  useEffect(() => {
    const ids = SECTIONS.map((s) => `#${s.id}`);
    const els = ids
      .map((sel) => document.querySelector(sel) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.35, rootMargin: "-100px 0px -40% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ════════════════════════════════════════════ */
export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const revealRef = useReveal();
  const activeSection = useSectionSpy();

  return (
    <div ref={revealRef} className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">

      {/* ── HERO ── */}
      <section className="w-full relative pt-20 pb-8 md:pt-32 md:pb-14 overflow-hidden bg-gradient-to-br from-[#0c1929] via-[#0e2038] to-[#0c1929]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-sky-500/8 rounded-full blur-[140px]" />
        </div>
        <div className="relative z-10 w-full">
          <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto reveal-hero">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] md:text-xs font-semibold uppercase tracking-widest mb-5 md:mb-7">
              <Shield className="w-3.5 h-3.5" />
              Legal Document
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 md:mb-7 leading-tight tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Your trust is important to us. This policy explains exactly what
              data SuccessBridge collects, how it is used, stored, and protected
              \u2014 and which rights you hold over it.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Last updated: June 2026 &nbsp;&bull;&nbsp; Effective: 1 June 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky Section Nav (desktop) ── */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <nav className="space-y-1.5">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              title={label}
              className={`block w-2 h-2 rounded-full transition-all duration-200 toc-dot ${
                activeSection === id
                  ? "bg-sky-500 scale-150 shadow-lg shadow-sky-500/50"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-sky-400 hover:scale-125"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* ═══════════ CONTENT ═══════════ */}
      <section className="w-full py-14 sm:py-20 lg:py-28 bg-white dark:bg-[#0e2038]">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-10 lg:space-y-14">

            {/* §1 Overview */}
            <div
              id="s1"
              data-reveal
              data-delay="0"
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border-2 border-sky-200 dark:border-sky-800/30 hover:border-sky-300/50 dark:hover:border-sky-700/40 transition-all duration-300"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                  1
                </span>
                Privacy at a Glance
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                SuccessBridge (
                <strong className="text-sky-600 dark:text-sky-400">
                  successbridge.edu.et
                </strong>
                ) operates the SuccessBridge educational platform. This Privacy
                Policy describes our policies regarding the collection, use, and
                disclosure of personal information when you use our Service, and
                the choices you have regarding that data.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                We use your data exclusively to deliver and improve the
                educational experience. We{" "}
                <strong className="text-sky-600 dark:text-sky-400">
                  never sell, rent, or trade
                </strong>{" "}
                your personal data to third parties for marketing purposes.
              </p>
            </div>

            {/* §2 Information We Collect */}
            <div id="s2" data-reveal data-delay="80">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                Information We Collect
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
                {[
                  {
                    title: "Account Data",
                    badge: "sky",
                    items: [
                      "Full name and email address",
                      "Password stored as bcrypt hash",
                      "Role: student, admin, or super admin",
                      "Registration date and account status",
                    ],
                  },
                  {
                    title: "Profile Data",
                    badge: "violet",
                    items: [
                      "Profile photo and display name",
                      "Education level and stream",
                      "Faculty, department and student ID",
                      "Verification badge status",
                    ],
                  },
                  {
                    title: "Usage Data",
                    badge: "emerald",
                    items: [
                      "Resource views, clicks, and downloads",
                      "Quiz attempts with full timestamps",
                      "Topics completed per session",
                      "Device, browser, OS, and IP address",
                    ],
                  },
                  {
                    title: "System & Security",
                    badge: "amber",
                    items: [
                      "Session tokens and OAuth records",
                      "Password reset and 2FA verification",
                      "Nodemailer email delivery logs",
                      "Rate-limit events and audit entries",
                    ],
                  },
                ].map(({ title, badge, items }) => {
                  const colorMap: Record<string, string> = {
                    sky: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/30",
                    violet: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800/30",
                    emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30",
                    amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30",
                  };
                  const dotMap: Record<string, string> = {
                    sky: "bg-sky-500",
                    violet: "bg-violet-500",
                    emerald: "bg-emerald-500",
                    amber: "bg-amber-500",
                  };
                  return (
                    <div
                      key={title}
                      data-reveal
                      data-delay="100"
                      className={`p-5 md:p-6 rounded-2xl border ${colorMap[badge]} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className={`w-2 h-2 rounded-full ${dotMap[badge]} mb-3`} />
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200 mb-3 uppercase tracking-wide">
                        {title}
                      </h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300"
                          >
                            <span className="text-sky-500 mt-0.5 text-xs shrink-0">
                              &#x25C6;
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* §3 How We Use */}
            <div id="s3" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                How We Use Your Information
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm md:text-base">
                We use collected data strictly for the following legitimate
                purposes:
              </p>
              <div className="space-y-3">
                {[
                  {
                    p: "Authentication & Access",
                    d: "Verify your identity via Supabase-managed sessions and JWT tokens so only you can access your account and progress data.",
                  },
                  {
                    p: "Personalisation",
                    d: "Surface the right resources, quiz levels, and recommendations based on your study history, grade, and stream.",
                  },
                  {
                    p: "Platform Improvement",
                    d: "Analyse aggregate usage patterns to identify broken flows, slow pages, and unmet needs via React Query metrics.",
                  },
                  {
                    p: "Communication",
                    d: "Send transactional emails \u2014 welcome messages, password resets, study reminders \u2014 via Nodemailer only.",
                  },
                  {
                    p: "Security & Compliance",
                    d: "Detect unauthorised access attempts, rate-limit abusive traffic via Redis, and maintain audit logs.",
                  },
                  {
                    p: "Content Moderation",
                    d: "Admin-submitted resources are reviewed and linked back to their uploader for accountability.",
                  },
                ].map(({ p, d }, i) => (
                  <div
                    key={p}
                    data-reveal
                    data-delay={i * 50}
                    className="flex gap-4 p-4 md:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-sky-300/50 dark:hover:border-sky-700/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm">
                      &#x2B24;
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">
                        {p}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* §4 No Data Sales */}
            <div
              id="s4"
              data-reveal
              className="p-6 sm:p-8 rounded-2xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800/30"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-red-900 dark:text-red-300 mb-4">
                We Do NOT Sell Your Data
              </h2>
              <p className="text-red-800 dark:text-red-300 leading-relaxed mb-5 text-sm md:text-base">
                SuccessBridge will never sell, rent, license, or trade your
                personal data to any third party. Period — regardless of
                platform growth, funding rounds, or mergers.
              </p>
              <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                {[
                  "With your consent: when you explicitly opt-in to a feature, you remain fully in control.",
                  "For legal obligations: we share only what Ethiopian or international law legally mandates.",
                  "Trusted providers: Backblaze B2 (storage), Nodemailer (email), Supabase (auth) — each bound by strict agreements.",
                  "Security incidents: shared only when necessary to prevent fraud or abuse.",
                ].map((t, i) => (
                  <p key={i} className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">\u2022</span>
                    <span>{t}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* §5 Your Rights */}
            <div id="s5" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <User className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                Your Rights
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { e: "\u{1F441}", title: "Access", desc: "Request a full copy of the personal data we hold about you." },
                  { e: "\u270F\uFE0F", title: "Correction", desc: "Update or correct any inaccurate information in your profile." },
                  { e: "\u{1F5D1}", title: "Deletion", desc: "Exercise your right to erasure and have your account fully deleted." },
                  { e: "\u{1F4E6}", title: "Portability", desc: "Receive your data in a machine-readable format." },
                  { e: "\u{1F515}", title: "Opt-Out", desc: "Disable non-essential email notifications at any time from settings." },
                  { e: "\u{1F6AB}", title: "Restrict", desc: "Request that we limit how your data is processed in specific situations." },
                ].map(({ e, title, desc }, i) => (
                  <div
                    key={title}
                    data-reveal
                    data-delay={i * 50}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-center hover:shadow-lg hover:-translate-y-1 hover:border-sky-300/50 dark:hover:border-sky-700/30 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl mb-2.5">{e}</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* §6 Security */}
            <div id="s6" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                Data Security
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm md:text-base">
                We implement industry-standard safeguards across all layers of
                the platform:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  "HTTPS/TLS encryption on all live connections",
                  "JWT tokens with HTTP-only cookie storage",
                  "bcryptjs with high work-factor password hashing",
                  "Rate limiting via Redis to prevent abuse",
                  "CORS policy restricting cross-origin requests",
                  "Encrypted file storage via Backblaze B2",
                  "Role-based access controls on every API route",
                  "Cloudflare CDN with WAF edge protection",
                ].map((item, i) => (
                  <div
                    key={item}
                    data-reveal
                    data-delay={i * 40}
                    className="flex items-start gap-2.5 p-3.5 md:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0 text-xs md:text-sm">
                      &#x2713;
                    </span>
                    <span className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* §7 Cookies */}
            <div id="s7" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                Cookies &amp; Tracking
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  {
                    title: "Essential",
                    desc: "Auth tokens and CSRF guards. Cannot be disabled.",
                    badge: "red",
                  },
                  {
                    title: "Analytics",
                    desc: "Anonymous page-load & engagement metrics.",
                    badge: "blue",
                  },
                  {
                    title: "Preferences",
                    desc: "Dark-mode toggle, language & notification choices.",
                    badge: "emerald",
                  },
                  {
                    title: "Third-Party",
                    desc: "YouTube embeds & share buttons may set their own cookies.",
                    badge: "amber",
                  },
                ].map(({ title, desc, badge }, i) => {
                  const badgeMap: Record<string, string> = {
                    red: "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400",
                    blue: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400",
                    emerald: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                    amber: "bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400",
                  };
                  return (
                    <div
                      key={title}
                      data-reveal
                      data-delay={i * 60}
                      className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 ${badgeMap[badge]}`}
                      >
                        {title}
                      </span>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* §8 Third-Party */}
            <div id="s8" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
                Third-Party Services
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm md:text-base">
                SuccessBridge is integrated with the following external services,
                each of which has its own privacy policy.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Supabase",        use: "Authentication & user management" },
                  { name: "Backblaze B2",    use: "File upload and cloud storage" },
                  { name: "Nodemailer / SMTP", use: "Transactional email delivery" },
                  { name: "PostgreSQL",      use: "Application data persistence" },
                  { name: "Redis",           use: "Rate limiting and session caching" },
                  { name: "Cloudflare",      use: "Edge content delivery &amp; WAF" },
                  { name: "YouTube",         use: "Embedded educational video content" },
                  { name: "OpenAPI / Swagger", use: "Developer API documentation" },
                ].map((r, i) => (
                  <div
                    key={r.name}
                    data-reveal
                    data-delay={i * 40}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/40 hover:border-sky-200/50 dark:hover:border-sky-800/30 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {r.name}
                    </span>
                     <span
                      className="text-[11px] text-slate-500 dark:text-slate-400 text-right hidden sm:block"
                    >
                      {r.use}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* §9 Children */}
            <div id="s9" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5">
                Children&apos;s Privacy
              </h2>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  SuccessBridge is designed for secondary and tertiary students
                  (generally ages 14 and above). We do not knowingly collect
                  personal data from children under 13 without verifiable
                  parental consent. If you believe your child has registered
                  without consent, please contact us immediately at{" "}
                  <a
                    href="mailto:privacy@successbridge.edu.et"
                    className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                  >
                    privacy@successbridge.edu.et
                  </a>
                  \u2014 we will delete that account within 48 hours.
                </p>
              </div>
            </div>

            {/* §10 Changes */}
            <div id="s10" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5">
                Changes to This Policy
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  SuccessBridge may update this Privacy Policy from time to time
                  to reflect changes in our practices, platform features, or
                  applicable regulations. When we make material changes we will:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    "Display a banner on the site for 30 days",
                    "Send an email alert to all registered users",
                    "Update the \u2018Last updated\u2019 date at the top of this page",
                  ].map((item, i) => (
                    <div
                      key={item}
                      data-reveal
                      data-delay={i * 60}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-sm text-slate-900 dark:text-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* §11 Contact */}
            <div id="s11" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <Mail className="w-8 h-8 text-sky-500 dark:text-sky-400 shrink-0" />
                Contact Us
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800/30">
                <p className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-sm md:text-base">
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy, contact our Data Protection Team directly:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Email",
                      value: "privacy@successbridge.edu.et",
                      href: "mailto:privacy@successbridge.edu.et",
                    },
                    {
                      label: "General Support",
                      value: "support@successbridge.edu.et",
                      href: "mailto:support@successbridge.edu.et",
                    },
                    {
                      label: "Phone",
                      value: "+251 (0) 911 234 567",
                      href: "tel:+251911234567",
                    },
                    { label: "Address", value: "Addis Ababa, Ethiopia", href: null },
                  ].map(({ label, value, href }) => (
                    <div
                      key={label}
                      className="p-3.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-slate-700/50 hover:shadow-sm transition-all duration-200"
                    >
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                          {value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
              We&apos;re committed to protecting your personal data and building
              a platform you can trust. Have questions? Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-full bg-white text-sky-700 shadow-lg shadow-white/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-full border-2 border-white/20 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                &larr; Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom footer bar ── */}
      <div className="w-full py-6 sm:py-8 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 text-[10px] md:text-xs text-slate-500 dark:text-slate-500">
            <p className="tracking-wider text-center sm:text-left">
              &copy; {new Date().getFullYear()} SUCCESSBRIDGE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                to="/contact"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors tracking-wider"
              >
                Support
              </Link>
              <a
                href="https://github.com/TolesaTesfaye"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors tracking-wider"
              >
                API Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ STYLES ═══════════ */}
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease-out, transform 0.6s ease-out;
        }
        [data-reveal].reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-hero > * {
          opacity: 0;
          transform: translateY(20px);
          animation: hero-in 0.65s ease-out forwards;
        }
        .reveal-hero > *:nth-child(1) { animation-delay: 0.05s; }
        .reveal-hero > *:nth-child(2) { animation-delay: 0.20s; }
        .reveal-hero > *:nth-child(3) { animation-delay: 0.35s; }
        @keyframes hero-in {
          to { opacity: 1; transform: translateY(0); }
        }

        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};
