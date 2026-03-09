import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    BrainCircuit,
    LineChart,
    Users,
    ChevronRight,
    CheckCircle2,
    GraduationCap,
    Globe2,
    Lightbulb
} from 'lucide-react';
import { AppLogo } from '@components/common/AppLogo';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-[#0a0f1c] text-slate-800 dark:text-slate-200 transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 blur-[100px] rounded-full mix-blend-screen"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500 to-blue-500 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="flex justify-center mb-10">
                        <AppLogo size="xl" className="scale-125 hover:scale-150 transition-transform duration-500" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-blue-600 dark:text-blue-400 mb-8 backdrop-blur-md transition-colors">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Empowering Ethiopian Students
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm transition-colors">
                        Master Your Future With <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            SuccessBridge
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors">
                        The ultimate learning platform designed to bridge the gap between ambition and achievement. Access curated resources, smart quizzes, and personalized analytics to accelerate your academic journey.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="group relative px-8 py-4 bg-blue-600 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(37,99,235,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.5)] dark:hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] flex items-center gap-2"
                        >
                            Start Learning for Free
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="px-8 py-4 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white font-semibold rounded-full border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm"
                        >
                            Explore Curriculum
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md relative z-10 transition-colors">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-white/10">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white mb-2">10k+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Active Students</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white mb-2">500+</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Premium Resources</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white mb-2">95%</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Success Rate</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white mb-2">24/7</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Platform Access</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Built for Academic Excellence</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg transition-colors">
                            Everything you need to succeed, all in one connected platform. Experience a new standard of digital learning crafted specifically for your success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                <BookOpen className="w-32 h-32 text-blue-600 dark:text-white" />
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 border border-blue-200 dark:border-blue-500/20">
                                <BookOpen className="w-7 h-7" />
                            </div>
                            <h3 className="relative z-10 text-2xl font-semibold text-slate-900 dark:text-white mb-4 transition-colors">Curated Resources</h3>
                            <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors">
                                Access a vast library of high-quality study materials, notes, and past exams tailored to the Ethiopian curriculum.
                            </p>
                            <ul className="relative z-10 space-y-3">
                                {['High-quality PDFs', 'Video Lectures', 'Summary Notes'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                <BrainCircuit className="w-32 h-32 text-indigo-600 dark:text-white" />
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 border border-indigo-200 dark:border-indigo-500/20">
                                <BrainCircuit className="w-7 h-7" />
                            </div>
                            <h3 className="relative z-10 text-2xl font-semibold text-slate-900 dark:text-white mb-4 transition-colors">Smart Quizzes</h3>
                            <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors">
                                Challenge yourself with dynamically generated quizzes designed to test your understanding and retention.
                            </p>
                            <ul className="relative z-10 space-y-3">
                                {['Adaptive Difficulty', 'Instant Feedback', 'Detailed Solutions'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                <LineChart className="w-32 h-32 text-pink-600 dark:text-white" />
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-6 border border-pink-200 dark:border-pink-500/20">
                                <LineChart className="w-7 h-7" />
                            </div>
                            <h3 className="relative z-10 text-2xl font-semibold text-slate-900 dark:text-white mb-4 transition-colors">Deep Analytics</h3>
                            <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors">
                                Track your progress over time. Identify your strengths and pinpoint areas that require more focus.
                            </p>
                            <ul className="relative z-10 space-y-3">
                                {['Performance Tracking', 'Subject Breakdowns', 'Goal Setting'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Designed for Every Stage of Your Journey</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed transition-colors">
                                Whether you're preparing for national exams in high school or tackling advanced university courses, SuccessBridge adapts to your unique educational needs.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors">High School Students</h4>
                                        <p className="text-slate-600 dark:text-slate-400 transition-colors">Comprehensive materials covering Grades 9-12, specifically tailored for the Ethiopian University Entrance Examination (EUEE).</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <Globe2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors">University Students</h4>
                                        <p className="text-slate-600 dark:text-slate-400 transition-colors">Advanced resources organized by faculty and department, helping you master complex subjects and secure top grades.</p>
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
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-full h-8 bg-white dark:bg-white/5 rounded px-3 flex items-center justify-between border border-slate-100 dark:border-transparent transition-colors">
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

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/80 to-blue-600/80"></div>

                {/* Decorative Grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Lightbulb className="w-16 h-16 text-yellow-300 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Unlock Your Potential?</h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Join thousands of students who are already using SuccessBridge to secure top grades and build a brighter future.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 bg-white text-blue-900 font-bold tracking-wide rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl flex items-center gap-2"
                        >
                            <Users className="w-5 h-5" />
                            Create Free Account
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
