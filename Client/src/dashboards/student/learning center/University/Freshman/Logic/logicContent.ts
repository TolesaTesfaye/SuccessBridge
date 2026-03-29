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

export const LOGIC_CONTENT: CourseContent = {
  subject: 'Logic',
  chapters: [
    {
      id: 'logic-ch1',
      title: 'Basic Concepts of Logic',
      topics: [
        {
          id: 'logic-1-1',
          title: 'What is Logic?',
          content: [
            'Logic is the scientific study of the rules and principles of reasoning.',
            'Key concepts include:',
            '- **Argument**: A set of statements, one or more of which (premises) are claimed to provide support for, or reasons to believe, one of the others (conclusion).',
            '- **Premise**: A statement in an argument that sets forth evidence.',
            '- **Conclusion**: The statement that the evidence is claimed to support.'
          ]
        },
        {
          id: 'logic-1-2',
          title: 'Deduction vs. Induction',
          content: [
            '- **Deductive Argument**: An argument in which the conclusion is claimed to follow from the premises with absolute necessity.',
            '- **Inductive Argument**: An argument in which the conclusion is claimed to follow from the premises with probability.'
          ]
        }
      ]
    }
  ]
}