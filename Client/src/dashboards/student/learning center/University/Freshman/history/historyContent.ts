export interface Topic {
  id: string
  title: string
  content: string[]
}

export interface Chapter {
  id: string
  title: string
  topics: Topic[]
}

export interface CourseContent {
  subject: string
  chapters: Chapter[]
}

export const HISTORY_CONTENT: CourseContent = {
  subject: 'History',
  chapters: [
    {
      id: 'history-ch1',
      title: 'Introduction to Historical Study',
      topics: [
        {
          id: 'history-1-1',
          title: 'What is History?',
          content: [
            'History is the study of past events, particularly in human affairs.',
            'Historical methodology includes:',
            '- **Primary Sources**: Original documents, artifacts, or evidence from the time period.',
            '- **Secondary Sources**: Interpretations and analyses of primary sources.',
            '- **Historical Thinking**: Analyzing cause and effect, change over time, and multiple perspectives.'
          ]
        },
        {
          id: 'history-1-2',
          title: 'Chronology and Periodization',
          content: [
            'Understanding time in history:',
            '- **Chronology**: The arrangement of events in order of occurrence.',
            '- **Periodization**: Dividing history into distinct periods (Ancient, Medieval, Modern).',
            '- **BCE/CE**: Before Common Era and Common Era (secular dating system).',
            '- **Historical Context**: Understanding events within their time period and circumstances.'
          ]
        }
      ]
    }
  ]
}