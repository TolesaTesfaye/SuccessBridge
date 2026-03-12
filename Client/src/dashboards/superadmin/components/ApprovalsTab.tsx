import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

const AdminApprovalsContent: React.FC = () => {
  const [pendingAdmins, setPendingAdmins] = useState([
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed.hassan@jimma.edu.et',
      university: 'Jimma University',
      department: 'Computer Science',
      requestDate: '2026-03-08',
      documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf'],
      status: 'pending'
    },
    {
      id: 2,
      name: 'Prof. Sarah Bekele',
      email: 'sarah.bekele@aau.edu.et',
      university: 'Addis Ababa University',
      department: 'Mathematics',
      requestDate: '2026-03-07',
      documents: ['CV.pdf', 'PhD_Certificate.pdf'],
      status: 'pending'
    },
    {
      id: 3,
      name: 'Dr. Mulugeta Tadesse',
      email: 'mulugeta.t@bdu.edu.et',
      university: 'Bahir Dar University',
      department: 'Physics',
      requestDate: '2026-03-06',
      documents: ['CV.pdf', 'Masters_Certificate.pdf', 'Recommendation.pdf'],
      status: 'pending'
    }
  ])

  const handleApproveAdmin = (adminId: number) => {
    setPendingAdmins(prev => prev.map(admin => 
      admin.id === adminId ? { ...admin, status: 'approved' } : admin
    ))
    // TODO: Call API to approve admin
    console.log('Approving admin:', adminId)
  }

  const handleRejectAdmin = (adminId: number) => {
    setPendingAdmins(prev => prev.map(admin => 
      admin.id === adminId ? { ...admin, status: 'rejected' } : admin
    ))
    // TODO: Call API to reject admin
    console.log('Rejecting admin:', adminId)
  }

  const pendingCount = pendingAdmins.filter(admin => admin.status === 'pending').length

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Registration Approvals</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review and approve new admin registrations</p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-bold">
            {pendingCount} Pending
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {pendingAdmins.filter(admin => admin.status === 'pending').map(admin => (
            <div key={admin.id} className="p-6 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 border-l-4 border-l-orange-500 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-2xl">
                      👨‍💼
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{admin.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{admin.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">University</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{admin.university}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Department</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{admin.department}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Request Date</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{admin.requestDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Documents</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {admin.documents.map((doc, _) => (
                          <span key={doc} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="rounded-xl px-6"
                    onClick={() => handleApproveAdmin(admin.id)}
                  >
                    ✅ Approve
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="rounded-xl px-6"
                    onClick={() => handleRejectAdmin(admin.id)}
                  >
                    ❌ Reject
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-xl px-6"
                  >
                    👁️ Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {pendingCount === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">All Caught Up!</h4>
              <p className="text-slate-500 dark:text-slate-400">No pending admin approvals at the moment.</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

const PaymentApprovalsContent: React.FC = () => {
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      studentName: 'Abebe Kebede',
      studentEmail: 'abebe.k@student.edu.et',
      university: 'Jimma University',
      amount: 2500,
      currency: 'ETB',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-2026-001234',
      paymentDate: '2026-03-09',
      semester: 'Spring 2026',
      paymentFor: 'Tuition Fee',
      receipt: 'receipt_001234.pdf',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Hanan Mohammed',
      studentEmail: 'hanan.m@student.edu.et',
      university: 'Addis Ababa University',
      amount: 1800,
      currency: 'ETB',
      paymentMethod: 'Mobile Money',
      transactionId: 'TXN-2026-001235',
      paymentDate: '2026-03-08',
      semester: 'Spring 2026',
      paymentFor: 'Registration Fee',
      receipt: 'receipt_001235.pdf',
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'Dawit Haile',
      studentEmail: 'dawit.h@student.edu.et',
      university: 'Bahir Dar University',
      amount: 3200,
      currency: 'ETB',
      paymentMethod: 'Cash Deposit',
      transactionId: 'TXN-2026-001236',
      paymentDate: '2026-03-07',
      semester: 'Spring 2026',
      paymentFor: 'Tuition Fee + Lab Fee',
      receipt: 'receipt_001236.pdf',
      status: 'pending'
    }
  ])

  const handleApprovePayment = (paymentId: number) => {
    setPendingPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'approved' } : payment
    ))
    // TODO: Call API to approve payment
    console.log('Approving payment:', paymentId)
  }

  const handleRejectPayment = (paymentId: number) => {
    setPendingPayments(prev => prev.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'rejected' } : payment
    ))
    // TODO: Call API to reject payment
    console.log('Rejecting payment:', paymentId)
  }

  const pendingCount = pendingPayments.filter(payment => payment.status === 'pending').length
  const totalAmount = pendingPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Approvals</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review and approve student payment submissions</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
              {totalAmount.toLocaleString()} ETB
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-bold">
              {pendingCount} Pending
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {pendingPayments.filter(payment => payment.status === 'pending').map(payment => (
            <div key={payment.id} className="p-6 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 border-l-4 border-l-green-500 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl">
                      💳
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{payment.studentName}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{payment.studentEmail}</p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {payment.amount.toLocaleString()} {payment.currency}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{payment.paymentFor}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">University</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{payment.university}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Payment Method</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{payment.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Transaction ID</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 font-mono">{payment.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Payment Date</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{payment.paymentDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Semester</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{payment.semester}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Receipt</p>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">
                        📄 {payment.receipt}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="rounded-xl px-6"
                    onClick={() => handleApprovePayment(payment.id)}
                  >
                    ✅ Approve
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="rounded-xl px-6"
                    onClick={() => handleRejectPayment(payment.id)}
                  >
                    ❌ Reject
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-xl px-6"
                  >
                    👁️ View Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {pendingCount === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💰</div>
              <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">All Payments Processed!</h4>
              <p className="text-slate-500 dark:text-slate-400">No pending payment approvals at the moment.</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export const ApprovalsTab: React.FC = () => {
  const [approvalTab, setApprovalTab] = useState<'admins' | 'payments'>('admins')
  
  return (
    <div className="space-y-6">
      {/* Approval Sub-tabs */}
      <div className="bg-white dark:bg-slate-800/40 p-1.5 rounded-[20px] shadow-sm border border-slate-200 dark:border-white/5 flex items-center gap-2">
        <button
          onClick={() => setApprovalTab('admins')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[16px] font-semibold text-sm transition-all duration-300 ${
            approvalTab === 'admins'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
          }`}
        >
          👨‍💼 Admin Approvals
        </button>
        <button
          onClick={() => setApprovalTab('payments')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[16px] font-semibold text-sm transition-all duration-300 ${
            approvalTab === 'payments'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
          }`}
        >
          💳 Payment Approvals
        </button>
      </div>

      {/* Approval Content */}
      {approvalTab === 'admins' && <AdminApprovalsContent />}
      {approvalTab === 'payments' && <PaymentApprovalsContent />}
    </div>
  )
}