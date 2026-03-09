import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { FormCheckbox } from '@components/forms/FormCheckbox'
import { Save, RotateCcw } from 'lucide-react'
import { Spinner, LoadingOverlay } from '@components/common/Spinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { useToast } from '@components/common/Toast'
import api from '@services/api'

export const SuperAdminSystemSettings: React.FC = () => {
  const toast = useToast()
  const [settings, setSettings] = useState({
    platformName: 'SuccessBridge',
    platformEmail: 'support@successbridge.com',
    maintenanceMode: false,
    maxUploadSize: 100,
    sessionTimeout: 30,
    enableNotifications: true,
    enableAnalytics: true,
    enableRecommendations: true,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireEmailVerification: true,
    autoApproveResources: false,
    defaultLanguage: 'en',
    timezone: 'UTC',
  })

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState('')

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setInitialLoading(true)
        const response = await api.get('/settings')
        if (response.data) {
          setSettings(response.data)
        }
      } catch (err: any) {
        console.error('Failed to load settings:', err)
        setError('Failed to load settings. Using defaults.')
        toast.warning('Failed to load settings. Using defaults.')
      } finally {
        setInitialLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }))
    setSaved(false)
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      await api.put('/settings', settings)
      setSaved(true)
      toast.success('Settings saved successfully! ✓')
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save settings. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Settings save error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings({
        platformName: 'SuccessBridge',
        platformEmail: 'support@successbridge.com',
        maintenanceMode: false,
        maxUploadSize: 100,
        sessionTimeout: 30,
        enableNotifications: true,
        enableAnalytics: true,
        enableRecommendations: true,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
        requireEmailVerification: true,
        autoApproveResources: false,
        defaultLanguage: 'en',
        timezone: 'UTC',
      })
      toast.info('Settings reset to defaults')
    }
  }

  return (
    <DashboardLayout title="System Settings" subtitle="Configure platform settings and preferences">
      {initialLoading && <LoadingOverlay message="Loading settings..." />}
      
      <div className="space-y-6">
      {error && (
        <ErrorMessage
          type="error"
          title="Error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      {saved && (
        <ErrorMessage
          type="success"
          title="Success"
          message="Settings saved successfully!"
          onClose={() => setSaved(false)}
        />
      )}

      {/* General Settings */}
      <Card>
        <CardHeader>⚙️ General Settings</CardHeader>
        <CardBody className="space-y-4">
          <FormInput
            label="Platform Name"
            value={settings.platformName}
            onChange={(e) => handleChange('platformName', e.target.value)}
            placeholder="Enter platform name"
          />

          <FormInput
            label="Support Email"
            type="email"
            value={settings.platformEmail}
            onChange={(e) => handleChange('platformEmail', e.target.value)}
            placeholder="Enter support email"
          />

          <FormSelect
            label="Default Language"
            value={settings.defaultLanguage}
            onChange={(e) => handleChange('defaultLanguage', e.target.value)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'am', label: 'Amharic' },
              { value: 'or', label: 'Oromo' },
            ]}
          />

          <FormSelect
            label="Timezone"
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            options={[
              { value: 'UTC', label: 'UTC' },
              { value: 'EAT', label: 'East Africa Time (EAT)' },
              { value: 'GMT', label: 'GMT' },
            ]}
          />

          <div className="space-y-2">
            <FormCheckbox
              label="Maintenance Mode"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Enable to restrict access to the platform for maintenance</p>
          </div>
        </CardBody>
      </Card>

      {/* Upload & Storage Settings */}
      <Card>
        <CardHeader>📦 Upload & Storage Settings</CardHeader>
        <CardBody className="space-y-4">
          <FormInput
            label="Max Upload Size (MB)"
            type="number"
            value={settings.maxUploadSize}
            onChange={(e) => handleChange('maxUploadSize', parseInt(e.target.value))}
            min="1"
            max="1000"
          />

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-400">
            <p className="font-semibold mb-1">Storage Information</p>
            <p>Total Storage Used: 45.2 GB / 500 GB</p>
            <p>Resources: 12,450 files</p>
          </div>
        </CardBody>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>🔒 Security Settings</CardHeader>
        <CardBody className="space-y-4">
          <FormInput
            label="Max Login Attempts"
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
            min="1"
            max="10"
          />

          <FormInput
            label="Password Minimum Length"
            type="number"
            value={settings.passwordMinLength}
            onChange={(e) => handleChange('passwordMinLength', parseInt(e.target.value))}
            min="6"
            max="20"
          />

          <FormInput
            label="Session Timeout (minutes)"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
            min="5"
            max="480"
          />

          <div className="space-y-2">
            <FormCheckbox
              label="Require Email Verification"
              checked={settings.requireEmailVerification}
              onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Users must verify their email before accessing the platform</p>
          </div>
        </CardBody>
      </Card>

      {/* Feature Settings */}
      <Card>
        <CardHeader>✨ Feature Settings</CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <FormCheckbox
              label="Enable Notifications"
              checked={settings.enableNotifications}
              onChange={(e) => handleChange('enableNotifications', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Allow system to send notifications to users</p>
          </div>

          <div className="space-y-2">
            <FormCheckbox
              label="Enable Analytics"
              checked={settings.enableAnalytics}
              onChange={(e) => handleChange('enableAnalytics', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Track user behavior and platform metrics</p>
          </div>

          <div className="space-y-2">
            <FormCheckbox
              label="Enable Recommendations"
              checked={settings.enableRecommendations}
              onChange={(e) => handleChange('enableRecommendations', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Show personalized content recommendations to students</p>
          </div>

          <div className="space-y-2">
            <FormCheckbox
              label="Auto-Approve Resources"
              checked={settings.autoApproveResources}
              onChange={(e) => handleChange('autoApproveResources', e.target.checked)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 ml-7">Automatically approve resources without manual review</p>
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          loading={loading}
          disabled={loading}
          className="flex items-center justify-center gap-2"
          fullWidth
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Settings
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={handleReset}
          disabled={loading}
          className="flex items-center justify-center gap-2"
          fullWidth
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>
      </div>
    </DashboardLayout>
  )
}
