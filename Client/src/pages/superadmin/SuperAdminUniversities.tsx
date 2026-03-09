import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'

export const SuperAdminUniversities: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [universities] = useState([
    { id: 1, name: 'Addis Ababa University', location: 'Addis Ababa', departments: 8, admins: 3, students: 450 },
    { id: 2, name: 'Hawassa University', location: 'Hawassa', departments: 6, admins: 2, students: 320 },
    { id: 3, name: 'Bahir Dar University', location: 'Bahir Dar', departments: 5, admins: 2, students: 280 },
    { id: 4, name: 'Mekelle University', location: 'Mekelle', departments: 4, admins: 1, students: 200 },
  ])

  return (
    <DashboardLayout title="Universities" subtitle="Manage universities on the platform">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 m-0">All Universities</h2>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            Add University
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {universities.map(uni => (
            <Card key={uni.id}>
              <CardBody>
                <h3 className="text-lg font-bold text-gray-900 m-0">{uni.name}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600 text-sm m-0"><strong>Location:</strong> {uni.location}</p>
                  <p className="text-gray-600 text-sm m-0"><strong>Departments:</strong> {uni.departments}</p>
                  <p className="text-gray-600 text-sm m-0"><strong>Admins:</strong> {uni.admins}</p>
                  <p className="text-gray-600 text-sm m-0"><strong>Students:</strong> {uni.students}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" fullWidth>Edit</Button>
                  <Button variant="danger" size="sm" fullWidth>Delete</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New University">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">University Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Addis Ababa University" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Addis Ababa" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="contact@university.edu" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth>Add University</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
