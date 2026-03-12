import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'
import { ResourceUploadForm } from '@/components/resources/ResourceUploadForm'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'

export const AdminResources: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Mock resources data
  const mockResources = [
    { id: '1', title: 'Mathematics Textbook', description: 'Comprehensive mathematics textbook for grade 10', type: 'textbook' as const, fileUrl: '/files/math.pdf', educationLevel: 'high_school' as const, grade: 'Grade 10', subjectId: '1', tags: ['math', 'textbook'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-02-15') },
    { id: '2', title: 'Physics Lab Guide', description: 'Laboratory guide for physics experiments', type: 'module' as const, fileUrl: '/files/physics.pdf', educationLevel: 'high_school' as const, grade: 'Grade 11', subjectId: '2', tags: ['physics', 'lab'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-02-20'), updatedAt: new Date('2024-02-20') },
    { id: '3', title: 'Chemistry Quiz', description: 'Interactive chemistry quiz', type: 'quiz' as const, fileUrl: '/files/chemistry.pdf', educationLevel: 'high_school' as const, grade: 'Grade 10', subjectId: '3', tags: ['chemistry', 'quiz'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-02-25'), updatedAt: new Date('2024-02-25') },
    { id: '4', title: 'Biology Notes', description: 'Comprehensive biology notes', type: 'worksheet' as const, fileUrl: '/files/biology.pdf', educationLevel: 'high_school' as const, grade: 'Grade 9', subjectId: '4', tags: ['biology', 'notes'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-03-01') },
    { id: '5', title: 'English Literature', description: 'English literature textbook', type: 'textbook' as const, fileUrl: '/files/english.pdf', educationLevel: 'high_school' as const, grade: 'Grade 12', subjectId: '5', tags: ['english', 'literature'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-03-02'), updatedAt: new Date('2024-03-02') },
    { id: '6', title: 'History Past Exam', description: 'Past examination papers', type: 'past_exam' as const, fileUrl: '/files/history.pdf', educationLevel: 'high_school' as const, grade: 'Grade 11', subjectId: '6', tags: ['history', 'exam'], uploadedBy: 'admin@example.com', createdAt: new Date('2024-03-03'), updatedAt: new Date('2024-03-03') },
  ]

  const handleUploadSubmit = (data: any) => {
    console.log('Resource uploaded:', data)
    setShowUpload(false)
  }

  return (
    <DashboardLayout title="Resources" subtitle="Manage department resources">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 m-0">All Resources</h2>
          <Button variant="primary" onClick={() => setShowUpload(true)}>
            Upload Resource
          </Button>
        </div>

        <ResourceFilter onFilter={() => {}} />
        <ResourceList
          resources={mockResources}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
          showActions={true}
        />

        <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload New Resource" size="lg">
          <ResourceUploadForm onSubmit={handleUploadSubmit} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}
