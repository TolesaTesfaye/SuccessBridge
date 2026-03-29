import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import api from '@services/api'
import { ApiErrorHandler } from '@utils/apiErrorHandler'

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
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      await api.put('/settings', settings)
      setSuccess('Settings saved successfully.')
    } catch (err: any) {
      setError('Failed to save settings.')
      ApiErrorHandler.handle(err, 'Failed to save admin settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardLayout title="Admin Settings" subtitle="Limited privilege settings">
      <div className="space-y-6 max-w-2xl">
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</div>}
        {success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm">{success}</div>}

        <Card>
          <CardHeader>Allowed Settings</CardHeader>
          <CardBody>
            <div className="space-y-4 opacity-100">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Default Language</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  disabled={loading}
                >
                  <option value="en">English</option>
                  <option value="am">Amharic</option>
                  <option value="or">Oromo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  disabled={loading}
                >
                  <option value="UTC">UTC</option>
                  <option value="EAT">East Africa Time (EAT)</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Preferences</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  disabled={loading}
                />
                <span className="text-gray-900 font-medium">Enable Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableRecommendations}
                  onChange={(e) => handleChange('enableRecommendations', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                  disabled={loading}
                />
                <span className="text-gray-900 font-medium">Enable Recommendations</span>
              </label>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Restricted to Super Admin</CardHeader>
          <CardBody>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>Maintenance mode</li>
              <li>Password and security policies</li>
              <li>Session timeout and login limits</li>
              <li>Auto-approve resources</li>
              <li>Platform name and platform email</li>
            </ul>
          </CardBody>
        </Card>

        <div className="flex gap-2">
          <Button variant="primary" onClick={handleSave} loading={saving} disabled={loading || saving}>
            Save Settings
          </Button>
          <Button
            variant="secondary"
            disabled={loading || saving}
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
