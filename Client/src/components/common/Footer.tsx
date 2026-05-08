import React from 'react'
import { Mail, Phone } from 'lucide-react'
import { FaFacebook, FaInstagram, FaTelegram, FaTiktok, FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa'
import logo from '@/assets/SuccessBridgeLogo.png'

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 pt-8 md:pt-16 pb-6 md:pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Main Content Grid with more spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12 mb-6 md:mb-16">
                    {/* Brand Identity - 25% width (1 column) */}
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 md:w-10 md:h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 p-1">
                                <img src={logo} alt="SuccessBridge" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-base md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">SuccessBridge</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-base leading-relaxed">
                            Empowering Ethiopian students with world-class digital learning resources,
                            bridging the gap between secondary and higher education.
                        </p>
                        <div className="flex items-center gap-2 md:gap-3 pt-2 flex-wrap">
                            <a href="https://t.me/tolinaaftt" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="Telegram Channel">
                                <FaTelegram className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://www.tiktok.com/@tolinaaftt" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-black dark:hover:bg-black hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="TikTok">
                                <FaTiktok className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://www.instagram.com/tolman_tube" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="Instagram">
                                <FaInstagram className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61555804154730" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="Facebook">
                                <FaFacebook className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://www.youtube.com/@tolinaaf" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="YouTube">
                                <FaYoutube className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://github.com/TolesaTesfaye" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="GitHub">
                                <FaGithub className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-700 dark:hover:bg-blue-700 hover:text-white transition-all text-slate-500 dark:text-slate-400 active:scale-95" title="LinkedIn">
                                <FaLinkedin className="w-4 h-4 md:w-6 md:h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Content - 2 columns on all screens */}
                    <div className="lg:col-span-3 grid grid-cols-2 gap-4 md:gap-10">

                    {/* Academic Paths */}
                    <div className="space-y-2 md:space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-xs md:text-lg mb-2 md:mb-4 flex items-center gap-1 md:gap-2">
                            <div className="w-1 h-3 md:h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                            Learning Path
                        </h4>
                        <ul className="space-y-1 md:space-y-3 text-[10px] md:text-base font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/highschool/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5 md:py-1 active:text-blue-700">High School Hub</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5 md:py-1 active:text-blue-700">Freshman Common Courses</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5 md:py-1 active:text-blue-700">Digital Modules</a></li>
                            <li><a href="/university/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5 md:py-1 active:text-blue-700">Past Entrance Exams</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-0.5 md:py-1 active:text-blue-700">Interactive Quizzes</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2 md:space-y-4">
                        <h4 className="text-slate-900 dark:text-white font-bold text-xs md:text-lg mb-2 md:mb-4 flex items-center gap-1 md:gap-2">
                            <div className="w-1 h-3 md:h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
                            Resources
                        </h4>
                        <ul className="space-y-1 md:space-y-3 text-[10px] md:text-base font-medium text-slate-600 dark:text-slate-300">
                            <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 md:py-1 active:text-indigo-700">About Our Mission</a></li>
                            <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 md:py-1 active:text-indigo-700">Support Center</a></li>
                            <li><a href="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 md:py-1 active:text-indigo-700">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 md:py-1 active:text-indigo-700">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block py-0.5 md:py-1 active:text-indigo-700">API Documentation</a></li>
                        </ul>
                    </div>
                    </div>
                </div>

                {/* Copyright Section with Support Info */}
                <div className="pt-5 md:pt-8 border-t border-slate-200 dark:border-slate-800">
                    {/* Support Info - Horizontal Layout */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mb-4 md:mb-5">
                        <a href="mailto:support@successbridge.edu.et" className="flex items-center gap-2 group">
                            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                            <div>
                                <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Email Support</p>
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">support@successbridge.edu.et</p>
                            </div>
                        </a>
                        <a href="tel:+251900000000" className="flex items-center gap-2 group">
                            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                            <div>
                                <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Phone Line</p>
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">+251 900 000 000</p>
                            </div>
                        </a>
                    </div>
                    
                    {/* Copyright */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[9px] md:text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wide md:tracking-widest uppercase">
                        <p className="text-center md:text-left">© 2024 SUCCESSBRIDGE. ARCHITECTING FUTURES.</p>
                        <div className="flex gap-3 md:gap-8 text-center">
                            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.1em] md:tracking-[0.2em]">ET-TECH STACK</span>
                            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors tracking-[0.1em] md:tracking-[0.2em]">V1.0.4-LATEST</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
