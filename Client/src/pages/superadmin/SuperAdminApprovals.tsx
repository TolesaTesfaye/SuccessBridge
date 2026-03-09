import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

export const SuperAdminApprovals: React.FC = () => {
  const [approvals] = useState([
    { id: 1, title: 'Mathematics Textbook', type: 'Textbook', university: 'AAU', admin: 'Admin 1', uploadedDate: '2024-03-01', status: 'Pending' },
    { id: 2, title: 'Physics Lab Guide', type: 'Guide', university: 'Addis Ababa Science', admin: 'Admin 2', uploadedDate: '2024-03-02', status: 'Pending' },
    { id: 3, title: 'Chemistry Quiz', type: 'Quiz', university: 'Hawassa University', admin: 'Admin 3', uploadedDate: '2024-03-03', status: 'Pending' },
    { id: 4, title: 'Biology Notes', type: 'Notes', university: 'Bahir Dar University', admin: 'Admin 4', uploadedDate: '2024-03-04', status: 'Pending' },
  ])

  return (
    <DashboardLayout title="Approvals" subtitle="Review and approve pending resources">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 m-0">Pending Approvals</h2>

        <div className="space-y-4">
          {approvals.map(approval => (
            <Card key={approval.id}>
              <CardBody>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 m-0">{approval.title}</h3>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-600 text-xs m-0">Type</p>
                        <p className="text-gray-900 font-semibold m-0">{approval.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs m-0">University</p>
                        <p className="text-gray-900 font-semibold m-0">{approval.university}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs m-0">Uploaded By</p>
                        <p className="text-gray-900 font-semibold m-0">{approval.admin}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs m-0">Date</p>
                        <p className="text-gray-900 font-semibold m-0">{approval.uploadedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="success" size="sm">Approve</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
