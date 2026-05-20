import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  MessageCircle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

/* ── Reveal ── */
function useReveal(rootRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
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
}

/* ── TOC ── */
const TOC_ITEMS = [
  { id: "contact-info", label: "Contact Info" },
  { id: "categories", label: "Categories" },
  { id: "contact-form", label: "Message Form" },
  { id: "quick-links", label: "Helpful Links" },
  { id: "faq", label: "FAQ" },
];

function useActiveSection(): string {
  const [active, setActive] = useState("contact-info");

  useEffect(() => {
    const ids = TOC_ITEMS.map((t) => t.id);
    const els = ids
      .map((id) => document.getElementById(id) as HTMLElement | null)
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

/* ══════════════════════════════════════════════════ */

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);
  const activeSection = useActiveSection();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("general");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  /* ── Data ── */
  const categories = [
    {
      id: "general" as const,
      icon: <HelpCircle className="w-5 h-5" />,
      label: "General Inquiry",
      desc: "Questions about the platform or how to get started",
    },
    {
      id: "bug" as const,
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Report an Issue",
      desc: "Something isn't working as expected",
    },
    {
      id: "feature" as const,
      icon: <Lightbulb className="w-5 h-5" />,
      label: "Feature Request",
      desc: "An idea to make SuccessBridge better",
    },
    {
      id: "other" as const,
      icon: <Mail className="w-5 h-5" />,
      label: "Other",
      desc: "Anything else you'd like our team to know",
    },
  ];

  const sidebarItems = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email Address",
      value: "support@successbridge.edu.et",
      href: "mailto:support@successbridge.edu.et",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Phone Number",
      value: "+251 (0) 911 234 567",
      href: "tel:+251911234567",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "Headquarters",
      value: "Addis Ababa, Ethiopia",
      href: "#",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Support Hours",
      value:
        "Mon \u2013 Fri: 9:00 AM \u2013 6:00 PM\nSat: 10:00 AM \u2013 4:00 PM\nSun: Closed",
      href: "#",
    },
  ];

  const faqs = [
    {
      q: "Is SuccessBridge completely free?",
      a: "Yes. All learning resources, quizzes, and progress-tracking features are free for every student. Future premium tiers may be introduced to fund maintenance, but the core experience will always remain accessible.",
    },
    {
      q: "How do I register as a student?",
      a: 'Click the "Sign Up" button on the homepage, fill in your full name, email address, and password, then verify your email. Once registered you can access your dashboard and start learning immediately.',
    },
    {
      q: "Can I track my learning progress in real time?",
      a: "Absolutely. Your dashboard shows completed topics, quiz scores, time spent, and subject mastery levels. Analytics update in real time so you always know where you stand.",
    },
    {
      q: "How do admins upload study resources?",
      a: "Only users with an Admin or Super Admin role can access the Resource Upload section from the sidebar in their dashboard. Uploaded content is reviewed and organisation-wide visibility is configurable.",
    },
    {
      q: "What payment methods are accepted?",
      a: "SuccessBridge's payment integration supports the most widely used mobile-money and bank-transfer options across Ethiopia. Premium subscriptions (if applicable) will be clearly flagged before any payment is collected.",
    },
    {
      q: "How quickly will I receive a response?",
      a: "The support team responds within 24 hours on weekdays. For urgent platform issues we aim to respond within a few hours. For general questions you may find a faster answer in the FAQ section below.",
    },
  ];

  /* ── keyframes ── */
  /* React's <style> block at bottom defines animations */

  return (
    <div ref={rootRef} className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c]">
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section
        id="hero"
        className="w-full relative pt-20 pb-8 md:pt-32 md:pb-14 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-to-br from-[#0c1929] via-[#112240] to-[#0c1929]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-500/6 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto reveal-hero">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] md:text-xs font-semibold uppercase tracking-widest mb-5 md:mb-7">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Support Center
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 md:mb-7 leading-tight tracking-tight">
              We're Here to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Help You Succeed
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              Whether you have a question about the platform, need technical
              assistance, or want to share an idea — the SuccessBridge support
              team is ready to help within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Sticky TOC dots (desktop) ─── */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <nav className="space-y-2">
          {TOC_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              title={label}
              className={`block w-2 h-2 rounded-full transition-all duration-200 ${
                activeSection === id
                  ? "bg-blue-500 scale-150 shadow-lg shadow-blue-500/50"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-blue-400 hover:scale-125"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* ═══════════════════════ INFO STRIP (full-width) ═══════════════════════ */}
      <section
        id="contact-info"
        className="w-full py-10 sm:py-14 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
        data-reveal
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5 md:mb-7 text-center">
              Reach us directly
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {sidebarItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-reveal
                  data-delay={i * 80}
                  className="group flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-blue-900/10 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-500/40"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 bg-white dark:bg-slate-700/40 border border-transparent group-hover:border-blue-400/30 transition-colors">
                    <span className="text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {item.value}
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 mt-1.5 transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CATEGORIES + FORM ═══════════════════════ */}
      <section
        id="contact-form"
        className="w-full py-14 sm:py-20 lg:py-28 bg-slate-50 dark:bg-[#0a0f1c]"
      >
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Category buttons */}
            <div id="categories" data-reveal className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-800 to-transparent" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  How can we help?
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-800 to-transparent" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {categories.map(({ id, icon, label, desc }, i) => (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id)}
                    data-reveal
                    data-delay={i * 60}
                    className={`group p-4 md:p-5 rounded-2xl border text-left transition-all duration-200 ${
                      activeCategory === id
                        ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-600/25"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-400/70 dark:hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div
                      className={`mb-2.5 transition-colors duration-200 ${
                        activeCategory === id
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {icon}
                    </div>
                    <h3
                      className={`text-sm md:text-base font-bold mb-1 transition-colors duration-200 ${
                        activeCategory === id
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {label}
                    </h3>
                    <p
                      className={`text-[11px] md:text-xs leading-snug transition-colors duration-200 ${
                        activeCategory === id
                          ? "text-blue-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Form row ── */}
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left sidebar */}
              <div className="lg:col-span-4 space-y-4" data-reveal>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/15 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Contact Details
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Reach out directly or fill in the form. We respond within 24
                  hours on weekdays.
                </p>
                {sidebarItems.map(({ icon, label, value, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    data-reveal
                    data-delay={i * 60}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 dark:bg-slate-700/40 text-slate-500 dark:text-slate-400">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Right form card */}
              <div className="lg:col-span-8" data-reveal>
                <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/30 dark:shadow-none p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Send className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                      Send us a message
                    </h2>
                  </div>

                  {submitted && (
                    <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3">
                      <span className="text-emerald-600 dark:text-emerald-400 text-lg">
                        &#x2713;
                      </span>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
                        Thank you! Your message has been sent. We&apos;ll get
                        back to you as soon as possible — typically within 24
                        hours.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        placeholder="Describe your question or issue in detail so we can assist you effectively..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ QUICK LINKS ═══════════════════════ */}
      <section
        id="quick-links"
        className="w-full py-14 sm:py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
        data-reveal
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                Looking for Specific Help?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                Visit our dedicated pages for detailed policies and
                documentation.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Privacy Policy",
                  desc: "How we collect, use, and protect your data.",
                  href: "/privacy-policy",
                  icon: (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  ),
                },
                {
                  title: "Terms of Service",
                  desc: "Rules and guidelines for using SuccessBridge.",
                  href: "/terms-of-service",
                  icon: (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  ),
                },
                {
                  title: "API Documentation",
                  desc: "Integration guides and developer reference.",
                  href: "https://github.com/TolesaTesfaye",
                  external: true,
                  icon: (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  ),
                },
              ].map(({ title, desc, href, external, icon }, i) => (
                <a
                  key={title}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  data-reveal
                  data-delay={i * 100}
                  className="group flex flex-col p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/25 transition-colors duration-200">
                    {icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                  {external && (
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 mt-3 group-hover:text-blue-500 transition-colors duration-200" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section
        id="faq"
        className="w-full py-14 sm:py-20 lg:py-28 bg-slate-50 dark:bg-[#0a0f1d]"
        data-reveal
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-sm md:text-base">
                Quick answers to the most common questions from our student
                community.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  data-reveal
                  data-delay={i * 70}
                  className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  >
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white pr-4">
                      {q}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        openFaq === i
                          ? "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 rotate-180"
                          : "bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* accordion body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === i
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA (full-width) ═══════════════════════ */}
      <section className="w-full relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
              Join thousands of Ethiopian students already using SuccessBridge
              to ace their exams and master new subjects today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-bold rounded-full bg-white text-blue-700 shadow-lg shadow-white/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
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

      {/* ── Styles ── */}
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
