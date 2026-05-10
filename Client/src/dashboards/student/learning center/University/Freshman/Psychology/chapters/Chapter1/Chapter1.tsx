import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic.split('.').slice(0, 2).join('.').trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 1
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          ESSENCE OF PSYCHOLOGY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-pink-600 to-purple-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to the fascinating world of Psychology! In this chapter, you'll discover what psychology is, its goals, historical development, and modern perspectives.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Definition of Psychology */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            1.1. Definition of Psychology and Related Concepts
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-pink-600 dark:text-pink-400">Psychology</strong> is the <strong>scientific study of behavior and mental processes</strong>. 
              The word "psychology" comes from two Greek words:
            </p>

            <div className="grid md:grid-cols-2 gap-2 md:gap-4 my-3 md:my-6">
              <div className="p-2 md:p-4 border-l-4 border-pink-500">
                <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">Psyche (ψυχή)</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Meaning: Soul, Mind, or Spirit</p>
              </div>
              <div className="p-2 md:p-4 border-l-4 border-blue-500">
                <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">Logos (λόγος)</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Meaning: Study or Knowledge</p>
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Key Components of Psychology</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">1. Behavior</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Behavior refers to <strong>observable actions</strong> that can be measured and recorded systematically. 
                  This includes anything we can see, hear, or measure directly.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300">Examples:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mt-1">
                    <li>Walking, talking, eating</li>
                    <li>Facial expressions and body language</li>
                    <li>Performance on tests or tasks</li>
                    <li>Reaction time to stimuli</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">2. Mental Processes</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Mental processes are <strong>internal, subjective experiences</strong> that cannot be directly observed. 
                  These include thoughts, feelings, dreams, perceptions, and memories.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-purple-900 dark:text-purple-300">Examples:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mt-1">
                    <li>Thinking and problem-solving</li>
                    <li>Emotions and feelings</li>
                    <li>Memories and imagination</li>
                    <li>Beliefs and attitudes</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-emerald-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">3. Scientific Method</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Psychology uses <strong>empirical research</strong> and systematic observation to understand human behavior objectively. 
                  This distinguishes psychology from philosophy or common sense.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded">
                  <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Scientific Approach Includes:</p>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mt-1">
                    <li>Systematic observation and measurement</li>
                    <li>Controlled experiments</li>
                    <li>Data collection and analysis</li>
                    <li>Peer review and replication</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Check: Behavior vs Mental Process */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="True or False: A person's heartbeat increasing when they see someone they love is an example of a mental process."
                options={[
                  'True',
                  'False'
                ]}
                correctAnswer={1}
                explanation="FALSE. An increased heartbeat is a BEHAVIOR because it's a physiological response that can be measured and observed (using medical equipment). The FEELING of love would be the mental process, as it's internal and subjective. This distinction is important: behaviors are observable, mental processes are not."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 1.1 */}
          <div className="mt-10 p-8 border-t-4 border-pink-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Definition of Psychology</h3>
            <ExerciseQuestion 
              question="Which of the following is an example of a 'mental process' rather than 'behavior'?"
              options={[
                'A student raising their hand in class',
                'A person thinking about what to eat for dinner',
                'An athlete running a marathon',
                'A child crying loudly'
              ]}
              correctAnswer={1}
              explanation="Thinking about what to eat is a mental process because it's an internal, subjective experience that cannot be directly observed. The other options are all observable behaviors that can be seen and measured by others."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.2: Goals of Psychology */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            1.2. The Four Goals of Psychology
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Psychology has <strong>four main goals</strong> that guide research and practice. These goals help psychologists understand, predict, and improve human behavior and mental processes.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: '1',
                title: 'Description',
                question: 'What is happening?',
                content: 'The first goal is to accurately observe and record behavior. Psychologists describe what they see in detail, creating a clear picture of the phenomenon being studied.',
                example: 'Describing the symptoms of depression: loss of interest, fatigue, changes in sleep patterns, difficulty concentrating.',
                methods: ['Observation', 'Case studies', 'Surveys', 'Naturalistic observation'],
                icon: '🔍'
              },
              {
                number: '2',
                title: 'Explanation',
                question: 'Why is it happening?',
                content: 'After describing behavior, psychologists seek to explain why it occurs. This involves identifying the causes and underlying mechanisms.',
                example: 'Explaining depression through neurotransmitter imbalances (low serotonin), genetic factors, or negative thinking patterns.',
                methods: ['Experiments', 'Correlational studies', 'Brain imaging', 'Theory development'],
                icon: '💡'
              },
              {
                number: '3',
                title: 'Prediction',
                question: 'When will it happen again?',
                content: 'Once we understand why something happens, we can predict when, where, and under what conditions it will occur in the future.',
                example: 'Predicting that individuals with a family history of depression and high stress levels are more likely to develop depression.',
                methods: ['Statistical analysis', 'Longitudinal studies', 'Risk assessment', 'Pattern recognition'],
                icon: '🔮'
              },
              {
                number: '4',
                title: 'Control/Influence',
                question: 'How can we change it?',
                content: 'The ultimate goal is to use psychological knowledge to control or influence behavior in beneficial ways, improving people\'s lives.',
                example: 'Using cognitive-behavioral therapy (CBT) to treat depression by changing negative thought patterns and behaviors.',
                methods: ['Therapy', 'Interventions', 'Prevention programs', 'Behavior modification'],
                icon: '🎯'
              }
            ].map((goal, i) => (
              <div key={i} className="p-6 border-l-4 border-pink-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{goal.icon}</span>
                  <span className="text-xs font-black bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full">
                    GOAL {goal.number}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase">{goal.title}</h3>
                <p className="text-pink-600 dark:text-pink-400 font-bold text-sm italic mb-4">{goal.question}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{goal.content}</p>
                
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Example:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{goal.example}</p>
                </div>

                <div className="p-3 border-l-2 border-pink-300 dark:border-pink-700">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Methods Used:</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {goal.methods.map((method, idx) => (
                      <li key={idx}>• {method}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mid-Section Exercise: Applying the Goals */}
          <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🎯 Apply Your Knowledge</h4>
            <ExerciseQuestion 
              question="A researcher notices that children who watch violent TV shows tend to be more aggressive on the playground. She then develops a program to reduce violent TV watching. Which TWO goals of psychology is she demonstrating?"
              options={[
                'Description and Explanation',
                'Description and Control',
                'Prediction and Explanation',
                'Explanation and Control'
              ]}
              correctAnswer={1}
              explanation="The answer is DESCRIPTION and CONTROL. First, she DESCRIBED the relationship between violent TV and aggressive behavior (what is happening). Then she developed an intervention to CONTROL/reduce the behavior. She didn't explain WHY this relationship exists (that would be explanation), and while she observed a pattern, the question doesn't indicate she made formal predictions about future behavior."
            />
          </div>

          {/* Exercise for Subtopic 1.2 */}
          <div className="mt-10 p-8 border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Goals of Psychology</h3>
            <ExerciseQuestion 
              question="A psychologist observes that students who study in quiet environments tend to perform better on exams. Based on this, she predicts that students in her new study will also perform better if they study in quiet places. Which goal of psychology is she demonstrating?"
              options={[
                'Description',
                'Explanation',
                'Prediction',
                'Control'
              ]}
              correctAnswer={2}
              explanation="This is an example of PREDICTION. The psychologist is using her previous observations to forecast future behavior (that students in the new study will perform better in quiet environments). She's not just describing what she sees (description), explaining why it happens (explanation), or trying to change behavior (control)."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.3: Historical Evolution */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            1.3. Historical Evolution of Psychology
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Psychology has evolved significantly since its inception. Understanding its history helps us appreciate how different perspectives emerged and shaped modern psychology.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Early Schools of Thought</h3>

          <div className="space-y-6">
            {[
              {
                name: 'Structuralism',
                date: '1879',
                founder: 'Wilhelm Wundt',
                location: 'Leipzig, Germany',
                focus: 'Structure of the mind',
                method: 'Introspection',
                description: 'The first formal school of psychology. Wundt established the first psychology laboratory and sought to break down mental processes into their most basic elements, similar to how chemists break down compounds into elements.',
                keyIdea: 'Consciousness can be broken down into basic elements like sensations, feelings, and images.',
                limitation: 'Introspection was too subjective and unreliable. Different people reported different experiences for the same stimulus.'
              },
              {
                name: 'Functionalism',
                date: '1890s',
                founder: 'William James',
                location: 'United States',
                focus: 'Function of the mind',
                method: 'Observation of behavior',
                description: 'Influenced by Darwin\'s theory of evolution, functionalists asked "What is the purpose of consciousness?" rather than "What is consciousness made of?" They focused on how mental processes help organisms adapt to their environment.',
                keyIdea: 'Mental processes exist because they serve a function in helping us adapt and survive.',
                limitation: 'Too broad and difficult to test scientifically.'
              },
              {
                name: 'Behaviorism',
                date: '1913',
                founder: 'John B. Watson',
                location: 'United States',
                focus: 'Observable behavior only',
                method: 'Experimental study of behavior',
                description: 'Rejected the study of consciousness and mental processes entirely. Watson argued that psychology should only study what can be directly observed and measured - behavior. "Give me a dozen healthy infants..." became his famous claim.',
                keyIdea: 'Psychology should be the science of observable behavior, not invisible mental processes.',
                limitation: 'Ignored the role of mental processes, emotions, and consciousness in understanding behavior.'
              },
              {
                name: 'Gestalt Psychology',
                date: '1912',
                founder: 'Max Wertheimer',
                location: 'Germany',
                focus: 'Perception and whole experience',
                method: 'Study of perception',
                description: 'Opposed structuralism\'s approach of breaking things down. Gestalt psychologists argued that "the whole is greater than the sum of its parts." They focused on how we perceive patterns and organize sensory information.',
                keyIdea: 'We perceive objects as whole patterns, not as collections of separate parts.',
                limitation: 'Focused mainly on perception and didn\'t address other areas of psychology comprehensively.'
              }
            ].map((school, i) => (
              <div key={i} className="p-6 border-l-4 border-pink-500">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{school.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      <strong>Founded:</strong> {school.date} | <strong>Founder:</strong> {school.founder}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <strong>Location:</strong> {school.location}
                    </p>
                  </div>
                  <span className="text-xs font-black bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full whitespace-nowrap">
                    {school.date}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Focus:</p>
                    <p className="text-slate-600 dark:text-slate-400">{school.focus}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description:</p>
                    <p className="text-slate-600 dark:text-slate-400">{school.description}</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Key Idea:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{school.keyIdea}</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                    <p className="text-sm font-bold text-red-900 dark:text-red-300 mb-1">Limitation:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{school.limitation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Exercise */}
          <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔄 Compare and Contrast</h4>
            <ExerciseQuestion 
              question="Which school of psychology would MOST likely agree with this statement: 'We should only study what we can directly observe and measure, not invisible thoughts and feelings'?"
              options={[
                'Structuralism',
                'Functionalism',
                'Behaviorism',
                'Gestalt Psychology'
              ]}
              correctAnswer={2}
              explanation="BEHAVIORISM is the correct answer. John B. Watson and behaviorists believed psychology should be a purely objective science, studying only observable behavior. They rejected the study of consciousness, thoughts, and feelings because these cannot be directly observed. Structuralism actually focused heavily on internal mental experiences through introspection, Functionalism studied the purpose of consciousness, and Gestalt Psychology studied perception and mental organization."
            />
          </div>

          {/* Exercise for Subtopic 1.3 */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Historical Evolution</h3>
            <ExerciseQuestion 
              question="A researcher asks participants to carefully observe and report their own thoughts and feelings while looking at a painting. Which early school of psychology does this research method represent?"
              options={[
                'Behaviorism',
                'Structuralism',
                'Functionalism',
                'Gestalt Psychology'
              ]}
              correctAnswer={1}
              explanation="This is STRUCTURALISM. The method described is 'introspection' - having people look inward and report their conscious experiences. This was the primary research method used by Wilhelm Wundt and the structuralists. Behaviorists would reject this method entirely because thoughts and feelings cannot be directly observed. Functionalists would focus on the purpose of the thoughts, and Gestalt psychologists would focus on the overall perception of the painting as a whole."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.4: Modern Perspectives */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            1.4. Modern Perspectives in Psychology
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Modern psychology doesn't follow just one school of thought. Instead, psychologists use multiple perspectives to understand behavior and mental processes. Each perspective offers a unique lens through which to view human psychology.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Biological Perspective',
                icon: '🧬',
                focus: 'Brain, nervous system, genetics, and biochemistry',
                keyQuestion: 'How do biological processes influence behavior?',
                example: 'Studying how neurotransmitter imbalances contribute to depression, or how brain damage affects memory.',
                applications: ['Psychopharmacology', 'Neuropsychology', 'Behavioral genetics'],
                color: 'red'
              },
              {
                name: 'Cognitive Perspective',
                icon: '🧠',
                focus: 'Mental processes like thinking, memory, and problem-solving',
                keyQuestion: 'How do we process, store, and retrieve information?',
                example: 'Studying how people make decisions, solve problems, or why we forget information.',
                applications: ['Cognitive therapy', 'Educational psychology', 'Artificial intelligence'],
                color: 'blue'
              },
              {
                name: 'Behavioral Perspective',
                icon: '🎯',
                focus: 'Observable behavior and environmental influences',
                keyQuestion: 'How does the environment shape behavior through learning?',
                example: 'Using rewards and punishments to modify behavior, or studying how phobias are learned.',
                applications: ['Behavior modification', 'Applied behavior analysis', 'Training programs'],
                color: 'green'
              },
              {
                name: 'Humanistic Perspective',
                icon: '🌟',
                focus: 'Personal growth, free will, and self-actualization',
                keyQuestion: 'How can people reach their full potential?',
                example: 'Studying what makes people happy, fulfilled, and motivated to grow.',
                applications: ['Person-centered therapy', 'Positive psychology', 'Counseling'],
                color: 'yellow'
              },
              {
                name: 'Psychodynamic Perspective',
                icon: '🎭',
                focus: 'Unconscious processes and childhood experiences',
                keyQuestion: 'How do unconscious forces influence behavior?',
                example: 'Exploring how childhood trauma affects adult relationships, or analyzing dreams for hidden meanings.',
                applications: ['Psychoanalysis', 'Psychodynamic therapy', 'Personality assessment'],
                color: 'purple'
              },
              {
                name: 'Sociocultural Perspective',
                icon: '🌍',
                focus: 'Social and cultural influences on behavior',
                keyQuestion: 'How do culture and society shape who we are?',
                example: 'Studying how cultural values affect parenting styles, or how social norms influence behavior.',
                applications: ['Cross-cultural psychology', 'Social psychology', 'Community psychology'],
                color: 'orange'
              }
            ].map((perspective, i) => (
              <div key={i} className="p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{perspective.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{perspective.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">{perspective.focus}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">KEY QUESTION:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{perspective.keyQuestion}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">EXAMPLE:</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{perspective.example}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">APPLICATIONS:</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {perspective.applications.map((app, idx) => (
                        <li key={idx}>• {app}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">💡 Important Note:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              Modern psychologists often use an <strong>eclectic approach</strong>, combining insights from multiple perspectives to get a more complete understanding of behavior. 
              For example, understanding depression might involve looking at biological factors (neurotransmitters), cognitive factors (negative thinking), behavioral factors (lack of activity), 
              and sociocultural factors (social support).
            </p>
          </div>

          {/* Real-World Application Exercise */}
          <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🌍 Real-World Application</h4>
            <ExerciseQuestion 
              question="A teenager is struggling with anxiety. A psychologist examines: (1) their brain chemistry, (2) their negative thought patterns, (3) their family's communication style, and (4) cultural pressures from social media. This psychologist is using:"
              options={[
                'Only the Biological Perspective',
                'Only the Cognitive Perspective',
                'An Eclectic Approach combining multiple perspectives',
                'Only the Sociocultural Perspective'
              ]}
              correctAnswer={2}
              explanation="The correct answer is AN ECLECTIC APPROACH. The psychologist is combining insights from multiple perspectives: Biological (brain chemistry), Cognitive (thought patterns), Sociocultural (family communication and cultural pressures). This is how modern psychology typically works - using multiple perspectives together provides a more complete understanding than any single perspective alone. This comprehensive approach leads to more effective treatment."
            />
          </div>

          {/* Exercise for Subtopic 1.4 */}
          <div className="mt-10 p-8 border-t-4 border-emerald-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Modern Perspectives</h3>
            <ExerciseQuestion 
              question="Dr. Martinez is studying how low levels of serotonin in the brain are related to symptoms of depression. She uses brain imaging technology to observe neurotransmitter activity. Which modern perspective is Dr. Martinez using?"
              options={[
                'Cognitive Perspective',
                'Behavioral Perspective',
                'Biological Perspective',
                'Sociocultural Perspective'
              ]}
              correctAnswer={2}
              explanation="This is the BIOLOGICAL PERSPECTIVE. Dr. Martinez is focusing on biological processes (neurotransmitters and brain activity) to understand behavior. The biological perspective examines how the brain, nervous system, genetics, and biochemistry influence behavior and mental processes. The cognitive perspective would focus on thought processes, the behavioral perspective on observable actions and environmental influences, and the sociocultural perspective on cultural and social factors."
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-l-4 border-pink-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 1 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Definition:</strong> Psychology is the scientific study of behavior and mental processes.</p>
            <p><strong>✓ Four Goals:</strong> Description, Explanation, Prediction, and Control/Influence.</p>
            <p><strong>✓ Historical Schools:</strong> Structuralism, Functionalism, Behaviorism, and Gestalt Psychology shaped early psychology.</p>
            <p><strong>✓ Modern Perspectives:</strong> Biological, Cognitive, Behavioral, Humanistic, Psychodynamic, and Sociocultural perspectives provide different lenses for understanding behavior.</p>
            <p><strong>✓ Key Insight:</strong> Modern psychology uses an eclectic approach, combining multiple perspectives for a comprehensive understanding.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 2
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
