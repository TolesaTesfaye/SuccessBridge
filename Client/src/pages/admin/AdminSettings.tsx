import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    departmentName: 'Computer Science Department',
    email: 'admin@example.com',
    phone: '+251-911-123456',
    location: 'Addis Ababa, Ethiopia',
    notificationsEnabled: true,
    emailNotifications: true,
    resourceApprovalRequired: true,
  })

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout title="Settings" subtitle="Manage department settings">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>Department Information</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department Name</label>
                <input
                  type="text"
                  value={settings.departmentName}
                  onChange={(e) => handleChange('departmentName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
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
                  checked={settings.notificationsEnabled}
                  onChange={(e) => handleChange('notificationsEnabled', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <span className="text-gray-900 font-medium">Enable Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <span className="text-gray-900 font-medium">Email Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.resourceApprovalRequired}
                  onChange={(e) => handleChange('resourceApprovalRequired', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <span className="text-gray-900 font-medium">Require Approval for Resources</span>
              </label>
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-2">
          <Button variant="primary">Save Settings</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
