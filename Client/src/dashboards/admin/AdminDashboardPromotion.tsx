import React from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'

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
  Megaphone
} from 'lucide-react'

export const AdminDashboardPromotion: React.FC = () => {
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
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-12 px-2 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-16 text-white shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest backdrop-blur-md">
              <Megaphone className="w-4 h-4" />
              Promotion Hub
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight">Expand the SuccessBridge Ecosystem.</h2>
            <p className="text-lg text-blue-100 max-w-2xl leading-relaxed font-medium">
              Join us in our mission to revolutionize Ethiopian education. Discover collaborative opportunities, explore related educational platforms, and connect with the driving force behind this project.
            </p>
          </div>
          <div className="shrink-0">
             <div className="w-48 h-48 rounded-[48px] bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden group">
                <Rocket className="w-24 h-24 text-white group-hover:translate-x-20 group-hover:-translate-y-20 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </div>

      {/* Why Choose SuccessBridge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-none shadow-xl bg-white dark:bg-[#1a1b23] hover:scale-[1.02] transition-all rounded-[32px] overflow-hidden">
            <CardBody className="p-8 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center border border-blue-500/10 shadow-inner">
                <feature.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{feature.title}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Developer Section */}
        <Card className="lg:col-span-2 border-none shadow-2xl overflow-hidden rounded-[48px] bg-white dark:bg-[#1a1b23]">
          <div className="bg-slate-50/50 dark:bg-white/[0.02] px-10 py-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Lead Developer</h3>
            </div>
            <div className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">Active</div>
          </div>
          <CardBody className="p-10">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="shrink-0">
                <div className="w-40 h-40 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-5xl font-black shadow-2xl relative group overflow-hidden">
                  {developer.name.split(' ').map(n => n[0]).join('')}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{developer.name}</h4>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{developer.title}</p>
                </div>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{developer.bio}</p>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Portfolio', href: developer.portfolio, icon: Globe, color: 'bg-blue-600' },
                    { label: 'GitHub', href: developer.github, icon: Github, color: 'bg-slate-800' },
                    { label: 'LinkedIn', href: developer.linkedin, icon: Linkedin, color: 'bg-blue-700' },
                    { label: 'YouTube', href: developer.youtube, icon: Youtube, color: 'bg-red-600' },
                  ].map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-3 ${link.color} text-white rounded-2xl font-bold text-xs transition-all hover:scale-105 shadow-lg active:scale-95`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={`mailto:${developer.email}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-xs transition-all hover:scale-105 shadow-lg active:scale-95"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quick Links / Social */}
        <Card className="border-none shadow-2xl rounded-[48px] bg-white dark:bg-[#1a1b23] overflow-hidden">
           <CardHeader className="p-10 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Social Network</h3>
           </CardHeader>
           <CardBody className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                 {[
                   { label: 'Twitter / X', value: '@tolesatesfaye', icon: Twitter, color: 'text-blue-400' },
                   { label: 'YouTube Hub', value: 'Tolman Tube', icon: Youtube, color: 'text-red-500' },
                   { label: 'Platform Website', value: 'successbridge.com', icon: Globe, color: 'text-indigo-500' }
                 ].map((item, idx) => (
                   <div key={idx} className="p-8 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl bg-slate-100 dark:bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</p>
                         </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                   </div>
                 ))}
              </div>
           </CardBody>
        </Card>
      </div>

      {/* Online Courses Grid */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 shadow-inner">
             <BookOpen className="w-6 h-6" />
           </div>
           <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Strategic Resources</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="group relative overflow-hidden rounded-[40px] bg-white dark:bg-[#1a1b23] border border-slate-100 dark:border-white/5 shadow-2xl hover:border-blue-500/30 transition-all duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
              <div className="relative p-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white mb-8 shadow-xl group-hover:scale-110 transition-transform`}>
                  <course.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-3">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">{course.title}</h4>
                  <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{course.platform}</p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{course.description}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-blue-600 transition-colors"
                  >
                    Launch Node
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Broadcast CTA */}
      <div className="relative rounded-[48px] bg-[#0c0a09] p-12 md:p-20 text-center text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
        <h3 className="relative z-10 text-3xl md:text-5xl font-black mb-6 tracking-tight">Scale Your Influence.</h3>
        <p className="relative z-10 text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
          Interested in featuring your educational content or collaborating on new features? Let's build the future of Ethiopian EdTech together.
        </p>
        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          <a
            href={`mailto:${developer.email}`}
            className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl active:scale-95"
          >
            Direct Integration
          </a>
          <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-xl">
            Partner Inquiries
          </button>
        </div>
      </div>

    </div>
  )
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
  </svg>
)
