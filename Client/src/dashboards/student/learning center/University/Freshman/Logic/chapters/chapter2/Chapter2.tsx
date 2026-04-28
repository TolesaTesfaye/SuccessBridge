import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

export const Chapter2: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER TWO
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          BASIC CONCEPTS OF LOGIC
        </h2>
      </div>

      {/* Lesson 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 1: Basic Concepts of Logic: Arguments, Premises and Conclusions
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            An <strong>argument</strong> is a set of statements where some statements (premises) are intended to support another statement (conclusion).
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Components of an Argument:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Premises:</strong> Statements that provide reasons or evidence</li>
              <li><strong>Conclusion:</strong> The statement being supported by the premises</li>
              <li><strong>Inference:</strong> The reasoning process from premises to conclusion</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-2">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">Example Argument:</h4>
            <div className="text-gray-700 dark:text-gray-300">
              <p className="mb-1"><strong>Premise 1:</strong> All humans are mortal.</p>
              <p className="mb-1"><strong>Premise 2:</strong> Socrates is a human.</p>
              <p><strong>Conclusion:</strong> Therefore, Socrates is mortal.</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Indicator Words:</strong> Certain words help identify premises and conclusions:
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Premise Indicators</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                since, because, for, given that, as indicated by, for the reason that
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Conclusion Indicators</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                therefore, thus, hence, so, consequently, it follows that, we may conclude
              </p>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="In an argument, what is the conclusion?"
              options={[
                "The evidence provided",
                "The statement being supported",
                "The reasoning process",
                "The indicator words"
              ]}
              correctAnswer={1}
              explanation="The conclusion is the statement being supported by the premises. It's what the argument is trying to prove or establish."
            />

            <ExerciseQuestion
              question="Which word is a PREMISE indicator?"
              options={[
                "Therefore",
                "Hence",
                "Because",
                "Consequently"
              ]}
              correctAnswer={2}
              explanation="'Because' is a premise indicator - it introduces reasons or evidence. 'Therefore,' 'hence,' and 'consequently' are conclusion indicators."
            />
          </div>
        </div>
      </div>

      {/* Lesson 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 2: Techniques of Recognizing Arguments
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            2.1 Recognizing Argumentative Passages
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Not all passages contain arguments. To identify an argument, look for:
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Signs of an Argument:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Indicator words (therefore, because, since, etc.)</li>
              <li>One statement supported by other statements</li>
              <li>An attempt to persuade or prove something</li>
              <li>Reasoning from evidence to a conclusion</li>
            </ul>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            2.2 Recognizing Non-argumentative Passages
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Some passages are NOT arguments:
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Reports/Descriptions</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Simply state facts without trying to prove anything.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "The meeting started at 9 AM and ended at noon."
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Explanations</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Explain WHY something happened (already accepted as true).
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "The plant died because it didn't get enough water."
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Illustrations</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Provide examples to clarify a concept.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "Mammals include animals like dogs, cats, and whales."
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Conditional Statements</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                Express "if-then" relationships without arguing.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-sm">
                <strong>Example:</strong> "If it rains, the game will be cancelled."
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'The sky is blue because of the way sunlight scatters in the atmosphere.' Is this an argument or explanation?"
              options={[
                "Argument",
                "Explanation",
                "Report",
                "Illustration"
              ]}
              correctAnswer={1}
              explanation="This is an explanation - it explains WHY the sky is blue (an accepted fact), rather than trying to prove that the sky is blue."
            />

            <ExerciseQuestion
              question="Which passage contains an argument?"
              options={[
                "The concert starts at 8 PM.",
                "If you study hard, you will pass.",
                "All students passed, so the test must have been easy.",
                "Fruits include apples, oranges, and bananas."
              ]}
              correctAnswer={2}
              explanation="Option C is an argument - it uses evidence (all students passed) to support a conclusion (the test was easy). The others are a report, conditional statement, and illustration."
            />
          </div>
        </div>
      </div>

      {/* Lesson 3 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 3: Types of Arguments: Deduction and Induction
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            3.1 Deductive Arguments
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            In a <strong>deductive argument</strong>, the conclusion is claimed to follow necessarily from the premises. 
            If the premises are true, the conclusion MUST be true.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Example of Deductive Argument:</h5>
            <div className="text-gray-700 dark:text-gray-300">
              <p>All mammals are warm-blooded.</p>
              <p>All whales are mammals.</p>
              <p><strong>Therefore, all whales are warm-blooded.</strong></p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            3.2 Inductive Arguments
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            In an <strong>inductive argument</strong>, the conclusion is claimed to follow probably from the premises. 
            The premises provide strong support but don't guarantee the conclusion.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-green-900 dark:text-green-100 mb-1">Example of Inductive Argument:</h5>
            <div className="text-gray-700 dark:text-gray-300">
              <p>The sun has risen every day for billions of years.</p>
              <p><strong>Therefore, the sun will probably rise tomorrow.</strong></p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            3.3 Differentiating Deductive and Inductive Arguments
          </h4>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="border border-blue-500 p-3 rounded-lg">
              <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Deductive</h5>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Conclusion follows necessarily</li>
                <li>General to specific</li>
                <li>Certainty claimed</li>
                <li>Mathematics, logic</li>
              </ul>
            </div>

            <div className="border border-green-500 p-3 rounded-lg">
              <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Inductive</h5>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Conclusion follows probably</li>
                <li>Specific to general</li>
                <li>Probability claimed</li>
                <li>Science, everyday reasoning</li>
              </ul>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="'All birds have feathers. A robin is a bird. Therefore, a robin has feathers.' What type of argument is this?"
              options={[
                "Inductive",
                "Deductive",
                "Neither",
                "Both"
              ]}
              correctAnswer={1}
              explanation="This is deductive - the conclusion follows necessarily from the premises. If the premises are true, the conclusion MUST be true."
            />

            <ExerciseQuestion
              question="'I've seen 100 swans and they were all white. Therefore, all swans are probably white.' What type of argument is this?"
              options={[
                "Deductive",
                "Inductive",
                "Neither",
                "Explanation"
              ]}
              correctAnswer={1}
              explanation="This is inductive - it generalizes from specific observations to a probable conclusion. The conclusion doesn't follow with certainty (in fact, black swans exist!)."
            />
          </div>
        </div>
      </div>

      {/* Lesson 4 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 4: Evaluating Arguments
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            4.1 Evaluating Deductive Arguments: Validity, Truth, and Soundness
          </h4>
          
          <div className="space-y-2 mb-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Validity</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                An argument is <strong>valid</strong> if the conclusion follows necessarily from the premises. 
                If the premises were true, the conclusion would have to be true.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Truth</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>Truth</strong> refers to whether the premises and conclusion actually correspond to reality.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Soundness</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                An argument is <strong>sound</strong> if it is BOTH valid AND has all true premises. 
                A sound argument guarantees a true conclusion.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-3">
            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Example:</h5>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              <p className="mb-1"><strong>Valid but Unsound:</strong></p>
              <p className="mb-1">All fish can fly. (FALSE premise)</p>
              <p className="mb-1">Salmon are fish.</p>
              <p className="mb-2">Therefore, salmon can fly. (Valid structure, but unsound because premise is false)</p>
              
              <p className="mb-1"><strong>Valid and Sound:</strong></p>
              <p className="mb-1">All fish can swim. (TRUE premise)</p>
              <p className="mb-1">Salmon are fish.</p>
              <p>Therefore, salmon can swim. (Valid AND sound)</p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            4.2 Evaluating Inductive Arguments: Strength, Truth, and Cogency
          </h4>

          <div className="space-y-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Strength</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                An inductive argument is <strong>strong</strong> if the premises, if true, make the conclusion probably true.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h5 className="font-bold text-green-900 dark:text-green-100 mb-1">Cogency</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                An inductive argument is <strong>cogent</strong> if it is BOTH strong AND has all true premises.
              </p>
            </div>
          </div>

          {/* Exercises */}
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">Practice Questions</h4>
            
            <ExerciseQuestion
              question="A deductive argument with true premises and a true conclusion that follows necessarily is called:"
              options={[
                "Valid",
                "Strong",
                "Sound",
                "Cogent"
              ]}
              correctAnswer={2}
              explanation="A sound argument is one that is both valid (conclusion follows necessarily) AND has all true premises. This guarantees a true conclusion."
            />

            <ExerciseQuestion
              question="Can a deductive argument be valid but have a false conclusion?"
              options={[
                "No, valid arguments always have true conclusions",
                "Yes, if at least one premise is false",
                "Only in inductive arguments",
                "Validity doesn't relate to conclusions"
              ]}
              correctAnswer={1}
              explanation="Yes! A valid argument can have a false conclusion if one or more premises are false. Validity is about the logical structure, not the truth of the statements."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
