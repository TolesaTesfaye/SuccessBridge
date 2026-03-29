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

export const REMEDIAL_HISTORY_CONTENT: CourseContent = {
  subject: 'Remedial History',
  chapters: [
    {
      id: 'remedial-history-ch1',
      title: 'Introduction to History',
      topics: [
        {
          id: 'remedial-history-1-1',
          title: 'What is History?',
          content: [
            'History is the study of past events and how they have shaped our world today.',
            '',
            '**What Historians Study:**',
            '• **Events**: Important things that happened in the past',
            '• **People**: Individuals who made significant contributions',
            '• **Cultures**: How different groups of people lived',
            '• **Changes**: How societies developed over time',
            '',
            '**Why Study History?**',
            '• Understand how we got to where we are today',
            '• Learn from past mistakes and successes',
            '• Appreciate different cultures and perspectives',
            '• Develop critical thinking skills',
            '• Become better citizens and decision-makers',
            '',
            '**Types of Historical Sources:**',
            '• **Primary Sources**: Created during the time period being studied',
            '  - Diaries, letters, photographs, artifacts',
            '  - Government documents, newspapers',
            '',
            '• **Secondary Sources**: Created later by people studying the period',
            '  - History books, documentaries, articles',
            '  - Analysis and interpretation of primary sources',
            '',
            '**Historical Thinking:**',
            '• Ask questions about the past',
            '• Look for evidence to support conclusions',
            '• Consider multiple perspectives',
            '• Understand cause and effect relationships'
          ]
        },
        {
          id: 'remedial-history-1-2',
          title: 'Time and Chronology',
          content: [
            'Understanding time and the order of events is essential for studying history.',
            '',
            '**Chronology:**',
            '• The arrangement of events in the order they happened',
            '• Helps us understand cause and effect',
            '• Shows how events are connected over time',
            '',
            '**Dating Systems:**',
            '• **BCE (Before Common Era)**: Years before year 1',
            '  - Also called BC (Before Christ)',
            '  - Numbers get larger as you go further back',
            '  - Example: 500 BCE is earlier than 100 BCE',
            '',
            '• **CE (Common Era)**: Years from year 1 to present',
            '  - Also called AD (Anno Domini)',
            '  - Numbers get larger as time moves forward',
            '  - Example: 500 CE is later than 100 CE',
            '',
            '**Time Periods:**',
            '• **Decade**: 10 years',
            '• **Century**: 100 years',
            '• **Millennium**: 1,000 years',
            '',
            '**Historical Periods:**',
            '• **Prehistory**: Before written records',
            '• **Ancient History**: Early civilizations (3000 BCE - 500 CE)',
            '• **Medieval Period**: Middle Ages (500 - 1500 CE)',
            '• **Modern Period**: Recent centuries (1500 CE - present)',
            '',
            '**Using Timelines:**',
            '• Visual way to show when events happened',
            '• Help identify patterns and connections',
            '• Show relationships between different events'
          ]
        }
      ]
    },
    {
      id: 'remedial-history-ch2',
      title: 'Early Civilizations',
      topics: [
        {
          id: 'remedial-history-2-1',
          title: 'What Makes a Civilization?',
          content: [
            'Civilizations are complex societies with organized governments, cities, and cultural achievements.',
            '',
            '**Characteristics of Civilization:**',
            '• **Cities**: Large, permanent settlements',
            '• **Government**: Organized system of rules and leadership',
            '• **Social Classes**: Different groups with different roles',
            '• **Specialization**: People have specific jobs and skills',
            '• **Writing System**: Way to record information',
            '• **Art and Architecture**: Cultural expressions and monuments',
            '• **Religion**: Organized belief systems',
            '',
            '**From Hunters to Farmers:**',
            '• **Paleolithic Era**: Hunter-gatherer societies',
            '  - Small groups that moved frequently',
            '  - Hunted animals and gathered plants for food',
            '',
            '• **Neolithic Revolution**: Development of agriculture',
            '  - People learned to grow crops and domesticate animals',
            '  - Led to permanent settlements',
            '  - Population growth and food surplus',
            '',
            '**Why Agriculture Changed Everything:**',
            '• Reliable food supply allowed population growth',
            '• People could specialize in different jobs',
            '• Surplus food supported non-farmers',
            '• Led to trade, government, and complex societies',
            '',
            '**Early Achievements:**',
            '• Development of tools and technology',
            '• Creation of art and religious practices',
            '• Establishment of trade networks',
            '• Innovation in building and engineering'
          ]
        },
        {
          id: 'remedial-history-2-2',
          title: 'Ancient River Civilizations',
          content: [
            'The first major civilizations developed along rivers that provided water and fertile soil.',
            '',
            '**Mesopotamia (3500-539 BCE):**',
            '• Located between Tigris and Euphrates rivers',
            '• Known as "Cradle of Civilization"',
            '• Achievements:',
            '  - First cities (Ur, Babylon)',
            '  - Cuneiform writing system',
            '  - Code of Hammurabi (early laws)',
            '  - Wheel and sailboat',
            '',
            '**Ancient Egypt (3100-30 BCE):**',
            '• Developed along the Nile River',
            '• United under pharaohs (god-kings)',
            '• Achievements:',
            '  - Pyramids and sphinx',
            '  - Hieroglyphic writing',
            '  - Mummification and medicine',
            '  - Calendar system',
            '',
            '**Indus Valley (2600-1900 BCE):**',
            '• Located in present-day Pakistan and India',
            '• Well-planned cities with drainage systems',
            '• Achievements:',
            '  - Advanced urban planning',
            '  - Standardized weights and measures',
            '  - Sophisticated water management',
            '',
            '**Ancient China (2070 BCE-220 CE):**',
            '• Developed along Yellow and Yangtze rivers',
            '• Ruled by dynasties (family lines of emperors)',
            '• Achievements:',
            '  - Great Wall of China',
            '  - Paper, gunpowder, compass',
            '  - Silk Road trade network',
            '  - Confucian philosophy',
            '',
            '**Why Rivers Were Important:**',
            '• Provided fresh water for drinking and irrigation',
            '• Fertile soil from river flooding',
            '• Transportation routes for trade',
            '• Natural boundaries for protection'
          ]
        }
      ]
    }
  ]
}