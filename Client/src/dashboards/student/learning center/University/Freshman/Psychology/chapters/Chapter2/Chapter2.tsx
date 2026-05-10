import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 2
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          HUMAN DEVELOPMENT
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-cyan-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Explore the fascinating journey of human development from conception to death. Understand the principles, theories, and stages that shape who we become.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        {/* SUBTOPIC 2.1: Basics of Human Development */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.1. Basics of Human Development
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-blue-600 dark:text-blue-400">Human Development</strong> is the <strong>scientific study of the patterns of growth, change, and stability</strong> that occur throughout the entire human lifespan. 
              It examines how and why people change—or remain the same—over time.
            </p>

            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-600">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">What is Development?</h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
                Development refers to the <strong>pattern of movement or change</strong> that begins at conception and continues through the human life span. 
                It involves growth, but also decline (as in late adulthood).
              </p>
              <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-blue-600 dark:text-blue-400">Growth</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Increase in size, abilities, complexity</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-blue-600 dark:text-blue-400">Change</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Transformation in structure or function</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Key Characteristics of Development</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 border-l-4 border-emerald-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">1. Development is Lifelong</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Development doesn't stop at adulthood. It is a <strong>continuous process</strong> from conception to death. 
                  No single age period dominates development—each stage is equally important.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-emerald-900 dark:text-emerald-300">Examples:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mt-1">
                    <li>Infants learn to walk and talk</li>
                    <li>Adolescents develop abstract thinking</li>
                    <li>Adults continue learning new skills</li>
                    <li>Elderly people adapt to physical changes</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">2. Development is Multidimensional</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Development consists of <strong>multiple dimensions</strong> that interact with each other. 
                  These dimensions include biological, cognitive, and socioemotional processes.
                </p>
                <div className="grid md:grid-cols-3 gap-2 md:gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300">Biological</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Physical growth, brain development, health</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300">Cognitive</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Thinking, memory, language, intelligence</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300">Socioemotional</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Emotions, relationships, personality</p>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-amber-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">3. Development is Multidirectional</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Development involves both <strong>growth and decline</strong>. Some dimensions may be expanding while others are shrinking. 
                  It's not a simple linear progression.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-amber-900 dark:text-amber-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    As adults age, they may experience decline in physical strength and reaction time, 
                    but gain in wisdom, emotional regulation, and expertise in their field.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-rose-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">4. Development is Plastic</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  <strong>Plasticity</strong> refers to the capacity for change and flexibility. 
                  Development is modifiable—our traits and behaviors can be shaped by experiences throughout life.
                </p>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-rose-900 dark:text-rose-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Brain plasticity allows stroke victims to recover functions by training other brain areas to take over. 
                    Adults can learn new languages, though it's easier in childhood.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-cyan-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">5. Development is Contextual</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Development occurs within <strong>multiple contexts</strong> that influence each other. 
                  These include historical, cultural, social, and individual contexts.
                </p>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-cyan-900 dark:text-cyan-300">Contexts Include:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside mt-1">
                    <li>Family environment and parenting style</li>
                    <li>Cultural values and traditions</li>
                    <li>Socioeconomic status</li>
                    <li>Historical events (wars, pandemics, technology)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Check Exercise */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="A 70-year-old retired teacher learns to use social media to stay connected with grandchildren. This demonstrates which characteristic of development?"
                options={[
                  'Development is Multidimensional',
                  'Development is Lifelong',
                  'Development is Multidirectional',
                  'Development is Contextual'
                ]}
                correctAnswer={1}
                explanation="This is LIFELONG development. The example shows that learning and development continue throughout the entire lifespan, even in old age. The retired teacher is acquiring new skills (using social media) at age 70, demonstrating that development doesn't stop at adulthood. While it could also show plasticity (capacity to change), the key point is that development continues across the lifespan."
              />
            </div>
          </div>


          {/* Major Debates in Development */}
          <div className="mt-6 md:mt-10">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">Major Debates in Developmental Psychology</h3>
            
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="p-3 md:p-6 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="text-xs md:text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 md:mb-4">Nature vs. Nurture</h4>
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="font-bold text-[10px] md:text-sm text-slate-900 dark:text-white">Nature (Biology)</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      Genetic inheritance, biological maturation, innate abilities
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="font-bold text-[10px] md:text-sm text-slate-900 dark:text-white">Nurture (Environment)</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      Learning, experiences, culture, parenting, education
                    </p>
                  </div>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 italic">
                    <strong>Modern View:</strong> Both nature and nurture interact continuously. 
                    Genes provide potential, environment determines how that potential is realized.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-2 border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="text-xs md:text-xl font-bold text-purple-600 dark:text-purple-400 mb-2 md:mb-4">Continuity vs. Discontinuity</h4>
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="font-bold text-[10px] md:text-sm text-slate-900 dark:text-white">Continuity</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      Development is gradual, cumulative, like a ramp—smooth and continuous changes
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <p className="font-bold text-[10px] md:text-sm text-slate-900 dark:text-white">Discontinuity</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      Development occurs in distinct stages, like stairs—sudden, qualitative changes
                    </p>
                  </div>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 italic">
                    <strong>Modern View:</strong> Some aspects show continuity (height growth), 
                    others show stages (cognitive development).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise for Subtopic 2.1 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-blue-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Basics of Development</h3>
            <ExerciseQuestion 
              question="A child's ability to learn language is influenced by both their genetic capacity for language (inherited from parents) and the language environment they grow up in (family, culture). This example best illustrates:"
              options={[
                'The Nature side of the Nature vs. Nurture debate',
                'The Nurture side of the Nature vs. Nurture debate',
                'The interaction between Nature and Nurture',
                'The Continuity vs. Discontinuity debate'
              ]}
              correctAnswer={2}
              explanation="This is the INTERACTION between Nature and Nurture. The example shows how both genetic factors (capacity for language) and environmental factors (language environment) work together to influence development. Modern developmental psychology recognizes that nature and nurture don't work in isolation—they constantly interact. A child may have the genetic potential for language, but without exposure to language in their environment, they won't develop it fully."
            />
          </div>
        </section>


        {/* SUBTOPIC 2.2: Domains of Development */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.2. Three Domains of Development
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Human development occurs across <strong>three interconnected domains</strong>. While we study them separately, 
            they constantly influence each other throughout the lifespan.
          </p>

          <div className="grid md:grid-cols-3 gap-3 md:gap-6">
            <div className="p-4 md:p-6 border-l-4 border-rose-600">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">💪</div>
              <h3 className="text-sm md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 uppercase">Physical Development</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                Changes in body size, proportions, appearance, functioning of body systems, perceptual and motor capacities, and physical health.
              </p>
              
              <div className="space-y-2 md:space-y-3">
                <div className="bg-rose-50 dark:bg-rose-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-rose-900 dark:text-rose-300 mb-1">Includes:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li>Growth in height and weight</li>
                    <li>Brain and nervous system development</li>
                    <li>Motor skills (crawling, walking, writing)</li>
                    <li>Sensory abilities (vision, hearing)</li>
                    <li>Puberty and sexual maturation</li>
                    <li>Physical health and aging</li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Examples Across Lifespan:</p>
                  <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li><strong>Infancy:</strong> Learning to sit, crawl, walk</li>
                    <li><strong>Childhood:</strong> Developing fine motor skills</li>
                    <li><strong>Adolescence:</strong> Puberty, growth spurts</li>
                    <li><strong>Adulthood:</strong> Peak physical performance</li>
                    <li><strong>Late Adulthood:</strong> Decline in strength, vision</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-l-4 border-blue-600">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">🧠</div>
              <h3 className="text-sm md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 uppercase">Cognitive Development</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                Changes in intellectual abilities, including attention, memory, academic and everyday knowledge, problem-solving, imagination, creativity, and language.
              </p>
              
              <div className="space-y-2 md:space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Includes:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li>Perception and attention</li>
                    <li>Memory and learning</li>
                    <li>Language acquisition and use</li>
                    <li>Problem-solving and reasoning</li>
                    <li>Intelligence and creativity</li>
                    <li>Academic skills (reading, math)</li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Examples Across Lifespan:</p>
                  <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li><strong>Infancy:</strong> Object permanence, first words</li>
                    <li><strong>Childhood:</strong> Logical thinking, reading</li>
                    <li><strong>Adolescence:</strong> Abstract reasoning</li>
                    <li><strong>Adulthood:</strong> Expertise, wisdom</li>
                    <li><strong>Late Adulthood:</strong> Memory changes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-l-4 border-amber-600">
              <div className="text-2xl md:text-4xl mb-2 md:mb-4">🤝</div>
              <h3 className="text-sm md:text-2xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 uppercase">Psychosocial Development</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                Changes in emotional communication, self-understanding, knowledge about other people, interpersonal skills, friendships, intimate relationships, and moral reasoning and behavior.
              </p>
              
              <div className="space-y-2 md:space-y-3">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">Includes:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li>Emotional expression and regulation</li>
                    <li>Self-concept and identity</li>
                    <li>Relationships with family and peers</li>
                    <li>Social skills and communication</li>
                    <li>Moral development and values</li>
                    <li>Personality traits</li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Examples Across Lifespan:</p>
                  <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                    <li><strong>Infancy:</strong> Attachment to caregivers</li>
                    <li><strong>Childhood:</strong> Friendships, empathy</li>
                    <li><strong>Adolescence:</strong> Identity formation</li>
                    <li><strong>Adulthood:</strong> Intimate relationships</li>
                    <li><strong>Late Adulthood:</strong> Life reflection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interconnection of Domains */}
          <div className="mt-6 md:mt-10 p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600">
            <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🔗 How the Domains Interconnect</h4>
            <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
              The three domains don't develop in isolation—they constantly influence each other:
            </p>
            <div className="space-y-2 md:space-y-3">
              <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                <p className="text-[10px] md:text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">Example 1: Learning to Walk</p>
                <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                  <strong>Physical:</strong> Leg muscles strengthen → 
                  <strong>Cognitive:</strong> Spatial awareness improves → 
                  <strong>Psychosocial:</strong> Independence increases, parent-child interaction changes
                </p>
              </div>
              <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                <p className="text-[10px] md:text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">Example 2: Puberty</p>
                <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                  <strong>Physical:</strong> Hormonal changes → 
                  <strong>Cognitive:</strong> Self-consciousness increases → 
                  <strong>Psychosocial:</strong> Peer relationships become more important
                </p>
              </div>
            </div>
          </div>

          {/* Mid-Section Exercise */}
          <div className="mt-4 md:mt-8 p-3 md:p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
            <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🎯 Apply Your Knowledge</h4>
            <ExerciseQuestion 
              question="A 4-year-old child learns to share toys with other children at preschool. Which domain of development does this primarily represent?"
              options={[
                'Physical Development',
                'Cognitive Development',
                'Psychosocial Development',
                'All three domains equally'
              ]}
              correctAnswer={2}
              explanation="This is PSYCHOSOCIAL DEVELOPMENT. Learning to share involves social skills, understanding others' feelings (empathy), and moral development (fairness). While cognitive development helps the child understand the concept of sharing, the primary focus here is on social interaction and emotional regulation—key aspects of psychosocial development."
            />
          </div>

          {/* Exercise for Subtopic 2.2 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-rose-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Domains of Development</h3>
            <ExerciseQuestion 
              question="A teenager experiences a growth spurt, which makes them feel awkward and self-conscious around peers. This example demonstrates:"
              options={[
                'Only Physical Development',
                'Only Psychosocial Development',
                'The interconnection between Physical and Psychosocial Development',
                'The interconnection between Cognitive and Physical Development'
              ]}
              correctAnswer={2}
              explanation="This demonstrates the INTERCONNECTION between Physical and Psychosocial Development. The physical change (growth spurt) directly influences the psychosocial domain (feelings of self-consciousness and peer relationships). This is a perfect example of how the domains don't develop in isolation—changes in one domain affect the others. The physical change triggers emotional and social responses."
            />
          </div>
        </section>


        {/* SUBTOPIC 2.3: Periods of Development */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.3. Periods of Human Development
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Developmental psychologists divide the lifespan into <strong>distinct periods</strong> to better understand the unique characteristics and challenges of each stage.
          </p>

          <div className="space-y-3 md:space-y-6">
            {[
              {
                period: 'Prenatal Period',
                age: 'Conception to Birth',
                icon: '🤰',
                color: 'pink',
                description: 'The most rapid period of development. A single-celled organism transforms into a complex human baby.',
                milestones: [
                  'Germinal stage (0-2 weeks): Cell division and implantation',
                  'Embryonic stage (2-8 weeks): Major organs form',
                  'Fetal stage (8 weeks-birth): Growth and refinement'
                ],
                keyDevelopments: 'Brain development begins, all major body systems form, responds to sounds'
              },
              {
                period: 'Infancy and Toddlerhood',
                age: 'Birth to 2 years',
                icon: '👶',
                color: 'blue',
                description: 'Dramatic physical, cognitive, and social changes. Infants become mobile, begin to communicate, and form attachments.',
                milestones: [
                  'Physical: Sitting, crawling, walking, grasping',
                  'Cognitive: Object permanence, first words',
                  'Psychosocial: Attachment to caregivers, stranger anxiety'
                ],
                keyDevelopments: 'Rapid brain growth, language begins, trust vs. mistrust (Erikson)'
              },
              {
                period: 'Early Childhood',
                age: '2 to 6 years',
                icon: '🧒',
                color: 'green',
                description: 'The "play years." Children become more self-sufficient, develop school readiness skills, and spend more time with peers.',
                milestones: [
                  'Physical: Running, climbing, drawing, toilet training',
                  'Cognitive: Symbolic thinking, language explosion',
                  'Psychosocial: Initiative, gender identity, play'
                ],
                keyDevelopments: 'Preoperational thinking (Piaget), initiative vs. guilt (Erikson)'
              },
              {
                period: 'Middle Childhood',
                age: '6 to 11 years',
                icon: '👧',
                color: 'purple',
                description: 'School becomes central. Children master fundamental skills in reading, writing, and math, and make strides in understanding the self and others.',
                milestones: [
                  'Physical: Steady growth, improved motor coordination',
                  'Cognitive: Logical thinking, reading, math skills',
                  'Psychosocial: Peer friendships, self-esteem'
                ],
                keyDevelopments: 'Concrete operational thinking (Piaget), industry vs. inferiority (Erikson)'
              },
              {
                period: 'Adolescence',
                age: '11 to 18 years',
                icon: '🧑',
                color: 'orange',
                description: 'Transition from childhood to adulthood. Puberty brings dramatic physical changes, and teens work on forming their identity.',
                milestones: [
                  'Physical: Puberty, growth spurt, sexual maturation',
                  'Cognitive: Abstract thinking, hypothetical reasoning',
                  'Psychosocial: Identity formation, peer influence'
                ],
                keyDevelopments: 'Formal operational thinking (Piaget), identity vs. role confusion (Erikson)'
              },
              {
                period: 'Early Adulthood',
                age: '18 to 40 years',
                icon: '👨',
                color: 'cyan',
                description: 'Peak of physical performance. Young adults establish careers, form intimate relationships, and may start families.',
                milestones: [
                  'Physical: Peak strength and endurance',
                  'Cognitive: Expertise in chosen fields',
                  'Psychosocial: Intimate relationships, career'
                ],
                keyDevelopments: 'Intimacy vs. isolation (Erikson), establishing independence'
              },
              {
                period: 'Middle Adulthood',
                age: '40 to 65 years',
                icon: '👴',
                color: 'amber',
                description: 'A time of expanding responsibilities and peak productivity. Adults contribute to society and guide the next generation.',
                milestones: [
                  'Physical: Gradual physical decline begins',
                  'Cognitive: Accumulated knowledge and wisdom',
                  'Psychosocial: Generativity, mentoring others'
                ],
                keyDevelopments: 'Generativity vs. stagnation (Erikson), midlife transitions'
              },
              {
                period: 'Late Adulthood',
                age: '65+ years',
                icon: '👵',
                color: 'rose',
                description: 'Retirement and reflection. Despite physical decline, many older adults remain active and find new sources of meaning.',
                milestones: [
                  'Physical: Decline in strength, sensory abilities',
                  'Cognitive: Some memory decline, wisdom increases',
                  'Psychosocial: Life review, coping with loss'
                ],
                keyDevelopments: 'Integrity vs. despair (Erikson), successful aging'
              }
            ].map((stage, i) => (
              <div key={i} className={`p-3 md:p-6 border-l-4 border-${stage.color}-600`}>
                <div className="flex items-start justify-between mb-2 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-3xl">{stage.icon}</span>
                    <div>
                      <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">{stage.period}</h3>
                      <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400">{stage.age}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4">{stage.description}</p>

                <div className="space-y-2 md:space-y-3">
                  <div className={`bg-${stage.color}-50 dark:bg-${stage.color}-900/20 p-2 md:p-3 rounded`}>
                    <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Major Milestones:</p>
                    <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                      {stage.milestones.map((milestone, idx) => (
                        <li key={idx}>{milestone}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Key Developments:</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">{stage.keyDevelopments}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Check Exercise */}
          <div className="mt-4 md:mt-8 p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
            <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🔄 Compare Periods</h4>
            <ExerciseQuestion 
              question="During which period does abstract thinking and hypothetical reasoning typically emerge?"
              options={[
                'Early Childhood (2-6 years)',
                'Middle Childhood (6-11 years)',
                'Adolescence (11-18 years)',
                'Early Adulthood (18-40 years)'
              ]}
              correctAnswer={2}
              explanation="ADOLESCENCE is when abstract thinking and hypothetical reasoning emerge. This corresponds to Piaget's formal operational stage, which typically begins around age 11-12. Adolescents can think about possibilities, consider hypothetical situations, and use deductive reasoning. Early and middle childhood are characterized by more concrete thinking—children can think logically about concrete objects and events, but struggle with abstract concepts."
            />
          </div>

          {/* Exercise for Subtopic 2.3 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-green-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Periods of Development</h3>
            <ExerciseQuestion 
              question="A 45-year-old woman mentors younger colleagues at work and volunteers to coach her daughter's soccer team. According to Erikson, she is successfully navigating which developmental challenge?"
              options={[
                'Identity vs. Role Confusion',
                'Intimacy vs. Isolation',
                'Generativity vs. Stagnation',
                'Integrity vs. Despair'
              ]}
              correctAnswer={2}
              explanation="This is GENERATIVITY VS. STAGNATION, the psychosocial crisis of middle adulthood (40-65 years). Generativity involves contributing to society and helping guide the next generation through parenting, teaching, mentoring, or community involvement. The woman is demonstrating generativity by mentoring colleagues and coaching youth. Stagnation would involve self-absorption and lack of contribution to others. Identity vs. Role Confusion occurs in adolescence, Intimacy vs. Isolation in early adulthood, and Integrity vs. Despair in late adulthood."
            />
          </div>
        </section>


        {/* SUBTOPIC 2.4: Major Theories of Development */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.4. Major Theories of Development
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Several influential theories help us understand how and why development occurs. Each theory offers a unique perspective on the developmental process.
          </p>

          <div className="space-y-4 md:space-y-8">
            {/* Piaget's Cognitive Development Theory */}
            <div className="p-4 md:p-8 border-l-4 border-blue-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">🧩</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-blue-600 dark:text-blue-400 uppercase">Jean Piaget</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Cognitive Development Theory</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-6">
                Piaget proposed that children actively construct knowledge as they manipulate and explore their world. 
                Development occurs through <strong>four universal stages</strong>, each with distinct ways of thinking.
              </p>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {[
                  {
                    stage: 'Sensorimotor',
                    age: '0-2 years',
                    description: 'Infants learn through sensory experiences and motor actions. Major achievement: Object permanence (understanding objects exist even when out of sight).',
                    example: 'A baby searches for a toy hidden under a blanket.'
                  },
                  {
                    stage: 'Preoperational',
                    age: '2-7 years',
                    description: 'Children use symbols (words, images) to represent objects. Thinking is egocentric and lacks logical operations. Struggle with conservation.',
                    example: 'A child believes a tall, thin glass has more water than a short, wide glass with the same amount.'
                  },
                  {
                    stage: 'Concrete Operational',
                    age: '7-11 years',
                    description: 'Children can think logically about concrete objects and events. Understand conservation, reversibility, and classification.',
                    example: 'A child understands that 5+3=8 and 8-3=5 (reversibility).'
                  },
                  {
                    stage: 'Formal Operational',
                    age: '11+ years',
                    description: 'Adolescents can think abstractly, reason hypothetically, and use deductive logic. Can consider possibilities and test hypotheses systematically.',
                    example: 'A teen can solve "If all A are B, and all B are C, then all A are C" problems.'
                  }
                ].map((stage, i) => (
                  <div key={i} className="p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="text-xs md:text-base font-bold text-slate-900 dark:text-white">{stage.stage}</h4>
                        <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-400">{stage.age}</p>
                      </div>
                    </div>
                    <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">{stage.description}</p>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded">
                      <p className="text-[9px] md:text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Example:</p>
                      <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">{stage.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Erikson's Psychosocial Development Theory */}
            <div className="p-4 md:p-8 border-l-4 border-purple-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">🎭</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-purple-600 dark:text-purple-400 uppercase">Erik Erikson</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Psychosocial Development Theory</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-6">
                Erikson proposed <strong>eight stages</strong> across the lifespan, each presenting a unique <strong>psychosocial crisis</strong> or challenge. 
                Successfully resolving each crisis leads to healthy development.
              </p>

              <div className="space-y-2 md:space-y-3">
                {[
                  { stage: 'Trust vs. Mistrust', age: 'Infancy (0-1)', virtue: 'Hope', description: 'Infants learn to trust caregivers to meet their needs.' },
                  { stage: 'Autonomy vs. Shame/Doubt', age: 'Toddlerhood (1-3)', virtue: 'Will', description: 'Toddlers develop independence and self-control.' },
                  { stage: 'Initiative vs. Guilt', age: 'Early Childhood (3-6)', virtue: 'Purpose', description: 'Children take initiative in activities and play.' },
                  { stage: 'Industry vs. Inferiority', age: 'Middle Childhood (6-12)', virtue: 'Competence', description: 'Children develop competence in academic and social skills.' },
                  { stage: 'Identity vs. Role Confusion', age: 'Adolescence (12-18)', virtue: 'Fidelity', description: 'Teens explore and form their identity.' },
                  { stage: 'Intimacy vs. Isolation', age: 'Early Adulthood (18-40)', virtue: 'Love', description: 'Young adults form intimate relationships.' },
                  { stage: 'Generativity vs. Stagnation', age: 'Middle Adulthood (40-65)', virtue: 'Care', description: 'Adults contribute to society and guide next generation.' },
                  { stage: 'Integrity vs. Despair', age: 'Late Adulthood (65+)', virtue: 'Wisdom', description: 'Older adults reflect on life with satisfaction or regret.' }
                ].map((crisis, i) => (
                  <div key={i} className="flex gap-2 md:gap-4 p-2 md:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0 rounded">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                        <h4 className="text-xs md:text-base font-bold text-slate-900 dark:text-white">{crisis.stage}</h4>
                        <span className="text-[9px] md:text-xs text-purple-600 dark:text-purple-400 font-semibold">{crisis.age}</span>
                      </div>
                      <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">{crisis.description}</p>
                      <p className="text-[9px] md:text-xs text-purple-700 dark:text-purple-300 italic">Virtue: {crisis.virtue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vygotsky's Sociocultural Theory */}
            <div className="p-4 md:p-8 border-l-4 border-emerald-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-emerald-600 dark:text-emerald-400 uppercase">Lev Vygotsky</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Sociocultural Theory</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-6">
                Vygotsky emphasized the role of <strong>social interaction and culture</strong> in cognitive development. 
                Children learn through collaboration with more knowledgeable others.
              </p>

              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="text-xs md:text-base font-bold text-emerald-900 dark:text-emerald-300 mb-2">Zone of Proximal Development (ZPD)</h4>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                    The gap between what a child can do alone and what they can do with help from a more skilled person.
                  </p>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded">
                    <p className="text-[9px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Example:</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      A child can't tie shoes alone, but can with parent's guidance. This is in their ZPD.
                    </p>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="text-xs md:text-base font-bold text-emerald-900 dark:text-emerald-300 mb-2">Scaffolding</h4>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Temporary support provided by a more knowledgeable person that is gradually removed as the child becomes more competent.
                  </p>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded">
                    <p className="text-[9px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Example:</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      A teacher provides hints and guidance, then gradually reduces help as student masters the skill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theory Comparison Exercise */}
          <div className="mt-4 md:mt-8 p-3 md:p-6 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600">
            <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🔍 Compare Theories</h4>
            <ExerciseQuestion 
              question="A teacher helps a student solve a math problem by asking guiding questions and providing hints, then gradually reduces help as the student improves. This teaching approach is based on:"
              options={[
                "Piaget's Cognitive Development Theory",
                "Erikson's Psychosocial Theory",
                "Vygotsky's Sociocultural Theory",
                "All of the above equally"
              ]}
              correctAnswer={2}
              explanation="This is VYGOTSKY'S SOCIOCULTURAL THEORY, specifically the concept of scaffolding. The teacher is providing temporary support within the student's Zone of Proximal Development (ZPD) and gradually removing that support as the student becomes more competent. This emphasizes the social nature of learning and the importance of guidance from more knowledgeable others. Piaget focused on individual construction of knowledge through exploration, and Erikson focused on psychosocial crises across the lifespan."
            />
          </div>

          {/* Exercise for Subtopic 2.4 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Theories of Development</h3>
            <ExerciseQuestion 
              question="A 3-year-old child pours water from a short, wide glass into a tall, thin glass and believes there is now more water. According to Piaget, this child is in which stage and lacks understanding of which concept?"
              options={[
                'Sensorimotor stage; lacks object permanence',
                'Preoperational stage; lacks conservation',
                'Concrete operational stage; lacks reversibility',
                'Formal operational stage; lacks abstract thinking'
              ]}
              correctAnswer={1}
              explanation="This is the PREOPERATIONAL STAGE and the child lacks CONSERVATION. Conservation is the understanding that quantity remains the same despite changes in appearance. Preoperational children (ages 2-7) are fooled by perceptual appearances—they think the tall glass has more water because it looks bigger. They haven't yet developed the logical operations needed to understand that the amount stays the same. Object permanence develops in the sensorimotor stage (0-2 years), and reversibility and abstract thinking come in later stages."
            />
          </div>
        </section>


        {/* Chapter Summary */}
        <section className="p-4 md:p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-600">
          <h2 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">📚 Chapter 2 Summary</h2>
          <div className="space-y-2 md:space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Definition:</strong> Human development is the scientific study of patterns of growth, change, and stability across the lifespan.</p>
            <p><strong>✓ Characteristics:</strong> Development is lifelong, multidimensional, multidirectional, plastic, and contextual.</p>
            <p><strong>✓ Three Domains:</strong> Physical (body changes), Cognitive (thinking and learning), and Psychosocial (emotions and relationships) development are interconnected.</p>
            <p><strong>✓ Eight Periods:</strong> From prenatal to late adulthood, each period has unique characteristics and challenges.</p>
            <p><strong>✓ Major Theories:</strong> Piaget (cognitive stages), Erikson (psychosocial crises), and Vygotsky (sociocultural learning) provide frameworks for understanding development.</p>
            <p><strong>✓ Key Debates:</strong> Nature vs. Nurture and Continuity vs. Discontinuity shape how we study development.</p>
            <p><strong>✓ Key Insight:</strong> Development is a complex, lifelong process influenced by biological, psychological, and social factors working together.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 md:pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            Next: Chapter 3
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter2;
