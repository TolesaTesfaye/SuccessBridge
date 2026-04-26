import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
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
  Rocket
} from 'lucide-react'

export const StudentPromotions: React.FC = () => {
  const developer = {
    name: 'Tolesa Tesfaye',
    title: 'Full-Stack Developer & Creator of SuccessBridge',
    bio: 'Passionate about building educational technology that empowers Ethiopian students to achieve their academic dreams.',
    portfolio: 'https://my-portfolio-lastport.vercel.app/',
    github: 'https://github.com/TolesaTesfaye',
    linkedin: 'https://www.linkedin.com/in/tolesa-tesfaye-9057a538b/',
    youtube: 'https://www.youtube.com/@tolinaaf',
    twitter: 'https://twitter.com/tolesatesfaye',
    email: 'tolesatesfaye273@gmail.com',
  }

  const courses = [
    {
      title: 'Tolman Tube - Oromo Language Content',
      platform: 'YouTube Channel',
      description: 'Educational content in Oromo language covering various topics. Subscribe for quality learning materials!',
      link: 'https://www.youtube.com/@tolinaaf',
      icon: Youtube,
      color: 'from-red-500 to-pink-600',
      image: 'https://i.ytimg.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg' // YouTube thumbnail
    },
    {
      title: 'Full-Stack Web Development',
      platform: 'Portfolio Projects',
      description: 'Explore real-world projects and learn modern web development techniques',
      link: 'https://my-portfolio-lastport.vercel.app/',
      icon: Code,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Ethiopian Education Resources',
      platform: 'SuccessBridge',
      description: 'Comprehensive study materials for Ethiopian high school and university students',
      link: '#',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600'
    },
  ]

  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of Ethiopian students on their journey to academic excellence'
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Curated resources aligned with Ethiopian curriculum standards'
    },
    {
      icon: Rocket,
      title: 'Continuous Growth',
      description: 'Regular updates with new features and learning materials'
    },
  ]

  return (
    <DashboardLayout title="Promotions & Resources" subtitle="Discover more learning opportunities and connect with the developer">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-12 px-2 md:px-0">
        
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 md:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider">About SuccessBridge</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 leading-tight">Empowering Ethiopian Students</h2>
            <p className="text-sm md:text-lg text-blue-100 max-w-3xl leading-relaxed">
              SuccessBridge is a comprehensive learning platform designed specifically for Ethiopian high school and university students. 
              Our mission is to bridge the gap between ambition and achievement by providing quality educational resources, 
              smart assessments, and personalized learning analytics.
            </p>
          </div>
        </div>

        {/* Why Choose SuccessBridge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardBody className="p-4 md:p-6 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Developer Section */}
        <Card className="border-none shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 px-4 py-3 md:px-8 md:py-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
              <Code className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              Meet the Developer
            </h3>
          </div>
          <CardBody className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-xl mx-auto md:mx-0">
                  {developer.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-2">{developer.name}</h4>
                <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3 md:mb-4">{developer.title}</p>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4 md:mb-6">{developer.bio}</p>
                
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  <a
                    href={developer.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all hover:scale-105 shadow-lg"
                  >
                    <Globe className="w-3 h-3 md:w-4 md:h-4" />
                    Portfolio
                  </a>
                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all hover:scale-105"
                  >
                    <Github className="w-3 h-3 md:w-4 md:h-4" />
                    GitHub
                  </a>
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all hover:scale-105"
                  >
                    <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={developer.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all hover:scale-105"
                  >
                    <Youtube className="w-3 h-3 md:w-4 md:h-4" />
                    YouTube
                  </a>
                  <a
                    href={`mailto:${developer.email}`}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all hover:scale-105"
                  >
                    <Mail className="w-3 h-3 md:w-4 md:h-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Online Courses */}
        <Card className="border-none shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-4 py-3 md:px-8 md:py-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              Online Courses & Resources
            </h3>
          </div>
          <CardBody className="p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {courses.map((course, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative p-4 md:p-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-3 md:mb-4 shadow-lg`}>
                      <course.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{course.title}</h4>
                    <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2 md:mb-3">{course.platform}</p>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-3 md:mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
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

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-xl md:text-3xl font-black mb-3 md:mb-4">Want to Build Something Amazing?</h3>
          <p className="text-sm md:text-lg text-indigo-100 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            Interested in collaborating on educational technology projects or need a custom learning platform? 
            Let's connect and create something impactful together!
          </p>
          <a
            href={`mailto:${developer.email}`}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white text-indigo-600 rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            Get in Touch
          </a>
        </div>

      </div>
    </DashboardLayout>
  )
}
