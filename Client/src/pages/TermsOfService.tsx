import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Copyright,
  AlertTriangle,
  Scale,
  Mail,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@components/common/Button";

/* ── Scroll-Reveal ── */
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
            const t = e.target as HTMLElement;
            const delay = Number(t.dataset.delay || 0);
            setTimeout(() => t.classList.add("reveal-visible"), delay);
            io.unobserve(t);
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

/* ── TOC ── */
const TOC_ITEMS = [
  { id: "s1",  label: "Acceptance" },
  { id: "s2",  label: "Eligibility" },
  { id: "s3",  label: "Account & Security" },
  { id: "s4",  label: "Permitted Use" },
  { id: "s5",  label: "Prohibited Use" },
  { id: "s6",  label: "Educational Content" },
  { id: "s7",  label: "Payments" },
  { id: "s8",  label: "Intellectual Property" },
  { id: "s9",  label: "Termination" },
  { id: "s10", label: "Disclaimer" },
  { id: "s11", label: "Limitation of Liability" },
  { id: "s12", label: "Governing Law" },
  { id: "s13", label: "Contact" },
];

function useSectionSpy() {
  const [active, setActive] = useState("s1");
  useEffect(() => {
    const els = TOC_ITEMS.map((t) => document.getElementById(t.id) as HTMLElement | null).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.35, rootMargin: "-100px 0px -40% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ════════════════════════════════════════════ */
export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  const revealRef = useReveal();
  const activeSection = useSectionSpy();


  return (
    <div ref={revealRef} className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">

      {/* ═══════ HERO ═══════ */}
      <section className="w-full relative pt-20 pb-8 md:pt-32 md:pb-14 overflow-hidden bg-gradient-to-br from-[#0c1929] via-[#111d35] to-[#0c1929]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/8 rounded-full blur-[140px]" />
        </div>
        <div className="relative z-10 w-full">
          <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto reveal-hero">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] md:text-xs font-semibold uppercase tracking-widest mb-5 md:mb-7">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal Document
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 md:mb-7 leading-tight tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Please read these Terms of Service carefully before using
              SuccessBridge. By creating an account or otherwise accessing the
              platform, you agree to be bound by these terms.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Last updated: June 2026 &nbsp;&bull;&nbsp; Effective: 1 June 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky Section Nav ── */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <nav className="space-y-1.5">
          {TOC_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              title={label}
              className={`block w-2 h-2 rounded-full transition-all duration-200 ${
                activeSection === id
                  ? "bg-indigo-500 scale-150 shadow-lg shadow-indigo-500/50"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 hover:scale-125"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* ═══════ SECTIONS ═══════ */}
      <section className="w-full py-14 sm:py-20 lg:py-28 bg-white dark:bg-[#0e1a30]">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-10 lg:space-y-14">

            {/* §1 */}
            <div
              id="s1"
              data-reveal
              data-delay="0"
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/20 border-2 border-indigo-200 dark:border-indigo-800/30 hover:border-indigo-300 dark:hover:border-indigo-700/40 transition-all duration-300"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                  1
                </span>
                Acceptance of Terms
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                By accessing or using{" "}
                <strong className="text-indigo-700 dark:text-indigo-300">
                  SuccessBridge
                </strong>{""}
                \u2014 including creating an account, uploading resources,
                completing quizzes, or making payments \u2014 you confirm that
                you have read, understood, and agree to be bound by these Terms
                of Service and our Privacy Policy.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                If you do not agree to these terms, you may not use SuccessBridge.
                We reserve the right to update or modify these terms at any
                time; continued use of the platform following any change
                constitutes acceptance of the revised terms.
              </p>
            </div>

            {/* §2 */}
            <div id="s2" data-reveal data-delay="80">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  2
                </span>
                Eligibility
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm md:text-base">
                SuccessBridge is designed for students, educators, and
                administrators in Ethiopia&apos;s education system. You may
                use the platform only if:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "You are at least 13 years old or have verifiable parental consent",
                  "You can form a legally binding contract under applicable law",
                  "You have not been previously suspended or removed from the platform",
                  "You will provide accurate and complete registration information",
                ].map((item, i) => (
                  <div
                    key={item}
                    data-reveal
                    data-delay={i * 50}
                    className="flex items-start gap-2.5 p-4 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-indigo-500 mt-0.5 flex-shrink-0">
                      &#x2022;
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* §3 */}
            <div id="s3" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  3
                </span>
                Account &amp; Security
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {[
                  {
                    title: "Credential Security",
                    desc: "Your password is hashed with bcrypt and never sent in plain text. Notify support immediately if you suspect unauthorised access.",
                  },
                  {
                    title: "Accurate Information",
                    desc: "You must provide truthful, current information during registration. Falsified identities may result in permanent account suspension.",
                  },
                  {
                    title: "Single Account",
                    desc: "You may only maintain one active account. Creating multiple accounts to circumvent limits is a direct violation of these terms.",
                  },
                  {
                    title: "Role &amp; Access Limits",
                    desc: "Admin privileges carry elevated responsibilities. Misuse of those privileges will trigger immediate revocation and legal review.",
                  },
                ].map(({ title, desc }, i) => (
                  <div
                    key={title}
                    data-reveal
                    data-delay={i * 60}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300/50 dark:hover:border-indigo-700/30 transition-all duration-300"
                  >
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* §4 Permitted */}
            <div id="s4" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  4
                </span>
                Permitted Use
              </h2>
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider mb-4">
                  With a valid account you are permitted to:
                </p>
                <ul className="space-y-2.5 text-sm text-emerald-700 dark:text-emerald-300">
                  {[
                    "Access all public learning resources at your education stream and level",
                    "Take quizzes, view explanations, and track your academic progress",
                    "Create and manage your personal student profile and settings",
                    "Purchase premium subscriptions through the payment module",
                    "Access promotion campaigns and féewaivers when applicable",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 hover:translate-x-1 transition-transform duration-150"
                    >
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* §5 Prohibited */}
            <div id="s5" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  5
                </span>
                Prohibited Use
              </h2>
              <div className="p-5 md:p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800/30">
                <p className="text-sm text-red-800 dark:text-red-300 font-bold uppercase tracking-wider mb-4">
                  The following activities are strictly forbidden:
                </p>
                <ul className="space-y-3 text-sm text-red-700 dark:text-red-300">
                  {[
                    "Uploading, distributing, or sharing pirated, plagiarised, or copyrighted content not owned by you",
                    "Reverse-engineering, decompiling, or attempting to extract source code or database schema",
                    "Using scrapers, bots, or automated tools to harvest data or abuse rate limits",
                    "Impersonating another learner, educator, or administrator",
                    "Modifying, removing, or obscuring copyright notices or branding on any platform component",
                    "Using SuccessBridge resources for commercial purposes without written authorisation",
                    "Intentionally degrading platform performance or exploiting security vulnerabilities",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 hover:translate-x-1 transition-transform duration-150"
                    >
                      <span className="text-red-500 mt-0.5 flex-shrink-0 font-black text-base">
                        &#x2717;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* §6 Educational Content */}
            <div id="s6" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  6
                </span>
                Educational Content &amp; Submissions
              </h2>
              <div className="space-y-4">
                <div
                  data-reveal
                  data-delay="50"
                  className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Accuracy of Content
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    While SuccessBridge strives to publish accurate and up-to-date
                    educational materials, we do not warrant completeness or
                    absolute accuracy. Any reliance you place on the platform
                    for official examination preparation is at your own risk —
                    always cross-reference with your institution&apos;s official
                    syllabus.
                  </p>
                </div>
                <div
                  data-reveal
                  data-delay="100"
                  className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    User-Generated Content &amp; Uploads
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    By submitting learning resources or content to SuccessBridge
                    you grant the platform a non-exclusive, worldwide,
                    royalty-free licence to store and display that material.
                    Content found to be plagiarised, inaccurate, or harmful will
                    be removed and may trigger account consequences.
                  </p>
                </div>
              </div>
            </div>

            {/* §7 Payments */}
            <div id="s7" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  7
                </span>
                Payments &amp; Subscriptions
              </h2>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "All pricing for paid tiers is published on the platform before any payment is processed. No hidden charges apply.",
                    "Subscription fees are non-refundable once the billing period has commenced, except where required by Ethiopian consumer law.",
                    "Payment information is never stored on SuccessBridge servers. All transactions pass through authorised PCI-compliant providers.",
                    "Promotional discounts, waivers, and referral codes will not be combined unless explicitly stated.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 hover:translate-x-1 transition-transform duration-150"
                    >
                      <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* §8 IP */}
            <div id="s8" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Copyright className="w-8 h-8 text-indigo-500 dark:text-indigo-400 shrink-0" />
                Intellectual Property
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Platform IP",
                    desc: "The SuccessBridge brand, logo, design, source code, and original content are the exclusive intellectual property of SuccessBridge and protected by Ethiopian and international copyright law.",
                  },
                  {
                    title: "Educational Materials",
                    desc: "All learning resources, quiz questions, and educational materials remain subject to their respective copyrights. Redistribution or commercial reuse requires explicit written authorisation.",
                  },
                ].map(({ title, desc }, i) => (
                  <div
                    key={title}
                    data-reveal
                    data-delay={i * 60}
                    className="p-5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-2 uppercase tracking-wide">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* §9 Termination */}
            <div id="s9" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  9
                </span>
                Suspension &amp; Termination
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Termination by You",
                    desc: "Delete your account anytime via Account Settings in your dashboard, or by emailing support@successbridge.edu.et.",
                  },
                  {
                    title: "Termination by Us",
                    desc: "SuccessBridge may suspend or permanently disable any account that violates these terms. We will email the registered address before taking that action whenever possible.",
                  },
                ].map(({ title, desc }, i) => (
                  <div
                    key={title}
                    data-reveal
                    data-delay={i * 60}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* §10 Disclaimer */}
            <div
              id="s10"
              data-reveal
              className="p-5 md:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-900 dark:text-amber-300 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                Disclaimer of Warranties
              </h2>
              <p className="text-sm md:text-base text-amber-800 dark:text-amber-300 leading-relaxed">
                SuccessBridge is provided{" "}
                <strong>&ldquo;as is&rdquo;</strong> and{" "}
                <strong>&ldquo;as available&rdquo;</strong>{" "}
                without warranties of any kind — express, implied, or statutory.
                We do not guarantee uninterrupted access, error-free operation,
                or compatibility with all devices or browsers. We will not be
                held liable for any indirect, incidental, or consequential
                damages arising from your use of the service.
              </p>
            </div>

            {/* §11 Limitation */}
            <div
              id="s11"
              data-reveal
              className="p-5 md:p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-red-900 dark:text-red-300 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  11
                </span>
                Limitation of Liability
              </h2>
              <p className="text-sm md:text-base text-red-800 dark:text-red-300 leading-relaxed">
                SuccessBridge, its founders, administrators, and contributors
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages — including lost academic
                progress or data — arising from your use of or inability to use
                the platform. To the maximum extent permitted by Ethiopian law,
                our total aggregate liability shall not exceed the amount paid
                by you for premium services in the twelve months preceding the
                claim (currently zero for free accounts).
              </p>
            </div>

            {/* §12 */}
            <div id="s12" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8 text-indigo-500 dark:text-indigo-400 shrink-0" />
                Governing Law &amp; Dispute Resolution
              </h2>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-4">
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  These Terms of Service are governed by the laws of the Federal
                  Democratic Republic of Ethiopia. Any disputes arising from or
                  relating to these terms shall be resolved in the courts of
                  Addis Ababa, Ethiopia.
                </p>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  We encourage users to first contact us at{" "}
                  <a
                    href="mailto:legal@successbridge.edu.et"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    legal@successbridge.edu.et
                  </a>{" "}
                  to resolve any dispute informally before legal proceedings.
                </p>
              </div>
            </div>

            {/* §13 */}
            <div id="s13" data-reveal data-delay="0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Mail className="w-8 h-8 text-indigo-500 dark:text-indigo-400 shrink-0" />
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: "Legal Email",      value: "legal@successbridge.edu.et" },
                  { label: "Support Email",    value: "support@successbridge.edu.et" },
                  { label: "Phone",            value: "+251 (0) 911 234 567" },
                  { label: "Address",          value: "Addis Ababa, Ethiopia",    plain: true },
                ].map(({ label, value, plain }, i) => (
                  <div
                    key={label}
                    data-reveal
                    data-delay={i * 60}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800/40 transition-all duration-200"
                  >
                    <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">
                      {label}
                    </p>
                    {plain ? (
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                        {value}
                      </p>
                    ) : (
                      <a
                        href={`mailto:${value === "Phone" ? "" : value}`}
                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {value}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="w-full relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0c1929] to-[#101040]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
              Agree to Our Terms?
            </h2>
            <p className="text-base md:text-lg text-slate-400 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of Ethiopian students using SuccessBridge to master
              new subjects, ace entrance exams, and build the academic
              foundation for a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                onClick={() => navigate("/register")}
                className="px-8 py-3.5 text-base font-bold rounded-full bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="px-8 py-3.5 text-base font-bold rounded-full border border-white/20 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                &larr; Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STYLES ═══════ */}
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
