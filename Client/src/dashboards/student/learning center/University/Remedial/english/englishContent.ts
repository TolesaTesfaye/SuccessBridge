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

export const REMEDIAL_ENGLISH_CONTENT: CourseContent = {
  subject: 'Remedial English',
  chapters: [
    {
      id: 'remedial-english-ch1',
      title: 'Basic Grammar',
      topics: [
        {
          id: 'remedial-english-1-1',
          title: 'Parts of Speech',
          content: [
            'Understanding the parts of speech is fundamental to good writing and communication.',
            '',
            '**Nouns**',
            '• Words that name people, places, things, or ideas',
            '• Examples: teacher, school, book, happiness',
            '• Types: Common nouns (dog, city) and Proper nouns (Rover, New York)',
            '',
            '**Verbs**',
            '• Words that show action or state of being',
            '• Action verbs: run, write, think, laugh',
            '• Linking verbs: is, are, was, were, seem, become',
            '',
            '**Adjectives**',
            '• Words that describe or modify nouns',
            '• Examples: big, red, beautiful, intelligent',
            '• Answer questions: What kind? Which one? How many?',
            '',
            '**Adverbs**',
            '• Words that describe verbs, adjectives, or other adverbs',
            '• Often end in -ly: quickly, carefully, very, quite',
            '• Answer questions: How? When? Where? To what extent?'
          ]
        },
        {
          id: 'remedial-english-1-2',
          title: 'Sentence Structure',
          content: [
            'A sentence is a group of words that expresses a complete thought.',
            '',
            '**Complete Sentences Must Have:**',
            '• A subject (who or what the sentence is about)',
            '• A predicate (what the subject does or is)',
            '• Express a complete thought',
            '',
            '**Types of Sentences:**',
            '• **Declarative**: Makes a statement (The cat is sleeping.)',
            '• **Interrogative**: Asks a question (Is the cat sleeping?)',
            '• **Imperative**: Gives a command (Feed the cat.)',
            '• **Exclamatory**: Shows strong emotion (What a cute cat!)',
            '',
            '**Common Sentence Errors:**',
            '• **Fragments**: Incomplete thoughts (Because I was tired.)',
            '• **Run-ons**: Two or more complete thoughts joined incorrectly',
            '• **Comma splices**: Two sentences joined only by a comma',
            '',
            '**Simple vs. Compound Sentences:**',
            '• Simple: One independent clause (I like pizza.)',
            '• Compound: Two independent clauses joined by a conjunction (I like pizza, and she likes pasta.)'
          ]
        }
      ]
    },
    {
      id: 'remedial-english-ch2',
      title: 'Reading Comprehension',
      topics: [
        {
          id: 'remedial-english-2-1',
          title: 'Reading Strategies',
          content: [
            'Effective reading strategies help you understand and remember what you read.',
            '',
            '**Before Reading:**',
            '• Preview the text (title, headings, pictures)',
            '• Think about what you already know about the topic',
            '• Set a purpose for reading (Why am I reading this?)',
            '• Make predictions about the content',
            '',
            '**During Reading:**',
            '• Read actively - ask questions as you read',
            '• Look for main ideas and supporting details',
            '• Make connections to your own experiences',
            '• Visualize what you\'re reading',
            '• Stop and summarize sections in your own words',
            '',
            '**After Reading:**',
            '• Summarize the main points',
            '• Ask yourself: What did I learn?',
            '• Connect new information to what you already knew',
            '• Evaluate: Do I agree with the author? Why or why not?',
            '',
            '**Dealing with Difficult Words:**',
            '• Use context clues (surrounding words)',
            '• Look for word parts (prefixes, suffixes, root words)',
            '• Skip and come back if it doesn\'t affect understanding',
            '• Use a dictionary when necessary'
          ]
        },
        {
          id: 'remedial-english-2-2',
          title: 'Finding Main Ideas',
          content: [
            'The main idea is the most important point the author wants you to understand.',
            '',
            '**What is a Main Idea?**',
            '• The central message or point of a paragraph or passage',
            '• What the author wants you to remember most',
            '• Often supported by details, examples, and explanations',
            '',
            '**Where to Find Main Ideas:**',
            '• **Topic sentence**: Often the first sentence of a paragraph',
            '• **Concluding sentence**: Sometimes at the end of a paragraph',
            '• **Implied**: Sometimes not directly stated - you must infer it',
            '',
            '**Supporting Details:**',
            '• Facts, examples, statistics that support the main idea',
            '• Help explain, prove, or illustrate the main point',
            '• Answer questions like: Who? What? When? Where? Why? How?',
            '',
            '**Strategies for Finding Main Ideas:**',
            '• Ask: "What is this mostly about?"',
            '• Look for repeated words or concepts',
            '• Identify what most sentences in the paragraph discuss',
            '• Eliminate details that are too specific',
            '• Create a mental summary in one sentence'
          ]
        }
      ]
    }
  ]
}