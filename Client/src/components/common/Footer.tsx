import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

// Helper component that navigates and scrolls to top
const ScrollLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
}> = ({ to, children, className }) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo(0, 0);
  };
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export const Footer: React.FC = () => {
  // Generate dynamic Platform links based on student type
  const getPlatformLinks = () => {
    return [
      { label: "Resource Hub", href: "/dashboard?tab=hub" },
      { label: "Student Quizzes", href: "/student/quizzes" },
      { label: "Progress & Analytics", href: "/student/progress" },
      { label: "Payment Tracking", href: "/student/payments" },
    ];
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#070C18] text-slate-300">
      <div className="pointer-events-none absolute -top-28 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* ── Navigation bar ── */}
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Heading */}
        <div className="pt-8 md:pt-10 lg:pt-12 pb-4 md:pb-5">
          <h3 className="text-white text-base md:text-xl font-semibold tracking-tight">
            SuccessBridge
          </h3>
        </div>

        {/* Mobile Layout: Social Media (full width) + About+Platform (2 cols) + Contact (center) */}
        <div className="lg:hidden space-y-6 pb-6 md:pb-8">
          {/* Social Media Row */}
          <div className="space-y-2">
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              The ultimate learning platform for Ethiopian students. World-class
              resources, smart assessments, and personalized progress tracking.
            </p>
            <div className="flex items-center gap-1.5 md:gap-2.5 flex-wrap">
              {[
                [
                  "FaTelegram",
                  "https://t.me/+fWV4xTZsUXw3ODg8",
                  "text-sky-400 hover:bg-sky-500/15",
                ],
                [
                  "FaTiktok",
                  "https://www.tiktok.com/@tolinaaftt",
                  "text-slate-300 hover:bg-white/10",
                ],
                [
                  "FaInstagram",
                  "https://www.instagram.com/tolman_tube",
                  "text-pink-400 hover:bg-pink-500/15",
                ],
                [
                  "FaFacebook",
                  "https://www.facebook.com/profile.php?id=61555804154730",
                  "text-blue-400 hover:bg-blue-500/15",
                ],
                [
                  "FaYoutube",
                  "https://www.youtube.com/@tolinaaf",
                  "text-red-400 hover:bg-red-500/15",
                ],
                [
                  "FaGithub",
                  "https://github.com/TolesaTesfaye",
                  "text-slate-300 hover:bg-white/10",
                ],
                [
                  "FaLinkedin",
                  "https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/",
                  "text-sky-400 hover:bg-sky-500/15",
                ],
              ].map(([Icon, href, hover]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-inset ring-white/10 ${hover} text-slate-300 transition-all text-sm md:text-base active:scale-95`}
                >
                  {(() => {
                    switch (Icon) {
                      case "FaTelegram":
                        return <FaTelegram />;
                      case "FaTiktok":
                        return <FaTiktok />;
                      case "FaInstagram":
                        return <FaInstagram />;
                      case "FaFacebook":
                        return <FaFacebook />;
                      case "FaYoutube":
                        return <FaYoutube />;
                      case "FaGithub":
                        return <FaGithub />;
                      case "FaLinkedin":
                        return <FaLinkedin />;
                      default:
                        return null;
                    }
                  })()}
                </a>
              ))}
            </div>
          </div>

          {/* About + Platform + Contact (3 columns) */}
          <div className="grid grid-cols-3 gap-4">
            {/* About SuccessBridge */}
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-1">
                <span className="w-[3px] h-3 rounded-full bg-blue-400 inline-block" />
                About
              </h4>
              <ul className="space-y-1.5">
                {[
                  { label: "Mission", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy", href: "/privacy-policy" },
                  { label: "Terms", href: "/terms-of-service" },
                ].map((item) => (
                  <li key={item.label}>
                    <ScrollLink
                      to={item.href}
                      className="text-slate-400 hover:text-blue-300 transition-colors text-[10px] leading-relaxed block"
                    >
                      {item.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-1">
                <span className="w-[3px] h-3 rounded-full bg-violet-400 inline-block" />
                Platform
              </h4>
              <ul className="space-y-1.5">
                {getPlatformLinks().map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-violet-300 transition-colors text-[10px] leading-relaxed block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-white font-semibold text-xs mb-3 flex items-center gap-1">
                <span className="w-[3px] h-3 rounded-full bg-emerald-400 inline-block" />
                Contact
              </h4>
              <ul className="space-y-1.5 text-[10px]">
                <li>
                  <a
                    href="mailto:support@successbridge.edu.et"
                    className="text-slate-400 hover:text-emerald-300 transition-colors block truncate"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 block">
                    support@success...
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 block">
                    Addis Ababa
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Layout: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-10 pb-6 lg:pb-8">
          {/* Col 1 – Brand identity */}
          <div className="space-y-3">
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              The ultimate learning platform for Ethiopian students. World-class
              resources, smart assessments, and personalized progress tracking.
            </p>
            <div className="flex items-center gap-1.5 md:gap-2.5 flex-wrap">
              {[
                [
                  "FaTelegram",
                  "https://t.me/+fWV4xTZsUXw3ODg8",
                  "text-sky-400 hover:bg-sky-500/15",
                ],
                [
                  "FaTiktok",
                  "https://www.tiktok.com/@tolinaaftt",
                  "text-slate-300 hover:bg-white/10",
                ],
                [
                  "FaInstagram",
                  "https://www.instagram.com/tolman_tube",
                  "text-pink-400 hover:bg-pink-500/15",
                ],
                [
                  "FaFacebook",
                  "https://www.facebook.com/profile.php?id=61555804154730",
                  "text-blue-400 hover:bg-blue-500/15",
                ],
                [
                  "FaYoutube",
                  "https://www.youtube.com/@tolinaaf",
                  "text-red-400 hover:bg-red-500/15",
                ],
                [
                  "FaGithub",
                  "https://github.com/TolesaTesfaye",
                  "text-slate-300 hover:bg-white/10",
                ],
                [
                  "FaLinkedin",
                  "https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/",
                  "text-sky-400 hover:bg-sky-500/15",
                ],
              ].map(([Icon, href, hover]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-inset ring-white/10 ${hover} text-slate-300 transition-all text-sm md:text-base active:scale-95`}
                >
                  {(() => {
                    switch (Icon) {
                      case "FaTelegram":
                        return <FaTelegram />;
                      case "FaTiktok":
                        return <FaTiktok />;
                      case "FaInstagram":
                        return <FaInstagram />;
                      case "FaFacebook":
                        return <FaFacebook />;
                      case "FaYoutube":
                        return <FaYoutube />;
                      case "FaGithub":
                        return <FaGithub />;
                      case "FaLinkedin":
                        return <FaLinkedin />;
                      default:
                        return null;
                    }
                  })()}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – About SuccessBridge */}
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-blue-400 inline-block" />
              About SuccessBridge
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5">
              {[
                { label: "Our Mission", href: "/about" },
                { label: "Contact / Get in Touch", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
              ].map((item) => (
                <li key={item.label}>
                  <ScrollLink
                    to={item.href}
                    className="text-slate-400 hover:text-blue-300 transition-colors text-xs md:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-violet-400 inline-block" />
              Platform
            </h4>
            <ul className="space-y-1.5 md:space-y-2.5">
              {getPlatformLinks().map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-violet-300 transition-colors text-xs md:text-sm leading-relaxed block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact Address */}
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-5 flex items-center gap-2">
              <span className="w-[3px] h-4 md:h-5 rounded-full bg-emerald-400 inline-block" />
              Contact Us
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href="mailto:support@successbridge.edu.et"
                  className="group flex items-start gap-2 text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Email
                    </p>
                    <p className="text-xs md:text-sm font-medium">
                      support@successbridge.edu.et
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Location
                    </p>
                    <p className="text-xs md:text-sm font-medium">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/10 bg-black/25">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-slate-500 text-[11px] md:text-xs text-center md:text-left tracking-wider">
              © {new Date().getFullYear()} SUCCESSBRIDGE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                to="/privacy-policy"
                className="text-slate-400 hover:text-white transition-colors text-[11px] md:text-xs tracking-wider"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-slate-400 hover:text-white transition-colors text-[11px] md:text-xs tracking-wider"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
