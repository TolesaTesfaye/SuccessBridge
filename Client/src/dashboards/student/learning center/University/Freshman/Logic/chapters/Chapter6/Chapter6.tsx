import React from 'react';

export const Chapter6: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER SIX
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
          CATEGORICAL PROPOSITIONS
        </h2>
      </div>

      {/* Lesson 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 1: General Introduction
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            1.1 Standard-Forms of Categorical Proposition
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            A <strong>categorical proposition</strong> is a statement that relates two classes or categories. 
            It asserts or denies that members of one category are included in another category.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Four Standard Forms:</h5>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-white dark:bg-gray-700 rounded">
                <strong>A: Universal Affirmative</strong> - "All S are P"<br/>
                <span className="text-sm">Example: All dogs are mammals.</span>
              </div>
              <div className="p-2 bg-white dark:bg-gray-700 rounded">
                <strong>E: Universal Negative</strong> - "No S are P"<br/>
                <span className="text-sm">Example: No cats are reptiles.</span>
              </div>
              <div className="p-2 bg-white dark:bg-gray-700 rounded">
                <strong>I: Particular Affirmative</strong> - "Some S are P"<br/>
                <span className="text-sm">Example: Some students are athletes.</span>
              </div>
              <div className="p-2 bg-white dark:bg-gray-700 rounded">
                <strong>O: Particular Negative</strong> - "Some S are not P"<br/>
                <span className="text-sm">Example: Some birds are not flightless.</span>
              </div>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            1.2 The Components of Categorical Propositions
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Every categorical proposition has four components:
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Quantifier</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Indicates how many members: "All," "No," or "Some"
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Subject Term (S)</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                The class about which something is asserted
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Copula</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Links subject and predicate: "are" or "are not"
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">Predicate Term (P)</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                The class that the subject is related to
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 2: Attributes of Categorical Propositions: Quality, Quantity, and Distribution
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Categorical propositions have three important attributes:
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Quality</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Whether the proposition affirms or denies class membership.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                <strong>Affirmative:</strong> A and I propositions (assert inclusion)<br/>
                <strong>Negative:</strong> E and O propositions (assert exclusion)
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Quantity</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Whether the proposition refers to all or some members of the subject class.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                <strong>Universal:</strong> A and E propositions (refer to all members)<br/>
                <strong>Particular:</strong> I and O propositions (refer to some members)
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Distribution</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                A term is distributed if the proposition makes a claim about every member of the class denoted by that term.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm space-y-1">
                <div><strong>A (All S are P):</strong> S is distributed, P is not</div>
                <div><strong>E (No S are P):</strong> Both S and P are distributed</div>
                <div><strong>I (Some S are P):</strong> Neither S nor P is distributed</div>
                <div><strong>O (Some S are not P):</strong> S is not distributed, P is distributed</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-3">
            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Distribution Rule:</h5>
            <p className="text-gray-700 dark:text-gray-300">
              Universal propositions distribute their subject terms. Negative propositions distribute their predicate terms.
            </p>
          </div>
        </div>
      </div>

      {/* Lesson 3 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 3: Venn Diagrams and the Modern Square of Opposition
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            3.1 Representing Categorical Propositions in Diagrams
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Venn diagrams</strong> use overlapping circles to represent the relationships between classes.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Venn Diagram Conventions:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Shading:</strong> Indicates an area is empty (no members)</li>
              <li><strong>X:</strong> Indicates at least one member exists in that area</li>
              <li><strong>Two circles:</strong> One for subject (S), one for predicate (P)</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">A: All S are P</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Shade the area of S that is outside P (S that is not P is empty)
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">E: No S are P</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Shade the overlapping area (no S are P)
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">I: Some S are P</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Place an X in the overlapping area (at least one S is P)
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg">
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">O: Some S are not P</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Place an X in the area of S outside P (at least one S is not P)
              </p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            3.2 Squares of Opposition: Traditional and Modern Squares of Opposition
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            The <strong>Square of Opposition</strong> shows logical relationships between the four standard forms.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <h5 className="font-semibold text-green-900 dark:text-green-100 mb-1">Relationships in Modern Square:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Contradictories:</strong> A and O, E and I (cannot both be true or both be false)</li>
              <li><strong>Contraries:</strong> A and E (cannot both be true, but can both be false)</li>
              <li><strong>Subcontraries:</strong> I and O (cannot both be false, but can both be true)</li>
              <li><strong>Subalternation:</strong> A implies I, E implies O (if universal is true, particular is true)</li>
            </ul>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-3">
            3.3 The Traditional Square of Opposition
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            The traditional square assumes existential import for all propositions, while the modern square 
            only assumes it for particular propositions (I and O).
          </p>
        </div>
      </div>

      {/* Lesson 4 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson 4: Evaluating Immediate Inferences: Using Venn Diagrams and Square of Oppositions
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            4.1 Logical Operations: Conversion, Obversion, and Contraposition
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Immediate inferences</strong> are conclusions drawn from a single premise. Three main operations:
          </p>

          <div className="space-y-2">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Conversion</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Switch the subject and predicate terms.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm space-y-1">
                <div><strong>Valid:</strong> E and I propositions</div>
                <div>E: "No S are P" → "No P are S" ✓</div>
                <div>I: "Some S are P" → "Some P are S" ✓</div>
                <div><strong>Invalid:</strong> A and O propositions (without limitation)</div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Obversion</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Change the quality (affirmative ↔ negative) and replace the predicate with its complement.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm space-y-1">
                <div><strong>Valid for all four forms:</strong></div>
                <div>A: "All S are P" → "No S are non-P" ✓</div>
                <div>E: "No S are P" → "All S are non-P" ✓</div>
                <div>I: "Some S are P" → "Some S are not non-P" ✓</div>
                <div>O: "Some S are not P" → "Some S are non-P" ✓</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-bold text-gray-900 dark:text-white">Contraposition</h5>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                Switch subject and predicate, then replace both with their complements.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded text-sm space-y-1">
                <div><strong>Valid:</strong> A and O propositions</div>
                <div>A: "All S are P" → "All non-P are non-S" ✓</div>
                <div>O: "Some S are not P" → "Some non-P are not non-S" ✓</div>
                <div><strong>Invalid:</strong> E and I propositions</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-3">
            <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Testing Validity:</h5>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Use Venn diagrams to test immediate inferences:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Draw the premise on a Venn diagram</li>
              <li>Draw the conclusion on a separate diagram</li>
              <li>If the premise diagram contains all information in the conclusion diagram, the inference is valid</li>
            </ol>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg mt-3">
            <h5 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">Key Points:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Obversion is always valid for all four forms</li>
              <li>Conversion is valid only for E and I</li>
              <li>Contraposition is valid only for A and O</li>
              <li>Use the Square of Opposition to determine relationships between propositions</li>
              <li>Venn diagrams provide visual verification of logical relationships</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
