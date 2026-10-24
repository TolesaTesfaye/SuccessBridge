import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          THE LIVING WORLD
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-600 to-lime-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              What is Living?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Life is a complex phenomenon that distinguishes living organisms from non-living things. Understanding 
              the characteristics of life helps us define and classify the incredible diversity of organisms on Earth.
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800 mb-6">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-3">
                🌱 Characteristics of Living Organisms
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Growth", desc: "Increase in size and mass" },
                  { title: "Reproduction", desc: "Production of offspring" },
                  { title: "Metabolism", desc: "Chemical processes for energy" },
                  { title: "Organization", desc: "Complex structural organization" },
                  { title: "Response", desc: "React to environmental stimuli" },
                  { title: "Adaptation", desc: "Evolve over time" }
                ].map((char, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <h5 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {char.title}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {char.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Biodiversity
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Biodiversity refers to the variety of life on Earth, including the diversity of species, genes, and 
              ecosystems. Earth is home to millions of species, each adapted to their environment.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">
                  Genetic Diversity
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Variation in genes within species
                </p>
              </div>

              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                  Species Diversity
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Variety of different species
                </p>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
                  Ecosystem Diversity
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Variety of habitats and ecosystems
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                1.3
              </span>
              Taxonomic Categories
            </h3>
            <p className="text-slate-300 mb-6">
              Taxonomy is the science of classifying organisms into groups based on their characteristics and 
              evolutionary relationships. The taxonomic hierarchy organizes life from broad to specific categories.
            </p>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-emerald-400 font-bold mb-4 text-lg">
                Taxonomic Hierarchy (Broadest to Most Specific)
              </h4>
              <div className="space-y-3">
                {[
                  { level: "Kingdom", example: "Animalia", desc: "Largest group" },
                  { level: "Phylum", example: "Chordata", desc: "Major body plan" },
                  { level: "Class", example: "Mammalia", desc: "Warm-blooded vertebrates" },
                  { level: "Order", example: "Primates", desc: "Monkeys, apes, humans" },
                  { level: "Family", example: "Hominidae", desc: "Great apes" },
                  { level: "Genus", example: "Homo", desc: "Modern humans and ancestors" },
                  { level: "Species", example: "sapiens", desc: "Modern humans" }
                ].map((tax, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-800 rounded-lg p-4">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-white">{tax.level}</span>
                        <span className="text-emerald-400 italic">{tax.example}</span>
                      </div>
                      <p className="text-sm text-slate-400">{tax.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Nomenclature
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Biological nomenclature is the formal system of naming organisms. The binomial nomenclature system, 
              developed by Carl Linnaeus, gives each species a unique two-part scientific name.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3 text-lg">
                Binomial Nomenclature Rules
              </h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1.</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    <strong>Two-part name:</strong> Genus name + species epithet (e.g., <em>Homo sapiens</em>)
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">2.</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    <strong>Genus capitalized:</strong> First letter of genus is always capitalized
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">3.</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    <strong>Species lowercase:</strong> Species epithet is always lowercase
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">4.</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    <strong>Italicized:</strong> Scientific names are written in italics or underlined
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white mb-3">Examples:</h5>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="italic font-semibold">Panthera leo</span> - Lion
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="italic font-semibold">Canis lupus</span> - Wolf
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="italic font-semibold">Mangifera indica</span> - Mango
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-emerald-600 to-lime-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-emerald-50">
            <p>✓ Living organisms show characteristics: growth, reproduction, metabolism, response, and adaptation</p>
            <p>✓ Biodiversity encompasses genetic, species, and ecosystem diversity</p>
            <p>✓ Taxonomy classifies organisms into hierarchical categories from Kingdom to Species</p>
            <p>✓ Binomial nomenclature provides a universal system for naming species</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
