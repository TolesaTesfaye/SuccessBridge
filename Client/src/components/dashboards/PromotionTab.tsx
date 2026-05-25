import React from "react";
import { Card, CardBody } from "@components/common/Card";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Globe,
  Code,
  BookOpen,
  Youtube,
  Twitter,
  Sparkles,
  Award,
  Users,
  Rocket,
  Play,
  Eye,
  Beaker,
  Calculator,
  Globe as EarthIcon,
  Dna,
  Zap,
  BarChart3,
  BookMarked,
  Lightbulb,
} from "lucide-react";
import portfolioThumb from "../../assets/portifolio.png";
import githubThumb from "../../assets/github.png";
import youtubeThumb from "../../assets/youtube.png";
import linkedinThumb from "../../assets/linkedin.png";

export const PromotionTab: React.FC = () => {
  // Featured YouTube Videos - Professional Video Gallery
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
      description:
        "Learn about the inspiration and vision behind SuccessBridge.",
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

  // Developer Social Links as Cards
  const socialLinks = [
    {
      name: "Portfolio",
      url: "https://my-portfolio-lastport.vercel.app/",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Explore my professional projects and work",
      thumbnail: portfolioThumb,
    },
    {
      name: "GitHub",
      url: "https://github.com/TolesaTesfaye",
      icon: Github,
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-100 dark:bg-gray-800/20",
      textColor: "text-gray-800 dark:text-gray-300",
      description: "Check out my open-source contributions",
      thumbnail: githubThumb,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/",
      icon: Linkedin,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-400",
      description: "Connect with me professionally",
      thumbnail: linkedinThumb,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@tolinaaf",
      icon: Youtube,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      description: "Subscribe for educational content",
      thumbnail: youtubeThumb,
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
      title: "Tolman Tube - Oromo Language Content",
      platform: "YouTube Channel",
      description:
        "Educational content in Oromo language covering various topics. Subscribe for quality learning materials!",
      link: "https://www.youtube.com/@tolinaaf",
      icon: Youtube,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Full-Stack Web Development",
      platform: "Portfolio Projects",
      description:
        "Explore real-world projects and learn modern web development techniques",
      link: "https://my-portfolio-lastport.vercel.app/",
      icon: Code,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Ethiopian Education Resources",
      platform: "SuccessBridge",
      description:
        "Comprehensive study materials for Ethiopian high school and university students",
      link: "#",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join thousands of Ethiopian students on their journey to academic excellence",
    },
    {
      icon: Award,
      title: "Quality Content",
      description:
        "Curated resources aligned with Ethiopian curriculum standards",
    },
    {
      icon: Rocket,
      title: "Continuous Growth",
      description: "Regular updates with new features and learning materials",
    },
  ];

  // Grade 12 Available Subjects
  const grade12Subjects = [
    {
      name: "Biology",
      icon: Dna,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Life sciences and living organisms",
    },
    {
      name: "Chemistry",
      icon: Beaker,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Matter, reactions, and molecular science",
    },
    {
      name: "Physics",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      description: "Energy, motion, and forces",
    },
    {
      name: "Math",
      icon: Calculator,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Numbers, algebra, and geometry",
    },
    {
      name: "English",
      icon: BookMarked,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      description: "Literature and language skills",
    },
    {
      name: "History",
      icon: BarChart3,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      description: "Historical events and civilizations",
    },
    {
      name: "Geography",
      icon: EarthIcon,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      description: "Earth systems and world cultures",
    },
    {
      name: "Economics",
      icon: Zap,
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
      description: "Trade, markets, and resources",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 pb-12 px-2 md:px-0">
      {/* Hero Banner - Enhanced */}
      <Card className="border-none shadow-2xl overflow-hidden -mx-2 md:-mx-0">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 md:p-16 text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-6">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                About SuccessBridge
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-slate-900 dark:text-white">
              Empowering Ethiopian
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Students
              </span>
            </h2>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              SuccessBridge is a comprehensive learning platform designed
              specifically for Ethiopian high school and university students.
              Our mission is to bridge the gap between ambition and achievement
              by providing quality educational resources, smart assessments, and
              personalized learning analytics.
            </p>
          </div>
        </div>
      </Card>

      {/* Developer Social Cards - New Professional Section */}
      <Card className="border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 px-6 py-4 md:px-10 md:py-8 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            Connect With the Developer
          </h3>
        </div>
        <CardBody className="p-6 md:p-10">
          {/* Developer Info */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-2xl mb-4">
              {developer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
              {developer.name}
            </h4>
            <p className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-semibold mb-4">
              {developer.title}
            </p>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {developer.bio}
            </p>
          </div>

          {/* Social Link Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 p-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white dark:bg-slate-800"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                {link.thumbnail && (
                  <div className="relative h-32 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-20`}
                    />
                    <img
                      src={link.thumbnail}
                      alt={`${link.name} thumbnail`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="relative p-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${link.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon className={`w-7 h-7 ${link.textColor}`} />
                  </div>
                  <h5 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                    {link.name}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {link.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span>Visit</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Why Choose SuccessBridge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-none shadow-lg hover:shadow-xl transition-all"
          >
            <CardBody className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Grade 12 Available Subjects - Inspire Students */}
      <Card className="border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 px-6 py-4 md:px-10 md:py-8 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            Grade 12 Available Subjects
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 ml-12 md:ml-16">
            Unlock access to all 8 comprehensive subjects with one payment
          </p>
        </div>
        <CardBody className="p-6 md:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
            {grade12Subjects.map((subject, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white dark:bg-slate-800`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
                />
                <div className="relative p-4 md:p-6 h-full flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <subject.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-1 md:mb-2">
                    {subject.name}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 md:mt-12 text-center">
            <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 border border-indigo-200 dark:border-indigo-700/50">
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-4">
                All 8 subjects with{" "}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  complete chapter-by-chapter materials
                </span>
                , practice questions, and resources
              </p>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                ✓ Interactive exercises • ✓ Downloadable resources • ✓ Lifetime
                access
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Online Courses */}
      <Card className="border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-6 py-4 md:px-10 md:py-8 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            Online Courses & Resources
          </h3>
        </div>
        <CardBody className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                ></div>
                <div className="relative p-4 md:p-6">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg`}
                  >
                    <course.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2 md:mb-3">
                    {course.platform}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-3 md:mb-4 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Learn More
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Featured Video Gallery - Professional Layout */}
      <Card className="border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 px-6 py-4 md:px-10 md:py-8 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-500 flex items-center justify-center">
              <Youtube className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white">
                Featured Video Gallery
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Watch and learn from our curated video content
              </p>
            </div>
          </div>
        </div>
        <CardBody className="p-4 md:p-8">
          {/* Main Featured Video */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group">
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideos[0].videoId}?rel=0&modestbranding=1`}
                title={featuredVideos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{featuredVideos[0].views} views</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Play className="w-3 h-3" />
                Featured Video
              </div>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">
                {featuredVideos[0].title}
              </h4>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {featuredVideos[0].description}
              </p>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {featuredVideos.slice(1).map((video, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 bg-white dark:bg-slate-800"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {video.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Call to Action - Enhanced */}
      <Card className="border-none shadow-2xl overflow-hidden -mx-2 md:-mx-0">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-8 md:p-16 text-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Let's Connect
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">
              Want to Build Something Amazing?
            </h3>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Interested in collaborating on educational technology projects or
              need a custom learning platform? Let's connect and create
              something impactful together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${developer.email}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all hover:scale-105 shadow-xl"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                Get in Touch
              </a>
              <a
                href={developer.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl font-bold text-sm md:text-base border border-indigo-200 dark:border-indigo-700 transition-all hover:scale-105 shadow-xl"
              >
                <Globe className="w-4 h-4 md:w-5 md:h-5" />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
