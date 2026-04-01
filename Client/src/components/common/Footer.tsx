import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, Github } from 'lucide-react'

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 pt-8 md:pt-16 pb-6 md:pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Main Content Grid with more spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-16">
                    {/* Brand Identity - 25% width (1 column) */}
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-sm md:text-lg">S</span>
                            </div>
                            <span className="text-base md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">SuccessBridge</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-base leading-relaxed">
                            Empowering Ethiopian students with world-class digital learning resources,
                            bridging the gap between secondary and higher education.
                        </p>
                        <div className="flex items-center gap-2 md:gap-3 pt-2">
                            <a href="#" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95">
                                <Facebook className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="#" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95">
                                <Twitter className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="#" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95">
                                <Instagram className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="#" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95">
                                <Github className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Content - 75% width (3 columns) */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

                    {/* Academic Paths */}
                    <div className="space-y-2 md:space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-lg mb-2 md:mb-4 flex items-center gap-2">
                            <div className="w-1 h-4 md:h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                            Learning Path
                        </h4>
                        <ul className="space-y-1.5 md:space-y-3 text-xs md:text-base font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/highschool/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 md:py-1 active:text-blue-700">High School Hub</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 md:py-1 active:text-blue-700">Freshman Common Courses</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 md:py-1 active:text-blue-700">Digital Modules</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 md:py-1 active:text-blue-700">Past Entrance Exams</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1 md:py-1 active:text-blue-700">Interactive Quizzes</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2 md:space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-lg mb-2 md:mb-4 flex items-center gap-2">
                            <div className="w-1 h-4 md:h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
                            Resources
                        </h4>
                        <ul className="space-y-1.5 md:space-y-3 text-xs md:text-base font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1 md:py-1 active:text-indigo-700">About Our Mission</a></li>
                            <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1 md:py-1 active:text-indigo-700">Support Center</a></li>
                            <li><a href="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1 md:py-1 active:text-indigo-700">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1 md:py-1 active:text-indigo-700">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1 md:py-1 active:text-indigo-700">API Documentation</a></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-2 md:space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-lg mb-2 md:mb-4 flex items-center gap-2">
                            <div className="w-1 h-4 md:h-6 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                            Support
                        </h4>
                        <div className="space-y-2.5 md:space-y-4">
                            <a href="mailto:support@successbridge.edu.et" className="flex items-start gap-2 md:gap-3 group active:scale-[0.98] transition-transform">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-500 flex-shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                                    <Mail className="w-4 h-4 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-sm text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Email Support</p>
                                    <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 font-medium break-all">support@successbridge.edu.et</p>
                                </div>
                            </a>
                            <a href="tel:+251900000000" className="flex items-start gap-2 md:gap-3 group active:scale-[0.98] transition-transform">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-500 flex-shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                                    <Phone className="w-4 h-4 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-sm text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Phone Line</p>
                                    <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 font-medium">+251 900 000 000</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Copyright Section - Moved to bottom with more separation */}
                <div className="pt-5 md:pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wide md:tracking-widest uppercase">
                    <p className="text-center md:text-left">© 2024 SUCCESSBRIDGE. ARCHITECTING FUTURES.</p>
                    <div className="flex gap-3 md:gap-8 text-center">
                        <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.1em] md:tracking-[0.2em]">ET-TECH STACK</span>
                        <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.1em] md:tracking-[0.2em]">V1.0.4-LATEST</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
