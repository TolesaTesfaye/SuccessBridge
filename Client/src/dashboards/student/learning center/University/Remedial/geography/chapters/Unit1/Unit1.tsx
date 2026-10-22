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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Unit 1 • Introduction
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INTRODUCTION TO GEOGRAPHY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-lime-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Discover the fascinating science of Geography! Learn how geographers study our world - from mountains and rivers to cities and cultures. 
          Geography helps us understand where things are, why they're there, and how they connect.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* Why Geography Matters Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 border-l-4 border-emerald-600 p-3 md:p-6 rounded-r-lg">
          <h3 className="text-sm md:text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-lg md:text-2xl">🌍</span>
            Why Geography Is Essential
          </h3>
          <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p>
              <strong>Real Talk:</strong> Geography isn't just about memorizing capitals and rivers! It's about understanding climate change, 
              planning smart cities, protecting natural resources, and connecting cultures across the world.
            </p>
            <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded">
              💡 <strong>Mind-Blowing Fact:</strong> Geographers helped plan the D-Day invasion in WWII by analyzing beach slopes and tides. 
              Today, they use satellites and AI to predict natural disasters and save lives!
            </p>
          </div>
        </div>

        {/* SUBTOPIC 1.1: The Science of Geography */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            1.1. The Science of Geography
          </h2>

          {/* Subsection 1.1.1: Definitions and Concepts */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.1. Definitions and Concepts
            </h3>
            
            {/* Key Concepts Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 border-l-4 border-emerald-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Geography:</strong> From Greek "geo" (Earth) + "graphia" (writing/description) = "Earth description"</li>
                <li><strong>Location:</strong> WHERE something is on Earth (absolute or relative position)</li>
                <li><strong>Place:</strong> Physical and human characteristics that make a location unique</li>
                <li><strong>Region:</strong> An area with common characteristics</li>
                <li><strong>Movement:</strong> How people, goods, and ideas travel between places</li>
                <li><strong>Human-Environment Interaction:</strong> How humans affect and are affected by their environment</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-emerald-600 dark:text-emerald-400">Geography</strong> is the scientific study of Earth's surface, 
              its physical features, climate, countries, peoples, industries, and resources. It answers fundamental questions: 
              <em>Where? Why there? So what?</em>
            </p>

            {/* Etymology Box */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">📖</span>
                The Word "Geography"
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Etymology (Word Origin):</p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p>• <strong className="text-blue-600">Geo</strong> = Earth (Greek: γῆ)</p>
                    <p>• <strong className="text-blue-600">Graphia</strong> = Writing/Description (Greek: γραφία)</p>
                    <p className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <strong>Geography = Writing/describing the Earth</strong>
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  💡 The ancient Greek scholar <strong>Eratosthenes</strong> (276-194 BC) was the first to use the term "geography" 
                  and even calculated Earth's circumference with amazing accuracy - 2,200 years ago!
                </p>
              </div>
            </div>

            {/* The 5 Themes of Geography */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                🌟 The 5 Themes of Geography
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">1. Location 📍</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    <strong>Absolute:</strong> Exact position (Addis Ababa: 9°N, 38°E)<br/>
                    <strong>Relative:</strong> Position in relation to other places ("Addis Ababa is north of Nairobi")
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">2. Place 🏔️</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    <strong>Physical:</strong> Mountains, rivers, climate, vegetation<br/>
                    <strong>Human:</strong> Language, religion, architecture, culture
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">3. Human-Environment Interaction 🤝</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    How people adapt to, modify, and depend on their environment<br/>
                    Example: Building dams for irrigation, planting trees to prevent erosion
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold text-orange-600 dark:text-orange-400">4. Movement ➡️</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    How people, goods, and ideas move from place to place<br/>
                    Example: Migration, trade, internet communication
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                  <p className="font-bold text-pink-600 dark:text-pink-400">5. Region 🗺️</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Areas with common characteristics<br/>
                    Example: The Sahel region (climate), Arab world (culture), European Union (political)
                  </p>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🏙️</span>
                Real-World Example: Studying Addis Ababa Through Geography
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Let's apply the 5 themes to Addis Ababa:</p>
                  <div className="space-y-2 text-xs md:text-sm">
                    <p><strong className="text-green-600">📍 Location:</strong> 9°N, 38°E (absolute); Capital of Ethiopia, in the highlands (relative)</p>
                    <p><strong className="text-green-600">🏔️ Place:</strong> High altitude (2,355m), cool climate, diverse architecture, multilingual city</p>
                    <p><strong className="text-green-600">🤝 Interaction:</strong> Built at high altitude for cooler climate, using local stone and eucalyptus</p>
                    <p><strong className="text-green-600">➡️ Movement:</strong> Hub for Ethiopian Airlines, hosting AU headquarters, trade center</p>
                    <p><strong className="text-green-600">🗺️ Region:</strong> Part of East Africa, Ethiopian Highlands, African Union's diplomatic capital</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="What does the word 'Geography' literally mean?"
              options={[
                'Study of rocks',
                'Earth description/writing',
                'Map making',
                'Study of people'
              ]}
              correctAnswer={1}
              explanation="Geography comes from Greek: 'geo' (Earth) + 'graphia' (writing/description). It literally means 'Earth description' or 'writing about the Earth'."
            />

            <ExerciseQuestion
              question="Which geographic theme asks 'WHERE is something located?'"
              options={[
                'Place',
                'Region',
                'Location',
                'Movement'
              ]}
              correctAnswer={2}
              explanation="Location is the geographic theme that answers 'WHERE' questions. It can be absolute (exact coordinates) or relative (in relation to other places)."
            />

            <ExerciseQuestion
              question="'Addis Ababa is 9°N, 38°E' is an example of:"
              options={[
                'Relative location',
                'Absolute location',
                'Place characteristics',
                'Regional description'
              ]}
              correctAnswer={1}
              explanation="This is absolute location because it gives exact coordinates (latitude and longitude). Relative location would be something like 'north of Nairobi' or 'in the Ethiopian Highlands'."
            />
          </div>

          {/* Subsection 1.1.2: Branches of Geography */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.2. Branches of Geography
            </h3>
            
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Geography is divided into two main branches: <strong className="text-emerald-600 dark:text-emerald-400">Physical Geography</strong> (natural features) 
              and <strong className="text-emerald-600 dark:text-emerald-400">Human Geography</strong> (people and cultures).
            </p>

            {/* Main Branches Diagram */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                🌲 The Two Main Branches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 text-sm md:text-base flex items-center gap-2">
                    <span className="text-xl">🌍</span> Physical Geography
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Focus:</strong> Natural features of Earth
                  </p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p><strong>Subdivisions:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-0.5">
                      <li>Geomorphology (landforms)</li>
                      <li>Climatology (climate & weather)</li>
                      <li>Hydrology (water systems)</li>
                      <li>Biogeography (plants & animals)</li>
                      <li>Soil Geography (pedology)</li>
                      <li>Oceanography (oceans & seas)</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm md:text-base flex items-center gap-2">
                    <span className="text-xl">👥</span> Human Geography
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Focus:</strong> Human activities & societies
                  </p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p><strong>Subdivisions:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-0.5">
                      <li>Population Geography</li>
                      <li>Economic Geography</li>
                      <li>Urban Geography (cities)</li>
                      <li>Cultural Geography</li>
                      <li>Political Geography</li>
                      <li>Social Geography</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialized Branches */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3">
                🔬 Specialized & Applied Geography
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-base">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Cartography</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Map making & design</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">GIS (Geographic Information Systems)</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Computer mapping & spatial analysis</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Remote Sensing</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Satellite & aerial imagery analysis</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Medical Geography</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Disease patterns & health services</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Environmental Geography</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Human-environment interactions</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Tourism Geography</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Travel patterns & tourism planning</p>
                </div>
              </div>
            </div>

            {/* Real World Application */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-l-4 border-orange-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">💼</span>
                Real-World Careers Using Geography
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Geographers work in many fields:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                    <div>
                      <p><strong className="text-orange-600">🛰️ GIS Specialist:</strong> Creates digital maps for governments and companies</p>
                    </div>
                    <div>
                      <p><strong className="text-orange-600">🌡️ Climate Analyst:</strong> Studies climate change and advises policymakers</p>
                    </div>
                    <div>
                      <p><strong className="text-orange-600">🏙️ Urban Planner:</strong> Designs sustainable, livable cities</p>
                    </div>
                    <div>
                      <p><strong className="text-orange-600">🌾 Agricultural Consultant:</strong> Helps farmers optimize land use</p>
                    </div>
                    <div>
                      <p><strong className="text-orange-600">✈️ Travel Analyst:</strong> Studies tourism patterns and impacts</p>
                    </div>
                    <div>
                      <p><strong className="text-orange-600">🏥 Epidemiologist:</strong> Tracks disease spread geographically</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-orange-700 dark:text-orange-300">
                    💡 Companies like Google, Amazon, and Uber hire geographers to analyze location data and optimize services!
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Which branch of geography studies mountains, valleys, and other landforms?"
              options={[
                'Climatology',
                'Geomorphology',
                'Biogeography',
                'Population Geography'
              ]}
              correctAnswer={1}
              explanation="Geomorphology is the study of landforms and the processes that shape them. It's a branch of Physical Geography. 'Geo' = Earth, 'morph' = form/shape."
            />

            <ExerciseQuestion
              question="Urban Geography is a branch of:"
              options={[
                'Physical Geography',
                'Human Geography',
                'Biogeography',
                'Oceanography'
              ]}
              correctAnswer={1}
              explanation="Urban Geography studies cities and human settlements, so it's part of Human Geography. Physical Geography deals with natural features, not human-made ones."
            />

            <ExerciseQuestion
              question="What does a GIS (Geographic Information Systems) specialist do?"
              options={[
                'Studies rocks and minerals',
                'Creates and analyzes digital maps and spatial data',
                'Predicts earthquakes',
                'Studies ocean currents'
              ]}
              correctAnswer={1}
              explanation="GIS specialists create digital maps and analyze spatial data using computer technology. They work in fields like urban planning, environmental management, and disaster response."
            />

            <ExerciseQuestion
              question="If you study how diseases spread across different regions, you're working in:"
              options={[
                'Climatology',
                'Economic Geography',
                'Medical Geography',
                'Cartography'
              ]}
              correctAnswer={2}
              explanation="Medical Geography studies the geographic patterns of disease and health. It combines elements of both Physical and Human Geography to understand health issues."
            />
          </div>
        </section>

        {/* Unit Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 border border-emerald-200 dark:border-emerald-800 p-4 md:p-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-3xl">🎯</span>
            Unit 1 Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-emerald-600 dark:text-emerald-400 mb-2">✅ What You Learned:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Definition of Geography (Earth description)</li>
                <li>• The 5 Themes: Location, Place, HEI, Movement, Region</li>
                <li>• Physical Geography (natural features)</li>
                <li>• Human Geography (people & culture)</li>
                <li>• Specialized branches (GIS, Remote Sensing, Medical)</li>
                <li>• Career opportunities in geography</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-lime-600 dark:text-lime-400 mb-2">🔑 Key Concepts:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Absolute vs Relative location</li>
                <li>• Physical vs Human geography</li>
                <li>• Geography answers: Where? Why there? So what?</li>
                <li>• Geography is both a science and an applied field</li>
                <li>• Geographers use technology (GIS, satellites)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivational Closing */}
        <div className="bg-gradient-to-r from-emerald-600 to-lime-600 dark:from-emerald-800 dark:to-lime-800 text-white p-4 md:p-8 rounded-lg text-center">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
            🌍 Welcome to the World of Geography! 🌍
          </h3>
          <p className="text-xs md:text-lg">
            You've taken the first step in understanding our amazing planet! Geography will help you see connections between places, 
            people, and environments. Keep exploring! 🗺️✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unit1;
