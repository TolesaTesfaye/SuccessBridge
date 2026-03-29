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

export const PSYCHOLOGY_CONTENT: CourseContent = {
  subject: 'Psychology',
  chapters: [
    {
      id: 'psych-ch1',
      title: 'Introduction to Psychology',
      topics: [
        {
          id: 'psych-1-1',
          title: 'What is Psychology?',
          content: [
            'Psychology is the scientific study of behavior and mental processes.',
            'The word "psychology" comes from the Greek words "psyche" (meaning soul or mind) and "logos" (meaning study).',
            '',
            '**Key Components of Psychology:**',
            '• **Behavior**: Observable actions that can be measured and recorded',
            '• **Mental Processes**: Internal experiences like thoughts, feelings, and sensations',
            '• **Scientific Method**: Psychology uses empirical research to understand human behavior',
            '',
            'Psychology differs from philosophy and common sense because it relies on systematic observation and experimentation rather than speculation or intuition.'
          ]
        },
        {
          id: 'psych-1-2',
          title: 'Goals of Psychology',
          content: [
            'Psychology has four primary goals that guide research and practice:',
            '',
            '**1. Description**',
            '• What is happening?',
            '• Accurately observing and recording behavior',
            '• Example: Describing the symptoms of depression',
            '',
            '**2. Explanation**',
            '• Why is it happening?',
            '• Understanding the causes and mechanisms behind behavior',
            '• Example: Explaining depression through brain chemistry imbalances',
            '',
            '**3. Prediction**',
            '• When will it happen again?',
            '• Forecasting future behavior based on current knowledge',
            '• Example: Predicting who might develop depression based on risk factors',
            '',
            '**4. Control/Influence**',
            '• How can we change or influence it?',
            '• Developing interventions to modify behavior',
            '• Example: Using therapy or medication to treat depression'
          ]
        },
        {
          id: 'psych-1-3',
          title: 'History of Psychology',
          content: [
            'Psychology has evolved from philosophical roots to become a scientific discipline.',
            '',
            '**Ancient Foundations**',
            '• Ancient Greeks like Aristotle and Plato pondered the mind-body relationship',
            '• Questions about human nature, consciousness, and behavior',
            '',
            '**Birth of Scientific Psychology (1879)**',
            '• **Wilhelm Wundt** established the first psychology laboratory in Leipzig, Germany',
            '• Marked the beginning of psychology as a separate scientific discipline',
            '• Used introspection to study conscious experience',
            '',
            '**Early Schools of Thought:**',
            '• **Structuralism** (Edward Titchener): Breaking down mental processes into basic elements',
            '• **Functionalism** (William James): Studying the purpose and adaptation of mental processes',
            '• **Behaviorism** (John Watson): Focusing only on observable behavior',
            '• **Gestalt Psychology**: "The whole is greater than the sum of its parts"'
          ]
        },
        {
          id: 'psych-1-4',
          title: 'Modern Perspectives in Psychology',
          content: [
            'Contemporary psychology encompasses multiple perspectives that offer different ways of understanding behavior and mental processes.',
            '',
            '**Biological Perspective**',
            '• Focuses on the role of the brain, nervous system, and genetics',
            '• Studies how biological factors influence behavior',
            '• Example: How neurotransmitters affect mood and behavior',
            '',
            '**Cognitive Perspective**',
            '• Emphasizes mental processes like thinking, memory, and problem-solving',
            '• Views the mind as an information-processing system',
            '• Example: How we encode, store, and retrieve memories',
            '',
            '**Behavioral Perspective**',
            '• Focuses on observable behavior and environmental influences',
            '• Emphasizes learning through conditioning and reinforcement',
            '• Example: How rewards and punishments shape behavior',
            '',
            '**Humanistic Perspective**',
            '• Emphasizes human potential, free will, and personal growth',
            '• Focuses on subjective experiences and self-actualization',
            '• Example: Carl Rogers\' person-centered approach to therapy',
            '',
            '**Psychodynamic Perspective**',
            '• Based on Freud\'s theories about the unconscious mind',
            '• Emphasizes early childhood experiences and internal conflicts',
            '• Example: How repressed memories might influence current behavior',
            '',
            '**Sociocultural Perspective**',
            '• Examines how social and cultural factors influence behavior',
            '• Considers the impact of society, culture, and social groups',
            '• Example: How cultural norms affect individual behavior patterns'
          ]
        },
        {
          id: 'psych-1-5',
          title: 'Research Methods in Psychology',
          content: [
            'Psychology uses scientific methods to study behavior and mental processes objectively.',
            '',
            '**The Scientific Method in Psychology:**',
            '1. **Observation**: Notice patterns or phenomena',
            '2. **Hypothesis**: Form a testable prediction',
            '3. **Experimentation**: Test the hypothesis systematically',
            '4. **Analysis**: Examine the data collected',
            '5. **Conclusion**: Draw conclusions and refine theories',
            '',
            '**Types of Research Methods:**',
            '',
            '**Descriptive Methods**',
            '• **Naturalistic Observation**: Observing behavior in natural settings',
            '• **Case Studies**: In-depth study of individual cases',
            '• **Surveys**: Collecting data through questionnaires or interviews',
            '',
            '**Correlational Studies**',
            '• Examine relationships between variables',
            '• Cannot establish cause and effect',
            '• Example: Studying the relationship between sleep and academic performance',
            '',
            '**Experimental Method**',
            '• Manipulates one variable to observe effects on another',
            '• Can establish cause-and-effect relationships',
            '• Uses control groups and random assignment',
            '• Example: Testing whether a new therapy reduces anxiety symptoms'
          ]
        },
        {
          id: 'psych-1-6',
          title: 'Branches of Psychology',
          content: [
            'Psychology has many specialized areas of study and application.',
            '',
            '**Major Areas of Psychology:**',
            '',
            '**Clinical Psychology**',
            '• Diagnosis and treatment of mental health disorders',
            '• Provides therapy and psychological interventions',
            '',
            '**Counseling Psychology**',
            '• Helps people cope with everyday problems and life transitions',
            '• Focuses on personal and interpersonal functioning',
            '',
            '**Developmental Psychology**',
            '• Studies human development across the lifespan',
            '• Examines physical, cognitive, and social changes',
            '',
            '**Social Psychology**',
            '• Studies how people think about, influence, and relate to others',
            '• Examines group behavior and social influences',
            '',
            '**Cognitive Psychology**',
            '• Studies mental processes like memory, thinking, and problem-solving',
            '• Investigates how we process and use information',
            '',
            '**Biological Psychology**',
            '• Examines the biological bases of behavior',
            '• Studies the brain, nervous system, and genetics',
            '',
            '**Educational Psychology**',
            '• Applies psychological principles to education and learning',
            '• Studies how people learn and develop in educational settings',
            '',
            '**Industrial/Organizational Psychology**',
            '• Applies psychology to workplace issues',
            '• Studies employee behavior, motivation, and organizational dynamics'
          ]
        }
      ]
    }
  ]
}