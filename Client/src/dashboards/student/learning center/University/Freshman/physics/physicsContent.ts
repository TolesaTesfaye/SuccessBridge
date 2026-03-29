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

export const PHYSICS_CONTENT: CourseContent = {
  subject: 'Physics',
  chapters: [
    {
      id: 'physics-ch1',
      title: 'Physics and Measurement',
      topics: [
        {
          id: 'physics-1-1',
          title: 'Standards of Measurement',
          content: [
            'Physics is based on experimental observations and quantitative measurements.',
            'The SI (System International) system uses:',
            '- **Length**: Meter (m)',
            '- **Mass**: Kilogram (kg)',
            '- **Time**: Second (s)',
            '- **Temperature**: Kelvin (K)'
          ]
        }
      ]
    }
  ]
}