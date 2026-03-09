import api from './api'

export interface StudentProgress {
    id: string
    studentId: string
    subjectId: string
    resourcesCompleted: number
    quizzesCompleted: number
    averageScore: number
    lastAccessedAt: string
    subject?: {
        name: string
        id: string
    }
}

export const progressService = {
    getMine: async (): Promise<StudentProgress[]> => {
        const response = await api.get('/student/progress')
        return response.data
    },

    getStats: async (): Promise<any> => {
        const response = await api.get('/student/stats')
        return response.data
    }
}
