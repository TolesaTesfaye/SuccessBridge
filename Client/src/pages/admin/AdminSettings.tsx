import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import api from '@services/api'
import { ApiErrorHandler } from '@utils/apiErrorHandler'
import { 
  Globe, 
  Clock, 
  Bell, 
  Sparkles, 
  Lock, 
  ShieldAlert,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Settings2,
  SlidersHorizontal
} from 'lucide-react'

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableRecommendations: true,
    defaultLanguage: 'en',
    timezone: 'UTC',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true)
        const response = await api.get('/settings')
        const data = response.data?.data || {}
        setSettings({
          enableNotifications: Boolean(data.enableNotifications),
          enableRecommendations: Boolean(data.enableRecommendations),
          defaultLanguage: data.defaultLanguage || 'en',
          timezone: data.timezone || 'UTC',
        })
      } catch (err: any) {
        setError('Failed to load admin settings.')
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    setSuccess('')
    setError('')
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      await api.put('/settings', settings)
      setSuccess('Settings saved successfully.')
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError('Failed to save settings.')
      ApiErrorHandler.handle(err, 'Failed to save admin settings.')
    } finally {
      setSaving(false)
    }
  }

  // Beautiful Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, label, description, icon: Icon, colorClass }: any) => (
    <div className="flex items-start justify-between p-5 md:p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.04]">
      <div className="flex gap-4">
        <div className={`mt-1 p-2.5 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{label}</h4>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
        }`}
        disabled={loading}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )

  return (
    <DashboardLayout title="Admin Settings" subtitle="Configure platform behavior and localized preferences">
      <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Status Alerts */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-50 dark:bg-red-500/10 p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm font-bold text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}
        {success && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Localization Settings */}
            <Card className="border-none shadow-2xl rounded-[32px] bg-white dark:bg-[#1a1b23] overflow-hidden">
              <div className="bg-slate-50/50 dark:bg-white/[0.02] px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Localization</h3>
                  <p className="text-sm font-medium text-slate-500">Regional formatting and defaults</p>
                </div>
              </div>
              <CardBody className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Default Language</label>
                    <div className="relative">
                      <select
                        value={settings.defaultLanguage}
                        onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                        className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 bg-slate-50 dark:bg-[#13141a] border border-slate-200 dark:border-white/10 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white font-semibold appearance-none transition-all hover:border-blue-500/30 touch-manipulation min-h-[44px] md:min-h-[48px] text-sm md:text-base"
                        disabled={loading}
                      >
                        <option value="en" className="text-sm md:text-base py-2">English (US)</option>
                        <option value="am" className="text-sm md:text-base py-2">Amharic (Ethiopia)</option>
                        <option value="or" className="text-sm md:text-base py-2">Oromo (Ethiopia)</option>
                      </select>
                      <Globe className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-slate-400">
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Timezone</label>
                    <div className="relative">
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleChange('timezone', e.target.value)}
                        className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-3 md:py-4 bg-slate-50 dark:bg-[#13141a] border border-slate-200 dark:border-white/10 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white font-semibold appearance-none transition-all hover:border-blue-500/30 touch-manipulation min-h-[44px] md:min-h-[48px] text-sm md:text-base"
                        disabled={loading}
                      >
                        <option value="UTC" className="text-sm md:text-base py-2">Coordinated Universal Time (UTC)</option>
                        <option value="EAT" className="text-sm md:text-base py-2">East Africa Time (EAT)</option>
                        <option value="GMT" className="text-sm md:text-base py-2">Greenwich Mean Time (GMT)</option>
                      </select>
                      <Clock className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-slate-400">
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Feature Toggles */}
            <Card className="border-none shadow-2xl rounded-[32px] bg-white dark:bg-[#1a1b23] overflow-hidden">
              <div className="bg-slate-50/50 dark:bg-white/[0.02] px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Platform Features</h3>
                  <p className="text-sm font-medium text-slate-500">Enable or disable core system modules</p>
                </div>
              </div>
              <CardBody className="p-8 space-y-4">
                <ToggleSwitch
                  checked={settings.enableNotifications}
                  onChange={(val: boolean) => handleChange('enableNotifications', val)}
                  label="System Notifications"
                  description="Allow the system to send email and push notifications to students and staff."
                  icon={Bell}
                  colorClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                />
                <ToggleSwitch
                  checked={settings.enableRecommendations}
                  onChange={(val: boolean) => handleChange('enableRecommendations', val)}
                  label="AI Recommendations"
                  description="Enable machine-learning driven course and resource suggestions for students."
                  icon={Sparkles}
                  colorClass="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                />
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={loading || saving}
                className="flex-1 inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
              <button
                onClick={() => window.location.reload()}
                disabled={loading || saving}
                className="sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

          </div>

          {/* Sidebar / Info Column */}
          <div className="space-y-8">
            <Card className="border-none shadow-2xl rounded-[32px] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-[#13141a] dark:to-black overflow-hidden relative border border-white/10 text-white">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldAlert className="w-32 h-32" />
              </div>
              <CardBody className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-red-100">Super Admin Only</h3>
                </div>
                
                <p className="text-sm font-medium text-slate-400 mb-6 leading-relaxed">
                  The following configuration panels require elevated privileges and are restricted to Super Administrators:
                </p>

                <ul className="space-y-4">
                  {[
                    'Maintenance Mode Controls',
                    'Password & Security Policies',
                    'Session Timeout Limits',
                    'Auto-Approve Resources',
                    'Platform Identity Settings'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Contact super admin to request changes
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Quick Stats/Info */}
            <div className="rounded-[32px] border border-blue-500/20 bg-blue-500/5 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings2 className="w-5 h-5 text-blue-500" />
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Environment Info</h4>
              </div>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Current API Version</span>
                  <span className="text-slate-900 dark:text-white font-bold">v1.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Node Environment</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">Production</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
