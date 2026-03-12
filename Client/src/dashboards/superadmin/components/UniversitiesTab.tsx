import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { UNIVERSITIES } from '@utils/constants'

export const UniversitiesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)

  const filteredUniversities = UNIVERSITIES.filter(university =>
    university.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUniversityStats = () => {
    // Mock data - in real app, this would come from API
    return {
      students: Math.floor(Math.random() * 5000) + 1000,
      admins: Math.floor(Math.random() * 10) + 2,
      resources: Math.floor(Math.random() * 200) + 50,
      departments: Math.floor(Math.random() * 15) + 5
    }
  }

  const getUniversityLocation = (university: string) => {
    // Extract location from university name or provide default
    const locationMap: { [key: string]: string } = {
      'Addis Ababa University': 'Addis Ababa',
      'Jimma University': 'Jimma, Oromia',
      'Bahir Dar University': 'Bahir Dar, Amhara',
      'Hawassa University': 'Hawassa, SNNPR',
      'Mekelle University': 'Mekelle, Tigray',
      'Haramaya University': 'Haramaya, Oromia',
      'Gondar University': 'Gondar, Amhara',
      'Adama Science and Technology University': 'Adama, Oromia',
      'Arba Minch University': 'Arba Minch, SNNPR',
      'Wollo University': 'Dessie, Amhara'
    }
    return locationMap[university] || 'Ethiopia'
  }

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">🏛️</span>
                Ethiopian Universities Management
              </h2>
              <p className="text-slate-500 text-sm mt-1">Manage {UNIVERSITIES.length} universities across Ethiopia</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search universities..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="primary" size="sm" className="rounded-xl">
                Add University
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUniversities.map((university) => {
          const stats = getUniversityStats()
          const location = getUniversityLocation(university)
          
          return (
            <Card key={university} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardBody>
                <div className="space-y-4">
                  {/* University Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {university.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight group-hover:text-blue-600 transition-colors">
                        {university}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                        📍 {location}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.students.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Students</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.resources}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Resources</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.admins}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Admins</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.departments}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Departments</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1 rounded-lg text-xs"
                      onClick={() => setSelectedUniversity(university)}
                    >
                      👁️ View Details
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1 rounded-lg text-xs"
                    >
                      ⚙️ Manage
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredUniversities.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No Universities Found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search terms</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* University Details Modal would go here */}
      {selectedUniversity && (
        <Card className="fixed inset-4 z-50 overflow-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{selectedUniversity} - Details</h3>
              <Button variant="secondary" size="sm" onClick={() => setSelectedUniversity(null)}>
                ✕ Close
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <p>Detailed information about {selectedUniversity} would be displayed here.</p>
              <p>This could include:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Complete student roster</li>
                <li>Admin assignments</li>
                <li>Department breakdown</li>
                <li>Resource statistics</li>
                <li>Performance metrics</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}