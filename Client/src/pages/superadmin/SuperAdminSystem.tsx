import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { systemService, SystemStatus } from '@services/systemService'
import { LoadingOverlay } from '@components/common/Spinner'
import { 
  Activity, 
  Database, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  HardDrive, 
  Settings, 
  Zap, 
  RefreshCw, 
  Trash2, 
  FileText, 
  Download 
} from 'lucide-react'

export const SuperAdminSystem: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await systemService.getStatus()
      if (res.success && res.data) {
        setSystemStatus(res.data)
      }
    } catch (error) {
      console.error('Failed to fetch system status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (action: string) => {
    try {
      setActionLoading(action)
      setMessage(null)
      const res = await systemService.performAction(action)
      if (res.success) {
        setMessage({ type: 'success', text: res.message || 'Action completed successfully' })
      } else {
        setMessage({ type: 'error', text: (res as any).error || 'Action failed' })
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An unexpected error occurred' })
    } finally {
      setActionLoading(null)
    }
  }

  if (loading && !systemStatus) {
    return <LoadingOverlay message="Fetching live system metrics..." />
  }

  const status = systemStatus || {
    apiStatus: 'Unknown',
    database: 'Unknown',
    cache: 'Unknown',
    storage: 'Unknown',
    uptime: 'Unknown',
    lastBackup: 'Unknown'
  }

  const MetricCard = ({ icon: Icon, label, value, statusColor }: { icon: any, label: string, value: string, statusColor: string }) => (
    <div className={`relative group p-6 rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 blur-2xl rounded-full ${statusColor === 'green' ? 'bg-green-500' : statusColor === 'blue' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-3 rounded-xl ${statusColor === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : statusColor === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${statusColor === 'green' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : statusColor === 'blue' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live</span>
        </div>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</h3>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  )

  const ActionCard = ({ icon: Icon, title, description, action, loadingKey, label }: { icon: any, title: string, description: string, action: string, loadingKey: string, label: string }) => (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
          <div className="mt-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => handleAction(action)} 
              disabled={!!actionLoading}
              className="w-full justify-center gap-2 border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold"
            >
              {actionLoading === loadingKey ? (
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
              ) : (
                <>
                  <Zap className="w-4 h-4 transition-transform group-hover:scale-125" />
                  {label}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout 
      title="System Intelligence" 
      subtitle={
        <div className="flex items-center gap-2">
          <span>Real-time system health and administration</span>
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full text-[10px] font-bold text-green-600 uppercase tracking-tighter">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            Live
          </div>
        </div>
      }
    >
      <div className="space-y-8 pb-10">
        {message && (
          <div className={`p-4 rounded-xl font-medium text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
            : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
            {message.text}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard 
            icon={Activity} 
            label="API Availability" 
            value={status.apiStatus} 
            statusColor={status.apiStatus === 'Operational' ? 'green' : 'amber'} 
          />
          <MetricCard 
            icon={Database} 
            label="Database Connectivity" 
            value={status.database} 
            statusColor={status.database === 'Healthy' ? 'green' : 'amber'} 
          />
          <MetricCard 
            icon={Cpu} 
            label="Caching Layer" 
            value={status.cache} 
            statusColor="blue" 
          />
          <MetricCard 
            icon={HardDrive} 
            label="Disk Resource" 
            value={status.storage} 
            statusColor="blue" 
          />
          <MetricCard 
            icon={Clock} 
            label="System Uptime" 
            value={status.uptime} 
            statusColor="green" 
          />
          <MetricCard 
            icon={ShieldCheck} 
            label="Last Data Backup" 
            value={status.lastBackup} 
            statusColor="blue" 
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* System Operations Pane */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">System Operations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionCard 
                icon={Zap}
                title="Optimize Database"
                description="Re-index tables and vacuum dead space to improve query performance."
                action="optimize_db"
                loadingKey="optimize_db"
                label="Run Optimization"
              />
              <ActionCard 
                icon={Trash2}
                title="Purge System Cache"
                description="Clear all temporary application cache and force re-fetch."
                action="clear_cache"
                loadingKey="clear_cache"
                label="Clear Cache"
              />
              <ActionCard 
                icon={Download}
                title="Generate Snapshot"
                description="Create a full database snapshot and store it in cloud storage."
                action="backup"
                loadingKey="backup"
                label="Run Backup"
              />
              <ActionCard 
                icon={FileText}
                title="Export Logs"
                description="Package and download the last 24 hours of system event logs."
                action="logs"
                loadingKey="logs"
                label="Export Logs"
              />
            </div>
          </div>

          {/* Configuration Space */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Quick Config</h2>
            </div>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardBody className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Max Upload (MB)</label>
                  <input type="number" defaultValue="100" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Session (Min)</label>
                  <input type="number" defaultValue="30" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                </div>
                <div className="pt-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Maintenance Mode</span>
                    <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                  </label>
                </div>
                <Button className="w-full shadow-lg shadow-indigo-500/20 py-2.5 rounded-xl">
                  Save Changes
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
