import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Camera, Mail, Phone, BookOpen, GraduationCap, Building2, Calendar, User as UserIcon, ShieldCheck } from 'lucide-react'

export const StudentProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Abebe Kebede',
    email: 'abebe@example.com',
    phone: '+251-911-123456',
    grade: 'Grade 10',
    stream: 'Science',
    university: 'Addis Ababa University',
    department: 'Natural Sciences',
    joinDate: '2024-01-15',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your account settings and preferences">
      <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
        
        {/* Profile Header Banner */}
        <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-black/10 blur-3xl"></div>
          </div>
          
          <div className="px-8 pb-8 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 -mt-16">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 p-2 shadow-2xl overflow-hidden shrink-0 border-4 border-white dark:border-slate-900 relative z-10">
                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-2xl flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                  <UserIcon size={48} strokeWidth={1.5} />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-20">
                  <Camera size={18} />
                </button>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{profile.name}</h1>
                <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold w-fit mx-auto sm:mx-0">
                  <ShieldCheck size={16} /> Student
                </span>
              </div>
              <p className="text-slate-500 font-medium">{profile.email} • Joined {new Date(profile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="mb-2 shrink-0 w-full sm:w-auto">
              <Button 
                variant={isEditing ? 'secondary' : 'primary'} 
                className="w-full sm:w-auto !rounded-2xl shadow-lg"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[32px] overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
                  <UserIcon size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Personal Information</h3>
              </div>
              <CardBody className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <UserIcon size={14} /> Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-lg border-b-2 border-transparent disabled:opacity-90 disabled:cursor-not-allowed focus:outline-none focus:border-blue-600 transition-colors py-1"
                      placeholder="Enter full name"
                    />
                    {isEditing && <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-800 -mt-1 hidden group-focus-within:block" />}
                  </div>
                  
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={14} /> Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-lg border-b-2 border-transparent disabled:opacity-90 disabled:cursor-not-allowed focus:outline-none focus:border-blue-600 transition-colors py-1"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Phone size={14} /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="w-full bg-transparent text-slate-900 dark:text-white font-semibold text-lg border-b-2 border-transparent disabled:opacity-90 disabled:cursor-not-allowed focus:outline-none focus:border-blue-600 transition-colors py-1"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-10 flex gap-4 pt-6 border-t border-slate-100 dark:border-white/5">
                    <Button variant="primary" className="!rounded-xl shadow-lg shadow-blue-500/30 w-full sm:w-auto" onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" className="!rounded-xl w-full sm:w-auto" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Academic Information */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[32px] overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900">
              <div className="px-8 py-6 border-b border-slate-200/60 dark:border-white/5 flex items-center gap-3">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Academic Profile</h3>
              </div>
              <CardBody className="p-8 space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Current Grade</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{profile.grade}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Academic Stream</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{profile.stream}</p>
                  </div>
                </div>

                <div className="my-6 h-px w-full bg-slate-200/60 dark:bg-white/5"></div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Target University</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{profile.university}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Target Department</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{profile.department}</p>
                  </div>
                </div>

              </CardBody>
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}
