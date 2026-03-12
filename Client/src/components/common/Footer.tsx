import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, Github } from 'lucide-react'

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 min-h-[500px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content Grid with more spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Identity - 25% width (1 column) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">SuccessBridge</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Empowering Ethiopian students with world-class digital learning resources,
                            bridging the gap between secondary and higher education.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-400 dark:hover:bg-blue-400 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all text-slate-500 dark:text-slate-400">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Content - 75% width (3 columns) */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Academic Paths */}
                    <div className="space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-base mb-4 flex items-center gap-2">
                            <div className="w-1 h-5 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                            Learning Path
                        </h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/highschool/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1">High School Hub</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1">Freshman Common Courses</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1">Digital Modules</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1">Past Entrance Exams</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1">Interactive Quizzes</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-base mb-4 flex items-center gap-2">
                            <div className="w-1 h-5 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
                            Resources
                        </h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1">About Our Mission</a></li>
                            <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1">Support Center</a></li>
                            <li><a href="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-1">API Documentation</a></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-base mb-4 flex items-center gap-2">
                            <div className="w-1 h-5 bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                            Support
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-500 flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Email Support</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">support@successbridge.edu.et</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-500 flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Phone Line</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">+251 900 000 000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Copyright Section - Moved to bottom with more separation */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                    <p>© 2024 SUCCESSBRIDGE. ARCHITECTING FUTURES.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.2em]">ET-TECH STACK</span>
                        <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.2em]">V1.0.4-LATEST</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
