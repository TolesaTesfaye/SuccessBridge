import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, Github } from 'lucide-react'

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Identity */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">SuccessBridge</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering Ethiopian students with world-class digital learning resources,
                            bridging the gap between secondary and higher education.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-blue-400 hover:text-white transition-all text-slate-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white transition-all text-slate-400">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-slate-400">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Academic Paths */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                            Learning Path
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="/highschool/dashboard" className="hover:text-blue-500 transition-colors">High School Hub</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-500 transition-colors">Freshman Common Courses</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-500 transition-colors">Digital Modules</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-500 transition-colors">Past Entrance Exams</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Interactive Quizzes</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                            Resources
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="/about" className="hover:text-indigo-500 transition-colors">About Our Mission</a></li>
                            <li><a href="/contact" className="hover:text-indigo-500 transition-colors">Support Center</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-500 transition-colors">API Documentation</a></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                            Support
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-500 flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Email Support</p>
                                    <p className="text-sm text-slate-300 font-medium italic">support@successbridge.edu.et</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Phone Line</p>
                                    <p className="text-sm text-slate-300 font-medium">+251 900 000 000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 tracking-widest uppercase">
                    <p>© 2024 SUCCESSBRIDGE. ARCHITECTING FUTURES.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-slate-300 cursor-pointer transition-colors tracking-[0.2em]">ET-TECH STACK</span>
                        <span className="hover:text-slate-300 cursor-pointer transition-colors tracking-[0.2em]">V1.0.4-LATEST</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
