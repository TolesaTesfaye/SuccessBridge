import React, { useEffect, useRef } from 'react';
import { Chapter2 } from './chapter2/Chapter2';
import { Chapter3 } from './chapter3/Chapter3';
import { Chapter5 } from './Chapter5/Chapter5';
import { Chapter6 } from './Chapter6/Chapter6';

interface LogicChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedLogicChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const LogicChapterContent: React.FC<LogicChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedLogicChapter,
  setSelectedSubtopic
}) => {
  const section11Ref = useRef<HTMLDivElement>(null);
  const section12Ref = useRef<HTMLDivElement>(null);
  const section13Ref = useRef<HTMLDivElement>(null);
  const section14Ref = useRef<HTMLDivElement>(null);
  const section15Ref = useRef<HTMLDivElement>(null);

  // Logic chapters list
  const logicChapters = [
    { id: 'chapter1', title: 'Chapter 1: Introducing Philosophy' },
    { id: 'chapter2', title: 'Chapter 2: Basic Concepts of Logic' },
    { id: 'chapter3', title: 'Chapter 3: Logic and Language' },
    { id: 'chapter4', title: 'Chapter 4: Basic Concepts of Critical Thinking' },
    { id: 'chapter5', title: 'Chapter 5: Informal Fallacies' },
    { id: 'chapter6', title: 'Chapter 6: Categorical Propositions' }
  ];

  // Scroll to selected subtopic
  useEffect(() => {
    if (!selectedSubtopic) return;

    const scrollToSection = () => {
      let targetRef: React.RefObject<HTMLDivElement> | null = null;

      if (selectedSubtopic.includes('1.1') || selectedSubtopic.includes('Lesson 1')) targetRef = section11Ref;
      else if (selectedSubtopic.includes('1.2') || selectedSubtopic.includes('Lesson 2')) targetRef = section12Ref;
      else if (selectedSubtopic.includes('1.3') || selectedSubtopic.includes('Lesson 3')) targetRef = section13Ref;
      else if (selectedSubtopic.includes('1.4') || selectedSubtopic.includes('Lesson 4')) targetRef = section14Ref;
      else if (selectedSubtopic.includes('1.5') || selectedSubtopic.includes('Lesson 5')) targetRef = section15Ref;

      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

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
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            INTRODUCING PHILOSOPHY
          </h2>
        </div>

        {/* Lesson 1 */}
        <div ref={section11Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 1: Meaning and Nature of Philosophy
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Philosophy</strong> comes from the Greek words "philos" (love) and "sophia" (wisdom), meaning "love of wisdom."
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Key Characteristics:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Seeks fundamental truths about reality, knowledge, and existence</li>
                <li>Uses rational inquiry and critical thinking</li>
                <li>Questions assumptions and examines beliefs</li>
                <li>Explores the nature of reality, knowledge, values, and reasoning</li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Philosophy is a systematic and critical examination of fundamental questions about existence, knowledge, values, reason, mind, and language.
            </p>
          </div>
        </div>

        {/* Lesson 2 */}
        <div ref={section12Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 2: Basic Features of Philosophy
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Philosophy has several distinctive features that set it apart from other disciplines:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">1. Critical Thinking</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Analyzing arguments, identifying assumptions, and evaluating evidence systematically.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">2. Systematic Approach</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Organized and methodical examination of problems and questions.
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-1">3. Rational Inquiry</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Using reason and logic rather than emotion or tradition alone.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">4. Universal Questions</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Addresses fundamental questions relevant to all human beings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson 3 */}
        <div ref={section13Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 3: Metaphysics and Epistemology
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3.1 Metaphysics
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Metaphysics is the branch of philosophy that examines the fundamental nature of reality, including the relationship between mind and matter, substance and attribute, fact and value.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Key Questions in Metaphysics:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>What is the nature of reality?</li>
                <li>Do abstract objects exist?</li>
                <li>What is the relationship between mind and body?</li>
                <li>Is there free will or determinism?</li>
              </ul>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3.2 Epistemology
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Epistemology is the study of knowledge and justified belief. It examines the nature, sources, and limits of knowledge.
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Key Questions in Epistemology:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>What is knowledge?</li>
                <li>How do we acquire knowledge?</li>
                <li>What are the sources of knowledge?</li>
                <li>What is the difference between belief and knowledge?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lesson 4 */}
        <div ref={section14Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 4: Axiology and Logic
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              4.1 Axiology
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Axiology is the philosophical study of value, including ethics (moral values) and aesthetics (beauty and art).
            </p>
            
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Ethics</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Studies moral principles, right and wrong, good and bad conduct.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Aesthetics</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Examines beauty, art, taste, and the creation and appreciation of beauty.
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              4.2 Logic
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Logic is the study of correct reasoning and argumentation. It provides principles for distinguishing good arguments from bad ones.
            </p>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
              <h5 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Key Aspects of Logic:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Validity and soundness of arguments</li>
                <li>Deductive and inductive reasoning</li>
                <li>Logical fallacies and errors in reasoning</li>
                <li>Formal and informal logic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lesson 5 */}
        <div ref={section15Ref} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 5: Importance of Learning Philosophy
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Studying philosophy provides numerous benefits for personal and intellectual development:
            </p>

            <div className="space-y-2">
              <div className="border-l-4 border-blue-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Critical Thinking Skills</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Develops ability to analyze arguments, identify assumptions, and evaluate evidence systematically.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Clarity of Thought</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Helps express ideas clearly and precisely, improving communication skills.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Ethical Awareness</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Enhances understanding of moral principles and ethical decision-making.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">Broader Perspective</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Provides a comprehensive view of different worldviews and ways of thinking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            disabled
            className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedLogicChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter4') {
    return (
      <div className="space-y-3">
        {/* Chapter Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            CHAPTER FOUR
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            BASIC CONCEPTS OF CRITICAL THINKING
          </h2>
        </div>

        {/* Lesson 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 1: Meaning of Critical Thinking
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Critical thinking</strong> is the intellectually disciplined process of actively and skillfully conceptualizing, 
              applying, analyzing, synthesizing, and evaluating information gathered from observation, experience, reflection, 
              reasoning, or communication.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Core Elements:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Analysis:</strong> Breaking down complex information into parts</li>
                <li><strong>Evaluation:</strong> Assessing the credibility and relevance of information</li>
                <li><strong>Inference:</strong> Drawing reasonable conclusions from evidence</li>
                <li><strong>Explanation:</strong> Clearly articulating reasoning and results</li>
                <li><strong>Self-regulation:</strong> Monitoring and correcting one's own thinking</li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Critical thinking is not simply being critical or negative. It involves fair-minded, objective analysis 
              that considers multiple perspectives and seeks truth rather than confirmation of existing beliefs.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Why Critical Thinking Matters:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Improves decision-making in personal and professional life</li>
                <li>Helps identify and avoid logical fallacies and manipulation</li>
                <li>Enhances problem-solving abilities</li>
                <li>Promotes intellectual independence and autonomy</li>
                <li>Facilitates effective communication and argumentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lesson 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 2: Standards of Critical Thinking
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Critical thinking requires adherence to intellectual standards that ensure quality reasoning:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">1. Clarity</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Expressing ideas in a way that is easily understood. Unclear thinking cannot be assessed for accuracy or relevance.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> Could you elaborate? Can you give an example?
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">2. Accuracy</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Ensuring statements are true and free from error. Information must be verified and factual.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> How can we verify this? Is this information correct?
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">3. Precision</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Providing exact details and specific information. Vague statements lack the detail needed for proper evaluation.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> Could you be more specific? What exactly do you mean?
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-1">4. Relevance</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Ensuring information directly relates to the question or issue at hand.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> How does this relate to the issue?
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">5. Depth</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Addressing the complexities and interrelationships of a problem adequately.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> What factors make this difficult? What complexities exist?
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">6. Breadth</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Considering multiple viewpoints and perspectives on an issue.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> Is there another way to look at this?
                </div>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-teal-900 dark:text-teal-100 mb-1">7. Logic</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Ensuring arguments are well-reasoned and conclusions follow from premises.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> Does this make sense? Does it follow logically?
                </div>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                <h4 className="font-bold text-pink-900 dark:text-pink-100 mb-1">8. Fairness</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Thinking without bias, self-interest, or preconceived notions.
                </p>
                <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded text-sm">
                  <strong>Question:</strong> Am I being biased? Am I considering all sides fairly?
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 3: Codes of Intellectual Conduct for Effective Discussion
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3.1 Principles of Good Argument
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Effective intellectual discourse requires adherence to principles that promote productive dialogue:
            </p>

            <div className="space-y-2 mb-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">1. Principle of Charity</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Interpret others' arguments in their strongest, most reasonable form before critiquing them. 
                  Avoid straw man fallacies by addressing the actual argument presented.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">2. Burden of Proof</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  The person making a claim has the responsibility to provide evidence. Extraordinary claims 
                  require extraordinary evidence.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">3. Intellectual Humility</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Recognize the limits of your knowledge and be willing to admit when you're wrong or uncertain. 
                  Avoid overconfidence in your beliefs.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-3">
                <h5 className="font-bold text-gray-900 dark:text-white">4. Focus on Ideas, Not People</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Critique arguments and ideas, not the person presenting them. Avoid ad hominem attacks 
                  and personal insults.
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3.2 Principles of Critical Thinking
            </h4>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Essential Principles:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Question Assumptions:</strong> Challenge taken-for-granted beliefs and examine underlying premises</li>
                <li><strong>Seek Evidence:</strong> Base conclusions on reliable evidence rather than intuition or emotion</li>
                <li><strong>Consider Alternatives:</strong> Explore multiple explanations and solutions before settling on one</li>
                <li><strong>Avoid Oversimplification:</strong> Recognize complexity and resist black-and-white thinking</li>
                <li><strong>Be Systematic:</strong> Follow a logical, organized approach to problem-solving</li>
                <li><strong>Remain Open-Minded:</strong> Be willing to change your mind when presented with better evidence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lesson 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson 4: Characteristics of Critical Thinking
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              4.1 Basic Traits of Critical Thinkers
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Critical thinkers exhibit specific intellectual virtues and habits of mind:
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Intellectual Curiosity</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Desire to learn and understand, asking probing questions and seeking deeper knowledge
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Intellectual Courage</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Willingness to challenge popular beliefs and face ideas that conflict with one's own
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Intellectual Empathy</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Ability to understand and appreciate perspectives different from one's own
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Intellectual Integrity</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Holding oneself to the same standards one expects of others; being honest in reasoning
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Intellectual Perseverance</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Persistence in seeking truth despite obstacles, frustration, or difficulty
                </p>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
                <h5 className="font-bold text-gray-900 dark:text-white mb-1">Fair-mindedness</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Treating all viewpoints fairly, without bias toward one's own interests
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              4.2 Basic Traits of Uncritical Thinkers
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Understanding poor thinking habits helps us avoid them:
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h5 className="font-semibold text-red-900 dark:text-red-100 mb-1">Common Traits to Avoid:</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Intellectual Arrogance:</strong> Overestimating one's knowledge and dismissing others' views</li>
                <li><strong>Intellectual Cowardice:</strong> Avoiding challenging ideas that threaten existing beliefs</li>
                <li><strong>Intellectual Conformity:</strong> Accepting popular opinions without critical examination</li>
                <li><strong>Egocentrism:</strong> Viewing everything from one's own perspective without considering others</li>
                <li><strong>Sociocentrism:</strong> Uncritically accepting the beliefs of one's group or culture</li>
                <li><strong>Wishful Thinking:</strong> Believing something because one wants it to be true, not because of evidence</li>
                <li><strong>Closed-mindedness:</strong> Refusing to consider alternative viewpoints or new evidence</li>
                <li><strong>Intellectual Laziness:</strong> Accepting easy answers without thorough investigation</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mt-3">
              <h5 className="font-semibold text-green-900 dark:text-green-100 mb-1">Developing Critical Thinking:</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Critical thinking is a skill that improves with practice. To develop it:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Regularly question your own beliefs and assumptions</li>
                <li>Seek out diverse perspectives and viewpoints</li>
                <li>Practice analyzing arguments in everyday situations</li>
                <li>Reflect on your thinking processes and identify areas for improvement</li>
                <li>Engage in thoughtful discussions with others who think differently</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              const currentIndex = logicChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex > 0) {
                setSelectedLogicChapter(logicChapters[currentIndex - 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={logicChapters.findIndex(ch => ch.id === chapterId) === 0}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              logicChapters.findIndex(ch => ch.id === chapterId) === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
            }`}
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              const currentIndex = logicChapters.findIndex(ch => ch.id === chapterId);
              if (currentIndex < logicChapters.length - 1) {
                setSelectedLogicChapter(logicChapters[currentIndex + 1].id);
                setSelectedSubtopic('');
              }
            }}
            disabled={logicChapters.findIndex(ch => ch.id === chapterId) === logicChapters.length - 1}
            className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
              logicChapters.findIndex(ch => ch.id === chapterId) === logicChapters.length - 1
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

  if (chapterId === 'chapter2') {
    return (
      <div className="space-y-3">
        <Chapter2 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedLogicChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedLogicChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter3') {
    return (
      <div className="space-y-3">
        <Chapter3 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedLogicChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedLogicChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter5') {
    return (
      <div className="space-y-3">
        <Chapter5 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedLogicChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedLogicChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter6') {
    return (
      <div className="space-y-3">
        <Chapter6 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedLogicChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
          >
            ❮ Previous
          </button>

          <button
            disabled
            className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  // Placeholder for other chapters
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {chapterId.replace('chapter', 'Chapter ')}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Content for this chapter will be added soon...
      </p>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            const currentIndex = logicChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedLogicChapter(logicChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={logicChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            logicChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = logicChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < logicChapters.length - 1) {
              setSelectedLogicChapter(logicChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={logicChapters.findIndex(ch => ch.id === chapterId) === logicChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            logicChapters.findIndex(ch => ch.id === chapterId) === logicChapters.length - 1
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
