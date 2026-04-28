import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

export const Chapter3: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER THREE
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          LOGIC AND LANGUAGE
        </h2>
      </div>

      {/* Lesson 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 1: Language and Logic
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Language</strong> is the primary tool of logic. Understanding how language works is essential 
            for analyzing arguments and avoiding misunderstandings.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Functions of Language:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Informative:</strong> Conveys information or describes facts</li>
              <li><strong>Expressive:</strong> Expresses feelings or emotions</li>
              <li><strong>Directive:</strong> Commands, requests, or instructs</li>
              <li><strong>Performative:</strong> Performs an action through words</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-2">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Informative Example</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                "Water boils at 100°C at sea level."
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Expressive Example</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                "I'm so happy to see you!"
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-1">Directive Example</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                "Please close the door."
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-red-900 dark:text-red-100 mb-1">Performative Example</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                "I promise to help you."
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Logic primarily deals with informative language</strong> because only informative statements 
            can be true or false, which is necessary for evaluating arguments.
          </p>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'The capital of France is Paris.' What function of language is this?"
              options={[
                "Expressive",
                "Directive",
                "Informative",
                "Performative"
              ]}
              correctAnswer={2}
              explanation="This is informative language - it conveys factual information that can be verified as true or false."
            />

            <ExerciseQuestion
              question="Which function of language is MOST important for logical arguments?"
              options={[
                "Expressive",
                "Directive",
                "Performative",
                "Informative"
              ]}
              correctAnswer={3}
              explanation="Informative language is most important for logic because only informative statements can be true or false, which is necessary for evaluating arguments."
            />
          </div>
        </div>
      </div>

      {/* Lesson 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 2: Types of Language
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Language can be classified based on its precision and emotional content:
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Literal vs. Figurative Language</h5>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <p className="mb-1"><strong>Literal:</strong> Words used in their exact, dictionary meaning</p>
                <p><strong>Figurative:</strong> Words used metaphorically or symbolically</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <p><strong>Literal:</strong> "It's raining outside."</p>
                <p><strong>Figurative:</strong> "It's raining cats and dogs."</p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Precise vs. Vague Language</h5>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <p className="mb-1"><strong>Precise:</strong> Clear, specific, unambiguous</p>
                <p><strong>Vague:</strong> Unclear, general, open to interpretation</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <p><strong>Precise:</strong> "The meeting starts at 2:00 PM."</p>
                <p><strong>Vague:</strong> "The meeting starts soon."</p>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Neutral vs. Emotive Language</h5>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <p className="mb-1"><strong>Neutral:</strong> Objective, factual, without emotional coloring</p>
                <p><strong>Emotive:</strong> Loaded with emotional associations</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
                <p><strong>Neutral:</strong> "The politician proposed a new tax."</p>
                <p><strong>Emotive:</strong> "The greedy politician wants to steal your money."</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-3">
            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">For Clear Logical Thinking:</h5>
            <p className="text-gray-700 dark:text-gray-300">
              Use literal, precise, and neutral language. Figurative, vague, or emotive language can 
              obscure meaning and lead to fallacies.
            </p>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'That corrupt official is destroying our country!' What type of language is this?"
              options={[
                "Neutral and precise",
                "Emotive and loaded",
                "Literal and clear",
                "Figurative and vague"
              ]}
              correctAnswer={1}
              explanation="This is emotive language - words like 'corrupt' and 'destroying' carry strong emotional associations and bias the statement."
            />

            <ExerciseQuestion
              question="Which statement is most appropriate for logical argumentation?"
              options={[
                "He's as strong as an ox.",
                "The policy will probably help some people.",
                "The study showed a 15% increase in test scores.",
                "Everyone knows this is wrong."
              ]}
              correctAnswer={2}
              explanation="Option C is precise, literal, and neutral - it provides specific, verifiable information without emotional language or vagueness."
            />
          </div>
        </div>
      </div>

      {/* Lesson 3 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 3: Definitions
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Definitions</strong> specify the meaning of words or phrases. Clear definitions are essential 
            for avoiding ambiguity in arguments.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Types of Definitions:
          </h4>

          <div className="space-y-2 mb-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">1. Lexical Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Reports the commonly accepted meaning of a word (dictionary definition).
              </p>
              <div className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                <strong>Example:</strong> "Bachelor means an unmarried man."
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">2. Stipulative Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Assigns a new or specific meaning to a word for a particular purpose.
              </p>
              <div className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                <strong>Example:</strong> "For this study, 'child' means anyone under 18."
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-1">3. Precising Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Reduces vagueness by making a term more precise.
              </p>
              <div className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                <strong>Example:</strong> "'Tall' for basketball players means over 6'6\"."
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-1">4. Theoretical Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Provides a scientific or technical meaning based on theory.
              </p>
              <div className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                <strong>Example:</strong> "Force equals mass times acceleration (F=ma)."
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-red-900 dark:text-red-100 mb-1">5. Persuasive Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Defines a term in a way that influences attitudes (often biased).
              </p>
              <div className="bg-white dark:bg-gray-700 p-2 rounded text-sm">
                <strong>Example:</strong> "Freedom means doing whatever you want without consequences."
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Methods of Definition:
          </h4>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Genus and Difference</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Place term in a category (genus) and specify what makes it unique (difference).
              </p>
              <div className="mt-1 text-sm italic text-gray-600 dark:text-gray-400">
                "A square is a rectangle (genus) with four equal sides (difference)."
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Ostensive Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Define by pointing to examples.
              </p>
              <div className="mt-1 text-sm italic text-gray-600 dark:text-gray-400">
                "Red is this color" (pointing to red object).
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Operational Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Define by describing how to measure or test for it.
              </p>
              <div className="mt-1 text-sm italic text-gray-600 dark:text-gray-400">
                "Intelligence is what IQ tests measure."
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Synonymous Definition</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Define using a synonym.
              </p>
              <div className="mt-1 text-sm italic text-gray-600 dark:text-gray-400">
                "Happy means joyful."
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'For this experiment, we define stress as a score above 70 on the stress inventory.' What type of definition is this?"
              options={[
                "Lexical",
                "Stipulative",
                "Persuasive",
                "Theoretical"
              ]}
              correctAnswer={1}
              explanation="This is a stipulative definition - it assigns a specific meaning to 'stress' for the purpose of this particular experiment."
            />

            <ExerciseQuestion
              question="'A triangle is a polygon with three sides.' What method of definition is this?"
              options={[
                "Ostensive",
                "Operational",
                "Genus and Difference",
                "Synonymous"
              ]}
              correctAnswer={2}
              explanation="This uses genus and difference - 'polygon' is the genus (broader category) and 'three sides' is the difference (what makes it unique)."
            />

            <ExerciseQuestion
              question="Which type of definition should be AVOIDED in logical arguments?"
              options={[
                "Lexical",
                "Precising",
                "Persuasive",
                "Theoretical"
              ]}
              correctAnswer={2}
              explanation="Persuasive definitions should be avoided in logical arguments because they are biased and designed to influence attitudes rather than clarify meaning objectively."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
