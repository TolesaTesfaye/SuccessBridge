import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

export const SuperAdminSystem: React.FC = () => {
  const [systemStatus] = useState({
    apiStatus: 'Operational',
    database: 'Healthy',
    cache: 'Active',
    storage: '78% used',
    uptime: '99.8%',
    lastBackup: '2024-03-06 02:00 AM',
  })

  return (
    <DashboardLayout title="System" subtitle="System settings and maintenance">
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>System Status</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">API Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{systemStatus.apiStatus}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Database</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{systemStatus.database}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Cache</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{systemStatus.cache}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Storage</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{systemStatus.storage}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Uptime</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">{systemStatus.uptime}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold text-gray-900">Last Backup</span>
                <span className="text-gray-600 text-sm">{systemStatus.lastBackup}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Maintenance</CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Button variant="secondary" fullWidth>Run Database Optimization</Button>
              <Button variant="secondary" fullWidth>Clear Cache</Button>
              <Button variant="secondary" fullWidth>Generate Backup</Button>
              <Button variant="secondary" fullWidth>View System Logs</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Configuration</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Max Upload Size (MB)</label>
                <input type="number" defaultValue="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Session Timeout (minutes)</label>
                <input type="number" defaultValue="30" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" />
                  <span className="text-gray-900 font-medium">Enable Maintenance Mode</span>
                </label>
              </div>
            </div>
          </CardBody>
        </Card>

        <Button variant="primary">Save Configuration</Button>
      </div>
    </DashboardLayout>
  )
}
