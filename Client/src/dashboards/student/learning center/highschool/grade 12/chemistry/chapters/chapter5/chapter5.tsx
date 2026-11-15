import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  GreenhouseEffectDiagram,
  PollutionTypesGrid,
  WaterTreatmentDiagram,
  GreenChemistryPrinciplesGrid,
} from "../../components/ChemDiagrams";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter5: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 5
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 md:mb-6 tracking-tight">
          INTRODUCTION TO ENVIRONMENTAL CHEMISTRY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Environmental chemistry studies what happens to chemicals in air, water, soil and living things — where they
          come from, how they react, and how they affect health and ecosystems. It explains why a river can die from
          fertilizer runoff, why a city chokes on smog, why the planet is warming, and how green chemistry can design
          pollution out of existence before it is created.
        </p>
      </div>

      <div className="space-y-10 md:space-y-16 pb-12 md:pb-20 px-2 sm:px-4 md:px-8">

        {/* ================= SECTION 5.1 ================= */}
        <section id="subtopic-5.1" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            5.1. Introduction
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The environment is a giant chemical system. Gases mix and react in the atmosphere, substances dissolve and
              travel in water, minerals and pollutants bind to soil, and living organisms absorb and transform chemicals.
              <strong> Environmental chemistry</strong> uses the principles of chemistry to understand these processes and
              to protect human health and ecosystems.
            </p>
          </div>

          {/* 5.1.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.1.1 What Is Environmental Chemistry?
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Environmental chemistry is the study of the <strong>sources, reactions, transport, effects and fate</strong> of
              chemical species in the environment. It asks questions such as:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• Where does a pollutant come from, and how much is released?</li>
              <li>• How does it move through air, water and soil?</li>
              <li>• What chemical reactions does it undergo, and how fast?</li>
              <li>• What concentration becomes harmful to people and ecosystems?</li>
              <li>• How can we prevent, remove or neutralise it?</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              It is closely linked to <strong>environmental science</strong>, but its focus is the chemistry: reaction
              pathways, equilibria, kinetics, solubility and toxicity.
            </p>
          </div>

          {/* 5.1.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.1.2 The Spheres of the Environment
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Environmental chemists divide the environment into four interacting spheres:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Atmosphere</strong> — the layer of gases around Earth (N₂, O₂, Ar, CO₂, water vapour).</li>
              <li>• <strong>Hydrosphere</strong> — all water: oceans, lakes, rivers, groundwater and rain.</li>
              <li>• <strong>Lithosphere</strong> — the solid crust: rocks, soil and sediments.</li>
              <li>• <strong>Biosphere</strong> — all living organisms and organic matter.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Chemicals constantly move between spheres. SO₂ released into the atmosphere dissolves in rain and enters
              the hydrosphere and lithosphere; plants absorb CO₂ from the atmosphere and carbon from the soil; fertilizers
              applied to the lithosphere dissolve into groundwater. Pollution in one sphere quickly becomes pollution in
              the others.
            </p>
          </div>

          {/* 5.1.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.1.3 Pollution and Pollutants
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Pollution</strong> is the introduction of harmful substances or forms of energy into the environment
              at concentrations that cause harm. A <strong>pollutant</strong> is the substance or agent responsible.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Pollutants are classified in several useful ways:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Primary pollutants</strong> — released directly into the environment (CO from vehicle exhaust,
                SO₂ from burning fuel).</li>
              <li>• <strong>Secondary pollutants</strong> — formed in the environment by reactions between primary pollutants
                (ozone and PAN in smog, sulfuric acid in acid rain).</li>
              <li>• <strong>Point-source pollutants</strong> — released from a single identifiable place (a factory pipe, a
                tannery outfall).</li>
              <li>• <strong>Non-point-source pollutants</strong> — come from many diffuse places (fertilizer washed from farms,
                runoff from streets).</li>
              <li>• <strong>Biodegradable pollutants</strong> — broken down by microorganisms (sewage, food waste).</li>
              <li>• <strong>Non-biodegradable pollutants</strong> — persist for a long time (plastics, heavy metals, DDT).</li>
              <li>• <strong>Local, regional or global pollutants</strong> — depending on how far they spread.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              A useful distinction: a <strong>contaminant</strong> is simply something present where it does not normally
              belong; it becomes a <strong>pollutant</strong> when it causes harm. Even water can be a pollutant if it floods
              and erodes land.
            </p>
          </div>

          {/* 5.1.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.1.4 Environmental Chemistry in Ethiopia
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Ethiopia's environmental challenges combine rapid urbanisation, industrial growth and a farming system that
              depends directly on rainfall:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Air quality</strong> — vehicle exhaust and dust in Addis Ababa; smoke from biomass cooking in
                rural homes.</li>
              <li>• <strong>Water quality</strong> — industrial and domestic effluent entering rivers such as the Little
                Akaki; nutrient pollution in Rift Valley lakes.</li>
              <li>• <strong>Soil</strong> — erosion, overuse of fertilizers and pesticides, and salinity in irrigated areas.</li>
              <li>• <strong>Solid waste</strong> — growing municipal waste streams and plastic litter.</li>
              <li>• <strong>Climate</strong> — high vulnerability to drought and floods even though national emissions are
                low.</li>
            </ul>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-violet-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Environmental Chemistry in Action
              </h4>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-2">Real-World Example: Following a Pollutant</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Sulfur dioxide from burning fuel leaves a chimney (atmosphere), dissolves in cloud droplets to form
                  sulfuric acid, falls as acid rain (hydrosphere), acidifies soil and leaches aluminium (lithosphere), and
                  then damages tree roots and fish (biosphere). Tracking one pollutant through all four spheres is exactly
                  what environmental chemistry does.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Ozone formed in smog is a primary pollutant because it is released directly by vehicles."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Ozone in smog is a secondary pollutant: it is not emitted directly but forms when nitrogen oxides and volatile organic compounds react in sunlight. The vehicle emissions that feed it are the primary pollutants."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Introduction to Environmental Chemistry</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which of the following is part of the hydrosphere?"
                options={[
                  'Groundwater',
                  'Limestone rock',
                  'Oxygen gas',
                  'Soil bacteria'
                ]}
                correctAnswer={0}
                explanation="The hydrosphere consists of all water — oceans, lakes, rivers, groundwater and rain. Limestone is part of the lithosphere, oxygen gas the atmosphere, and soil bacteria the biosphere."
              />

              <ExerciseQuestion
                question="Fertilizer washed from many different farms into a river is best described as:"
                options={[
                  'A primary point-source pollutant',
                  'A non-point-source pollutant',
                  'A secondary pollutant',
                  'A non-biodegradable pollutant'
                ]}
                correctAnswer={1}
                explanation="The fertilizer comes from many diffuse farms rather than one pipe or outlet, so it is a non-point-source pollutant. Its exact source is hard to identify, which makes it difficult to control."
              />

              <ExerciseQuestion
                question="A contaminant becomes a pollutant when it:"
                options={[
                  'Is present in any amount',
                  'Causes harm to health or the environment',
                  'Dissolves in water',
                  'Comes from a factory'
                ]}
                correctAnswer={1}
                explanation="A contaminant is something present where it does not normally belong. It becomes a pollutant only when its concentration or form causes harm to living things or the environment."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 5.2 ================= */}
        <section id="subtopic-5.2" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            5.2. Environmental Pollution
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Pollution affects every sphere of the environment. In each case, the chemistry is the same story: a
              substance is released, it reacts or accumulates, and it disrupts a natural balance. Understanding the
              chemistry is the key to controlling it.
            </p>
          </div>

          {/* 5.2.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.2.1 Air Pollution
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Air pollution is the presence of harmful gases, particles or vapours in the atmosphere. The main pollutants
              and their effects are:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Carbon monoxide (CO)</strong> — from incomplete combustion; binds to haemoglobin and reduces oxygen
                transport in the blood.</li>
              <li>• <strong>Sulfur dioxide (SO₂)</strong> — from burning sulfur-containing fuel; irritates the lungs and
                causes acid rain.</li>
              <li>• <strong>Nitrogen oxides (NOₓ)</strong> — from vehicle engines and combustion; contribute to smog and acid
                rain.</li>
              <li>• <strong>Particulate matter (PM)</strong> — fine dust and smoke; PM2.5 penetrates deep into the lungs and
                bloodstream.</li>
              <li>• <strong>Ozone (O₃) and PAN</strong> — secondary pollutants formed in sunlight; cause photochemical smog and
                damage crops.</li>
              <li>• <strong>Volatile organic compounds (VOCs)</strong> — solvents and fuels that evaporate and fuel smog
                formation.</li>
              <li>• <strong>Lead and other heavy metals</strong> — from old fuel additives and industry; damage the nervous
                system.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Two important secondary effects:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Acid rain</strong> — SO₂ and NOₓ dissolve in rain to form sulfuric and nitric acids (pH below
                about 5.6). It acidifies lakes and soils, leaches nutrients, releases toxic aluminium and corrodes
                buildings: CaCO₃ + H₂SO₄ → CaSO₄ + CO₂ + H₂O.</li>
              <li>• <strong>Photochemical smog</strong> — NOₓ and VOCs react in sunlight to form ozone and peroxyacyl
                nitrates, producing a brown haze, eye irritation and crop damage.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Control measures:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• Cleaner fuels and renewable energy instead of coal and wood.</li>
              <li>• Catalytic converters on vehicles; regular vehicle inspection.</li>
              <li>• Scrubbers that remove SO₂ from flue gases: CaCO₃ + SO₂ → CaSO₃ + CO₂.</li>
              <li>• Bag filters and electrostatic precipitators to capture particulate matter.</li>
              <li>• Improved cookstoves and better ventilation to reduce indoor smoke.</li>
            </ul>
          </div>

          <PollutionTypesGrid />

          {/* 5.2.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.2.2 Water Pollution
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Water pollution is the contamination of water bodies by substances that make them unsafe or harmful.
              Common types include:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Organic waste</strong> (sewage, food processing) — microorganisms decompose it and consume
                dissolved oxygen. This is measured as <strong>BOD</strong> (biochemical oxygen demand); high BOD means heavy
                pollution and can suffocate fish.</li>
              <li>• <strong>Nutrients</strong> (nitrates and phosphates from fertilizers and detergents) — cause
                <strong> eutrophication</strong>: algae bloom, then die and decompose, consuming oxygen and killing the lake.</li>
              <li>• <strong>Heavy metals</strong> (lead, mercury, chromium, cadmium) — toxic and non-biodegradable; they
                accumulate in sediments and food chains.</li>
              <li>• <strong>Pathogens</strong> — bacteria, viruses and parasites from human and animal waste cause diseases such
                as cholera, typhoid and dysentery.</li>
              <li>• <strong>Oil and industrial chemicals</strong> — smother aquatic life and persist for years.</li>
              <li>• <strong>Thermal pollution</strong> — hot cooling water lowers dissolved oxygen and stresses fish.</li>
              <li>• <strong>Fluoride</strong> — in some Rift Valley groundwater, natural fluoride is high enough to cause
                dental and skeletal fluorosis with long-term use.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              In Ethiopia, rivers flowing through cities and industrial areas — such as the Little Akaki in Addis Ababa —
              receive untreated domestic and industrial wastewater, while textile, tannery and food-processing plants add
              colour, salt, chromium and organic load. Treatment before discharge is essential.
            </p>
          </div>

          <WaterTreatmentDiagram />

          {/* 5.2.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.2.3 Soil Pollution
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Soil pollution is the build-up of harmful substances in soil, reducing fertility and entering the food
              chain. Major causes include:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Excess fertilizers</strong> — nitrogen and phosphorus accumulate, leach into groundwater and cause
                salinity.</li>
              <li>• <strong>Pesticides and herbicides</strong> — persistent compounds kill soil organisms and can accumulate in
                crops.</li>
              <li>• <strong>Heavy metals</strong> — from mining, smelting, batteries and contaminated irrigation water.</li>
              <li>• <strong>Industrial waste and oil spills</strong> — hydrocarbons and solvents damage soil structure and
                biology.</li>
              <li>• <strong>Plastic waste</strong> — blocks water movement and breaks down into microplastics.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Remediation options include removing contaminated soil, washing it, treating it with microbes
              (bioremediation), adding lime to reduce acidity, and switching to integrated pest management so fewer
              chemicals are applied.
            </p>
          </div>

          {/* 5.2.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.2.4 Solid Waste Management
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Solid waste includes household refuse, commercial waste, construction debris, plastics and electronic
              waste. Poorly managed waste pollutes air, water and soil and provides breeding grounds for disease.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">The waste-management hierarchy, from best to worst:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Prevent</strong> — avoid producing waste in the first place.</li>
              <li>• <strong>Reduce</strong> — use less packaging and fewer disposable items.</li>
              <li>• <strong>Reuse</strong> — refill bottles, repair items, pass on clothes.</li>
              <li>• <strong>Recycle</strong> — separate plastics, paper, metals and glass.</li>
              <li>• <strong>Recover</strong> — compost organic waste; capture methane or burn for energy.</li>
              <li>• <strong>Dispose</strong> — sanitary landfill as the last option, engineered to prevent leaching.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              In Addis Ababa, the Reppie waste-to-energy facility burns municipal waste to generate electricity, while
              the closure of the old Koshe dump shows the move toward engineered disposal. Separation at source is the
              step that makes recycling possible.
            </p>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-orange-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Pollution Chemistry in Context
              </h4>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-orange-900 dark:text-orange-300 mb-2">Real-World Example: Why a Lake Turns Green</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Fertilizer runoff adds nitrate and phosphate to a lake. Algae grow rapidly (a bloom), turning the water
                  green. When the algae die, bacteria decompose them and consume dissolved oxygen. The oxygen level drops,
                  fish suffocate, and the water may become foul-smelling. This chain — nutrient enrichment → bloom →
                  decomposition → oxygen depletion — is eutrophication.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A water sample has a BOD of 5 mg/L, while a polluted river sample has a BOD of 80 mg/L. The higher value
                means far more dissolved oxygen is being consumed by microorganisms — roughly 16 times as much organic
                matter to decompose.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: A high BOD value usually indicates cleaner water."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. BOD measures the oxygen consumed by microorganisms decomposing organic matter. A high BOD means a lot of organic pollution and low dissolved oxygen, which harms fish and other aquatic life."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Environmental Pollution</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Acid rain is mainly caused by:"
                options={[
                  'Carbon dioxide dissolving in rain',
                  'Sulfur dioxide and nitrogen oxides dissolving in rain',
                  'Oxygen reacting with water',
                  'Methane escaping from landfills'
                ]}
                correctAnswer={1}
                explanation="SO₂ and NOₓ released by burning fuels dissolve in rainwater to form sulfuric and nitric acids, lowering the pH below about 5.6. CO₂ also acidifies rain slightly, but acid rain is dominated by SO₂ and NOₓ."
              />

              <ExerciseQuestion
                question="Eutrophication of a lake is caused mainly by excess:"
                options={[
                  'Dissolved oxygen',
                  'Nitrates and phosphates',
                  'Heavy metals',
                  'Suspended clay'
                ]}
                correctAnswer={1}
                explanation="Nitrates and phosphates act as nutrients, causing algal blooms. When the algae decompose, oxygen is consumed and the lake ecosystem suffers."
              />

              <ExerciseQuestion
                question="Which is the BEST option in the waste-management hierarchy?"
                options={[
                  'Sanitary landfill',
                  'Preventing waste from being produced',
                  'Burning all waste',
                  'Dumping waste in rivers'
                ]}
                correctAnswer={1}
                explanation="Prevention is the most effective option because no waste has to be treated, transported or disposed of. Reduction, reuse, recycling and recovery follow, with landfill as the last resort."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 5.3 ================= */}
        <section id="subtopic-5.3" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            5.3. Global Warming and Climate Change
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Earth's climate depends on a delicate energy balance: sunlight comes in, and heat goes out. Certain gases in
              the atmosphere trap some of the outgoing heat, keeping the planet warm enough for life. Human activities
              have increased those gases, strengthening the effect and changing the climate.
            </p>
          </div>

          {/* 5.3.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.3.1 The Greenhouse Effect
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Incoming sunlight passes through the atmosphere and warms Earth's surface. The surface then radiates heat as
              infrared radiation. <strong>Greenhouse gases</strong> absorb some of this infrared radiation and re-emit it in
              all directions, including back toward Earth. This natural <strong>greenhouse effect</strong> keeps Earth's
              average temperature about 33 °C warmer than it would otherwise be.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              The <strong>enhanced greenhouse effect</strong> is the extra warming caused by human additions of greenhouse
              gases. More gas means more infrared radiation is absorbed and returned, so the planet gradually warms.
            </p>
          </div>

          <GreenhouseEffectDiagram />

          {/* 5.3.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.3.2 Greenhouse Gases and Their Sources
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Carbon dioxide (CO₂)</strong> — burning fossil fuels, cement production, deforestation. The
                largest contribution.</li>
              <li>• <strong>Methane (CH₄)</strong> — livestock, rice paddies, landfills, natural gas leaks, biomass burning.
                A much stronger greenhouse gas per molecule than CO₂.</li>
              <li>• <strong>Nitrous oxide (N₂O)</strong> — fertilizers, industrial processes; long-lived and powerful.</li>
              <li>• <strong>Water vapour</strong> — the most abundant greenhouse gas; increases as temperatures rise, amplifying
                warming.</li>
              <li>• <strong>Chlorofluorocarbons (CFCs) and other halocarbons</strong> — refrigerants and industrial gases; very
                strong greenhouse gases and also destroy ozone.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Different gases have different <strong>global warming potentials (GWPs)</strong>: over 100 years, one
              molecule of methane traps roughly 28–30 times as much heat as one molecule of CO₂, and some CFCs trap
              thousands of times more. Emissions are therefore often expressed as <strong>CO₂-equivalent</strong>.
            </p>
          </div>

          {/* 5.3.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.3.3 Climate Change and Its Impacts
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The extra heat is changing the climate system: average temperatures rise, ice sheets melt, sea level
              rises, and extreme weather becomes more frequent and intense.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Impacts that matter especially in Ethiopia:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Droughts and unreliable rain</strong> — rain-fed teff, wheat and maize harvests become riskier.</li>
              <li>• <strong>Floods</strong> — intense rainfall damages roads, homes and crops.</li>
              <li>• <strong>Coffee growing zones</strong> — warming shifts suitable coffee areas and affects quality.</li>
              <li>• <strong>Water stress</strong> — shrinking lakes and reduced river flow affect irrigation and hydropower.</li>
              <li>• <strong>Health</strong> — heat stress, expanded ranges of malaria-carrying mosquitoes and water-borne
                diseases after floods.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Ethiopia's emissions are small, but its vulnerability is high because farming depends on rainfall and
              because poverty limits the ability to adapt.
            </p>
          </div>

          {/* 5.3.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.3.4 Ozone Depletion: A Related but Different Problem
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The ozone layer in the stratosphere absorbs harmful ultraviolet (UV) radiation. CFCs released at ground
              level slowly rise to the stratosphere, where UV light breaks them apart and releases chlorine atoms. Each
              chlorine atom can destroy thousands of ozone molecules:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Cl• + O₃ → ClO• + O₂
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Thinning of the ozone layer allows more UV radiation to reach the surface, causing skin cancer, cataracts
              and damage to crops and marine life.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Ozone depletion and global warming are <strong>different problems</strong>: ozone depletion is about UV
              protection in the stratosphere, while global warming is about heat trapping. They are linked because CFCs
              both destroy ozone and act as greenhouse gases. The <strong>Montreal Protocol</strong> phased out ozone-
              depleting substances and is one of the most successful environmental agreements in history.
            </p>
          </div>

          {/* 5.3.5 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.3.5 Mitigation and Adaptation
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Responses to climate change fall into two categories:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Mitigation</strong> — reducing greenhouse-gas emissions to slow warming: renewable energy
                (hydropower, wind, solar, geothermal), energy efficiency, public transport, afforestation, improved
                cookstoves, avoiding deforestation and better waste management.</li>
              <li>• <strong>Adaptation</strong> — adjusting to the changes already happening: drought-resistant crop
                varieties, irrigation and water harvesting, early-warning systems, flood defences, and climate-smart
                farming.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A <strong>carbon footprint</strong> measures the greenhouse gases produced by a person, product or activity,
              usually in tonnes of CO₂-equivalent per year. Reducing it means using less energy, eating less wastefully,
              travelling more efficiently and choosing renewable options.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Ethiopia's <strong>Green Legacy</strong> tree-planting campaign, its hydropower expansion and its
              climate-resilient green economy strategy are examples of national efforts that combine mitigation with
              adaptation.
            </p>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-blue-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Climate Chemistry at Home
              </h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Real-World Example: Improved Cookstoves</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Traditional open fires and simple stoves burn wood inefficiently, releasing soot, carbon monoxide and
                  methane. Improved cookstoves burn fuel more completely, reducing indoor smoke (protecting health) and
                  cutting greenhouse-gas emissions. It is a small technology with a large environmental and health
                  benefit.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                One tonne of methane has the same 100-year warming effect as about 28 tonnes of CO₂. If a landfill
                captures 10 tonnes of methane that would otherwise escape, the climate benefit is equivalent to avoiding
                about 280 tonnes of CO₂ emissions.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Ozone depletion and global warming are the same environmental problem."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Ozone depletion is the thinning of the stratospheric ozone layer, which increases UV radiation reaching Earth. Global warming is the trapping of extra heat by greenhouse gases. They are related — CFCs contribute to both — but they are distinct problems."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Global Warming and Climate Change</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which gas contributes MOST to human-caused global warming?"
                options={[
                  'Carbon dioxide (CO₂)',
                  'Oxygen (O₂)',
                  'Nitrogen (N₂)',
                  'Argon (Ar)'
                ]}
                correctAnswer={0}
                explanation="CO₂ from burning fossil fuels, cement production and deforestation is the largest single contributor to human-caused warming. O₂, N₂ and Ar do not trap infrared radiation in the same way."
              />

              <ExerciseQuestion
                question="Planting trees helps mitigate climate change because trees:"
                options={[
                  'Absorb CO₂ from the atmosphere as they grow',
                  'Increase the ozone layer',
                  'Stop all rainfall',
                  'Emit methane'
                ]}
                correctAnswer={0}
                explanation="Trees take up CO₂ during photosynthesis and store carbon in wood and soil, removing it from the atmosphere. Their shade and water cycling can also support local adaptation."
              />

              <ExerciseQuestion
                question="Which of these is an example of ADAPTATION rather than mitigation?"
                options={[
                  'Building a wind farm',
                  'Switching to solar electricity',
                  'Planting drought-resistant crop varieties',
                  'Improving energy efficiency in factories'
                ]}
                correctAnswer={2}
                explanation="Adaptation means adjusting to the climate changes already occurring, such as using drought-resistant crops or irrigation. Wind farms, solar power and energy efficiency reduce emissions, so they are mitigation."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 5.4 ================= */}
        <section id="subtopic-5.4" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            5.4. Green Chemistry and Cleaner Production
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The most effective way to deal with pollution is to prevent it. <strong>Green chemistry</strong> designs
              chemical products and processes that reduce or eliminate the use and generation of hazardous substances,
              while <strong>cleaner production</strong> applies the same idea to industrial operations: use resources
              efficiently and avoid waste at every step.
            </p>
          </div>

          {/* 5.4.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.4.1 The Principles of Green Chemistry
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Green chemistry is guided by twelve principles (often associated with Paul Anastas and John Warner). They
              aim to make a chemical process safer for workers, communities and the environment:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• Prevent waste rather than treat it after it is formed.</li>
              <li>• Maximise atom economy so most reactant atoms end up in the product.</li>
              <li>• Use less hazardous synthetic routes and safer chemicals.</li>
              <li>• Choose safer solvents — water instead of organic solvents where possible.</li>
              <li>• Design for energy efficiency (room temperature and pressure where feasible).</li>
              <li>• Use renewable feedstocks and catalysis.</li>
              <li>• Design products to degrade safely after use.</li>
              <li>• Monitor processes in real time to prevent pollution.</li>
            </ul>
          </div>

          <GreenChemistryPrinciplesGrid />

          {/* 5.4.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.4.2 Atom Economy and Waste Prevention
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Atom economy</strong> measures how much of the reactant mass ends up in the desired product. A high
              atom economy means fewer by-products and less waste:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Atom economy = (molar mass of desired product ÷ total molar mass of all reactants) × 100%
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Worked example — urea synthesis:</strong> CO₂ + 2NH₃ → CO(NH₂)₂ + H₂O. The desired product is urea
              (60 g/mol). The reactants are CO₂ (44 g/mol) and two NH₃ (2 × 17 = 34 g/mol), total 78 g/mol.
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Atom economy = (60 ÷ 78) × 100% ≈ 76.9%
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              About 23% of the reactant mass becomes water rather than urea. In contrast, a reaction with 100% atom
              economy — such as N₂ + 3H₂ → 2NH₃, where all atoms end up in ammonia — produces no by-product.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              Green chemistry also considers the <strong>yield</strong>, <strong>selectivity</strong>, <strong>energy use</strong>
              and <strong>toxicity</strong> of a process, not only atom economy. A reaction can have excellent atom economy
              but still be unacceptable if it needs dangerous reagents or huge amounts of energy.
            </p>
          </div>

          {/* 5.4.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.4.3 Cleaner Production in Ethiopian Industry
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Cleaner production means improving processes and housekeeping so that less pollution is generated in the
              first place. Examples relevant to Ethiopia:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Cement</strong> — capture kiln dust with bag filters and return it to the process; improve kiln
                efficiency; use alternative fuels carefully.</li>
              <li>• <strong>Tanneries</strong> — recover chromium from spent tanning liquors and reuse it; treat effluent to
                remove sulfides and organic matter.</li>
              <li>• <strong>Textiles</strong> — recycle dyeing rinse water, use low-water dyeing, recover heat and treat
                effluent before discharge.</li>
              <li>• <strong>Sugar and ethanol</strong> — burn bagasse for cogeneration, use molasses for ethanol, return
                filter mud to fields and recycle cooling water.</li>
              <li>• <strong>Food processing</strong> — separate solid waste for animal feed or compost, and reduce water use
                in cleaning.</li>
              <li>• <strong>Cross-cutting</strong> — energy audits, preventive maintenance, staff training, and environmental
                management systems such as ISO 14001.</li>
            </ul>
          </div>

          {/* 5.4.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            5.4.4 Sustainable Development and the Individual
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Sustainable development meets present needs without compromising the ability of future generations to meet
              theirs. The United Nations Sustainable Development Goals (SDGs) include clean water (SDG 6), affordable
              clean energy (SDG 7), responsible consumption and production (SDG 12) and climate action (SDG 13) — all
              directly linked to environmental chemistry.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">What individuals can do:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• Apply the 3Rs: reduce, reuse, recycle — and refuse single-use plastics.</li>
              <li>• Save energy and water at home; switch off unused appliances.</li>
              <li>• Use public transport, walk or cycle where possible.</li>
              <li>• Avoid burning waste; compost food scraps.</li>
              <li>• Support tree planting and care for trees after planting.</li>
              <li>• Choose products with less packaging and safer, biodegradable materials.</li>
            </ul>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Green Chemistry in Practice
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Recovery Instead of Discharge</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  A tannery that recovers chromium from its spent tanning liquor turns a toxic waste into a reusable raw
                  material. The company saves money on chromium purchases, reduces the load on its effluent plant and
                  protects the river downstream — a textbook cleaner-production win that is simultaneously economic and
                  environmental.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Green chemistry mainly means cleaning up pollution after it has been produced."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Green chemistry focuses on preventing pollution by designing safer processes and products from the start. Cleaning up pollution after it is released is remediation — important, but not the same as prevention."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Green Chemistry and Cleaner Production</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Atom economy is calculated as:"
                options={[
                  'Mass of product ÷ mass of catalyst',
                  '(Molar mass of desired product ÷ total molar mass of reactants) × 100%',
                  'Volume of product ÷ volume of solvent',
                  'Number of products ÷ number of reactants'
                ]}
                correctAnswer={1}
                explanation="Atom economy compares the molar mass of the desired product with the total molar mass of all reactants, expressed as a percentage. A higher value means less waste."
              />

              <ExerciseQuestion
                question="Which action is an example of cleaner production?"
                options={[
                  'Dumping untreated effluent into a river',
                  'Recovering chromium from tannery waste and reusing it',
                  'Burning plastic waste in the open',
                  'Using more water to dilute pollutants'
                ]}
                correctAnswer={1}
                explanation="Recovering and reusing chromium prevents pollution at the source and saves raw material. Dumping, open burning and dilution do not reduce the pollutant — they only move or spread it."
              />

              <ExerciseQuestion
                question="Which of the following best represents the 3Rs?"
                options={[
                  'Restore, remove, replace',
                  'Reduce, reuse, recycle',
                  'React, release, recover',
                  'Run, remove, return'
                ]}
                correctAnswer={1}
                explanation="The 3Rs are Reduce (use less), Reuse (use items again) and Recycle (process materials into new products). They form the practical everyday version of green chemistry and the waste hierarchy."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 5 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Environmental Chemistry:</strong> The study of the sources, reactions, transport, effects and fate of chemicals in the atmosphere, hydrosphere, lithosphere and biosphere.</p>
            <p><strong>✓ Pollution:</strong> Air pollutants (SO₂, NOₓ, CO, PM, O₃, VOCs) cause smog and acid rain; water pollutants cause oxygen depletion and eutrophication, measured by BOD; soil pollutants damage fertility; solid waste is managed through the waste hierarchy.</p>
            <p><strong>✓ Greenhouse Effect:</strong> CO₂, CH₄, N₂O, water vapour and CFCs absorb infrared radiation and warm Earth. Human emissions enhance the effect, causing climate change — with droughts, floods and food insecurity in Ethiopia. Ozone depletion is a separate but related problem.</p>
            <p><strong>✓ Mitigation and Adaptation:</strong> Reduce emissions with renewable energy, efficiency, afforestation and better waste management; adapt with drought-resistant crops, irrigation and early-warning systems.</p>
            <p><strong>✓ Green Chemistry:</strong> Twelve principles guide the design of safer, waste-free processes. Atom economy = (desired product mass ÷ total reactant mass) × 100%. Cleaner production applies this to industry, e.g. chromium recovery, bagasse cogeneration and water recycling.</p>
            <p><strong>✓ Key Insight:</strong> Chemistry created many environmental problems, but it also provides the understanding and tools to solve them — provided we design for prevention rather than clean-up.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 4
          </button>

          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            End of Book
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter5;
