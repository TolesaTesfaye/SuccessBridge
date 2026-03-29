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

export const GEOGRAPHY_CONTENT: CourseContent = {
  subject: 'Geography',
  chapters: [
    {
      id: 'geography-ch1',
      title: 'Introduction to Geography',
      topics: [
        {
          id: 'geography-1-1',
          title: 'What is Geography?',
          content: [
            'Geography is the study of places and the relationships between people and their environments.',
            'Two main branches of geography:',
            '- **Physical Geography**: Studies natural features and processes (climate, landforms, ecosystems).',
            '- **Human Geography**: Studies human activities and their relationship with the environment.',
            'Geographic tools include maps, GPS, GIS (Geographic Information Systems), and remote sensing.'
          ]
        },
        {
          id: 'geography-1-2',
          title: 'Location and Place',
          content: [
            'Key geographic concepts:',
            '- **Absolute Location**: Exact position using coordinates (latitude and longitude).',
            '- **Relative Location**: Position in relation to other places.',
            '- **Place**: Physical and human characteristics that make a location unique.',
            '- **Region**: Areas with common characteristics.',
            '- **Movement**: How people, goods, and ideas travel from place to place.'
          ]
        }
      ]
    }
  ]
}