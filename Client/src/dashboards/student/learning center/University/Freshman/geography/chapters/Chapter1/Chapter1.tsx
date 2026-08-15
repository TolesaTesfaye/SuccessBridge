import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const match = selectedSubtopic.match(/(\d+\.\d+)/);
      const subtopicId = match ? match[1] : selectedSubtopic.split('.').slice(0, 2).join('.').trim();
      const element = document.getElementById(`subtopic-${subtopicId}`) || document.getElementById(`subtopic-${selectedSubtopic}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Geography Chapter 1 • Foundation Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INTRODUCTION TO GEOGRAPHY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-teal-600 to-cyan-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Embark on a journey to understand our planet Earth! Discover the fascinating science of Geography—its definition, branches, importance, tools, and techniques that help us comprehend the complex relationships between people, places, and environments.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        
        {/* SUBTOPIC 1.1: Definition and Scope of Geography */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            1.1. Definition and Scope of Geography
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Geography</strong> is the scientific study of Earth's surface, its physical features, climate, inhabitants, and the complex interactions between humans and their environment. The word comes from Greek: <em>geo</em> (Earth) + <em>graphia</em> (description).
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-teal-300 dark:border-teal-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 mb-2">
                📌 What is Geography?
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Geography is the study of <strong>places</strong> and the <strong>relationships between people and their environments</strong>. Geographers explore both the physical properties of Earth's surface and the human societies spread across it.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded">
                  <strong>Greek Origin:</strong>
                  <p className="text-teal-800 dark:text-teal-300 mt-1">Geo (γῆ) = Earth</p>
                  <p className="text-teal-800 dark:text-teal-300">Graphia (γραφία) = Description/Writing</p>
                </div>
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded">
                  <strong>Modern Definition:</strong>
                  <p className="text-cyan-800 dark:text-cyan-300 mt-1">The science of place and space</p>
                  <p className="text-cyan-800 dark:text-cyan-300">Study of Earth's surface features</p>
                </div>
              </div>
            </div>

            {/* Five Themes of Geography */}
            <div className="p-6 border-2 border-cyan-200 dark:border-cyan-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🌍</span> The Five Themes of Geography
              </h4>
              
              <div className="space-y-3">
                {[
                  {
                    icon: '📍',
                    theme: 'Location',
                    desc: 'Where is it? Absolute position (coordinates) and relative position (in relation to other places)',
                    example: 'Addis Ababa is at 9°N, 38.7°E and is the capital of Ethiopia',
                    color: 'blue'
                  },
                  {
                    icon: '🏔️',
                    theme: 'Place',
                    desc: 'What is it like? Physical and human characteristics that make a location unique',
                    example: 'The Rift Valley has volcanic mountains and diverse cultures',
                    color: 'green'
                  },
                  {
                    icon: '🔗',
                    theme: 'Human-Environment Interaction',
                    desc: 'How do people relate to the physical world? Adaptation, modification, and dependence',
                    example: 'Terracing hillsides for agriculture to prevent soil erosion',
                    color: 'purple'
                  },
                  {
                    icon: '🚶',
                    theme: 'Movement',
                    desc: 'How do people, goods, and ideas move? Migration, trade, and communication',
                    example: 'Rural to urban migration for better job opportunities',
                    color: 'orange'
                  },
                  {
                    icon: '🗺️',
                    theme: 'Region',
                    desc: 'How are areas similar or different? Areas with common characteristics',
                    example: 'The Sahel region shares similar climate and vegetation patterns',
                    color: 'teal'
                  }
                ].map((item, i) => (
                  <div key={i} className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl border border-${item.color}-200 dark:border-${item.color}-800`}>
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h5 className={`font-bold text-${item.color}-900 dark:text-${item.color}-300 text-sm md:text-base`}>{item.theme}</h5>
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">{item.desc}</p>
                    <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs italic text-slate-600 dark:text-slate-400">
                      <strong>Example:</strong> {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope of Geography */}
            <div className="p-6 border border-teal-200 dark:border-teal-900 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
              <h4 className="font-bold text-teal-900 dark:text-teal-300 text-base mb-4">🔭 The Broad Scope of Geography</h4>
              <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-teal-700 dark:text-teal-300">Physical Environment</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Landforms and relief</li>
                    <li>• Climate and weather</li>
                    <li>• Water bodies</li>
                    <li>• Soil and vegetation</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-cyan-700 dark:text-cyan-300">Human Environment</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Population distribution</li>
                    <li>• Settlement patterns</li>
                    <li>• Economic activities</li>
                    <li>• Cultural landscapes</li>
                  </ul>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-blue-700 dark:text-blue-300">Interactions</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Resource management</li>
                    <li>• Environmental change</li>
                    <li>• Sustainable development</li>
                    <li>• Spatial relationships</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.1 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Definition of Geography</h4>
                <ExerciseQuestion 
                  question="Which of the following best describes the scope of geography?"
                  options={[
                    'The study of only physical features of Earth',
                    'The study of only human populations and cultures',
                    'The study of Earth\'s surface, physical features, and the relationships between people and their environments',
                    'The study of only weather and climate patterns'
                  ]}
                  correctAnswer={2}
                  explanation="Geography is a comprehensive science that studies both physical features of Earth AND human activities, as well as the complex relationships and interactions between people and their environments. It's not limited to just one aspect but encompasses the entire Earth system and human-environment dynamics."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.2: Branches of Geography */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            1.2. Branches of Geography
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Geography is divided into two main branches: <strong>Physical Geography</strong> and <strong>Human Geography</strong>. Each branch has numerous sub-disciplines that focus on specific aspects of Earth and human activities.
            </p>

            {/* Main Branches Visual */}
            <div className="p-6 border-2 border-teal-200 dark:border-teal-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 text-center">🌍 Two Main Branches of Geography</h4>
              <div className="flex justify-center mb-6">
                <svg className="w-full max-w-2xl h-48" viewBox="0 0 400 180">
                  {/* Main Circle */}
                  <circle cx="200" cy="90" r="70" fill="#14b8a6" fillOpacity="0.2" stroke="#0d9488" strokeWidth="3" />
                  <text x="200" y="85" fontSize="16" fontWeight="bold" fill="#0f766e" textAnchor="middle">GEOGRAPHY</text>
                  <text x="200" y="105" fontSize="12" fill="#0f766e" textAnchor="middle">The Study of Earth</text>
                  
                  {/* Physical Geography Branch */}
                  <circle cx="100" cy="90" r="50" fill="#3b82f6" fillOpacity="0.3" stroke="#2563eb" strokeWidth="2" />
                  <text x="100" y="85" fontSize="14" fontWeight="bold" fill="#1e40af" textAnchor="middle">Physical</text>
                  <text x="100" y="102" fontSize="12" fill="#1e40af" textAnchor="middle">Geography</text>
                  
                  {/* Human Geography Branch */}
                  <circle cx="300" cy="90" r="50" fill="#f59e0b" fillOpacity="0.3" stroke="#d97706" strokeWidth="2" />
                  <text x="300" y="85" fontSize="14" fontWeight="bold" fill="#b45309" textAnchor="middle">Human</text>
                  <text x="300" y="102" fontSize="12" fill="#b45309" textAnchor="middle">Geography</text>
                  
                  {/* Connection Lines */}
                  <line x1="150" y1="90" x2="130" y2="90" stroke="#0d9488" strokeWidth="2" />
                  <line x1="250" y1="90" x2="270" y2="90" stroke="#0d9488" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Physical Geography */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏔️</span>
                <div>
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">Physical Geography</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Study of natural features and processes of Earth</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Geomorphology', desc: 'Study of landforms and their evolution', icon: '⛰️' },
                  { name: 'Climatology', desc: 'Study of climate patterns and processes', icon: '🌦️' },
                  { name: 'Hydrology', desc: 'Study of water bodies and water cycle', icon: '💧' },
                  { name: 'Biogeography', desc: 'Study of distribution of plants and animals', icon: '🌿' },
                  { name: 'Pedology', desc: 'Study of soil formation and classification', icon: '🌱' },
                  { name: 'Oceanography', desc: 'Study of oceans and marine systems', icon: '🌊' }
                ].map((sub, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{sub.icon}</span>
                      <strong className="text-sm text-blue-900 dark:text-blue-300">{sub.name}</strong>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Geography */}
            <div className="p-6 border-2 border-orange-300 dark:border-orange-800 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👥</span>
                <div>
                  <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400">Human Geography</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Study of human activities and their spatial patterns</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Population Geography', desc: 'Study of population distribution and dynamics', icon: '👨‍👩‍👧‍👦' },
                  { name: 'Economic Geography', desc: 'Study of economic activities and resources', icon: '💼' },
                  { name: 'Urban Geography', desc: 'Study of cities and urbanization', icon: '🏙️' },
                  { name: 'Cultural Geography', desc: 'Study of cultural practices and landscapes', icon: '🎭' },
                  { name: 'Political Geography', desc: 'Study of political boundaries and territories', icon: '🗺️' },
                  { name: 'Agricultural Geography', desc: 'Study of farming and food production', icon: '🌾' }
                ].map((sub, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{sub.icon}</span>
                      <strong className="text-sm text-orange-900 dark:text-orange-300">{sub.name}</strong>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Exercise for 1.2 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Branches of Geography</h4>
                <ExerciseQuestion 
                  question="Which branch of geography would study the distribution of different crops in a region?"
                  options={[
                    'Geomorphology',
                    'Climatology',
                    'Agricultural Geography',
                    'Biogeography'
                  ]}
                  correctAnswer={2}
                  explanation="Agricultural Geography (a sub-branch of Human Geography) studies farming systems, crop distribution, and food production patterns. Geomorphology studies landforms, Climatology studies climate patterns, and Biogeography studies the distribution of plants and animals in their natural state (not cultivated crops)."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.3: Importance of Geography */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            1.3. Importance of Geography
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Geography is essential for understanding our world and addressing global challenges. It provides critical insights for decision-making, resource management, and sustainable development.
            </p>

            {/* Importance Areas Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-300 dark:border-green-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-300 text-base">Environmental Management</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Understanding climate change and its impacts</li>
                  <li>• Managing natural resources sustainably</li>
                  <li>• Protecting biodiversity and ecosystems</li>
                  <li>• Preventing and mitigating natural disasters</li>
                  <li>• Planning conservation strategies</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🏗️</span>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base">Urban Planning & Development</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Designing sustainable cities</li>
                  <li>• Planning transportation networks</li>
                  <li>• Managing urban growth</li>
                  <li>• Improving quality of life</li>
                  <li>• Addressing housing and infrastructure needs</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-300 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">💼</span>
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base">Economic Development</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Identifying suitable locations for industries</li>
                  <li>• Planning trade routes and commerce</li>
                  <li>• Managing agricultural production</li>
                  <li>• Understanding market accessibility</li>
                  <li>• Promoting tourism development</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-300 dark:border-orange-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🌍</span>
                  <div>
                    <h4 className="font-bold text-orange-900 dark:text-orange-300 text-base">Global Understanding</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Understanding cultural diversity</li>
                  <li>• Analyzing migration patterns</li>
                  <li>• Addressing global inequalities</li>
                  <li>• Promoting international cooperation</li>
                  <li>• Understanding geopolitical issues</li>
                </ul>
              </div>
            </div>

            {/* Why Study Geography */}
            <div className="p-6 border-2 border-teal-300 dark:border-teal-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-teal-700 dark:text-teal-400 text-lg mb-4 text-center">🎓 Why Study Geography?</h4>
              <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🧭</div>
                  <strong className="text-slate-900 dark:text-white block mb-2">Spatial Thinking</strong>
                  <p className="text-slate-600 dark:text-slate-400">Develop skills to analyze patterns and relationships in space</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🔍</div>
                  <strong className="text-slate-900 dark:text-white block mb-2">Problem Solving</strong>
                  <p className="text-slate-600 dark:text-slate-400">Learn to address complex environmental and social challenges</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🌐</div>
                  <strong className="text-slate-900 dark:text-white block mb-2">Global Awareness</strong>
                  <p className="text-slate-600 dark:text-slate-400">Understand interconnections between places and cultures</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.3 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Importance of Geography</h4>
                <ExerciseQuestion 
                  question="A city planner needs to decide where to build a new industrial park. Which aspect of geography would be MOST useful?"
                  options={[
                    'Understanding cultural traditions of the area',
                    'Analyzing land suitability, transportation access, and environmental impact',
                    'Studying ancient historical events',
                    'Learning about weather patterns only'
                  ]}
                  correctAnswer={1}
                  explanation="For urban and industrial planning, geographers analyze multiple factors including land suitability, accessibility to transportation networks, proximity to resources and markets, and potential environmental impacts. This comprehensive spatial analysis is crucial for making informed development decisions."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.4: Geographic Tools and Techniques */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            1.4. Geographic Tools and Techniques
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Modern geography uses various tools and technologies to collect, analyze, and visualize spatial data. These tools help geographers understand Earth's patterns and processes more effectively.
            </p>

            {/* Maps - Primary Tool */}
            <div className="p-6 border-2 border-teal-300 dark:border-teal-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">🗺️</span> Maps - The Primary Geographic Tool
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                A <strong>map</strong> is a symbolic representation of Earth's surface or a portion of it, drawn to scale on a flat surface. Maps are essential for understanding spatial relationships and patterns.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                  <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-2">Types of Maps</h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Physical maps</li>
                    <li>• Political maps</li>
                    <li>• Topographic maps</li>
                    <li>• Thematic maps</li>
                    <li>• Climate maps</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
                  <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2">Map Elements</h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Title</li>
                    <li>• Scale</li>
                    <li>• Legend/Key</li>
                    <li>• Direction (North arrow)</li>
                    <li>• Grid/Coordinates</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Map Projections</h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Mercator projection</li>
                    <li>• Peters projection</li>
                    <li>• Robinson projection</li>
                    <li>• Conic projection</li>
                    <li>• Azimuthal projection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modern Geographic Tools */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛰️</span>
                  <div>
                    <h3 className="text-base font-bold text-blue-700 dark:text-blue-400">GIS (Geographic Information System)</h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                  A computer-based system for capturing, storing, analyzing, and displaying spatial data.
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-xs text-blue-900 dark:text-blue-300">Applications:</strong>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 mt-2">
                    <li>• Urban planning and management</li>
                    <li>• Environmental monitoring</li>
                    <li>• Disaster management</li>
                    <li>• Resource mapping</li>
                    <li>• Navigation systems</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-2 border-purple-300 dark:border-purple-800 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📡</span>
                  <div>
                    <h3 className="text-base font-bold text-purple-700 dark:text-purple-400">GPS (Global Positioning System)</h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                  A satellite-based navigation system that provides location and time information anywhere on Earth.
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-xs text-purple-900 dark:text-purple-300">Uses:</strong>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 mt-2">
                    <li>• Accurate location determination</li>
                    <li>• Navigation and routing</li>
                    <li>• Field data collection</li>
                    <li>• Surveying and mapping</li>
                    <li>• Tracking and monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛰️</span>
                  <div>
                    <h3 className="text-base font-bold text-green-700 dark:text-green-400">Remote Sensing</h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Obtaining information about Earth's surface from satellites or aircraft without physical contact.
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-xs text-green-900 dark:text-green-300">Applications:</strong>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 mt-2">
                    <li>• Land use/cover mapping</li>
                    <li>• Weather forecasting</li>
                    <li>• Agricultural monitoring</li>
                    <li>• Forest management</li>
                    <li>• Ocean and atmosphere studies</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-2 border-orange-300 dark:border-orange-800 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h3 className="text-base font-bold text-orange-700 dark:text-orange-400">Statistical Tools</h3>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Methods for analyzing geographic data and identifying patterns and trends.
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-xs text-orange-900 dark:text-orange-300">Techniques:</strong>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 mt-2">
                    <li>• Spatial analysis</li>
                    <li>• Population statistics</li>
                    <li>• Climate data analysis</li>
                    <li>• Economic indicators</li>
                    <li>• Demographic studies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.4 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Geographic Tools</h4>
                <ExerciseQuestion 
                  question="A farmer wants to monitor crop health across large fields. Which geographic tool would be MOST useful?"
                  options={[
                    'Traditional paper maps',
                    'Compass and measuring tape',
                    'Remote sensing via satellite imagery',
                    'Written field notes only'
                  ]}
                  correctAnswer={2}
                  explanation="Remote sensing via satellite imagery is the most effective tool for monitoring crop health across large areas. Satellites can capture multispectral images that show vegetation health, moisture levels, and pest damage across entire fields quickly and efficiently, which would be time-consuming and impractical with traditional methods."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.5: Map Reading and Interpretation */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            1.5. Map Reading and Interpretation
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Map reading is a fundamental skill in geography. Understanding how to read and interpret maps allows us to navigate, analyze spatial patterns, and make informed decisions about locations and environments.
            </p>

            {/* Map Scale */}
            <div className="p-6 border-2 border-teal-300 dark:border-teal-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">📏</span> Understanding Map Scale
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                <strong>Scale</strong> shows the relationship between distance on a map and actual distance on Earth's surface. It tells you how much the real world has been reduced to fit on the map.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                  <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-2">Statement Scale</h4>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 font-mono text-xs mb-2">
                    1 cm = 10 km
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Expressed in words: 1 unit on map equals X units in reality</p>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
                  <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2">Representative Fraction</h4>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 font-mono text-xs mb-2">
                    1:100,000
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Ratio format: 1 unit on map = 100,000 same units on ground</p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Graphic/Linear Scale</h4>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 mb-2 flex items-center justify-center">
                    <svg width="120" height="30" viewBox="0 0 120 30">
                      <rect x="0" y="10" width="30" height="10" fill="#000" />
                      <rect x="30" y="10" width="30" height="10" fill="#fff" stroke="#000" />
                      <rect x="60" y="10" width="30" height="10" fill="#000" />
                      <rect x="90" y="10" width="30" height="10" fill="#fff" stroke="#000" />
                      <text x="15" y="28" fontSize="8" textAnchor="middle">0</text>
                      <text x="45" y="28" fontSize="8" textAnchor="middle">5km</text>
                      <text x="75" y="28" fontSize="8" textAnchor="middle">10km</text>
                    </svg>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Visual bar showing distance</p>
                </div>
              </div>
            </div>

            {/* Map Symbols and Legend */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🔣</span> Map Symbols and Legend
              </h4>
              
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                Symbols represent real-world features on maps. The <strong>legend</strong> (or key) explains what each symbol means.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Point Symbols</h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⭐</span>
                      <span>Capital city</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">●</span>
                      <span>City or town</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">✈️</span>
                      <span>Airport</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⛰️</span>
                      <span>Mountain peak</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <h5 className="font-bold text-green-900 dark:text-green-300 mb-3">Line Symbols</h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3">
                      <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#000" strokeWidth="2"/></svg>
                      <span>Road/Highway</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#00f" strokeWidth="2"/></svg>
                      <span>River/Stream</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#000" strokeWidth="1" strokeDasharray="2,2"/></svg>
                      <span>Boundary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="30" height="2"><line x1="0" y1="1" x2="30" y2="1" stroke="#666" strokeWidth="2"/></svg>
                      <span>Railroad</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-3">Area Symbols</h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-400"></div>
                      <span>Forest/Vegetation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-300"></div>
                      <span>Water body</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-300"></div>
                      <span>Urban area</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-200"></div>
                      <span>Agricultural land</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                  <h5 className="font-bold text-orange-900 dark:text-orange-300 mb-3">Direction</h5>
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="28" fill="none" stroke="#ea580c" strokeWidth="2"/>
                      <polygon points="30,10 35,28 30,25 25,28" fill="#ea580c"/>
                      <text x="30" y="15" fontSize="10" fontWeight="bold" fill="#ea580c" textAnchor="middle">N</text>
                      <text x="30" y="52" fontSize="8" fill="#666" textAnchor="middle">S</text>
                      <text x="48" y="33" fontSize="8" fill="#666" textAnchor="middle">E</text>
                      <text x="12" y="33" fontSize="8" fill="#666" textAnchor="middle">W</text>
                    </svg>
                    <p className="text-xs text-center mt-2">North Arrow/Compass Rose</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Latitude and Longitude */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-base mb-4 flex items-center gap-2">
                <span>🌐</span> Geographic Coordinates: Latitude and Longitude
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">↔️</span>
                    <h5 className="font-bold text-cyan-900 dark:text-cyan-300">Latitude (Parallels)</h5>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                    <li>• Horizontal lines running east-west</li>
                    <li>• Measured in degrees (0° to 90°)</li>
                    <li>• 0° = Equator</li>
                    <li>• North or South of Equator</li>
                    <li>• Example: 9°N (Addis Ababa)</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">↕️</span>
                    <h5 className="font-bold text-blue-900 dark:text-blue-300">Longitude (Meridians)</h5>
                  </div>
                  <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                    <li>• Vertical lines running north-south</li>
                    <li>• Measured in degrees (0° to 180°)</li>
                    <li>• 0° = Prime Meridian (Greenwich)</li>
                    <li>• East or West of Prime Meridian</li>
                    <li>• Example: 38.7°E (Addis Ababa)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-teal-100 dark:bg-teal-900/40 rounded-lg p-4">
                <p className="text-sm text-teal-900 dark:text-teal-300">
                  <strong>Complete Location:</strong> Addis Ababa, Ethiopia is located at <span className="font-mono">9°2'N, 38°45'E</span>
                </p>
              </div>
            </div>

            {/* Map Reading Tips */}
            <div className="p-6 border border-green-200 dark:border-green-900 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h4 className="font-bold text-green-900 dark:text-green-300 text-base mb-4">💡 Tips for Effective Map Reading</h4>
              <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">1.</span>
                  <span className="text-slate-700 dark:text-slate-300">Always check the <strong>title</strong> to know what area the map shows</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">2.</span>
                  <span className="text-slate-700 dark:text-slate-300">Study the <strong>legend</strong> to understand symbols</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">3.</span>
                  <span className="text-slate-700 dark:text-slate-300">Use the <strong>scale</strong> to calculate real distances</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">4.</span>
                  <span className="text-slate-700 dark:text-slate-300">Orient yourself using the <strong>north arrow</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">5.</span>
                  <span className="text-slate-700 dark:text-slate-300">Use <strong>coordinates</strong> for precise locations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">6.</span>
                  <span className="text-slate-700 dark:text-slate-300">Note the <strong>date</strong> of the map for relevance</span>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.5 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Map Reading</h4>
                <ExerciseQuestion 
                  question="On a map with a scale of 1:50,000, if two cities are 4 cm apart on the map, what is the actual distance between them?"
                  options={[
                    '2 kilometers',
                    '20 kilometers',
                    '200 kilometers',
                    '2,000 kilometers'
                  ]}
                  correctAnswer={0}
                  explanation="With a scale of 1:50,000, 1 cm on the map represents 50,000 cm (or 0.5 km) in reality. Therefore, 4 cm on the map = 4 × 0.5 km = 2 kilometers. To solve: 4 cm × 50,000 = 200,000 cm = 2,000 m = 2 km."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-end pt-8">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium"
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
