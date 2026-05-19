import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">

      {/* ── Navigation bar ── uses homepage palette ── */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Heading */}
        <div className="pt-8 md:pt-10 lg:pt-12 pb-4 md:pb-5">
          <h3 className="text-slate-900 dark:text-white text-base md:text-xl font-bold">
            SuccessBridge
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 pb-6 md:pb-8">

          {/* ── Col 1 – Brand identity */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
              The ultimate learning platform for Ethiopian students. World-class resources,
              smart assessments, and personalized progress tracking.
            </p>
            <div className="flex items-center gap-1.5 md:gap-2.5 flex-wrap">
              {[
                ["FaTelegram", "https://t.me/tolinaaftt", "text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-500/15"],
                ["FaTiktok", "https://www.tiktok.com/@tolinaaftt", "text-slate-700 hover:bg-slate-100 dark:hover:bg-white/10"],
                ["FaInstagram", "https://www.instagram.com/tolman_tube", "text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/15"],
                ["FaFacebook", "https://www.facebook.com/profile.php?id=61555804154730", "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/15"],
                ["FaYoutube", "https://www.youtube.com/@tolinaaf", "text-red-600 hover:bg-red-50 dark:hover:bg-red-500/15"],
                ["FaGithub", "https://github.com/TolesaTesfaye", "text-slate-700 hover:bg-slate-100 dark:hover:bg-white/10"],
                ["FaLinkedin", "https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/", "text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-500/15"],
              ].map(([Icon, href, hover]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 ${hover} text-slate-500 dark:text-slate-400 transition-all text-sm md:text-base active:scale-95`}
                >
                  {(() => {
                    switch (Icon) {
                      case "FaTelegram": return <FaTelegram />;
                      case "FaTiktok": return <FaTiktok />;
                      case "FaInstagram": return <FaInstagram />;
                      case "FaFacebook": return <FaFacebook />;
                      case "FaYoutube": return <FaYoutube />;
                      case "FaGithub": return <FaGithub />;
                      case "FaLinkedin": return <FaLinkedin />;
                      default: return null;
                    }
                  })()}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2 – About SuccessBridge */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-blue-500 inline-block" />
              About SuccessBridge
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5">
              {[
                { label: "Our Mission", href: "/about" },
                { label: "Contact / Get in Touch", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "API Documentation", href: "https://github.com/TolesaTesfaye", external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs md:text-sm leading-relaxed block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs md:text-sm leading-relaxed block"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 – Platform */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-violet-500 inline-block" />
              Platform
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5">
              {[
                { label: "Resources Library", href: "/student/resources" },
                { label: "Student Quizzes", href: "/student/quizzes" },
                { label: "Progress & Analytics", href: "/student/progress" },
                { label: "Payment Tracking", href: "/student/payments" },
                { label: "Learning Center", href: "/university/dashboard" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs md:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 – Contact Address */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-emerald-500 inline-block" />
              Contact Us
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href="mailto:support@successbridge.edu.et"
                  className="group flex items-start gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-500" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-xs md:text-sm font-medium">support@successbridge.edu.et</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+251911234567"
                  className="group flex items-start gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-500" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Phone</p>
                    <p className="text-xs md:text-sm font-medium">+251 (0) 911 234 567</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-500" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-xs md:text-sm font-medium">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-500" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Business Hours</p>
                    <p className="text-xs md:text-sm font-medium leading-snug">Mon – Fri: 9 AM – 6 PM</p>
                    <p className="text-xs md:text-sm font-medium leading-snug">Sat: 10 AM – 4 PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-[11px] md:text-xs text-center md:text-left tracking-wider">
              © {new Date().getFullYear()} SUCCESSBRIDGE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/privacy-policy" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-[11px] md:text-xs tracking-wider">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-[11px] md:text-xs tracking-wider">
                Terms of Service
              </Link>
              <a
                href="https://github.com/TolesaTesfaye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-[11px] md:text-xs tracking-wider"
              >
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
