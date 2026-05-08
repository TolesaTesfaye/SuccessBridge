import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          APPLICATION OF BIOLOGY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-emerald-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Biology is the study of life and living organisms. Its applications extend to various fields including conservation, agriculture, medicine, and industry.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1: Application in Conservation of Natural Resources */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.1. Application in Conservation of Natural Resources
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Natural resources (water, soil, forests, wildlife, and minerals) are the foundation of life and economic development. 
              Biology provides the scientific understanding needed to conserve these resources sustainably, ensuring they remain available for future generations.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Why Conservation Matters
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Human activities have dramatically altered natural ecosystems. Deforestation, overfishing, pollution, and climate change threaten biodiversity and ecosystem services. 
              Biology helps us understand:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-slate-700 dark:text-slate-300">• How ecosystems function and maintain balance</li>
              <li className="text-slate-700 dark:text-slate-300">• The interconnections between species and their environment</li>
              <li className="text-slate-700 dark:text-slate-300">• The impact of human activities on natural systems</li>
              <li className="text-slate-700 dark:text-slate-300">• Strategies for sustainable resource management</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Key Applications of Biology in Conservation
          </h3>

          <div className="space-y-6 mb-6">
            {/* Biodiversity Conservation */}
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                1. Biodiversity Conservation
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Protecting species and habitats to prevent extinction and maintain genetic diversity.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Ethiopian Wolf Conservation</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The Ethiopian wolf is Africa's most endangered carnivore, with fewer than 500 individuals remaining. 
                  Biologists use population genetics to maintain genetic diversity, study disease transmission (especially rabies), 
                  and work with local communities to protect their habitat in the Ethiopian highlands. This integrated approach 
                  combines ecological research, veterinary medicine, and community engagement.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Methods Used:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Population monitoring and census</li>
                <li>• Genetic analysis to track diversity</li>
                <li>• Habitat mapping and protection</li>
                <li>• Captive breeding programs for critically endangered species</li>
                <li>• Reintroduction of species to restored habitats</li>
              </ul>
            </div>

            {/* Wildlife Management */}
            <div className="p-6 border-l-4 border-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                2. Wildlife Management
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Controlling hunting/poaching, monitoring populations, and protecting breeding areas to maintain healthy wildlife populations.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Real-World Example: Bale Mountains National Park</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  In Ethiopia's Bale Mountains, biologists use radio collars and camera traps to monitor wildlife populations including 
                  mountain nyala, Menelik's bushbuck, and various bird species. They track migration patterns, breeding success, and 
                  population health. Anti-poaching patrols use biological knowledge of animal behavior to protect vulnerable species 
                  during breeding seasons.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Techniques Include:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Radio telemetry and GPS tracking</li>
                <li>• Camera trap surveys</li>
                <li>• Population viability analysis</li>
                <li>• Establishing wildlife corridors</li>
                <li>• Community-based anti-poaching initiatives</li>
              </ul>
            </div>

            {/* Forest and Watershed Protection */}
            <div className="p-6 border-l-4 border-emerald-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                3. Forest and Watershed Protection
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Reforestation, afforestation, and protecting catchment areas to reduce erosion and maintain water supply.
              </p>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">Real-World Example: Blue Nile Basin Management</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The Blue Nile originates in Ethiopia's highlands. Biologists study how deforestation affects water flow, soil erosion, 
                  and downstream water quality. They work with communities to plant native tree species that stabilize soil, increase 
                  water infiltration, and provide sustainable timber. This biological approach has reduced soil loss by up to 70% in 
                  some watersheds while improving local livelihoods.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Conservation Strategies:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Reforestation with native species</li>
                <li>• Riparian buffer zone establishment</li>
                <li>• Terracing and contour plowing</li>
                <li>• Agroforestry systems</li>
                <li>• Wetland restoration</li>
              </ul>
            </div>

            {/* Soil Conservation */}
            <div className="p-6 border-l-4 border-amber-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                4. Soil Conservation
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Preventing soil erosion, improving soil fertility, and reducing land degradation through biological methods.
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2">Real-World Example: Tigray Soil Restoration</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  In Tigray region, severe soil degradation threatened food security. Biologists introduced nitrogen-fixing plants 
                  (legumes) and soil microorganisms to restore fertility. They studied how different plant species prevent erosion 
                  and improve soil structure. After 10 years, soil organic matter increased by 40%, and crop yields doubled in 
                  restored areas.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Biological Approaches:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Cover cropping with legumes</li>
                <li>• Composting and organic matter addition</li>
                <li>• Mycorrhizal fungi inoculation</li>
                <li>• Crop rotation systems</li>
                <li>• Biological soil crusts protection</li>
              </ul>
            </div>

            {/* Sustainable Use */}
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                5. Sustainable Use
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Harvesting resources at a rate that allows natural regeneration, ensuring long-term availability.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Lake Tana Fisheries</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Lake Tana supports thousands of fishermen. Biologists studied fish reproduction rates, growth patterns, and 
                  population dynamics to establish sustainable catch limits. They identified critical breeding seasons and areas, 
                  leading to seasonal fishing bans. This biological management increased fish populations by 35% while maintaining 
                  fishing livelihoods.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sustainable Practices:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Maximum sustainable yield calculations</li>
                <li>• Seasonal harvesting restrictions</li>
                <li>• Size and age limits for harvested organisms</li>
                <li>• Rotational harvesting systems</li>
                <li>• Community-based resource management</li>
              </ul>
            </div>
          </div>

          {/* Key Point Reminder - True/False */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: Sustainable use means harvesting all available resources as quickly as possible to maximize short-term profits."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Sustainable use means harvesting resources at a rate that allows natural regeneration, ensuring long-term availability. It focuses on maintaining ecosystem health and resource availability for future generations, not maximizing short-term extraction. Quick depletion of resources leads to ecosystem collapse and economic loss."
            />
          </div>

          {/* Main Exercise for Subtopic 1.1 */}
          <div className="mt-10 p-8 border-t-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Conservation of Natural Resources</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="Which conservation strategy would be MOST effective for protecting an endangered species with a small, isolated population?"
                options={[
                  'Allowing unlimited hunting to control population',
                  'Establishing a captive breeding program and protecting habitat',
                  'Introducing non-native predators to the ecosystem',
                  'Removing all vegetation from the habitat'
                ]}
                correctAnswer={1}
                explanation="Establishing a captive breeding program and protecting habitat is the most effective strategy. Captive breeding increases population numbers while maintaining genetic diversity, and habitat protection ensures the species has a safe place to live. The other options would harm the species: unlimited hunting would reduce numbers further, non-native predators could disrupt the ecosystem, and removing vegetation would destroy habitat."
              />

              <ExerciseQuestion 
                question="A watershed protection project plants trees along riverbanks. What is the PRIMARY biological benefit of this action?"
                options={[
                  'Trees provide shade for picnics',
                  'Tree roots stabilize soil and reduce erosion into the river',
                  'Trees attract tourists to the area',
                  'Trees block the view of the river'
                ]}
                correctAnswer={1}
                explanation="The primary biological benefit is that tree roots stabilize soil and reduce erosion. Root systems bind soil particles together, preventing them from washing into the river during rainfall. This maintains water quality, reduces sedimentation, and protects aquatic ecosystems. While trees may provide other benefits, soil stabilization is the key biological function in watershed protection."
              />
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.2. Application in Agriculture
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Agriculture feeds the world's growing population. Biology plays a crucial role in improving agricultural productivity, 
              sustainability, and food security through scientific understanding of plants, animals, soil, and ecosystems.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            The Challenge
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              By 2050, the world population will reach 9.7 billion people. We need to produce 70% more food while:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-slate-700 dark:text-slate-300">• Using less water and land</li>
              <li className="text-slate-700 dark:text-slate-300">• Reducing environmental impact</li>
              <li className="text-slate-700 dark:text-slate-300">• Adapting to climate change</li>
              <li className="text-slate-700 dark:text-slate-300">• Maintaining soil health</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              Biology provides solutions through crop improvement, pest management, soil conservation, and sustainable farming practices.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Key Applications in Agriculture
          </h3>

          <div className="space-y-6 mb-6">
            {/* Crop Improvement */}
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                1. Crop Improvement
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Developing high-yield, disease-resistant, and climate-adapted crop varieties through selective breeding and genetic engineering.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Teff Improvement in Ethiopia</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Teff is Ethiopia's staple grain, but traditional varieties lodge (fall over) easily, reducing yields. Agricultural biologists 
                  used selective breeding to develop semi-dwarf teff varieties that resist lodging. They studied plant genetics, growth patterns, 
                  and stress responses. New varieties increased yields by 30-40% and are more resistant to drought. This biological research 
                  improved food security for millions of Ethiopians.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Techniques Used:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Selective breeding for desired traits</li>
                <li>• Hybridization to combine beneficial characteristics</li>
                <li>• Marker-assisted selection using DNA analysis</li>
                <li>• Genetic engineering for specific traits (e.g., pest resistance)</li>
                <li>• Tissue culture for rapid propagation</li>
              </ul>
            </div>

            {/* Biological Pest Control */}
            <div className="p-6 border-l-4 border-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                2. Biological Pest Management
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Using natural predators, parasites, and pathogens to control agricultural pests, reducing reliance on chemical pesticides.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Real-World Example: Ladybugs vs. Aphids</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Aphids are major pests that suck plant sap, weakening crops and spreading diseases. Instead of using chemical pesticides, 
                  farmers release ladybugs (Coccinellidae), which are natural aphid predators. One ladybug can eat up to 5,000 aphids in its 
                  lifetime. Biologists study predator-prey relationships, release timing, and habitat requirements to maximize effectiveness. 
                  This biological control reduces pesticide use by 60-80% while maintaining crop health.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Integrated Pest Management (IPM) Includes:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Biological control agents (predators, parasitoids)</li>
                <li>• Pheromone traps for monitoring and mating disruption</li>
                <li>• Crop rotation to break pest cycles</li>
                <li>• Resistant crop varieties</li>
                <li>• Beneficial microorganisms (e.g., Bacillus thuringiensis)</li>
              </ul>
            </div>

            {/* Soil Fertility */}
            <div className="p-6 border-l-4 border-amber-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                3. Soil Fertility Management
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Understanding nutrient cycles and using biological methods to maintain and improve soil fertility.
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2">Real-World Example: Nitrogen-Fixing Bacteria</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Nitrogen is essential for plant growth, but atmospheric nitrogen (N₂) is unusable by plants. Rhizobium bacteria form 
                  symbiotic relationships with legume roots (beans, peas, lentils), converting atmospheric nitrogen into ammonia that plants 
                  can use. Ethiopian farmers intercrop cereals with legumes, reducing chemical fertilizer needs by 40-50%. Biologists study 
                  these bacteria to develop better inoculants that increase nitrogen fixation efficiency.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Biological Approaches:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Nitrogen-fixing bacteria inoculation</li>
                <li>• Mycorrhizal fungi for nutrient uptake</li>
                <li>• Composting organic matter</li>
                <li>• Green manure crops</li>
                <li>• Crop rotation with legumes</li>
              </ul>
            </div>

            {/* Animal Husbandry */}
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                4. Animal Husbandry
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Improving livestock breeds, managing animal health, and optimizing production through biological understanding.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Ethiopian Highland Cattle</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Ethiopian highland cattle are adapted to high altitudes but have low milk production. Animal scientists crossbred them 
                  with high-yielding Holstein cattle, creating hybrids that maintain altitude adaptation while producing 3-4 times more milk. 
                  Biologists study genetics, nutrition, reproduction, and disease resistance to optimize breeding programs. They also develop 
                  vaccines for common livestock diseases, reducing mortality by 30-40%.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Applications Include:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Selective breeding for productivity and disease resistance</li>
                <li>• Artificial insemination for genetic improvement</li>
                <li>• Nutritional optimization based on physiology</li>
                <li>• Disease prevention through vaccination</li>
                <li>• Reproductive management and breeding programs</li>
              </ul>
            </div>
          </div>

          {/* Key Point Reminder - True/False */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: Biological pest control uses chemical pesticides to kill all insects in a field."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Biological pest control uses natural predators, parasites, or pathogens to control pest populations, NOT chemical pesticides. Examples include using ladybugs to eat aphids or releasing parasitic wasps to control caterpillars. This method is more environmentally friendly and sustainable than chemical pesticides."
            />
          </div>

          {/* Main Exercise for Subtopic 1.2 */}
          <div className="mt-10 p-8 border-t-4 border-green-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Application in Agriculture</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="A farmer plants beans between rows of maize. The beans have root nodules containing Rhizobium bacteria. What is the PRIMARY benefit of this practice?"
                options={[
                  'The beans provide shade for the maize',
                  'The bacteria fix atmospheric nitrogen, enriching the soil',
                  'The beans attract more insects to pollinate the maize',
                  'The bacteria kill pests that attack maize'
                ]}
                correctAnswer={1}
                explanation="The primary benefit is that Rhizobium bacteria in bean root nodules fix atmospheric nitrogen, converting it into a form plants can use. This enriches the soil with nitrogen, reducing the need for chemical fertilizers and benefiting the maize crop. This is called intercropping or companion planting, and it's a sustainable agricultural practice based on biological nitrogen fixation."
              />

              <ExerciseQuestion 
                question="Scientists develop a new wheat variety that produces 40% more grain per plant. This is an example of:"
                options={[
                  'Biological pest control',
                  'Soil conservation',
                  'Crop improvement through selective breeding',
                  'Wildlife management'
                ]}
                correctAnswer={2}
                explanation="This is crop improvement through selective breeding. Scientists select plants with desirable traits (high yield) and breed them together over multiple generations to develop improved varieties. This biological approach has dramatically increased food production worldwide. It's different from pest control (managing insects/diseases), soil conservation (protecting soil), or wildlife management (protecting wild animals)."
              />
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.3. Application in Medicine
          </h2>

          <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Medical biology has revolutionized healthcare through understanding disease mechanisms, developing treatments, and improving diagnostics.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Key Applications:
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Drug development:</strong>
                <span className="text-slate-700 dark:text-slate-300"> discovering and producing antibiotics, vaccines, and therapeutic drugs.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Genetic medicine:</strong>
                <span className="text-slate-700 dark:text-slate-300"> gene therapy, genetic counseling, and personalized medicine.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Disease diagnosis:</strong>
                <span className="text-slate-700 dark:text-slate-300"> using molecular techniques for early detection and accurate diagnosis.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Biotechnology:</strong>
                <span className="text-slate-700 dark:text-slate-300"> producing insulin, growth hormones, and other therapeutic proteins.</span>
              </div>
            </div>
          </div>

          {/* Exercise for Subtopic 1.3 */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Application in Medicine</h3>
            <ExerciseQuestion 
              question="Scientists use genetically modified bacteria to produce human insulin for diabetes treatment. This is an example of:"
              options={[
                'Wildlife management',
                'Biological pest control',
                'Biotechnology in medicine',
                'Soil conservation'
              ]}
              correctAnswer={2}
              explanation="This is biotechnology in medicine. Genetic engineering allows us to insert human genes into bacteria, which then produce human insulin. This application of biology has revolutionized diabetes treatment, making insulin more accessible and affordable. It demonstrates how understanding genetics and cellular processes can solve medical problems."
            />
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.4. Application in Industry
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Industrial biology (biotechnology) uses living organisms and biological processes to produce valuable products and services.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Key Applications:
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Food industry:</strong>
                <span className="text-slate-700 dark:text-slate-300"> fermentation for bread, beer, wine, cheese, and yogurt production.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Biofuels:</strong>
                <span className="text-slate-700 dark:text-slate-300"> producing ethanol and biodiesel from biological materials.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Waste treatment:</strong>
                <span className="text-slate-700 dark:text-slate-300"> using microorganisms to break down pollutants and treat sewage.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-600 dark:text-green-400 font-bold">•</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Enzyme production:</strong>
                <span className="text-slate-700 dark:text-slate-300"> manufacturing enzymes for detergents, textiles, and paper industries.</span>
              </div>
            </div>
          </div>

          {/* Exercise for Subtopic 1.4 */}
          <div className="mt-10 p-8 border-t-4 border-orange-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Application in Industry</h3>
            <ExerciseQuestion 
              question="Yeast is used in the production of bread, causing the dough to rise. This process is an example of:"
              options={[
                'Photosynthesis',
                'Fermentation',
                'Cellular respiration',
                'Genetic engineering'
              ]}
              correctAnswer={1}
              explanation="This is fermentation. Yeast undergoes fermentation, producing carbon dioxide gas that causes bread dough to rise. This is a classic example of how biology is applied in the food industry. Fermentation is also used to produce beer, wine, yogurt, and many other food products."
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 1 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Conservation:</strong> Biology helps protect biodiversity, manage wildlife, and ensure sustainable use of natural resources.</p>
            <p><strong>✓ Agriculture:</strong> Applications include crop improvement, biological pest control, soil fertility management, and animal husbandry.</p>
            <p><strong>✓ Medicine:</strong> Biology enables drug development, genetic medicine, disease diagnosis, and biotechnology for therapeutic proteins.</p>
            <p><strong>✓ Industry:</strong> Biotechnology is used in food production, biofuels, waste treatment, and enzyme manufacturing.</p>
            <p><strong>✓ Key Insight:</strong> Understanding biological principles allows us to solve real-world problems and promote sustainable development.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
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
