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

export const ENGLISH_CONTENT: CourseContent = {
  subject: 'English',
  chapters: [
    {
      id: 'english-ch1',
      title: 'Communication Skills',
      topics: [
        {
          id: 'english-1-1',
          title: 'Introduction to Communication',
          content: [
            'Communication is the process of exchanging information, ideas, thoughts, and feelings.',
            'Components of communication:',
            '- **Sender**: The person who initiates the message.',
            '- **Message**: The information being conveyed.',
            '- **Channel**: The medium used to transmit the message.',
            '- **Receiver**: The person for whom the message is intended.',
            '- **Feedback**: The receiver\'s response to the message.'
          ]
        }
      ]
    }
  ]
}