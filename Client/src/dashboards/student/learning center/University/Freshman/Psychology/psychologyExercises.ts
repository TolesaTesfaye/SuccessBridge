export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const PSYCHOLOGY_EXERCISES: Record<string, ExerciseQuestion[]> = {
  'psych-1-1': [ // What is Psychology?
    {
      question: "What distinguishes psychology from philosophy and common sense?",
      options: [
        "Psychology focuses only on abnormal behavior",
        "Psychology uses systematic observation and experimentation", 
        "Psychology is newer than philosophy",
        "Psychology only studies the mind, not behavior"
      ],
      correctAnswer: 1,
      explanation: "Psychology differs from philosophy and common sense because it relies on systematic observation and experimentation rather than speculation or intuition."
    },
    {
      question: "Which of the following is NOT a key component of psychology?",
      options: [
        "Behavior (observable actions)",
        "Mental processes (thoughts, feelings)",
        "Scientific method (empirical research)",
        "Personal opinions (subjective beliefs)"
      ],
      correctAnswer: 3,
      explanation: "Psychology relies on scientific methods rather than personal opinions or subjective beliefs. It studies behavior and mental processes using empirical research."
    }
  ],
  
  'psych-1-2': [ // Goals of Psychology
    {
      question: "A researcher records the frequency of aggressive behaviors in children. Which goal of psychology does this represent?",
      options: ["Description", "Explanation", "Prediction", "Control"],
      correctAnswer: 0,
      explanation: "Description involves accurately observing and recording behavior, which is what measuring frequency of aggressive behaviors accomplishes."
    },
    {
      question: "Which goal of psychology is demonstrated when developing therapy techniques to reduce anxiety?",
      options: ["Description", "Explanation", "Prediction", "Control/Influence"],
      correctAnswer: 3,
      explanation: "Control/Influence involves developing interventions to modify behavior, such as therapy techniques to reduce anxiety."
    }
  ],

  'psych-1-3': [ // History of Psychology
    {
      question: "Who established the first psychology laboratory and when?",
      options: [
        "Sigmund Freud in 1900",
        "Wilhelm Wundt in 1879",
        "William James in 1890", 
        "John Watson in 1913"
      ],
      correctAnswer: 1,
      explanation: "Wilhelm Wundt established the first psychology laboratory in Leipzig, Germany in 1879, marking the beginning of psychology as a separate scientific discipline."
    },
    {
      question: "Which early school of thought focused on 'the whole is greater than the sum of its parts'?",
      options: ["Structuralism", "Functionalism", "Behaviorism", "Gestalt Psychology"],
      correctAnswer: 3,
      explanation: "Gestalt Psychology emphasized that 'the whole is greater than the sum of its parts,' focusing on how we perceive complete patterns and forms."
    }
  ],

  'psych-1-4': [ // Modern Perspectives
    {
      question: "A researcher studying how neurotransmitters affect mood is using which perspective?",
      options: ["Cognitive", "Behavioral", "Biological", "Humanistic"],
      correctAnswer: 2,
      explanation: "The biological perspective focuses on the role of the brain, nervous system, and genetics, including how neurotransmitters affect behavior."
    },
    {
      question: "Which perspective emphasizes free will and personal growth?",
      options: ["Biological", "Behavioral", "Psychodynamic", "Humanistic"],
      correctAnswer: 3,
      explanation: "The humanistic perspective emphasizes human potential, free will, and personal growth, focusing on subjective experiences and self-actualization."
    }
  ],

  'psych-1-5': [ // Research Methods
    {
      question: "What is the main limitation of correlational studies?",
      options: [
        "They are too expensive to conduct",
        "They cannot establish cause and effect",
        "They only work with large sample sizes",
        "They are not scientifically valid"
      ],
      correctAnswer: 1,
      explanation: "Correlational studies examine relationships between variables but cannot establish cause and effect relationships."
    },
    {
      question: "Which research method can establish cause-and-effect relationships?",
      options: ["Naturalistic observation", "Case studies", "Correlational studies", "Experimental method"],
      correctAnswer: 3,
      explanation: "The experimental method manipulates one variable to observe effects on another and can establish cause-and-effect relationships through controlled conditions."
    }
  ],

  'psych-1-6': [ // Branches of Psychology
    {
      question: "Which branch of psychology focuses on diagnosis and treatment of mental health disorders?",
      options: ["Counseling Psychology", "Clinical Psychology", "Social Psychology", "Developmental Psychology"],
      correctAnswer: 1,
      explanation: "Clinical Psychology focuses on the diagnosis and treatment of mental health disorders, providing therapy and psychological interventions."
    },
    {
      question: "A psychologist studying how cultural differences affect workplace productivity would most likely be in which field?",
      options: [
        "Clinical Psychology",
        "Developmental Psychology",
        "Industrial/Organizational Psychology", 
        "Cognitive Psychology"
      ],
      correctAnswer: 2,
      explanation: "Industrial/Organizational Psychology applies psychology to workplace issues, including how cultural factors affect productivity and organizational dynamics."
    }
  ]
};