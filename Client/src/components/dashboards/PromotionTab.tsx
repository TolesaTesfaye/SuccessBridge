import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Globe,
  Code,
  BookOpen,
  Youtube,
  Sparkles,
  Award,
  Users,
  Rocket,
  Play,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const featuredVideos = [
  {
    videoId: "TZgjn2hvZcU",
    title: "SuccessBridge Platform Overview",
    description:
      "Discover how SuccessBridge is revolutionizing education for Ethiopian students.",
    views: "1.2K",
  },
  {
    videoId: "mE4Y2O1fPWQ",
    title: "Developer Journey & Vision",
    description: "Learn about the inspiration and vision behind SuccessBridge.",
    views: "856",
  },
  {
    videoId: "so6vRW0Heds",
    title: "Student Success Stories",
    description:
      "See how students are achieving their academic goals with SuccessBridge.",
    views: "2.1K",
  },
  {
    videoId: "0KUKX3f9HEE",
    title: "Platform Features & Tutorials",
    description:
      "Explore the key features and learn how to make the most of SuccessBridge.",
    views: "1.5K",
  },
];

const socialLinks = [
  {
    name: "Portfolio",
    url: "https://my-portfolio-lastport.vercel.app/",
    icon: Globe,
    accent: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "shadow-[0_0_60px_-15px_rgba(59,130,246,0.6)]",
    description: "Explore my professional projects and work",
  },
  {
    name: "GitHub",
    url: "https://github.com/TolesaTesfaye",
    icon: Github,
    accent: "from-slate-600 via-slate-800 to-black",
    glow: "shadow-[0_0_60px_-15px_rgba(100,116,139,0.6)]",
    description: "Check out my open-source contributions",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/",
    icon: Linkedin,
    accent: "from-blue-500 via-blue-700 to-blue-900",
    glow: "shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)]",
    description: "Connect with me professionally",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@tolinaaf",
    icon: Youtube,
    accent: "from-rose-500 via-red-600 to-red-800",
    glow: "shadow-[0_0_60px_-15px_rgba(239,68,68,0.6)]",
    description: "Subscribe for educational content",
  },
];

const developer = {
  name: "Tolesa Tesfaye",
  title: "Full-Stack Developer & Creator of SuccessBridge",
  bio: "Passionate about building educational technology that empowers Ethiopian students to achieve their academic dreams. With expertise in modern web technologies and a commitment to quality education, I'm dedicated to creating platforms that make learning accessible and engaging.",
  portfolio: "https://my-portfolio-lastport.vercel.app/",
  email: "tolesatesfaye273@gmail.com",
};

const courses = [
  {
    title: "Tolman Tube — Oromo Language Content",
    platform: "YouTube Channel",
    description:
      "Educational content in Oromo language covering various topics. Subscribe for quality learning materials.",
    link: "https://www.youtube.com/@tolinaaf",
    icon: Youtube,
    accent: "from-rose-500 to-pink-600",
  },
  {
    title: "Full-Stack Web Development",
    platform: "Portfolio Projects",
    description:
      "Explore real-world projects and learn modern web development techniques.",
    link: "https://my-portfolio-lastport.vercel.app/",
    icon: Code,
    accent: "from-blue-500 to-indigo-600",
  },
  {
    title: "Ethiopian Education Resources",
    platform: "SuccessBridge",
    description:
      "Comprehensive study materials for Ethiopian high school and university students.",
    link: "#",
    icon: BookOpen,
    accent: "from-emerald-500 to-teal-600",
  },
];

const features = [
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join thousands of Ethiopian students on their journey to academic excellence.",
  },
  {
    icon: Award,
    title: "Quality Content",
    description:
      "Curated resources aligned with Ethiopian curriculum standards.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description: "Regular updates with new features and learning materials.",
  },
];

const stats = [
  { value: "10K+", label: "Students" },
  { value: "500+", label: "Resources" },
  { value: "4.9★", label: "Rated" },
  { value: "24/7", label: "Access" },
];

export const PromotionTab: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const main = featuredVideos[activeVideo];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-cyan-400/20 dark:bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
        {/* HERO */}
        <section className="relative">
          <div className="relative overflow-hidden  border border-white/40 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/[0.04] dark:to-white/[0.02] backdrop-blur-2xl shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

            <div className="relative px-6 sm:px-10 md:px-16 py-16 md:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur border border-white/60 dark:border-white/10 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
                  About SuccessBridge
                </span>
              </div>

              <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
                <span className="block text-slate-900 dark:text-white">
                  Empowering Ethiopian
                </span>
                <span className="mt-2 block bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                  Students to Succeed
                </span>
              </h1>

              <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                A comprehensive learning platform designed for Ethiopian high
                school and university students — bridging the gap between
                ambition and achievement with quality resources, smart
                assessments, and personalized analytics.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href="#connect"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#videos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white font-semibold text-sm hover:bg-white dark:hover:bg-white/20 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </a>
              </div>

              {/* Stats */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/60 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur px-4 py-5"
                  >
                    <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER */}
        <section>
          <SectionHeader
            eyebrow="The Creator"
            title="Connect With the Developer"
            subtitle="Building tools that unlock potential — one student at a time."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Profile card */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 md:p-10 shadow-xl">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400/30 to-fuchsia-400/30 blur-3xl" />
              <div className="relative">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white text-3xl font-black shadow-2xl shadow-indigo-500/30">
                  {developer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-950" />
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl font-black tracking-tight">
                  {developer.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {developer.title}
                </p>
                <p className="mt-5 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {developer.bio}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${developer.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:scale-[1.02] transition-transform"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href={developer.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/15 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    Portfolio
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:${link.glow}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${link.accent} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <h4 className="mt-5 text-xl font-black text-slate-900 dark:text-white group-hover:text-white transition-colors">
                        {link.name}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 group-hover:text-white/90 transition-colors">
                        {link.description}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-white">
                        Visit
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section>
          <SectionHeader
            eyebrow="Why SuccessBridge"
            title="Designed for real student outcomes"
            subtitle="Three pillars that make learning stick."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 text-7xl font-black text-slate-100 dark:text-white/5 leading-none">
                    0{i + 1}
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="mt-6 text-xl font-black">{f.title}</h4>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COURSES */}
        <section>
          <SectionHeader
            eyebrow="Learn"
            title="Online Courses & Resources"
            subtitle="Hand-picked learning paths from the developer."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  <div className={`h-2 bg-gradient-to-r ${c.accent}`} />
                  <div className="p-7 flex flex-col flex-1">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {c.platform}
                    </div>
                    <h4 className="mt-1 text-lg font-black leading-snug">
                      {c.title}
                    </h4>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                      {c.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Learn More
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos">
          <SectionHeader
            eyebrow="Watch"
            title="Featured Video Gallery"
            subtitle="Tutorials, stories, and platform deep-dives."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main player */}
            <div className="lg:col-span-8">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-black shadow-2xl">
                <div className="relative aspect-video">
                  <iframe
                    key={main.videoId}
                    src={`https://www.youtube.com/embed/${main.videoId}?rel=0&modestbranding=1`}
                    title={main.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-[0.18em]">
                    <Play className="w-3 h-3" />
                    Now Playing
                  </div>
                  <h4 className="mt-3 text-xl md:text-2xl font-black">
                    {main.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                    {main.description}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <Eye className="w-4 h-4" />
                  {main.views}
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="lg:col-span-4 space-y-3 lg:max-h-[32rem] lg:overflow-y-auto lg:pr-2">
              {featuredVideos.map((v, i) => {
                const active = i === activeVideo;
                return (
                  <button
                    key={v.videoId}
                    onClick={() => setActiveVideo(i)}
                    className={`group w-full text-left flex gap-4 p-3 rounded-2xl border transition-all ${
                      active
                        ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-500/40 shadow-lg"
                        : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    <div className="relative w-32 flex-shrink-0 aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img
                        src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center">
                          <Play className="w-4 h-4 text-slate-900 ml-0.5" />
                        </div>
                      </div>
                      {active && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider">
                          Live
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <h5
                        className={`text-sm font-bold line-clamp-2 ${
                          active
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {v.title}
                      </h5>
                      <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Eye className="w-3 h-3" />
                        {v.views} views
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="connect">
          <div className="relative overflow-hidden  border border-white/40 dark:border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-00 via-fuchsia-900 to-rose-00" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.25),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

            <div className="relative px-6 sm:px-10 md:px-16 py-16 md:py-24 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Let's Connect
                </span>
              </div>
              <h3 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">
                Want to build something amazing?
              </h3>
              <p className="mt-5 max-w-2xl mx-auto text-white/85 text-base md:text-lg leading-relaxed">
                Interested in collaborating on educational technology projects
                or need a custom learning platform? Let's create something
                impactful together.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${developer.email}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-slate-900 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
                <a
                  href={developer.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  subtitle?: string;
}> = ({ eyebrow, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur">
      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-700 dark:text-slate-300">
        {eyebrow}
      </span>
    </div>
    <h2 className="mt-5 text-3xl md:text-5xl font-black tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

export default PromotionTab;
