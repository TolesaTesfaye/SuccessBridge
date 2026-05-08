import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  BrainCircuit,
  LineChart,
  Users,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Globe2,
  Lightbulb,
  Award,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { AppLogo } from "@components/common/AppLogo";

// Video Player Component with YouTube Embed
const VideoPlayer: React.FC = () => {
  const videoId = "pPD6FWuqn1Q"; // YouTube video ID from https://youtu.be/pPD6FWuqn1Q

  return (
    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
      {/* YouTube Video Player - Auto-embedded */}
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Discover SuccessBridge"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "10,000+", label: "Active Students", icon: Users },
    { value: "500+", label: "Study Resources", icon: BookOpen },
    { value: "50+", label: "Subjects Covered", icon: Target },
    { value: "95%", label: "Success Rate", icon: TrendingUp },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Curated Resources",
      description:
        "Access a vast library of high-quality study materials, notes, and past exams tailored to the Ethiopian curriculum.",
      color: "blue",
      benefits: [
        "High-quality PDFs",
        "Video Lectures",
        "Summary Notes",
        "Past Exam Papers",
      ],
    },
    {
      icon: BrainCircuit,
      title: "Smart Quizzes",
      description:
        "Challenge yourself with dynamically generated quizzes designed to test your understanding and retention.",
      color: "indigo",
      benefits: [
        "Adaptive Difficulty",
        "Instant Feedback",
        "Detailed Solutions",
        "Progress Tracking",
      ],
    },
    {
      icon: LineChart,
      title: "Deep Analytics",
      description:
        "Track your progress over time. Identify your strengths and pinpoint areas that require more focus.",
      color: "pink",
      benefits: [
        "Performance Tracking",
        "Subject Breakdowns",
        "Goal Setting",
        "Personalized Insights",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Abebe Kebede",
      role: "Grade 12 Student",
      content:
        "SuccessBridge helped me improve my grades by 30%. The resources are exactly what I needed for EUEE preparation!",
      rating: 5,
    },
    {
      name: "Meron Tadesse",
      role: "University Student",
      content:
        "The quiz system is amazing! It helped me identify my weak areas and focus my study time effectively.",
      rating: 5,
    },
    {
      name: "Daniel Haile",
      role: "High School Teacher",
      content:
        "I recommend SuccessBridge to all my students. It's a comprehensive platform that truly makes a difference.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-[#0a0f1c] text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 blur-[100px] rounded-full mix-blend-screen"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500 to-blue-500 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-6 md:mb-10">
            <AppLogo
              size="xl"
              className="scale-100 md:scale-125 hover:scale-110 md:hover:scale-150 transition-transform duration-500"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-[10px] md:text-sm text-blue-600 dark:text-blue-400 mb-4 md:mb-8 backdrop-blur-md transition-colors">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Empowering Ethiopian Students
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-8 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm transition-colors leading-tight">
            Master Your Future With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              SuccessBridge
            </span>
          </h1>

          <p className="mt-3 md:mt-6 text-sm md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors px-4">
            The ultimate learning platform designed to bridge the gap between
            ambition and achievement. Access curated resources, smart quizzes,
            and personalized analytics to accelerate your academic journey.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-blue-600 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all active:scale-95 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.5)] dark:hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
            >
              <span className="relative z-10">Sign Up</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-active:translate-x-2 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 dark:from-slate-100 dark:to-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/80 dark:bg-white/10 text-slate-800 dark:text-white font-bold rounded-full border-2 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/20 active:scale-95 hover:scale-105 transition-all flex items-center justify-center gap-2 backdrop-blur-md text-sm md:text-base touch-manipulation shadow-lg"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 md:p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform"
              >
                <stat.icon className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-1.5 md:mb-3 text-blue-600 dark:text-blue-400" />
                <div className="text-xl md:text-4xl font-black text-slate-900 dark:text-white mb-0.5 md:mb-1">
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-sm text-slate-600 dark:text-slate-400 font-semibold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Video Section */}
      <section className="bg-white dark:bg-slate-900 transition-colors">
        <div className="w-full">
          <div className="text-center py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 transition-colors">
              Discover SuccessBridge
            </h2>
            <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
              See how we help students succeed academically
            </p>
          </div>

          <div className="w-full px-4 md:px-6">
            <VideoPlayer />
          </div>

          {/* Video Features */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8 pb-8 md:pb-12">
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  2 min
                </div>
                <div className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                  Quick Tour
                </div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Easy
                </div>
                <div className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                  To Use
                </div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Free
                </div>
                <div className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                  To Start
                </div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  24/7
                </div>
                <div className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                  Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 transition-colors">
              Built for Academic Excellence
            </h2>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors px-4">
              Everything you need to succeed, all in one connected platform.
              Experience a new standard of digital learning crafted specifically
              for your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                  <feature.icon className="w-20 h-20 md:w-32 md:h-32 text-blue-600 dark:text-white" />
                </div>
                <div
                  className={`relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-500/20 text-${feature.color}-600 dark:text-${feature.color}-400 flex items-center justify-center mb-3 md:mb-6 border border-${feature.color}-200 dark:border-${feature.color}-500/20`}
                >
                  <feature.icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h3 className="relative z-10 text-lg md:text-2xl font-semibold text-slate-900 dark:text-white mb-2 md:mb-4 transition-colors">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-3 md:mb-6 transition-colors">
                  {feature.description}
                </p>
                <ul className="relative z-10 space-y-2 md:space-y-3">
                  {feature.benefits.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 md:gap-3 text-[11px] md:text-sm text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900/50 transition-colors">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-50/50 dark:from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-50/50 dark:from-indigo-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">
                Designed for Every Stage of Your Journey
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed transition-colors">
                Whether you're preparing for national exams in high school or
                tackling advanced university courses, SuccessBridge adapts to
                your unique educational needs.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors">
                      High School Students
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors">
                      Comprehensive materials covering Grades 9-12, specifically
                      tailored for the Ethiopian University Entrance Examination
                      (EUEE).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors">
                      University Students
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors">
                      Advanced resources organized by faculty and department,
                      helping you master complex subjects and secure top grades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative w-full">
              {/* Abstract Representation of UI */}
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/50 dark:from-blue-500/20 to-indigo-200/50 dark:to-indigo-500/20 rounded-3xl transform rotate-3 scale-105 border border-slate-200 dark:border-white/5 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col transition-colors">
                  {/* Mock UI Header */}
                  <div className="h-12 border-b border-slate-100 dark:border-white/10 flex items-center px-4 gap-2 bg-slate-50 dark:bg-white/5 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/50"></div>
                  </div>
                  {/* Mock UI Body */}
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="w-1/3 h-6 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
                    <div className="flex gap-4">
                      <div className="w-2/3 h-32 bg-gradient-to-br from-blue-50 dark:from-blue-500/20 to-indigo-50 dark:to-indigo-500/20 rounded-xl border border-blue-100 dark:border-white/5 p-4 flex flex-col justify-end">
                        <div className="w-1/2 h-4 bg-blue-200 dark:bg-white/20 rounded mb-2"></div>
                        <div className="w-3/4 h-3 bg-blue-100 dark:bg-white/10 rounded"></div>
                      </div>
                      <div className="w-1/3 h-32 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 flex items-center justify-center">
                        <LineChart className="w-10 h-10 text-slate-300 dark:text-white/20" />
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 p-4 transition-colors">
                      <div className="w-1/4 h-4 bg-slate-200 dark:bg-white/20 rounded mb-4"></div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-full h-8 bg-white dark:bg-white/5 rounded px-3 flex items-center justify-between border border-slate-100 dark:border-transparent transition-colors"
                          >
                            <div className="w-1/2 h-2 bg-slate-200 dark:bg-white/10 rounded"></div>
                            <div className="w-8 h-4 bg-blue-100 dark:bg-blue-500/20 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
              Loved by Students Across Ethiopia
            </h2>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400">
              See what our community has to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3 md:mb-4 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs md:text-sm text-slate-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-slate-100/80 dark:from-slate-800/80 dark:via-slate-900/80 dark:to-slate-950/80 transition-colors"></div>

        {/* Decorative Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(100,116,139,0.1) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Lightbulb className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4 md:mb-6 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] transition-colors" />
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 transition-colors px-4">
            Ready to Unlock Your Potential?
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 md:mb-10 transition-colors px-4">
            Join thousands of students who are already using SuccessBridge to
            secure top grades and build a brighter future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-blue-600 dark:bg-slate-800 text-white dark:text-white font-bold tracking-wide rounded-full hover:bg-blue-700 dark:hover:bg-slate-700 active:scale-95 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
            >
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span>Sign Up Free</span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-white/10 text-slate-800 dark:text-white font-bold tracking-wide rounded-full border-2 border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/20 active:scale-95 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 backdrop-blur-md text-sm md:text-base touch-manipulation"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
