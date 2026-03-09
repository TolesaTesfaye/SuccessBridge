import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

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
    <DashboardLayout title="Profile" subtitle="Manage your account information">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <span>Personal Information</span>
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Academic Information</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Grade</label>
                <input
                  type="text"
                  value={profile.grade}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Stream</label>
                <input
                  type="text"
                  value={profile.stream}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">University</label>
                <input
                  type="text"
                  value={profile.university}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                <input
                  type="text"
                  value={profile.department}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Join Date</label>
                <input
                  type="text"
                  value={profile.joinDate}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {isEditing && (
          <div className="flex gap-2">
            <Button variant="primary">Save Changes</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
