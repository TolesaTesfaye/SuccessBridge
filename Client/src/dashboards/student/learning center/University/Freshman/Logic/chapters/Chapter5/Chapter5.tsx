import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

export const Chapter5: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER FIVE
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          INFORMAL FALLACIES
        </h2>
      </div>

      {/* Lesson 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 1: Fallacy in General
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            1.1 The Meaning of Fallacy
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            A <strong>fallacy</strong> is a defect in an argument that consists of something other than merely false premises. 
            Fallacies are common errors in reasoning that undermine the logic of an argument.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Key Characteristics:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Fallacies appear to be correct but are actually flawed</li>
              <li>They can be psychologically persuasive even when logically invalid</li>
              <li>Understanding fallacies helps identify weak arguments</li>
              <li>Fallacies can be intentional (sophistry) or unintentional</li>
            </ul>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            1.2 Types of Fallacies
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Informal fallacies are classified into several categories based on the type of error:
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Fallacies of Relevance</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Premises are irrelevant to the conclusion
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Fallacies of Weak Induction</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Premises provide weak support for the conclusion
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Fallacies of Presumption</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Premises presume what they purport to prove
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Fallacies of Ambiguity</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Unclear or ambiguous language misleads
              </p>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="What is a fallacy?"
              options={[
                "A true statement with false premises",
                "A defect in an argument other than false premises",
                "Any argument that disagrees with popular opinion",
                "A statement that cannot be proven"
              ]}
              correctAnswer={1}
              explanation="A fallacy is a defect in an argument that consists of something other than merely false premises. It's an error in reasoning that undermines the logic of an argument."
            />

            <ExerciseQuestion
              question="Which statement about fallacies is TRUE?"
              options={[
                "Fallacies are always easy to identify",
                "Fallacies can be psychologically persuasive even when logically invalid",
                "All fallacies are intentional",
                "Fallacies only occur in formal logic"
              ]}
              correctAnswer={1}
              explanation="Fallacies can be psychologically persuasive even when they are logically invalid. This is why they are common and why understanding them is important."
            />
          </div>
        </div>
      </div>

      {/* Lesson 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 2: Fallacies of Relevance
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Fallacies of relevance occur when premises are logically irrelevant to the conclusion, 
            even though they may seem psychologically relevant.
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-red-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Ad Hominem (Attack on the Person)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Attacking the person making the argument rather than the argument itself.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "You can't trust John's argument about climate change because he's not a scientist."
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Appeal to Force (Ad Baculum)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Using threats or force to get someone to accept a conclusion.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "You should agree with my proposal, or you might lose your job."
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Appeal to Pity (Ad Misericordiam)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Attempting to evoke pity or sympathy instead of providing logical reasons.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Please give me a passing grade; I've had a difficult semester."
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Appeal to the People (Ad Populum)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Arguing that something is true because many people believe it.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Everyone believes this product works, so it must be effective."
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Straw Man</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Misrepresenting someone's argument to make it easier to attack.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "My opponent wants to reduce military spending, so they clearly don't care about national security."
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Red Herring</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Introducing an irrelevant topic to divert attention from the original issue.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Why worry about endangered species when there are homeless people?"
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'You can't believe Sarah's economic theory because she failed math in high school.' This is an example of which fallacy?"
              options={[
                "Appeal to Pity",
                "Ad Hominem",
                "Straw Man",
                "Red Herring"
              ]}
              correctAnswer={1}
              explanation="This is Ad Hominem - attacking the person (Sarah's past math failure) rather than addressing the economic theory itself."
            />

            <ExerciseQuestion
              question="'Everyone is buying this smartphone, so it must be the best one available.' Which fallacy is this?"
              options={[
                "Appeal to Force",
                "Straw Man",
                "Appeal to the People",
                "Red Herring"
              ]}
              correctAnswer={2}
              explanation="This is Appeal to the People (Ad Populum) - arguing something is true or good simply because many people believe or do it."
            />

            <ExerciseQuestion
              question="'My opponent says we should improve public transportation, but they obviously want to destroy the car industry.' This is which fallacy?"
              options={[
                "Straw Man",
                "Ad Hominem",
                "Appeal to Pity",
                "Red Herring"
              ]}
              correctAnswer={0}
              explanation="This is a Straw Man fallacy - misrepresenting the opponent's position (improving public transportation) as something extreme (destroying the car industry) to make it easier to attack."
            />
          </div>
        </div>
      </div>

      {/* Lesson 3 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 3: Fallacies of Weak Induction
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            These fallacies occur when premises provide inadequate support for the conclusion.
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Hasty Generalization</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Drawing a general conclusion from insufficient evidence or too small a sample.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "I met two rude people from that city, so everyone there must be rude."
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">False Cause (Post Hoc)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Assuming that because one event followed another, the first caused the second.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "I wore my lucky socks and won the game, so the socks caused the victory."
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Weak Analogy</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Comparing two things that are not sufficiently similar in relevant respects.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Employees are like nails; just as nails must be hit on the head to work, so must employees."
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Appeal to Ignorance (Ad Ignorantiam)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Arguing that something is true because it hasn't been proven false (or vice versa).
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "No one has proven that aliens don't exist, so they must exist."
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'I got sick after eating at that restaurant yesterday, so the food there must be contaminated.' Which fallacy is this?"
              options={[
                "Hasty Generalization",
                "False Cause",
                "Weak Analogy",
                "Appeal to Ignorance"
              ]}
              correctAnswer={1}
              explanation="This is False Cause (Post Hoc) - assuming that because getting sick followed eating at the restaurant, the restaurant caused the sickness, without considering other possible causes."
            />

            <ExerciseQuestion
              question="'My friend tried that diet and lost weight, so it will definitely work for everyone.' This is an example of:"
              options={[
                "False Cause",
                "Weak Analogy",
                "Hasty Generalization",
                "Appeal to Ignorance"
              ]}
              correctAnswer={2}
              explanation="This is Hasty Generalization - drawing a broad conclusion (works for everyone) from insufficient evidence (one person's experience)."
            />
          </div>
        </div>
      </div>

      {/* Lesson 4 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 4: Fallacies of Presumption
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            These fallacies occur when the premises presume what they claim to prove.
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-red-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Begging the Question (Circular Reasoning)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                The conclusion is assumed in one of the premises.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "The Bible is true because it says so in the Bible."
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Complex Question</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Asking a question that presupposes something that has not been proven.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Have you stopped cheating on exams?" (presumes you were cheating)
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">False Dichotomy (Either-Or)</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Presenting only two options when more exist.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "You're either with us or against us."
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Suppressed Evidence</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Ignoring or concealing evidence that would weaken the argument.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> Advertising only positive reviews while hiding negative ones.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson 5 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 5: Fallacies of Ambiguity and Grammatical Analogy
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            5.1 Fallacies of Ambiguity
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            These fallacies arise from ambiguous or unclear language.
          </p>

          <div className="space-y-2 mb-3">
            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Equivocation</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Using a word in two different senses within the same argument.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "A feather is light. What is light cannot be dark. Therefore, a feather cannot be dark."
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Amphiboly</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Ambiguous grammatical structure leads to misinterpretation.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "The professor said on Monday he would give a test." (When is the test?)
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            5.2 Fallacies of Grammatical Analogy
          </h4>

          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Composition</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Assuming what is true of the parts must be true of the whole.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Each player on the team is excellent, so the team must be excellent."
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Division</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Assuming what is true of the whole must be true of the parts.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "The university is wealthy, so every department must be wealthy."
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-3">
            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Avoiding Fallacies:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Carefully analyze the structure of arguments</li>
              <li>Check for relevance between premises and conclusions</li>
              <li>Ensure terms are used consistently</li>
              <li>Look for hidden assumptions</li>
              <li>Consider alternative explanations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
