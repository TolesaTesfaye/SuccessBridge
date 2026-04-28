import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PsychologySidebar from '../../components/PsychologySidebar';

const Chapter1: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <PsychologySidebar 
        isOpen={sidebarOpen}
        expandedChapters={expandedChapters}
        onToggleChapter={toggleChapter}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            {sidebarOpen ? '◀ Hide TOC' : '▶ Show TOC'}
          </button>

          <div className="max-w-5xl mx-auto">
            {/* Navigation */}
            <div className="flex gap-4 mb-6">
              <Link 
                to="/student/learning-center/psychology"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Back to Module
              </Link>
              <Link 
                to="/student/learning-center/psychology/chapter2"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Next Chapter ❯
              </Link>
            </div>

        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            CHAPTER ONE
          </h1>
          <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
            ESSENCE OF PSYCHOLOGY
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="space-y-6">
          {/* Section 1.1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1.1. Definition of Psychology and Related Concepts
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Psychology</strong> is the scientific study of behavior and mental processes. The word "psychology" 
                comes from the Greek words "psyche" (meaning soul or mind) and "logos" (meaning study).
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Components:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Behavior:</strong> Observable actions that can be measured and recorded</li>
                  <li><strong>Mental Processes:</strong> Internal experiences like thoughts, feelings, and sensations</li>
                  <li><strong>Scientific Method:</strong> Psychology uses empirical research to understand human behavior</li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Psychology differs from philosophy and common sense because it relies on systematic observation 
                and experimentation rather than speculation or intuition.
              </p>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Related Concepts:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Cognition:</strong> Mental processes involved in gaining knowledge and comprehension</li>
                  <li><strong>Consciousness:</strong> Awareness of internal and external stimuli</li>
                  <li><strong>Perception:</strong> The process of organizing and interpreting sensory information</li>
                  <li><strong>Motivation:</strong> Internal states that activate and direct behavior</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 1.2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1.2. Goals of Psychology
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Psychology has four primary goals that guide research and practice:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">1. Description</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <em>What is happening?</em>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Accurately observing and recording behavior to understand what is occurring.
                  </p>
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                    <strong>Example:</strong> Describing symptoms of depression
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">2. Explanation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <em>Why is it happening?</em>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Understanding the causes and mechanisms behind behavior.
                  </p>
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                    <strong>Example:</strong> Explaining depression through brain chemistry
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">3. Prediction</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <em>When will it happen again?</em>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Forecasting future behavior based on current knowledge.
                  </p>
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                    <strong>Example:</strong> Predicting depression risk factors
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">4. Control/Influence</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <em>How can we change it?</em>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Developing interventions to modify behavior.
                  </p>
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                    <strong>Example:</strong> Using therapy to treat depression
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1.3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1.3. Historical Background and Major Perspectives in Psychology
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Psychology has evolved from philosophical roots to become a scientific discipline.
              </p>

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1.3.1. Early Schools of Psychology
              </h4>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white">Structuralism (1879)</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                    <strong>Founder:</strong> Wilhelm Wundt & Edward Titchener
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Breaking down mental processes into basic elements through introspection. 
                    Wundt established the first psychology laboratory in Leipzig, Germany in 1879.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white">Functionalism (1890s)</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                    <strong>Founder:</strong> William James
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Studying the purpose and adaptation of mental processes. Focused on how mental 
                    processes help organisms adapt to their environment.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white">Behaviorism (1913)</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                    <strong>Founder:</strong> John Watson
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Focusing only on observable behavior, rejecting the study of consciousness. 
                    "Give me a dozen healthy infants..."
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white">Gestalt Psychology (1912)</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                    <strong>Founders:</strong> Max Wertheimer, Kurt Koffka, Wolfgang Köhler
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    "The whole is greater than the sum of its parts." Emphasized perception and 
                    problem-solving as organized wholes.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
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

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1.3.2. Modern Schools of Psychology
              </h4>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Biological Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Focuses on the role of the brain, nervous system, and genetics in behavior. 
                    Studies how neurotransmitters, hormones, and brain structures influence behavior.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-green-900 dark:text-green-100 mb-2">Cognitive Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Emphasizes mental processes like thinking, memory, and problem-solving. 
                    Views the mind as an information-processing system.
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Behavioral Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Focuses on observable behavior and environmental influences. 
                    Emphasizes learning through conditioning and reinforcement.
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Humanistic Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Emphasizes human potential, free will, and personal growth. 
                    Focuses on subjective experiences and self-actualization (Maslow, Rogers).
                  </p>
                </div>

                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-pink-900 dark:text-pink-100 mb-2">Psychodynamic Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Based on Freud's theories about the unconscious mind. 
                    Emphasizes early childhood experiences and internal conflicts.
                  </p>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                  <h5 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Sociocultural Perspective</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    Examines how social and cultural factors influence behavior. 
                    Considers the impact of society, culture, and social groups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1.4 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1.4. Branches/Sub Fields of Psychology
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Psychology has many specialized areas of study and application:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Clinical Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Diagnosis and treatment of mental health disorders
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Counseling Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Helps people cope with everyday problems and life transitions
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Developmental Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Studies human development across the lifespan
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Social Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Studies how people think about, influence, and relate to others
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Cognitive Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Studies mental processes like memory, thinking, and problem-solving
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Educational Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Applies psychological principles to education and learning
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Industrial/Organizational</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Applies psychology to workplace issues and organizational dynamics
                  </p>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Health Psychology</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Studies psychological factors in health and illness
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1.5 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1.5. Research Methods in Psychology
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Psychology uses scientific methods to study behavior and mental processes objectively.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">The Scientific Method:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Observation:</strong> Notice patterns or phenomena</li>
                  <li><strong>Hypothesis:</strong> Form a testable prediction</li>
                  <li><strong>Experimentation:</strong> Test the hypothesis systematically</li>
                  <li><strong>Analysis:</strong> Examine the data collected</li>
                  <li><strong>Conclusion:</strong> Draw conclusions and refine theories</li>
                </ol>
              </div>

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Types of Research Methods:
              </h4>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Descriptive Methods</h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li><strong>Naturalistic Observation:</strong> Observing behavior in natural settings</li>
                    <li><strong>Case Studies:</strong> In-depth study of individual cases</li>
                    <li><strong>Surveys:</strong> Collecting data through questionnaires or interviews</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Correlational Studies</h5>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Examine relationships between variables but cannot establish cause and effect.
                  </p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Example:</strong> Studying the relationship between sleep and academic performance
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">Experimental Method</h5>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Manipulates one variable to observe effects on another. Can establish cause-and-effect relationships.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-2">
                    <li><strong>Independent Variable:</strong> The variable manipulated by the researcher</li>
                    <li><strong>Dependent Variable:</strong> The variable measured/observed</li>
                    <li><strong>Control Group:</strong> Group that doesn't receive the treatment</li>
                    <li><strong>Experimental Group:</strong> Group that receives the treatment</li>
                  </ul>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Example:</strong> Testing whether a new therapy reduces anxiety symptoms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Bottom Navigation */}
            <div className="flex gap-4 mt-8">
              <Link 
                to="/student/learning-center/psychology"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Back to Module
              </Link>
              <Link 
                to="/student/learning-center/psychology/chapter2"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Next Chapter ❯
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
