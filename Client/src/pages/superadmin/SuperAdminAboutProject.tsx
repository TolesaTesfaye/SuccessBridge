import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Code2, Users, Zap, Shield, Globe, Lightbulb } from 'lucide-react'

export const SuperAdminAboutProject: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Scalable Architecture',
      description: 'Built to support 1M+ students across Ethiopian universities and high schools',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Role-Based Access Control',
      description: 'Three-tier permission system: Student, Admin, and Super Admin',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'High Performance',
      description: 'Optimized database queries, Redis caching, and CDN integration',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Hierarchical Organization',
      description: 'Content organized by Education Level → Grade/Stream → University → Department → Subject',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Personalization Engine',
      description: 'AI-powered recommendations and learning path suggestions',
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Modular Design',
      description: 'Independent modules for easy maintenance and future expansion',
    },
  ]

  const techStack = [
    {
      category: 'Frontend',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query', 'Vite'],
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'TypeScript', 'Sequelize ORM', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'DevOps',
      technologies: ['Docker', 'Kubernetes', 'Cloudflare CDN', 'AWS S3', 'GitHub Actions'],
    },
    {
      category: 'Security',
      technologies: ['JWT Authentication', 'bcryptjs', 'CORS', 'Rate Limiting', 'TLS/HTTPS'],
    },
  ]

  const modules = [
    { name: 'Authentication', status: '✅ Complete', description: 'User registration, login, JWT tokens' },
    { name: 'User Management', status: '✅ Complete', description: 'Student, Admin, Super Admin profiles' },
    { name: 'Education Structure', status: '✅ Complete', description: 'Hierarchical organization system' },
    { name: 'Resource Management', status: '✅ Complete', description: 'Unified upload and approval workflow' },
    { name: 'Quiz & Assessment', status: '✅ Complete', description: 'Quiz creation, scoring, results' },
    { name: 'Analytics', status: '✅ Complete', description: 'User and performance analytics' },
    { name: 'Recommendations', status: '🔄 In Progress', description: 'Personalized content suggestions' },
    { name: 'AI Tutor', status: '📋 Planned', description: 'AI-powered tutoring system' },
    { name: 'Discussion Forum', status: '📋 Planned', description: 'Student collaboration platform' },
    { name: 'Mentorship System', status: '📋 Planned', description: 'Peer and expert mentoring' },
  ]

  return (
    <DashboardLayout title="About SuccessBridge" subtitle="Project information and platform details">
      <div className="space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>🎓 SuccessBridge Learning Platform</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Project Overview</h3>
            <p className="text-slate-600 dark:text-slate-400">
              SuccessBridge is a comprehensive, scalable learning platform designed to revolutionize education in Ethiopia. 
              It provides a unified ecosystem for students, educators, and administrators to collaborate, learn, and grow.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              The platform supports both high school and university students with hierarchical content organization, 
              role-based access control, and advanced analytics to track learning progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t dark:border-white/5">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1M+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Target Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">50+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Universities & Schools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12K+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Resources</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>✨ Key Features</CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-white/5">
                <div className="text-blue-600 dark:text-blue-400 mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Technology Stack */}
      <Card>
        <CardHeader>🛠️ Technology Stack</CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">{stack.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Module Status */}
      <Card>
        <CardHeader>📦 Module Status</CardHeader>
        <CardBody>
          <div className="space-y-3">
            {modules.map((module, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-white/5 flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{module.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{module.description}</p>
                </div>
                <span className="ml-4 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold whitespace-nowrap">
                  {module.status}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Architecture Overview */}
      <Card>
        <CardHeader>🏗️ Architecture Overview</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white">Client-Server Model</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
              <pre>{`Frontend (React)
    ↓ (HTTPS/REST API)
API Gateway (Load Balancer)
    ↓
Backend (Node.js + Express)
    ↓
┌─────────────────────────────┐
│ Database (PostgreSQL)       │
│ Cache (Redis)               │
│ Storage (S3/Cloudflare R2)  │
└─────────────────────────────┘`}</pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white">Data Hierarchy</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
              <pre>{`Education Level
    ├── Grade/Stream (High School)
    └── University (University)
        ├── Faculty
        └── Department
            └── Subject
                └── Topic
                    └── Resource`}</pre>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Version & Credits */}
      <Card>
        <CardHeader>ℹ️ Version & Credits</CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Platform Version</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Last Updated</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">March 2026</p>
            </div>
          </div>

          <div className="pt-4 border-t dark:border-white/5">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              SuccessBridge is built with ❤️ to transform education in Ethiopia. 
              Our mission is to make quality education accessible to every student, regardless of their background.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              © 2026 SuccessBridge. All rights reserved. | 
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Privacy Policy</a> | 
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Terms of Service</a>
            </p>
          </div>
        </CardBody>
      </Card>
      </div>
    </DashboardLayout>
  )
}
