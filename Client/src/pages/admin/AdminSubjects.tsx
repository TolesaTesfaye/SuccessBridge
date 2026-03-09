import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'

export const AdminSubjects: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [subjects] = useState([
    { id: 1, name: 'Mathematics', grade: 'Grade 9', stream: 'Science', resources: 24 },
    { id: 2, name: 'Physics', grade: 'Grade 10', stream: 'Science', resources: 18 },
    { id: 3, name: 'Chemistry', grade: 'Grade 10', stream: 'Science', resources: 15 },
    { id: 4, name: 'Biology', grade: 'Grade 11', stream: 'Science', resources: 22 },
    { id: 5, name: 'English', grade: 'Grade 9', stream: 'General', resources: 30 },
  ])

  return (
    <DashboardLayout title="Subjects" subtitle="Manage department subjects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 m-0">All Subjects</h2>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            Add Subject
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map(subject => (
            <Card key={subject.id}>
              <CardBody>
                <h3 className="text-lg font-bold text-gray-900 m-0">{subject.name}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600 text-sm m-0"><strong>Grade:</strong> {subject.grade}</p>
                  <p className="text-gray-600 text-sm m-0"><strong>Stream:</strong> {subject.stream}</p>
                  <p className="text-gray-600 text-sm m-0"><strong>Resources:</strong> {subject.resources}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" fullWidth>Edit</Button>
                  <Button variant="danger" size="sm" fullWidth>Delete</Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Subject">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Subject Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Mathematics" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Grade</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Stream</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
                <option>Science</option>
                <option>Social Science</option>
                <option>General</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth>Add Subject</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
