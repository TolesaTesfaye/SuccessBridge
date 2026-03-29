import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  BookOpen, 
  Search,
  ArrowLeft
} from 'lucide-react'
import { FRESHMAN_COURSE_CONTENT, CourseContent } from '@utils/freshmanCourseContent'

export const UniversityCourseViewer: React.FC = () => {
  const { subject } = useParams<{ subject: string }>()
  const navigate = useNavigate()
  
  const [course, setCourse] = useState<CourseContent | null>(null)
  const [activeChapterIdx, setActiveChapterIdx] = useState(0)
  const [activeTopicIdx, setActiveTopicIdx] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (subject && FRESHMAN_COURSE_CONTENT[subject]) {
      setCourse(FRESHMAN_COURSE_CONTENT[subject])
    } else {
      // Redirect if subject not found
      navigate('/university/dashboard')
    }
  }, [subject, navigate])

  if (!course) return null

  const currentChapter = course.chapters[activeChapterIdx]
  const currentTopic = currentChapter.topics[activeTopicIdx]

  const handleNext = () => {
    if (activeTopicIdx < currentChapter.topics.length - 1) {
      setActiveTopicIdx(activeTopicIdx + 1)
    } else if (activeChapterIdx < course.chapters.length - 1) {
      setActiveChapterIdx(activeChapterIdx + 1)
      setActiveTopicIdx(0)
    }
    window.scrollTo(0, 0)
  }

  const handlePrev = () => {
    if (activeTopicIdx > 0) {
      setActiveTopicIdx(activeTopicIdx - 1)
    } else if (activeChapterIdx > 0) {
      const prevChapter = course.chapters[activeChapterIdx - 1]
      setActiveChapterIdx(activeChapterIdx - 1)
      setActiveTopicIdx(prevChapter.topics.length - 1)
    }
    window.scrollTo(0, 0)
  }

  const isFirst = activeChapterIdx === 0 && activeTopicIdx === 0
  const isLast = activeChapterIdx === course.chapters.length - 1 && activeTopicIdx === currentChapter.topics.length - 1

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1c] flex flex-col">
      {/* Tutorial Top Bar */}
      <header className="h-14 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 sticky top-0 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/university/dashboard" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2" />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            {course.subject} Tutorial
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-white/5">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="bg-transparent border-none text-sm focus:outline-none text-slate-700 dark:text-slate-200 w-40 lg:w-60" 
            />
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 lg:hidden text-slate-500"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* W3Schools Course Selection Bar */}
      <nav className="bg-[#282a35] text-white h-12 flex items-center overflow-x-auto no-scrollbar scroll-smooth sticky top-14 z-40 border-b border-white/5">
        <div className="flex items-center h-full px-2 min-w-max">
          {Object.keys(FRESHMAN_COURSE_CONTENT).map((subjName) => {
            const isActive = subject === subjName
            return (
              <button
                key={subjName}
                onClick={() => {
                  navigate(`/university/course-viewer/${subjName}`)
                  setActiveChapterIdx(0)
                  setActiveTopicIdx(0)
                }}
                className={`h-full px-5 text-sm font-bold uppercase tracking-wide transition-colors flex items-center justify-center min-w-[100px] ${
                  isActive 
                  ? 'bg-[#04aa6d] text-white' 
                  : 'hover:bg-black/40 hover:text-white text-slate-200'
                }`}
              >
                {subjName}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="flex flex-1 relative">
        {/* W3Schools Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-14 left-0 w-64 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-white/5 overflow-y-auto z-40 transition-transform duration-300`}>
          <div className="py-6 px-4">
            <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Course Overview</h2>
            <nav className="space-y-1">
              {course.chapters.map((chapter, cIdx) => (
                <div key={chapter.id} className="space-y-1">
                  <div className="px-2 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-200/50 dark:bg-white/5 rounded-lg mb-1">
                    {chapter.title}
                  </div>
                  {chapter.topics.map((topic, tIdx) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setActiveChapterIdx(cIdx)
                        setActiveTopicIdx(tIdx)
                        if (window.innerWidth < 1024) setSidebarOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-lg font-medium ${
                        activeChapterIdx === cIdx && activeTopicIdx === tIdx
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white dark:bg-[#0a0f1c] min-w-0">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10">
            {/* Header Navigation */}
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200 dark:border-white/10">
              <button 
                onClick={handlePrev}
                disabled={isFirst}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white rounded-lg font-bold transition-all active:scale-95 shadow-md shadow-green-600/20"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button 
                onClick={handleNext}
                disabled={isLast}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white rounded-lg font-bold transition-all active:scale-95 shadow-md shadow-green-600/20"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lesson Body */}
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
                {currentTopic.title}
              </h1>
              
              <div className="space-y-6">
                {currentTopic.content.map((block, idx) => {
                  if (block.startsWith('- ')) {
                    return (
                      <div key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <p className="m-0">{block.substring(2)}</p>
                      </div>
                    )
                  }
                  if (block.match(/^\d\./)) {
                    return (
                      <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <p className="m-0 text-slate-800 dark:text-slate-200 font-medium">{block}</p>
                      </div>
                    )
                  }
                  return (
                    <p key={idx} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                      {block.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-blue-600 dark:text-blue-400 font-bold">{part}</strong> : part)}
                    </p>
                  )
                })}
              </div>
            </article>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
              <button 
                onClick={handlePrev}
                disabled={isFirst}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white rounded-lg font-bold transition-all active:scale-95 shadow-md shadow-green-600/20"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button 
                onClick={handleNext}
                disabled={isLast}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white rounded-lg font-bold transition-all active:scale-95 shadow-md shadow-green-600/20"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
