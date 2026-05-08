import api from './api'

export interface Payment {
  id: string
  userId: string
  subjectId: string
  amount: number
  currency: string
  paymentMethod: 'bank_transfer' | 'telebirr' | 'cbe_birr' | 'mpesa' | 'other'
  screenshotUrl: string
  transactionReference?: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
  notes?: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name: string
    email: string
    studentType: string
  }
  subject?: {
    id: string
    name: string
    description: string
  }
}

export interface CreatePaymentData {
  subjectId: string
  amount: number
  currency?: string
  paymentMethod: 'bank_transfer' | 'telebirr' | 'cbe_birr' | 'mpesa' | 'other'
  screenshot: File
  transactionReference?: string
  notes?: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
}

export interface PaymentFilters {
  page?: number
  limit?: number
  status?: 'pending' | 'approved' | 'rejected'
  userId?: string
  subjectId?: string
  educationLevel?: string
  universityId?: string
  departmentId?: string
}

export interface SubjectAccess {
  id: string
  userId: string
  subjectId: string
  paymentId: string
  accessGrantedAt: Date
  expiresAt?: Date
  subject?: {
    id: string
    name: string
  }
}

class PaymentService {
  async createPayment(data: CreatePaymentData): Promise<Payment> {
    const formData = new FormData()
    formData.append('subjectId', data.subjectId)
    formData.append('amount', data.amount.toString())
    formData.append('currency', data.currency || 'ETB')
    formData.append('paymentMethod', data.paymentMethod)
    formData.append('screenshot', data.screenshot)
    formData.append('educationLevel', data.educationLevel)
    
    if (data.transactionReference) {
      formData.append('transactionReference', data.transactionReference)
    }
    if (data.notes) {
      formData.append('notes', data.notes)
    }
    if (data.grade) {
      formData.append('grade', data.grade)
    }
    if (data.stream) {
      formData.append('stream', data.stream)
    }
    if (data.universityId) {
      formData.append('universityId', data.universityId)
    }
    if (data.departmentId) {
      formData.append('departmentId', data.departmentId)
    }

    console.log('📤 Submitting payment with FormData')
    console.log('📎 File:', data.screenshot.name, data.screenshot.size, 'bytes')
    
    const response = await api.post('/payments', formData)
    return response.data.data
  }

  async getPayments(filters?: PaymentFilters) {
    const response = await api.get('/payments', { params: filters })
    return response.data
  }

  async getPaymentById(id: string): Promise<Payment> {
    const response = await api.get(`/payments/${id}`)
    return response.data.data
  }

  async approvePayment(id: string) {
    const response = await api.put(`/payments/${id}/approve`)
    return response.data
  }

  async rejectPayment(id: string, rejectionReason: string) {
    const response = await api.put(`/payments/${id}/reject`, { rejectionReason })
    return response.data
  }

  async checkSubjectAccess(subjectId: string): Promise<boolean> {
    const response = await api.get(`/payments/access/check/${subjectId}`)
    return response.data.data.hasAccess
  }

  async getMySubjectAccess(): Promise<SubjectAccess[]> {
    const response = await api.get('/payments/access/my-subjects')
    return response.data.data
  }

  async getPaymentStats() {
    const response = await api.get('/payments/stats')
    return response.data.data
  }

  async getUserPayments(): Promise<{ data: Payment[] }> {
    const response = await api.get('/payments/my-payments')
    return response.data
  }
}

export const paymentService = new PaymentService()
