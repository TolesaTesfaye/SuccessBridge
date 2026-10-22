import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../../Freshman/components/ExerciseQuestion';

interface Unit1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Unit1: React.FC<Unit1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Unit 1 • Essential English Skills
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          HOBBIES AND CRAFTS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-purple-600 to-pink-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Discover how to express yourself in English while talking about what you love! Learn to speak, read, write, and listen about hobbies.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* Why This Matters Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600 p-3 md:p-6 rounded-r-lg">
          <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-lg md:text-2xl">🎯</span>
            Why Hobbies Matter in English Learning
          </h3>
          <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p>
              <strong>Real Talk:</strong> When you meet someone new, "What are your hobbies?" is one of the first questions people ask! 
              This unit helps you make friends, write job applications, and connect with people worldwide.
            </p>
            <p className="text-xs md:text-sm text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
              💡 <strong>Did you know?</strong> People who have hobbies are 30% happier and live longer lives!
            </p>
          </div>
        </div>

        {/* SUBTOPIC 1.1: Listening Skills */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            1.1. Listening Skills - My Favourite Free-Time Activity
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Vocabulary Box */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">📚</span>
                Key Vocabulary First!
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Free time:</strong> Time when you're not working or studying</li>
                <li><strong>Hobby:</strong> An activity you do for fun regularly</li>
                <li><strong>Pastime:</strong> Something you do to pass time enjoyably</li>
                <li><strong>Craft:</strong> Making things with your hands</li>
              </ul>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🌍</span>
                Real-World Example: Meeting New Friends
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Imagine you're at a university orientation:</p>
                <div className="space-y-2">
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">Sarah:</strong> "Hi! I'm Sarah. What do you like doing in your free time?"
                  </p>
                  <p>
                    <strong className="text-green-600 dark:text-green-400">Ahmed:</strong> "Hey Sarah! I love playing basketball and reading sci-fi books. How about you?"
                  </p>
                  <p>
                    <strong className="text-blue-600 dark:text-blue-400">Sarah:</strong> "That's cool! I'm into painting and watching movies."
                  </p>
                </div>
                <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs md:text-sm">
                  <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">💡 Notice how they:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Used simple present tense (I love, I'm into)</li>
                    <li>Named specific activities</li>
                    <li>Showed interest by asking back</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Listening Strategy */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🎧</span>
                Listening Strategy: Predict Before You Listen
              </h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                <strong>Pro Tip:</strong> Before listening to someone talk about hobbies, think: "What hobbies might they mention?" 
                This primes your brain to catch key words!
              </p>
              <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                <p className="font-bold text-xs md:text-sm text-slate-900 dark:text-white mb-2">Common hobby words you might hear:</p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {['sports', 'music', 'reading', 'cooking', 'gaming', 'drawing', 'dancing', 'traveling', 'photography', 'crafts'].map(word => (
                    <span key={word} className="px-2 md:px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-[10px] md:text-sm font-medium">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Listen to the audio (imagine): 'My name is Kalkidan. In my free time, I enjoy reading novels and playing volleyball with my friends.' What are Kalkidan's hobbies?"
              options={[
                'Reading and swimming',
                'Reading novels and playing volleyball',
                'Playing football and reading',
                'Cooking and playing volleyball'
              ]}
              correctAnswer={1}
              explanation="Kalkidan specifically says she enjoys 'reading novels' and 'playing volleyball with my friends'. Always listen for the exact activities mentioned!"
            />

            <ExerciseQuestion
              question="If someone says 'I'm passionate about photography', what does this mean?"
              options={[
                'They hate taking photos',
                'They love and care deeply about photography',
                'They only take selfies',
                'Photography is their job'
              ]}
              correctAnswer={1}
              explanation="'Passionate about' means you love something deeply and care about it a lot. It shows strong enthusiasm for an activity!"
            />
          </div>
        </section>

        {/* SUBTOPIC 1.2: Grammar */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            1.2. Grammar - Present Simple for Hobbies
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Grammar Explanation */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">📖</span>
                Why Present Simple?
              </h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3">
                When talking about hobbies and habits, we use <strong className="text-green-600 dark:text-green-400">Present Simple Tense</strong> because 
                hobbies are things you do <strong>regularly</strong> or <strong>generally</strong>.
              </p>
              
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-green-500">
                  <p className="font-bold text-xs md:text-base text-green-600 dark:text-green-400">I/You/We/They + verb (base form)</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    → I <strong>play</strong> tennis every weekend.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-blue-500">
                  <p className="font-bold text-xs md:text-base text-blue-600 dark:text-blue-400">He/She/It + verb + s/es</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    → She <strong>likes</strong> painting.<br/>
                    → He <strong>watches</strong> movies. (watch + es)
                  </p>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                <p className="font-bold text-xs md:text-sm text-yellow-800 dark:text-yellow-300">
                  🤯 <strong>Mind-Blowing Grammar Fact!</strong>
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                  The "s" in "he plays" comes from Old English! 700 years ago, people said "he playeth" 
                  and over time it became just "plays". Language is always evolving!
                </p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="p-3 md:p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-red-900 dark:text-red-100 mb-2 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">❌</span>
                Common Mistakes to Avoid
              </h3>
              
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-red-600 dark:text-red-400 font-bold text-xs md:text-base">
                    ❌ Wrong: "I am play football."
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold text-xs md:text-base">
                    ✅ Correct: "I play football."
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Don't use "am/is/are" with action verbs in present simple!
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-red-600 dark:text-red-400 font-bold text-xs md:text-base">
                    ❌ Wrong: "She play basketball."
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold text-xs md:text-base">
                    ✅ Correct: "She plays basketball."
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Remember to add 's' for he/she/it!
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-red-600 dark:text-red-400 font-bold text-xs md:text-base">
                    ❌ Wrong: "He likes play video games."
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-bold text-xs md:text-base">
                    ✅ Correct: "He likes playing video games."
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    After 'like/love/enjoy', use verb+ing (gerund)!
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Choose the correct sentence:"
              options={[
                'She enjoy reading books.',
                'She enjoys reading books.',
                'She enjoying reading books.',
                'She is enjoy reading books.'
              ]}
              correctAnswer={1}
              explanation="'She enjoys' is correct because we add 's' to the verb for he/she/it in present simple, and 'reading' is the gerund form after 'enjoys'."
            />

            <ExerciseQuestion
              question="Fill in the blank: 'My brother _____ football every Saturday.'"
              options={[
                'play',
                'plays',
                'playing',
                'is play'
              ]}
              correctAnswer={1}
              explanation="'Plays' is correct. For 'he/she/it' (my brother = he), we add 's' to the verb in present simple tense."
            />

            <ExerciseQuestion
              question="Which sentence is correct?"
              options={[
                'I am like swimming.',
                'I likes swimming.',
                'I like swimming.',
                'I liking swimming.'
              ]}
              correctAnswer={2}
              explanation="'I like swimming' is correct. Use the base form of the verb (like) with I/you/we/they, and add 'ing' to the verb after 'like'."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.3: Reading Comprehension */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            1.3. Reading Comprehension
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Reading Strategy */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">📚</span>
                Reading Strategy: Scan for Key Information
              </h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2">
                When reading about someone's hobbies, <strong>scan</strong> (look quickly) for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <li><strong className="text-blue-600 dark:text-blue-400">What</strong> hobbies they have</li>
                <li><strong className="text-blue-600 dark:text-blue-400">When</strong> they do them</li>
                <li><strong className="text-blue-600 dark:text-blue-400">Why</strong> they enjoy them</li>
                <li><strong className="text-blue-600 dark:text-blue-400">How often</strong> they do them</li>
              </ul>
            </div>

            {/* Sample Reading Passage */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-4">
                📖 Reading Passage: "My Favorite Hobbies"
              </h3>
              <div className="prose prose-sm md:prose-base dark:prose-invert text-xs md:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 md:space-y-3">
                <p>
                  My name is Meron, and I'm a university student in Addis Ababa. I have two main hobbies that 
                  I'm really passionate about: cooking traditional Ethiopian food and playing the masinko.
                </p>
                <p>
                  I started cooking when I was twelve years old. My grandmother taught me how to make injera 
                  and different wots. Now, every Sunday, I cook for my family. I love experimenting with new 
                  spices and creating my own recipes. Cooking helps me relax after a stressful week of studying.
                </p>
                <p>
                  My second hobby is playing the masinko, a traditional Ethiopian instrument. I practice for 
                  about 30 minutes every evening. Music helps me express my feelings and connect with my culture. 
                  Sometimes, I perform at cultural events at my university.
                </p>
                <p>
                  These hobbies make me happy and help me balance my academic life. I believe everyone should 
                  have hobbies that bring them joy!
                </p>
              </div>
            </div>

            {/* Comprehension Questions */}
            <ExerciseQuestion
              question="What are Meron's two main hobbies?"
              options={[
                'Cooking and dancing',
                'Cooking traditional Ethiopian food and playing the masinko',
                'Playing masinko and studying',
                'Making injera and singing'
              ]}
              correctAnswer={1}
              explanation="The passage clearly states: 'I have two main hobbies that I'm really passionate about: cooking traditional Ethiopian food and playing the masinko.'"
            />

            <ExerciseQuestion
              question="How often does Meron cook for her family?"
              options={[
                'Every day',
                'Every weekend',
                'Every Sunday',
                'Once a month'
              ]}
              correctAnswer={2}
              explanation="Meron says 'every Sunday, I cook for my family.' This shows the specific day she cooks."
            />

            <ExerciseQuestion
              question="Why does Meron have hobbies?"
              options={[
                'To make money',
                'To impress her friends',
                'To help her relax, express feelings, and balance academic life',
                'Because her parents force her'
              ]}
              correctAnswer={2}
              explanation="The passage mentions several reasons: 'Cooking helps me relax,' 'Music helps me express my feelings,' and 'These hobbies help me balance my academic life.'"
            />

            <ExerciseQuestion
              question="When did Meron start learning to cook?"
              options={[
                'When she was 10 years old',
                'When she was 12 years old',
                'When she started university',
                'Last year'
              ]}
              correctAnswer={1}
              explanation="The text says 'I started cooking when I was twelve years old.' Always look for specific ages or times mentioned in the passage."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.4: Speaking */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            1.4. Speaking - What I Like Doing in My Free Time
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Useful Expressions */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-l-4 border-orange-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">💬</span>
                Useful Expressions for Talking About Hobbies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-orange-600 dark:text-orange-400 mb-1">Starting the Conversation:</p>
                  <ul className="space-y-0.5 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    <li>• "What do you like doing in your free time?"</li>
                    <li>• "Do you have any hobbies?"</li>
                    <li>• "What are your interests?"</li>
                  </ul>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-orange-600 dark:text-orange-400 mb-1">Showing Strong Interest:</p>
                  <ul className="space-y-0.5 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    <li>• "I'm really into..."</li>
                    <li>• "I'm passionate about..."</li>
                    <li>• "I absolutely love..."</li>
                  </ul>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-orange-600 dark:text-orange-400 mb-1">Showing Moderate Interest:</p>
                  <ul className="space-y-0.5 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    <li>• "I like..."</li>
                    <li>• "I enjoy..."</li>
                    <li>• "I'm interested in..."</li>
                  </ul>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-orange-600 dark:text-orange-400 mb-1">Talking About Frequency:</p>
                  <ul className="space-y-0.5 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    <li>• "I... every day/week"</li>
                    <li>• "I usually... on weekends"</li>
                    <li>• "Whenever I have time, I..."</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sample Conversation */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-l-4 border-pink-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🎭</span>
                Sample Conversation
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p><strong className="text-blue-600 dark:text-blue-400">Abebe:</strong> "Hey Selam! What do you like doing in your free time?"</p>
                <p><strong className="text-green-600 dark:text-green-400">Selam:</strong> "Hi Abebe! I'm really into photography. I love capturing beautiful moments!"</p>
                <p><strong className="text-blue-600 dark:text-blue-400">Abebe:</strong> "That sounds amazing! How often do you take photos?"</p>
                <p><strong className="text-green-600 dark:text-green-400">Selam:</strong> "I usually go out with my camera every weekend. Sometimes I photograph landscapes, sometimes people. What about you? Do you have any hobbies?"</p>
                <p><strong className="text-blue-600 dark:text-blue-400">Abebe:</strong> "I'm passionate about playing football. I play with my friends three times a week. It keeps me fit and helps me relax."</p>
                <p><strong className="text-green-600 dark:text-green-400">Selam:</strong> "That's great! Maybe I can photograph your football matches someday!"</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Which expression shows the STRONGEST interest in a hobby?"
              options={[
                'I sometimes do it.',
                'I like it.',
                'I\'m passionate about it.',
                'It\'s okay.'
              ]}
              correctAnswer={2}
              explanation="'I'm passionate about it' shows the strongest interest. 'Passionate' means you love something deeply and care about it very much!"
            />

            <ExerciseQuestion
              question="If you play tennis every Saturday and Sunday, what should you say?"
              options={[
                'I play tennis sometimes.',
                'I play tennis on weekends.',
                'I play tennis every day.',
                'I played tennis yesterday.'
              ]}
              correctAnswer={1}
              explanation="'On weekends' is perfect because Saturday and Sunday are the weekend. It's more natural than saying 'every Saturday and Sunday'."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.5: Writing */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            1.5. Writing - Descriptive Writing and Keeping a Diary
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Writing Strategy */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-l-4 border-pink-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-pink-900 dark:text-pink-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">✍️</span>
                How to Describe Your Hobbies
              </h3>
              
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Use the 5W+1H Formula:</p>
                <div className="space-y-1">
                  <p><strong className="text-pink-600 dark:text-pink-400">What:</strong> Name the hobby (e.g., "I enjoy reading")</p>
                  <p><strong className="text-pink-600 dark:text-pink-400">When:</strong> Say when you do it (e.g., "every evening")</p>
                  <p><strong className="text-pink-600 dark:text-pink-400">Where:</strong> Mention the place (e.g., "in my room")</p>
                  <p><strong className="text-pink-600 dark:text-pink-400">Why:</strong> Explain why you like it (e.g., "because it relaxes me")</p>
                  <p><strong className="text-pink-600 dark:text-pink-400">Who:</strong> Say if you do it alone or with others</p>
                  <p><strong className="text-pink-600 dark:text-pink-400">How:</strong> Describe how you do it (e.g., "I read for 30 minutes")</p>
                </div>
              </div>
            </div>

            {/* Sample Diary Entry */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-2 border-pink-200 dark:border-pink-800 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-pink-700 dark:text-pink-300 mb-2 md:mb-3">
                📝 Sample Diary Entry
              </h3>
              <div className="text-xs md:text-base text-slate-700 dark:text-slate-300 space-y-2 italic">
                <p className="font-bold not-italic">Saturday, October 21, 2026</p>
                <p>Dear Diary,</p>
                <p>
                  Today was an amazing day! I spent the whole afternoon doing my favorite hobby – painting. 
                  I set up my easel in the garden and painted the beautiful sunset. The colors were incredible: 
                  orange, pink, and purple blending together in the sky.
                </p>
                <p>
                  I love painting because it helps me express my emotions without using words. When I paint, 
                  I forget about all my worries and just focus on the colors and shapes. Today, I felt so 
                  peaceful and happy.
                </p>
                <p>
                  My little sister came and watched me paint. She said my painting looked like a photograph! 
                  That made me smile. Maybe one day I'll teach her how to paint too.
                </p>
                <p>
                  Tomorrow, I plan to paint again. I want to capture the morning light this time.
                </p>
                <p className="not-italic">
                  Until next time,<br/>
                  Hanna
                </p>
              </div>
            </div>

            {/* Writing Tips */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">💡</span>
                Pro Writing Tips
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <li><strong>1.</strong> Use descriptive adjectives: Instead of "good," say "amazing, wonderful, fantastic"</li>
                <li><strong>2.</strong> Show, don't just tell: Instead of "I was happy," say "I couldn't stop smiling"</li>
                <li><strong>3.</strong> Include feelings: Explain how the hobby makes you feel</li>
                <li><strong>4.</strong> Be specific: "I read for 2 hours" is better than "I read a lot"</li>
                <li><strong>5.</strong> Use varied sentence starters: Don't start every sentence with "I"</li>
              </ul>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Which sentence is more descriptive?"
              options={[
                'The painting was nice.',
                'The painting burst with vibrant colors that captured the warmth of the sunset.',
                'The painting was good.',
                'I liked the painting.'
              ]}
              correctAnswer={1}
              explanation="Option 2 is much more descriptive! It uses vivid words like 'burst,' 'vibrant,' and describes what makes the painting special."
            />

            <ExerciseQuestion
              question="In a diary entry about hobbies, what should you NOT forget to include?"
              options={[
                'The date',
                'Your phone number',
                'Your address',
                'Your exam scores'
              ]}
              correctAnswer={0}
              explanation="Always start a diary entry with the date! It helps you remember when things happened. Phone numbers and addresses are not needed in diary entries."
            />

            <ExerciseQuestion
              question="Which is the best way to end a diary entry?"
              options={[
                'THE END',
                'Goodbye',
                'Until next time, [Your name]',
                'See you later'
              ]}
              correctAnswer={2}
              explanation="'Until next time' or similar phrases like 'Talk tomorrow' are perfect diary closings. They suggest you'll write again and feel personal."
            />
          </div>
        </section>

        {/* Unit Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 p-4 md:p-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-3xl">🎯</span>
            Unit 1 Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-purple-600 dark:text-purple-400 mb-2">✅ What You Learned:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• How to talk about hobbies in English</li>
                <li>• Present Simple tense for habits</li>
                <li>• Reading about others' hobbies</li>
                <li>• Speaking with confidence about interests</li>
                <li>• Writing descriptive diary entries</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-pink-600 dark:text-pink-400 mb-2">🌟 Key Grammar:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• I/You/We/They + verb</li>
                <li>• He/She/It + verb + s/es</li>
                <li>• Like/Love/Enjoy + verb-ing</li>
                <li>• Frequency adverbs (always, usually, often)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivational Closing */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800 text-white p-4 md:p-8 rounded-lg text-center">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
            🌟 Keep Learning, Keep Growing! 🌟
          </h3>
          <p className="text-xs md:text-lg">
            Talking about hobbies is one of the best ways to make friends and practice English. 
            Now go out there and share what you love doing! 🎨🎵⚽📚
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unit1;
