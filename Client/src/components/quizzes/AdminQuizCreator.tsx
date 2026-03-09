import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { quizService, Question } from '@services/quizService'
import { subjectService } from '@services/subjectService'
import { Plus, Trash2, Save, X, ChevronRight, ChevronLeft } from 'lucide-react'

interface AdminQuizCreatorProps {
    onClose: () => void
    onSuccess: () => void
}

export const AdminQuizCreator: React.FC<AdminQuizCreatorProps> = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [subjects, setSubjects] = useState<any[]>([])

    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        subjectId: '',
        timeLimit: 30,
        passingScore: 60,
        questions: [] as Question[]
    })

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await subjectService.getAll()
                setSubjects(data.map((s: any) => ({ value: s.id, label: s.name })))
            } catch (error) {
                console.error('Failed to fetch subjects:', error)
            }
        }
        fetchSubjects()
    }, [])

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: Math.random().toString(36).substr(2, 9),
            text: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correctAnswer: '',
            points: 5
        }
        setQuizData({ ...quizData, questions: [...quizData.questions, newQuestion] })
    }

    const handleRemoveQuestion = (id: string) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.filter(q => q.id !== id)
        })
    }

    const handleQuestionChange = (id: string, field: keyof Question, value: any) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.map(q => q.id === id ? { ...q, [field]: value } : q)
        })
    }

    const handleOptionChange = (qId: string, optIdx: number, value: string) => {
        setQuizData({
            ...quizData,
            questions: quizData.questions.map(q => {
                if (q.id === qId) {
                    const newOptions = [...(q.options || [])]
                    newOptions[optIdx] = value
                    return { ...q, options: newOptions }
                }
                return q
            })
        })
    }

    const handleSubmit = async () => {
        if (!quizData.title || !quizData.subjectId || quizData.questions.length === 0) {
            alert('Please fill in all required fields and add at least one question.')
            return
        }

        setLoading(true)
        try {
            await quizService.create({
                ...quizData,
                createdBy: '' // The server will override this with the authenticated user ID
            } as any)
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Failed to create quiz:', error)
            alert('Failed to create quiz. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-20">
            {/* Stepper Header */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-2 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all ${step === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        1
                    </div>
                    <div className="h-px w-8 bg-slate-200 dark:bg-white/10" />
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all ${step === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        2
                    </div>
                    <div className="ml-4">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                            {step === 1 ? 'Quiz Foundation' : 'Question Builder'}
                        </h2>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
                            {step === 1 ? 'Metadata & Settings' : 'Add Content & Answers'}
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                </button>
            </div>

            {step === 1 ? (
                <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[32px]">
                    <CardBody className="p-8 md:p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <FormInput
                                    label="Quiz Title"
                                    placeholder="e.g., Quantum Physics Final"
                                    value={quizData.title}
                                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                                />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium min-h-[120px]"
                                        placeholder="Briefly describe what this quiz covers..."
                                        value={quizData.description}
                                        onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <FormSelect
                                    label="Academic Subject"
                                    options={subjects}
                                    value={quizData.subjectId}
                                    onChange={(e) => setQuizData({ ...quizData, subjectId: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Time Limit (min)"
                                        type="number"
                                        value={quizData.timeLimit}
                                        onChange={(e) => setQuizData({ ...quizData, timeLimit: parseInt(e.target.value) })}
                                    />
                                    <FormInput
                                        label="Passing Score (%)"
                                        type="number"
                                        value={quizData.passingScore}
                                        onChange={(e) => setQuizData({ ...quizData, passingScore: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button variant="primary" onClick={() => setStep(2)} className="h-14 px-10 rounded-2xl shadow-lg shadow-blue-500/20">
                                Continue to Questions <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <div className="space-y-6">
                    {quizData.questions.map((q, idx) => (
                        <Card key={q.id} className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none rounded-3xl overflow-hidden group hover:ring-2 hover:ring-blue-500/20 transition-all">
                            <CardHeader className="bg-slate-50 dark:bg-slate-800/20 px-8 py-4 flex justify-between items-center border-none">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-black text-xs">
                                        Q{idx + 1}
                                    </span>
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">Question Block</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveQuestion(q.id)}
                                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-[12px] opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardBody className="p-8 space-y-6">
                                <FormInput
                                    label="Question Prompt"
                                    placeholder="Enter the question text here..."
                                    value={q.text}
                                    onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormSelect
                                        label="Question Type"
                                        value={q.type}
                                        onChange={(e) => handleQuestionChange(q.id, 'type', e.target.value)}
                                        options={[
                                            { value: 'multiple_choice', label: 'Multiple Choice' },
                                            { value: 'short_answer', label: 'Short Answer' },
                                            { value: 'essay', label: 'Essay' }
                                        ]}
                                    />
                                    <FormInput
                                        label="Points"
                                        type="number"
                                        value={q.points}
                                        onChange={(e) => handleQuestionChange(q.id, 'points', parseInt(e.target.value))}
                                    />
                                </div>

                                {q.type === 'multiple_choice' && (
                                    <div className="space-y-4 bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 mb-2 block">Answer Options</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {q.options?.map((opt, optIdx) => (
                                                <div key={optIdx} className="relative group/opt">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-300 dark:text-slate-600">
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${optIdx + 1}`}
                                                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800/80 border transition-all outline-none text-sm font-medium ${q.correctAnswer === opt && opt !== ''
                                                            ? 'border-emerald-500/50 ring-2 ring-emerald-500/10'
                                                            : 'border-slate-100 dark:border-white/5 focus:border-blue-500/50'
                                                            }`}
                                                        value={opt}
                                                        onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                                                    />
                                                    <button
                                                        onClick={() => handleQuestionChange(q.id, 'correctAnswer', opt)}
                                                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${q.correctAnswer === opt && opt !== ''
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 opacity-0 group-hover/opt:opacity-100'
                                                            }`}
                                                    >
                                                        ✓
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(q.type === 'short_answer' || q.type === 'essay') && (
                                    <FormInput
                                        label="Expected Correct Answer (for auto-grading)"
                                        placeholder="Enter the key phrases or exact answer..."
                                        value={q.correctAnswer}
                                        onChange={(e) => handleQuestionChange(q.id, 'correctAnswer', e.target.value)}
                                    />
                                )}
                            </CardBody>
                        </Card>
                    ))}

                    <button
                        onClick={handleAddQuestion}
                        className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 flex flex-col items-center gap-3 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-xs">Add New Question Block</span>
                    </button>

                    <div className="flex gap-4 pt-8 sticky bottom-6 z-20">
                        <Button variant="secondary" onClick={() => setStep(1)} className="h-14 px-8 rounded-2xl">
                            <ChevronLeft className="mr-2 w-5 h-5" /> Back to Settings
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            loading={loading}
                            className="h-14 flex-1 rounded-2xl shadow-xl shadow-blue-500/30"
                        >
                            <Save className="mr-2 w-5 h-5" /> Deploy Quiz System
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
