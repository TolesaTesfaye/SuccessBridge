import React, { useEffect, useRef } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface PsychologyChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedPsychologyChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const PsychologyChapterContent: React.FC<PsychologyChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedPsychologyChapter,
  setSelectedSubtopic
}) => {
  const section11Ref = useRef<HTMLDivElement>(null);
  const section12Ref = useRef<HTMLDivElement>(null);
  const section13Ref = useRef<HTMLDivElement>(null);
  const section14Ref = useRef<HTMLDivElement>(null);
  const section15Ref = useRef<HTMLDivElement>(null);

  // Psychology chapters list
  const psychologyChapters = [
    { id: 'chapter1', title: 'Chapter 1: Essence of Psychology' },
    { id: 'chapter2', title: 'Chapter 2: Human Development' },
    { id: 'chapter3', title: 'Chapter 3: Learning and Theories' },
    { id: 'chapter4', title: 'Chapter 4: Memory and Forgetting' },
    { id: 'chapter5', title: 'Chapter 5: Motivation and Emotions' },
    { id: 'chapter6', title: 'Chapter 6: Personality' },
    { id: 'chapter7', title: 'Chapter 7: Psychological Disorders' },
    { id: 'chapter8', title: 'Chapter 8: Introduction to Life Skills' },
    { id: 'chapter9', title: 'Chapter 9: Intra-Personal Skills' },
    { id: 'chapter10', title: 'Chapter 10: Academic Skills' },
    { id: 'chapter11', title: 'Chapter 11: Social Skills' }
  ];

  // Scroll to selected subtopic
  useEffect(() => {
    if (!selectedSubtopic) return;

    const scrollToSection = () => {
      let targetRef: React.RefObject<HTMLDivElement> | null = null;

      if (selectedSubtopic.includes('1.1')) targetRef = section11Ref;
      else if (selectedSubtopic.includes('1.2')) targetRef = section12Ref;
      else if (selectedSubtopic.includes('1.3')) targetRef = section13Ref;
      else if (selectedSubtopic.includes('1.4')) targetRef = section14Ref;
      else if (selectedSubtopic.includes('1.5')) targetRef = section15Ref;

      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Small delay to ensure content is rendered
    setTimeout(scrollToSection, 100);
  }, [selectedSubtopic]);
  
  if (chapterId === 'chapter1') {
    return (
      <div className="space-y-3">
        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            CHAPTER ONE
          </h1>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">
            ESSENCE OF PSYCHOLOGY
          </h2>
        </div>

        {/* Section 1.1 */}
        <div ref={section11Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            1.1. Definition of Psychology and Related Concepts
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Psychology</strong> is the scientific study of behavior and mental processes. The word "psychology" 
              comes from the Greek words "psyche" (meaning soul or mind) and "logos" (meaning study).
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Key Components:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Behavior:</strong> Observable actions that can be measured and recorded</li>
                <li><strong>Mental Processes:</strong> Internal experiences like thoughts, feelings, and sensations</li>
                <li><strong>Scientific Method:</strong> Psychology uses empirical research to understand human behavior</li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Psychology differs from philosophy and common sense because it relies on systematic observation 
              and experimentation rather than speculation or intuition.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Related Concepts:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Cognition:</strong> Mental processes involved in gaining knowledge and comprehension</li>
                <li><strong>Consciousness:</strong> Awareness of internal and external stimuli</li>
                <li><strong>Perception:</strong> The process of organizing and interpreting sensory information</li>
                <li><strong>Motivation:</strong> Internal states that activate and direct behavior</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1.2 */}
        <div ref={section12Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            1.2. Goals of Psychology
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Psychology has four primary goals that guide research and practice:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">1. Description</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <em>What is happening?</em>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Accurately observing and recording behavior to understand what is occurring.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Example:</strong> Describing symptoms of depression
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">2. Explanation</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <em>Why is it happening?</em>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Understanding the causes and mechanisms behind behavior.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Example:</strong> Explaining depression through brain chemistry
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-1">3. Prediction</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <em>When will it happen again?</em>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Forecasting future behavior based on current knowledge.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Example:</strong> Predicting depression risk factors
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">4. Control/Influence</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <em>How can we change it?</em>
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Developing interventions to modify behavior.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Example:</strong> Using therapy to treat depression
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.3 */}
        <div ref={section13Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            1.3. Historical Background and Major Perspectives in Psychology
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Psychology has evolved from philosophical roots to become a scientific discipline.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1.3.1. Early Schools of Psychology
            </h4>

            <div className="space-y-2 mb-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Structuralism (1879)</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <strong>Founder:</strong> Wilhelm Wundt & Edward Titchener
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Breaking down mental processes into basic elements through introspection. 
                  Wundt established the first psychology laboratory in Leipzig, Germany in 1879.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Functionalism (1890s)</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <strong>Founder:</strong> William James
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Studying the purpose and adaptation of mental processes. Focused on how mental 
                  processes help organisms adapt to their environment.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Behaviorism (1913)</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <strong>Founder:</strong> John Watson
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Focusing only on observable behavior, rejecting the study of consciousness. 
                  "Give me a dozen healthy infants..."
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Gestalt Psychology (1912)</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <strong>Founders:</strong> Max Wertheimer, Kurt Koffka, Wolfgang Köhler
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  "The whole is greater than the sum of its parts." Emphasized perception and 
                  problem-solving as organized wholes.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Psychoanalysis (1900)</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <strong>Founder:</strong> Sigmund Freud
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Emphasized the unconscious mind, early childhood experiences, and internal conflicts 
                  in shaping behavior and personality.
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1.3.2. Modern Schools of Psychology
            </h4>

            <div className="space-y-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Biological Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Focuses on the role of the brain, nervous system, and genetics in behavior. 
                  Studies how neurotransmitters, hormones, and brain structures influence behavior.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Cognitive Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Emphasizes mental processes like thinking, memory, and problem-solving. 
                  Views the mind as an information-processing system.
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-1">Behavioral Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Focuses on observable behavior and environmental influences. 
                  Emphasizes learning through conditioning and reinforcement.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Humanistic Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Emphasizes human potential, free will, and personal growth. 
                  Focuses on subjective experiences and self-actualization (Maslow, Rogers).
                </p>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-pink-900 dark:text-pink-100 mb-1">Psychodynamic Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Based on Freud's theories about the unconscious mind. 
                  Emphasizes early childhood experiences and internal conflicts.
                </p>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-teal-900 dark:text-teal-100 mb-1">Sociocultural Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Examines how social and cultural factors influence behavior. 
                  Considers the impact of society, culture, and social groups.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.4 */}
        <div ref={section14Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            1.4. Branches/Sub Fields of Psychology
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Psychology has many specialized areas of study and application:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Clinical Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Diagnosis and treatment of mental health disorders
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Counseling Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Helps people cope with everyday problems and life transitions
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Developmental Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Studies human development across the lifespan
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Social Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Studies how people think about, influence, and relate to others
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Cognitive Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Studies mental processes like memory, thinking, and problem-solving
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Educational Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Applies psychological principles to education and learning
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Industrial/Organizational</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Applies psychology to workplace issues and organizational dynamics
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Health Psychology</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Studies psychological factors in health and illness
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1.5 */}
        <div ref={section15Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            1.5. Research Methods in Psychology
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Psychology uses scientific methods to study behavior and mental processes objectively.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">The Scientific Method:</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Observation:</strong> Notice patterns or phenomena</li>
                <li><strong>Hypothesis:</strong> Form a testable prediction</li>
                <li><strong>Experimentation:</strong> Test the hypothesis systematically</li>
                <li><strong>Analysis:</strong> Examine the data collected</li>
                <li><strong>Conclusion:</strong> Draw conclusions and refine theories</li>
              </ol>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Types of Research Methods:
            </h4>

            <div className="space-y-2">
              <div className="border-l-4 border-green-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Descriptive Methods</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Naturalistic Observation:</strong> Observing behavior in natural settings</li>
                  <li><strong>Case Studies:</strong> In-depth study of individual cases</li>
                  <li><strong>Surveys:</strong> Collecting data through questionnaires or interviews</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Correlational Studies</h5>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Examine relationships between variables but cannot establish cause and effect.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Example:</strong> Studying the relationship between sleep and academic performance
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Experimental Method</h5>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Manipulates one variable to observe effects on another. Can establish cause-and-effect relationships.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-1">
                  <li><strong>Independent Variable:</strong> The variable manipulated by the researcher</li>
                  <li><strong>Dependent Variable:</strong> The variable measured/observed</li>
                  <li><strong>Control Group:</strong> Group that doesn't receive the treatment</li>
                  <li><strong>Experimental Group:</strong> Group that receives the treatment</li>
                </ul>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Example:</strong> Testing whether a new therapy reduces anxiety symptoms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex > 0) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex - 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === 0}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex < psychologyChapters.length - 1) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex + 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter10') {
    return (
      <div className="space-y-3">
        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            CHAPTER TEN
          </h1>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">
            ACADEMIC SKILLS
          </h2>
        </div>

        {/* Section 10.1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.1. Time Management
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Time management is the ability to use time effectively and productively to accomplish goals and tasks.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Key Strategies:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Prioritize tasks using the Eisenhower Matrix</li>
                <li>Create daily and weekly schedules</li>
                <li>Avoid procrastination</li>
                <li>Use time-blocking techniques</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 10.2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.2. Note-taking and Study Skills
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Effective note-taking and study skills are essential for academic success.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">Note-taking Methods:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Cornell Method</li>
                  <li>Mind Mapping</li>
                  <li>Outline Method</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Study Techniques:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Active Recall</li>
                  <li>Spaced Repetition</li>
                  <li>Pomodoro Technique</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10.3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.3. Test-Taking Skill
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Effective test-taking strategies can significantly improve academic performance.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Test-Taking Strategies:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Read instructions carefully</li>
                <li>Answer easy questions first</li>
                <li>Manage time during the test</li>
                <li>Review answers before submitting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 10.4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.4. Test Anxiety and Overcoming Test Anxiety
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Test anxiety is excessive worry about performance on exams that can interfere with test-taking ability.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Coping Strategies:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Practice relaxation techniques</li>
                <li>Prepare thoroughly in advance</li>
                <li>Use positive self-talk</li>
                <li>Get adequate sleep before exams</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 10.5 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.5. Goal Setting
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Goal setting is the process of identifying specific objectives and creating plans to achieve them.
            </p>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">SMART Goals:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>S</strong>pecific - Clear and well-defined</li>
                <li><strong>M</strong>easurable - Quantifiable progress</li>
                <li><strong>A</strong>chievable - Realistic and attainable</li>
                <li><strong>R</strong>elevant - Aligned with values</li>
                <li><strong>T</strong>ime-bound - Has a deadline</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 10.6 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            10.6. Career Development Skill
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Career development involves planning and managing your professional growth and advancement.
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Key Components:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Self-assessment and career exploration</li>
                <li>Networking and building professional relationships</li>
                <li>Resume and interview preparation</li>
                <li>Continuous learning and skill development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex > 0) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex - 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === 0}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex < psychologyChapters.length - 1) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex + 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter11') {
    return (
      <div className="space-y-3">
        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            CHAPTER ELEVEN
          </h1>
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-2">
            SOCIAL SKILLS
          </h2>
        </div>

        {/* Section 11.1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.1. Understanding Cultural Diversity
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Cultural diversity refers to the variety of cultural groups within a society, including differences in ethnicity, language, religion, and customs.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Benefits of Cultural Diversity:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Promotes creativity and innovation</li>
                <li>Enhances problem-solving abilities</li>
                <li>Broadens perspectives and worldviews</li>
                <li>Fosters mutual respect and understanding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 11.2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.2. Gender and Social Inclusion
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Gender equality and social inclusion ensure that all individuals have equal opportunities and rights regardless of gender, ethnicity, or social status.
            </p>
          </div>
        </div>

        {/* Section 11.3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.3. Interpersonal Communication Skills
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Effective communication involves both verbal and non-verbal skills to convey messages clearly and understand others.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">Verbal Skills:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Clear articulation</li>
                  <li>Active listening</li>
                  <li>Appropriate tone</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Non-verbal Skills:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Body language</li>
                  <li>Eye contact</li>
                  <li>Facial expressions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 11.4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.4. Social Influences
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Social influences are the ways in which individuals are affected by the presence and actions of others.
            </p>
          </div>
        </div>

        {/* Section 11.5 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.5. Peer Pressure
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Peer pressure is the influence exerted by peers to encourage conformity to group norms and behaviors.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Resisting Negative Peer Pressure:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Build self-confidence</li>
                <li>Choose friends wisely</li>
                <li>Practice saying "no"</li>
                <li>Seek support from trusted adults</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 11.6 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.6. Assertiveness
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Assertiveness is the ability to express thoughts, feelings, and needs directly and respectfully while respecting others' rights.
            </p>
          </div>
        </div>

        {/* Section 11.7 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.7. Conflict and Conflict Resolution
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Conflict resolution involves finding peaceful solutions to disagreements through communication and compromise.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Conflict Resolution Steps:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Identify the problem</li>
                <li>Listen to all perspectives</li>
                <li>Find common ground</li>
                <li>Develop mutually acceptable solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 11.8 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.8. Team Work
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Teamwork is the collaborative effort of a group to achieve a common goal effectively and efficiently.
            </p>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Effective Teamwork Skills:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Clear communication</li>
                <li>Shared responsibility</li>
                <li>Mutual respect</li>
                <li>Flexibility and adaptability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 11.9 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            11.9. Overcoming Risky Behavior
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Risky behaviors are actions that can lead to negative consequences for health, safety, or well-being.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Prevention Strategies:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Develop decision-making skills</li>
                <li>Build self-esteem and confidence</li>
                <li>Seek positive role models</li>
                <li>Access support systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex > 0) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex - 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === 0}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex < psychologyChapters.length - 1) {
                setSelectedPsychologyChapter(psychologyChapters[currentIndex + 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  // Placeholder for other chapters
  return (
    <div className="space-y-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {psychologyChapters.find(ch => ch.id === chapterId)?.title || chapterId.replace('chapter', 'Chapter ')}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Content for this chapter will be added soon...
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={() => {
            const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedPsychologyChapter(psychologyChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            psychologyChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = psychologyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < psychologyChapters.length - 1) {
              setSelectedPsychologyChapter(psychologyChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            psychologyChapters.findIndex(ch => ch.id === chapterId) === psychologyChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
