import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  IndustrialSitingGrid,
  HaberProcessDiagram,
  ContactProcessDiagram,
  CementProductionDiagram,
  EthiopianIndustriesGrid,
} from "../../components/ChemDiagrams";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter3: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
      <div className="relative mb-8 md:mb-12 px-2 sm:px-4 md:px-8 py-6 md:py-8">
        <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 3
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 md:mb-6 tracking-tight">
          INDUSTRIAL CHEMISTRY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Industrial chemistry takes the reactions you learn in the laboratory and runs them on a massive scale. It turns
          Ethiopia's limestone, salt, sugar cane, hides and minerals into cement, glass, fertilizer, sugar, leather and
          thousands of other products. This unit follows the journey from natural resource to finished product — and
          shows how chemistry, economics and the environment meet inside a factory.
        </p>
      </div>

      <div className="space-y-10 md:space-y-16 pb-12 md:pb-20 px-2 sm:px-4 md:px-8">

        {/* ================= SECTION 3.1 ================= */}
        <section id="subtopic-3.1" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            3.1. Introduction
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Industrial chemistry</strong> is the branch of chemistry concerned with converting raw materials into
              useful products on a commercial scale. Unlike a school experiment that makes a few grams of a substance,
              an industrial process must be safe, economical, reliable and environmentally responsible while producing
              thousands of tonnes every year.
            </p>
          </div>

          {/* 3.1.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.1.1 What Is Industrial Chemistry?
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Pure chemistry</strong> asks <em>what happens and why</em> — it discovers reactions and explains them.
              <strong> Applied chemistry</strong> asks <em>how can this be made useful at scale</em>. Industrial chemistry is
              applied chemistry shaped by engineering, economics and safety.
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• It uses chemical <strong>reactions</strong> as the core of every process.</li>
              <li>• It designs <strong>reactors, separation units and control systems</strong> around those reactions.</li>
              <li>• It must control <strong>cost, quality, safety, energy and waste</strong> at the same time.</li>
              <li>• It depends on <strong>raw materials</strong> that are locally available and affordable.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Raw material → chemical change → separation → finished product
              </p>
            </div>
          </div>

          {/* 3.1.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.1.2 Stages of an Industrial Process
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Almost every chemical plant follows the same sequence of stages:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>1. Raw-material acquisition</strong> — mining, harvesting or purchasing the starting materials.</li>
              <li>• <strong>2. Preparation</strong> — crushing, grinding, purifying and mixing the raw materials.</li>
              <li>• <strong>3. Chemical reaction</strong> — carrying out the main conversion under controlled temperature,
                pressure and catalyst.</li>
              <li>• <strong>4. Separation and purification</strong> — distillation, filtration, crystallisation or absorption to
                isolate the product.</li>
              <li>• <strong>5. Product handling</strong> — drying, packaging, storage and quality testing.</li>
              <li>• <strong>6. Waste and by-product management</strong> — recycling unreacted material and treating effluent,
                gases and solid waste.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              A well-designed plant recycles heat and unreacted raw materials; this is where chemistry meets
              engineering and where green chemistry (Section 5.4) becomes practical.
            </p>
          </div>

          {/* 3.1.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.1.3 Factors in Siting an Industry
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Where a factory is built is a chemical decision as much as an economic one. A cement plant needs limestone
              nearby; a tannery needs water and waste treatment; an electrolysis plant needs cheap electricity.
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Availability of raw materials</strong> — bulky, low-value materials are expensive to transport.</li>
              <li>• <strong>Energy supply</strong> — energy-intensive industries need reliable, affordable power.</li>
              <li>• <strong>Water supply</strong> — for cooling, processing and cleaning.</li>
              <li>• <strong>Transport and market</strong> — roads, rail, ports and nearby customers.</li>
              <li>• <strong>Labour and skills</strong> — operators, technicians and engineers.</li>
              <li>• <strong>Capital and government policy</strong> — investment, incentives and industrial parks.</li>
              <li>• <strong>Waste disposal</strong> — safe treatment of effluent, dust and solid waste.</li>
            </ul>
          </div>

          <IndustrialSitingGrid />

          {/* 3.1.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.1.4 Industrial Chemistry and the Environment
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Industry creates wealth and products, but it can also release gases, dust, effluent and solid waste. Modern
              plants are expected to minimise these releases through efficient processes, recycling, scrubbers, settling
              ponds and cleaner production. The best environmental solution is prevention — designing the process so that
              less waste is produced in the first place (Chapter 5 covers this in detail).
            </p>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-violet-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Industrial Chemistry in Ethiopia
              </h4>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-2">Real-World Example: From Local Rock to City Skyline</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Limestone extracted near Mugher and the clay beside it are crushed, burned at about 1450 °C and ground
                  into cement. That cement is then mixed with sand, gravel and water to build the apartments, roads and
                  dams of Addis Ababa. In a single supply chain, a local mineral resource becomes the physical structure of
                  a growing city — industrial chemistry in action.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A plant needs 1,000 tonnes of limestone per day. If the quarry is 10 km away, the plant runs a continuous
                truck shuttle; if the nearest limestone is 300 km away, transport cost may make the operation uneconomical.
                This is why cement plants are almost always built beside their quarry.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Industrial chemistry focuses only on discovering new reactions, not on making products at large scale."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Discovering reactions is the work of pure chemistry. Industrial chemistry applies known reactions on a commercial scale, while managing cost, safety, energy, quality and waste."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Introduction to Industrial Chemistry</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which of these is the BEST reason to build a cement factory next to a limestone quarry?"
                options={[
                  'Cement looks nicer when made near a quarry',
                  'Limestone is bulky and expensive to transport, so closeness lowers cost',
                  'Quarries provide the electricity for the kiln',
                  'The factory needs no water if it is near a quarry'
                ]}
                correctAnswer={1}
                explanation="Limestone is used in very large amounts and is heavy and low in value per tonne. Transporting it long distances would dominate the cost, so cement plants are built close to the quarry."
              />

              <ExerciseQuestion
                question="Which sequence correctly describes an industrial process?"
                options={[
                  'Packaging → raw materials → reaction → waste',
                  'Raw materials → preparation → reaction → separation → product',
                  'Reaction → raw materials → product → preparation',
                  'Product → separation → raw materials → reaction'
                ]}
                correctAnswer={1}
                explanation="Industrial processes start with raw-material acquisition, prepare and purify the feed, carry out the reaction, separate the desired product, and finally package and handle it — with waste management throughout."
              />

              <ExerciseQuestion
                question="Which factor is MOST important for siting an aluminium smelter that uses electrolysis?"
                options={[
                  'A nearby market for fresh vegetables',
                  'A large, reliable supply of cheap electricity',
                  'A cold climate',
                  'A nearby limestone quarry'
                ]}
                correctAnswer={1}
                explanation="Aluminium is extracted by electrolysis of alumina, which consumes enormous amounts of electrical energy. Cheap, reliable power is the dominant siting factor for a smelter."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 3.2 ================= */}
        <section id="subtopic-3.2" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            3.2. Natural Resources and Industry
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Every manufactured product begins with a natural resource. Ethiopia is rich in minerals, agricultural raw
              materials, water and renewable energy. Understanding which resources exist, where they are and how they
              are used is the first step in building a strong industrial economy.
            </p>
          </div>

          {/* 3.2.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.2.1 Mineral Resources
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Minerals supply the inorganic raw materials for construction, fertilizers and metals:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Limestone (CaCO₃)</strong> — cement, lime, glass and agriculture.</li>
              <li>• <strong>Clay</strong> — bricks, ceramics and cement.</li>
              <li>• <strong>Gypsum (CaSO₄·2H₂O)</strong> — cement setting control and plaster.</li>
              <li>• <strong>Silica sand (SiO₂)</strong> — glass and ceramics.</li>
              <li>• <strong>Soda ash (Na₂CO₃)</strong> — glass, soap and detergents.</li>
              <li>• <strong>Rock salt (NaCl)</strong> — chlorine, caustic soda, food preservation.</li>
              <li>• <strong>Potash (potassium salts)</strong> — fertilizers.</li>
              <li>• <strong>Metallic ores</strong> — iron, gold, tantalum and others.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Ethiopia has large limestone and clay reserves, extensive salt deposits in the Afar region, potash
              resources near Dallol, and gold and tantalum deposits in several regions. Many deposits remain only partly
              developed, so mineral processing is a major growth area.
            </p>
          </div>

          {/* 3.2.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.2.2 Agricultural Raw Materials
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Agriculture supplies renewable raw materials to many industries:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Sugar cane</strong> — sugar, molasses and ethanol.</li>
              <li>• <strong>Cotton</strong> — textile spinning and weaving.</li>
              <li>• <strong>Hides and skins</strong> — leather for shoes, bags and jackets.</li>
              <li>• <strong>Oilseeds</strong> — edible oils and soap manufacture.</li>
              <li>• <strong>Cereals and pulses</strong> — flour, food processing and beverages.</li>
              <li>• <strong>Bagasse and straw</strong> — boiler fuel, paper pulp and animal feed.</li>
              <li>• <strong>Coffee and other crops</strong> — food and beverage processing for export.</li>
            </ul>
          </div>

          {/* 3.2.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.2.3 Energy Resources
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Industry needs energy for heating, melting, electrolysis and transport:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Hydropower</strong> — Ethiopia's main source of electricity; major projects include the Grand
                Ethiopian Renaissance Dam.</li>
              <li>• <strong>Geothermal, wind and solar</strong> — growing renewable sources, e.g. the Aluto geothermal area
                and the Ashegoda wind farm.</li>
              <li>• <strong>Biomass</strong> — firewood, charcoal, crop residues and bagasse; widely used but can cause
                deforestation and indoor air pollution.</li>
              <li>• <strong>Fossil fuels</strong> — petroleum products are largely imported and used for transport and
                some industry; coal is used in cement kilns.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Because hydropower is renewable, industry powered by it has a lower carbon footprint — an important
              advantage for green manufacturing and export competitiveness.
            </p>
          </div>

          {/* 3.2.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.2.4 Water Resources
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Ethiopia's rivers (Abay, Awash, Omo, Tekeze, Baro) and Rift Valley lakes supply water for drinking,
              irrigation, hydropower and industry. Factories use water for cooling, washing, dissolving and as a reaction
              medium. Using water responsibly means treating effluent before it returns to a river, because polluted water
              harms downstream communities and ecosystems — a theme developed in Chapter 5.
            </p>
          </div>

          {/* 3.2.5 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.2.5 Renewable and Non-Renewable Resources
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Renewable resources</strong> — can be replaced naturally within a human lifetime: sunlight, wind,
                hydropower, biomass, crops, and managed forests.</li>
              <li>• <strong>Non-renewable resources</strong> — form over millions of years and are used up faster than they are
                replaced: petroleum, coal, natural gas, and most metal ores and minerals.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Sustainable industry uses renewable resources where possible, recycles minerals and metals, uses energy
              efficiently, and avoids wasting raw materials. Recycling aluminium, for example, uses about 95% less energy
              than extracting it from ore.
            </p>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Linking Resources to Products
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: One Sugar Cane, Three Industries</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  A single sugar factory extracts sucrose from cane, burns the fibrous bagasse to generate its own
                  electricity, and ferments molasses into ethanol. The leftover filter mud becomes fertilizer. This is
                  industrial symbiosis — one resource feeding several products, with far less waste.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                If a factory burns 100 tonnes of bagasse per day and the bagasse has an energy content of about 8 MJ/kg,
                the energy available is 100,000 kg × 8 MJ/kg = 800,000 MJ per day — enough to run boilers and generate
                electricity for the plant and nearby towns.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Limestone, clay and silica sand are examples of renewable resources."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Limestone, clay and silica sand are minerals formed over very long geological periods. They are non-renewable — once extracted, they cannot be replaced on a human timescale."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Natural Resources and Industry</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which raw material pair is used to make cement clinker?"
                options={[
                  'Limestone and clay',
                  'Sugar cane and molasses',
                  'Silica sand and soda ash',
                  'Hides and tannins'
                ]}
                correctAnswer={0}
                explanation="Cement clinker is made by heating a mixture of limestone (CaCO₃) and clay (aluminosilicates) at about 1450 °C. Silica sand and soda ash are mainly for glass; hides and tannins are for leather."
              />

              <ExerciseQuestion
                question="Which of the following is a RENEWABLE raw material?"
                options={[
                  'Petroleum',
                  'Limestone',
                  'Sugar cane',
                  'Iron ore'
                ]}
                correctAnswer={2}
                explanation="Sugar cane is a crop that can be regrown each season, so it is renewable. Petroleum, limestone and iron ore are non-renewable minerals."
              />

              <ExerciseQuestion
                question="Why is hydropower especially valuable for Ethiopian industry?"
                options={[
                  'It is imported cheaply from abroad',
                  'It is a reliable, renewable source of electricity for energy-intensive plants',
                  'It produces limestone as a by-product',
                  'It requires no rivers or dams'
                ]}
                correctAnswer={1}
                explanation="Ethiopia's rivers and dams generate renewable electricity. Reliable, affordable power supports energy-intensive industry such as cement, steel and electrolysis, with a lower carbon footprint."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 3.3 ================= */}
        <section id="subtopic-3.3" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            3.3. Manufacturing of Valuable Products/Chemicals
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              This section examines some of the most important industrial processes. Each one shows the same pattern:
              choose the chemistry, set the conditions to maximise yield and rate, separate the product, and manage the
              waste. Pay attention to the role of <strong>catalysts</strong>, <strong>temperature</strong>,
              <strong> pressure</strong> and <strong>recycling</strong>.
            </p>
          </div>

          {/* 3.3.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.1 Ammonia and Fertilizers: The Haber Process
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Ammonia is the starting point for nitrogen fertilizers. It is made by combining nitrogen from air with
              hydrogen (from natural gas or water) in a reversible reaction:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   ΔH = −92 kJ/mol
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Conditions used in industry:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Temperature ≈ 450 °C</strong> — a compromise: higher temperature increases rate but lowers the
                equilibrium yield because the reaction is exothermic.</li>
              <li>• <strong>Pressure ≈ 200 atm</strong> — high pressure favours the products because 4 gas molecules become 2.</li>
              <li>• <strong>Iron (Fe) catalyst</strong> with promoters (K₂O, Al₂O₃) — speeds up the reaction without being used up.</li>
              <li>• <strong>Recycling</strong> of unreacted N₂ and H₂ — improves the overall efficiency.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Ammonia is converted into urea, ammonium nitrate, ammonium sulfate and DAP fertilizer — products that supply
              the nitrogen crops need for proteins and chlorophyll.
            </p>
          </div>

          <HaberProcessDiagram />

          {/* 3.3.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.2 Sulfuric Acid: The Contact Process
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Sulfuric acid is one of the most widely used industrial chemicals. It is made in three main stages:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>1. Burn sulfur:</strong> S + O₂ → SO₂</li>
              <li>• <strong>2. Catalytic oxidation:</strong> 2SO₂ + O₂ ⇌ 2SO₃, catalysed by V₂O₅ at about 450 °C.</li>
              <li>• <strong>3. Absorption:</strong> SO₃ is absorbed in concentrated H₂SO₄ to form oleum (H₂S₂O₇), which is then
                diluted with water to give H₂SO₄.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                S + O₂ → SO₂<br />
                2SO₂ + O₂ ⇌ 2SO₃<br />
                SO₃ + H₂SO₄ → H₂S₂O₇<br />
                H₂S₂O₇ + H₂O → 2H₂SO₄
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              The catalyst is essential: without it the oxidation of SO₂ is extremely slow. Sulfuric acid is used in
              fertilizer production, lead-acid batteries, metal cleaning, dyes and detergents.
            </p>
          </div>

          <ContactProcessDiagram />

          {/* 3.3.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.3 Chlor-Alkali Products
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Electrolysis of concentrated brine (as studied in Chapter 2) produces three valuable products at once:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                2NaCl(aq) + 2H₂O → 2NaOH(aq) + Cl₂(g) + H₂(g)
              </p>
            </div>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>NaOH</strong> — soap, paper, textiles and water treatment.</li>
              <li>• <strong>Cl₂</strong> — water disinfection, PVC plastics and bleach.</li>
              <li>• <strong>H₂</strong> — ammonia production, hydrogenation of oils and fuel.</li>
            </ul>
          </div>

          {/* 3.3.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.4 Cement
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Cement is made from <strong>limestone</strong> and <strong>clay</strong>. The raw materials are crushed, blended
              and heated in a rotary kiln to about 1450 °C, where limestone decomposes and reacts with clay to form
              <strong> clinker</strong>. The clinker is cooled, then ground with a small amount of gypsum.
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                CaCO₃ → CaO + CO₂<br />
                CaO + SiO₂ + Al₂O₃ → calcium silicates and aluminates (clinker)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              When cement is mixed with water, hydration reactions form a hard, interlocking matrix. Gypsum slows the
              setting so concrete can be placed and shaped before it hardens. Cement production releases CO₂ both from
              fuel combustion and from the decomposition of limestone, making it an important target for cleaner
              production.
            </p>
          </div>

          <CementProductionDiagram />

          {/* 3.3.5 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.5 Glass and Ceramics
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Soda-lime glass</strong> is made by melting together silica sand (about 70%), soda ash (about 15%) and
              limestone (about 10%) at 1400–1600 °C. Soda ash lowers the melting point, while limestone improves
              durability. Specialty glasses use other oxides: borosilicate glass (Pyrex) resists heat, and lead glass has a
              high refractive index.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Ceramics</strong> are made from clay (mainly kaolinite), feldspar and silica. The shaped articles are
              dried and fired in a kiln; at high temperature the particles fuse (vitrification), producing hard,
              heat-resistant materials used for bricks, tiles, pottery, sanitaryware and insulators.
            </p>
          </div>

          {/* 3.3.6 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.6 Sugar, Ethanol and Food Processing
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Sugar production begins with crushing cane to extract sweet juice. The juice is clarified with lime and heat,
              filtered, evaporated to a syrup, and crystallised; centrifuges separate the sugar crystals from molasses.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Molasses is fermented by yeast into ethanol:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Ethanol is distilled and used in beverages, hand sanitizers and fuel blending. Bagasse fuels the factory's
              boilers, and filter mud is returned to the fields as fertilizer.
            </p>
          </div>

          {/* 3.3.7 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.7 Soap and Detergents
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Soap is made by <strong>saponification</strong> — boiling fats or oils with sodium hydroxide:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                fat/oil + 3NaOH → glycerol + 3 soap molecules
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              In hard water, soap forms an insoluble scum with Ca²⁺ and Mg²⁺ ions, wasting soap. Modern synthetic
              detergents (such as sodium alkylbenzenesulfonates) lather well even in hard water. Detergents must be
              biodegradable so they do not foam persistently in rivers.
            </p>
          </div>

          {/* 3.3.8 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.8 Paper and Pulp
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Paper is made from cellulose fibres. Wood or agricultural residues are converted into pulp by mechanical
              grinding or chemical digestion (the kraft process uses NaOH and Na₂S), which removes lignin and frees the
              fibres. After washing and bleaching, the pulp is spread, pressed, dried and rolled into paper. Modern
              bleaching prefers oxygen, ozone and hydrogen peroxide over chlorine gas to reduce toxic by-products.
            </p>
          </div>

          {/* 3.3.9 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.3.9 Quality Control and Safety
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Industrial products must meet specifications, so plants test raw materials, process streams and finished
              goods. Common tests include titration, pH measurement, spectroscopy, density and strength testing.
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Safety</strong> — training, protective equipment, ventilation, fire control and emergency plans.</li>
              <li>• <strong>Chemical storage</strong> — acids, alkalis and oxidizers kept apart and clearly labelled.</li>
              <li>• <strong>Waste treatment</strong> — neutralisation of acidic/alkaline effluent, settling ponds, scrubbers and
                dust filters.</li>
              <li>• <strong>Records</strong> — material safety data sheets (MSDS) and process logs for traceability.</li>
            </ul>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Chemistry Making Everyday Products
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: A Fertilizer Factory's Chain Reaction</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Natural gas makes hydrogen, air supplies nitrogen, and the Haber process combines them into ammonia.
                  That ammonia is reacted with CO₂ to make urea, which is granulated and bagged for farmers. A single
                  reaction in a converter links energy resources, agriculture and food security.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In the Haber process, 4 moles of gas (1 N₂ + 3 H₂) produce 2 moles of NH₃. Raising the pressure favours the
                side with fewer gas molecules, so high pressure shifts the equilibrium to the right, increasing the
                equilibrium yield of ammonia.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In the Haber process, a very high temperature is used because it gives the highest equilibrium yield of ammonia."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. The Haber reaction is exothermic, so high temperature actually lowers the equilibrium yield. Industry uses about 450 °C as a compromise: high enough for a good reaction rate, but not so high that the yield collapses."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Manufacturing Chemicals</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="What is the catalyst used in the contact process for making sulfuric acid?"
                options={[
                  'Iron (Fe)',
                  'Vanadium(V) oxide (V₂O₅)',
                  'Nickel (Ni)',
                  'Platinum (Pt)'
                ]}
                correctAnswer={1}
                explanation="The contact process oxidises SO₂ to SO₃ over a vanadium(V) oxide (V₂O₅) catalyst at about 450 °C. Iron is the catalyst in the Haber process."
              />

              <ExerciseQuestion
                question="In the Haber process, why is the pressure kept high (about 200 atm)?"
                options={[
                  'To make the gas escape faster',
                  'Because 4 gas molecules become 2, so high pressure favours ammonia',
                  'To decompose the ammonia',
                  'To melt the iron catalyst'
                ]}
                correctAnswer={1}
                explanation="N₂ + 3H₂ ⇌ 2NH₃ converts 4 gas molecules into 2. By Le Chatelier's principle, increasing pressure shifts the equilibrium toward the side with fewer gas molecules — the ammonia side."
              />

              <ExerciseQuestion
                question="Which reaction represents the saponification of a fat?"
                options={[
                  'fat + 3NaOH → glycerol + 3 soap molecules',
                  'fat + water → sugar + starch',
                  'limestone → lime + carbon dioxide',
                  'N₂ + 3H₂ → 2NH₃'
                ]}
                correctAnswer={0}
                explanation="Saponification is the alkaline hydrolysis of a fat or oil: boiling it with NaOH produces glycerol and the sodium salts of fatty acids, which are soap molecules."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 3.4 ================= */}
        <section id="subtopic-3.4" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            3.4. Some Manufacturing Industries in Ethiopia
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Ethiopia's manufacturing sector is growing quickly, supported by industrial parks, hydropower and a large
              domestic market. The industries below show how the chemistry from Sections 3.2 and 3.3 is applied to local
              raw materials — and what challenges remain.
            </p>
          </div>

          {/* 3.4.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.1 Sugar Industry
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Ethiopia's sugar factories — including Wonji-Shoa, Metehara, Finchaa and Tendaho — process sugar cane grown
              on nearby irrigated estates. The factories produce sugar, molasses and ethanol, and burn bagasse for
              energy. Because cane must be crushed soon after harvest to avoid sugar loss, the factory and estate are
              always close together — a clear example of raw-material-oriented siting.
            </p>
          </div>

          {/* 3.4.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.2 Cement Industry
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Cement plants such as Mugher, National, Dangote and Derba use limestone from nearby quarries. Their main
              costs are energy (kiln fuel and electricity) and transport, and their main environmental challenges are dust
              and CO₂. Modern plants use bag filters, closed storage and improved kiln control to reduce emissions.
            </p>
          </div>

          {/* 3.4.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.3 Textile and Leather Industries
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Textile factories — many located in industrial parks such as Hawassa — spin cotton into yarn, then weave,
              dye and finish fabric. Dyeing consumes large amounts of water and chemicals, so treatment plants are
              essential.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Tanneries convert hides and skins into leather using soaking, liming, tanning (often with chromium salts) and
              finishing steps. Chrome recovery and proper effluent treatment are important because chromium can be toxic
              if released untreated.
            </p>
          </div>

          {/* 3.4.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.4 Glass, Ceramics and Metal Industries
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Glass factories produce bottles and containers from silica sand, soda ash and limestone. Ceramic plants make
              tiles, sanitaryware and pottery from clay. Steel and metal workshops recycle scrap metal in electric arc
              furnaces. These industries depend heavily on reliable electricity and on the quality of local raw materials.
            </p>
          </div>

          {/* 3.4.5 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.5 Food and Beverage Processing
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300">
              Flour mills, edible-oil factories, dairies and beverage plants process cereals, oilseeds, milk and other
              farm products. Preservation relies on chemistry: controlling pH, water activity, temperature, and using
              fermentation, salting, sugaring or pasteurisation to slow spoilage.
            </p>
          </div>

          {/* 3.4.6 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.6 Fertilizer and Agro-Chemical Industries
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Ethiopia imports most of its fertilizer, but blending and production capacity is expanding. Fertilizer
              blending plants mix urea, DAP and other nutrients to match soil-test recommendations. Correct fertilizer use
              raises yields, but overuse can pollute water and soil — precise application is part of good agricultural
              chemistry.
            </p>
          </div>

          {/* 3.4.7 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            3.4.7 Challenges and Opportunities
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-3">Challenges facing Ethiopian manufacturing:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• Inconsistent energy supply and high energy costs.</li>
              <li>• Limited capital and access to modern technology.</li>
              <li>• Raw-material quality and supply fluctuations.</li>
              <li>• Competition from imported products.</li>
              <li>• Managing industrial waste and pollution as production grows.</li>
              <li>• Shortage of highly skilled technicians and engineers.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Opportunities:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• Abundant renewable hydropower for green manufacturing.</li>
              <li>• Large domestic market and a young workforce.</li>
              <li>• Local mineral and agricultural raw materials.</li>
              <li>• Industrial parks and government incentives.</li>
              <li>• Growing demand within Africa for manufactured goods.</li>
            </ul>
          </div>

          <EthiopianIndustriesGrid />

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-orange-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Industries in Practice
              </h4>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-orange-900 dark:text-orange-300 mb-2">Real-World Example: Industrial Parks and Shared Waste Treatment</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Ethiopia's industrial parks group factories together so they can share roads, electricity, water and
                  waste-treatment plants. A shared effluent plant can neutralise and treat the combined wastewater of many
                  factories far more efficiently than each plant working alone — an engineering solution to a chemistry
                  problem.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A sugar factory produces 100 tonnes of molasses per day. If fermentation converts about 50% of the sugar
                in molasses into ethanol at roughly 0.51 kg ethanol per kg sugar, the factory can estimate its daily
                ethanol output and plan distillation capacity accordingly.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Ethiopia's sugar factories produce energy from bagasse, making them partly self-sufficient in electricity."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Bagasse — the fibrous residue left after cane is crushed — is burned in boilers to raise steam. Many sugar factories generate their own electricity and can even export surplus power to the grid."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Ethiopian Industries</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which industry uses limestone as its main raw material?"
                options={[
                  'Textile manufacturing',
                  'Cement manufacturing',
                  'Leather tanning',
                  'Edible-oil refining'
                ]}
                correctAnswer={1}
                explanation="Cement is made by heating limestone with clay in a kiln. Textiles use cotton, tanneries use hides, and edible oil comes from oilseeds."
              />

              <ExerciseQuestion
                question="What is the main environmental concern of a tannery?"
                options={[
                  'It produces too much table salt',
                  'Untreated effluent containing chromium and organic waste',
                  'It releases large amounts of oxygen',
                  'It makes too much limestone dust'
                ]}
                correctAnswer={1}
                explanation="Tanneries generate large volumes of wastewater containing organic matter, lime, sulfides and chromium salts from tanning. Without treatment, these can contaminate rivers and soil."
              />

              <ExerciseQuestion
                question="Why are many factories grouped into industrial parks in Ethiopia?"
                options={[
                  'To make it easier to hide pollution',
                  'To share infrastructure such as power, water, roads and waste treatment',
                  'Because factories cannot exist outside parks',
                  'To reduce the need for raw materials'
                ]}
                correctAnswer={1}
                explanation="Industrial parks allow factories to share infrastructure and utilities, including effluent treatment. This reduces costs and makes environmental controls easier to operate and monitor."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 3 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Industrial Chemistry:</strong> Applying chemical reactions on a commercial scale while controlling cost, safety, quality, energy and waste. The typical process runs: raw materials → preparation → reaction → separation → product, with waste management throughout.</p>
            <p><strong>✓ Siting Factors:</strong> Raw materials, energy, water, transport, labour, market, capital, policy and waste disposal all influence where a plant is built.</p>
            <p><strong>✓ Natural Resources:</strong> Ethiopia has limestone, clay, silica, salt, potash and metals (non-renewable), plus sugar cane, cotton, hides and oilseeds (renewable), hydropower, geothermal, wind and solar energy.</p>
            <p><strong>✓ Key Processes:</strong> Haber process (N₂ + 3H₂ ⇌ 2NH₃, Fe catalyst, ~450 °C, ~200 atm); contact process (SO₂ → SO₃ over V₂O₅ → H₂SO₄); chlor-alkali electrolysis; cement clinker from limestone + clay; glass from silica + soda ash + limestone; saponification for soap; fermentation for ethanol.</p>
            <p><strong>✓ Ethiopian Industries:</strong> Sugar (Wonji-Shoa, Metehara, Finchaa, Tendaho), cement (Mugher, National, Dangote, Derba), textiles and leather (industrial parks, tanneries), glass, ceramics, metals, food processing and fertilizer blending.</p>
            <p><strong>✓ Key Insight:</strong> A resource is only valuable when chemistry, energy and engineering can turn it into a safe, affordable product — and a well-designed industry recycles its by-products instead of dumping them.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 2
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 4
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter3;
