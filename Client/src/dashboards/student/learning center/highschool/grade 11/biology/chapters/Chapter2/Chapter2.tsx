import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  CircleDot,
  Clock,
  Dna,
  Droplets,
  Eye,
  FlaskConical,
  Layers,
  Leaf,
  Lightbulb,
  Microscope,
  Scale,
  ShieldAlert,
  Split,
  Target,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";

interface ChapterProps {
  selectedSubtopic?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ExerciseProps {
  number: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

const Exercise: React.FC<ExerciseProps> = ({ number, question, answer }) => (
  <div className="bg-slate-50 dark:bg-slate-950/40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 relative mt-10">
    <div className="absolute -top-5 left-8 bg-white dark:bg-slate-900 px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
      <BookOpen size={16} className="text-emerald-500" />
      Inline Exercise {number}
    </div>
    <div className="mt-2">
      <div className="font-medium text-slate-800 dark:text-slate-200 mb-4">
        {question}
      </div>
      <details className="group">
        <summary className="cursor-pointer text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20 text-sm inline-block">
            Show Answer 👀
          </span>
          <span className="hidden group-open:inline-block border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-900/20 text-sm">
            Hide Answer
          </span>
        </summary>
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-200 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-sm leading-relaxed">
          {answer}
        </div>
      </details>
    </div>
  </div>
);

const cellTheoryTimeline = [
  {
    year: "1665",
    name: "Robert Hooke",
    text: "Observed box-like compartments in cork using a simple microscope and called them “cells”.",
  },
  {
    year: "1674",
    name: "Anton van Leeuwenhoek",
    text: "Used improved lenses to observe living cells — bacteria and protozoa — for the first time.",
  },
  {
    year: "1838",
    name: "Matthias Schleiden",
    text: "Concluded that all plants are composed of cells.",
  },
  {
    year: "1839",
    name: "Theodor Schwann",
    text: "Extended the idea to animals and proposed the cell theory together with Schleiden.",
  },
  {
    year: "1855",
    name: "Rudolf Virchow",
    text: "Stated “Omnis cellula e cellula” — every new cell arises from a pre-existing cell.",
  },
];

const organelles = [
  {
    name: "Mitochondrion",
    nickname: "Powerhouse of the cell",
    icon: Zap,
    iconClass: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    structure:
      "Double membrane; the inner membrane folds inward to form cristae, enclosing a fluid matrix.",
    fn: "Performs aerobic respiration and produces most of the cell’s ATP. Contains its own circular DNA and 70S ribosomes.",
    foundIn: "Plant and animal cells",
  },
  {
    name: "Ribosome",
    nickname: "Protein factory",
    icon: CircleDot,
    iconClass: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
    structure:
      "Tiny, non-membrane-bound particle made of rRNA and protein. 80S in eukaryotic cytoplasm, 70S in prokaryotes and organelles.",
    fn: "Site of protein synthesis (translation). Free ribosomes make cytosolic proteins; bound ribosomes make proteins for export.",
    foundIn: "All cells",
  },
  {
    name: "Rough ER",
    nickname: "Protein highway",
    icon: Workflow,
    iconClass: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    structure:
      "Network of flattened membrane sacs studded with ribosomes and connected to the nuclear envelope.",
    fn: "Synthesizes, folds, and transports proteins destined for the membrane, lysosomes, or secretion.",
    foundIn: "Plant and animal cells",
  },
  {
    name: "Smooth ER",
    nickname: "Lipid workshop",
    icon: Droplets,
    iconClass: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
    structure: "Tubular membrane network with no ribosomes attached.",
    fn: "Synthesizes lipids and steroids, detoxifies drugs and poisons (liver), and stores calcium ions (muscle).",
    foundIn: "Plant and animal cells",
  },
  {
    name: "Golgi apparatus",
    nickname: "Post office of the cell",
    icon: Boxes,
    iconClass: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    structure:
      "Stack of flattened, membrane-bound sacs (cisternae) with vesicles budding from the edges.",
    fn: "Modifies, sorts, and packages proteins and lipids; forms lysosomes and secretory vesicles.",
    foundIn: "Plant and animal cells",
  },
  {
    name: "Lysosome",
    nickname: "Recycling centre",
    icon: FlaskConical,
    iconClass: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    structure:
      "Single-membrane sac containing hydrolytic (digestive) enzymes, formed by the Golgi apparatus.",
    fn: "Digests worn-out organelles, food particles, and invading bacteria; recycles materials (autophagy).",
    foundIn: "Mainly animal cells",
  },
  {
    name: "Peroxisome",
    nickname: "Detox unit",
    icon: Activity,
    iconClass: "bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400",
    structure: "Small, single-membrane vesicle containing oxidative enzymes.",
    fn: "Breaks down fatty acids and neutralizes hydrogen peroxide (H₂O₂) using catalase.",
    foundIn: "Plant and animal cells",
  },
  {
    name: "Vacuole",
    nickname: "Storage tank",
    icon: Droplets,
    iconClass: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    structure:
      "Membrane-bound sac surrounded by a tonoplast. Plant cells have one large central vacuole; animal cells have small ones.",
    fn: "Stores water, sugars, ions, and pigments; maintains turgor pressure and helps plant cells keep their shape.",
    foundIn: "Large in plant cells",
  },
  {
    name: "Chloroplast",
    nickname: "Solar panel",
    icon: Leaf,
    iconClass: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    structure:
      "Double membrane; stacks of thylakoids (grana) float in the stroma and contain chlorophyll.",
    fn: "Captures light energy and carries out photosynthesis, producing glucose and oxygen. Contains its own DNA and 70S ribosomes.",
    foundIn: "Plant and algal cells",
  },
  {
    name: "Cytoskeleton",
    nickname: "Cell skeleton",
    icon: Layers,
    iconClass: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
    structure:
      "Network of microtubules (tubulin), microfilaments (actin), and intermediate filaments.",
    fn: "Maintains cell shape, supports organelles, enables movement, and moves chromosomes during division.",
    foundIn: "All eukaryotic cells",
  },
  {
    name: "Centriole",
    nickname: "Spindle organiser",
    icon: Split,
    iconClass: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400",
    structure: "Pair of short, perpendicular cylinders made of microtubules.",
    fn: "Organizes spindle fibres during cell division; forms the base of cilia and flagella.",
    foundIn: "Animal cells (absent in most plant cells)",
  },
  {
    name: "Cilia and flagella",
    nickname: "Movement appendages",
    icon: Wind,
    iconClass: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    structure:
      "Hair-like extensions containing microtubules in a 9 + 2 arrangement, covered by the cell membrane.",
    fn: "Cilia sweep materials across surfaces; flagella provide propulsion (e.g., sperm, Chlamydomonas).",
    foundIn: "Animal cells, protists, and some plants",
  },
];

const transportTypes = [
  {
    title: "Diffusion",
    detail:
      "Molecules move from high to low concentration until equilibrium. No energy needed. Examples: O₂ and CO₂ across membranes.",
  },
  {
    title: "Osmosis",
    detail:
      "Water moves through a selectively permeable membrane from high water potential (dilute solution) to low water potential (concentrated solution). No energy needed.",
  },
  {
    title: "Facilitated diffusion",
    detail:
      "Large or polar molecules such as glucose pass through channel or carrier proteins down their concentration gradient. No energy needed.",
  },
  {
    title: "Active transport",
    detail:
      "Substances move against their concentration gradient using carrier proteins and ATP. Example: the sodium–potassium pump.",
  },
  {
    title: "Bulk transport",
    detail:
      "Large particles enter by endocytosis (phagocytosis and pinocytosis) or leave by exocytosis using vesicles.",
  },
];

const mitosisStages = [
  {
    name: "Prophase",
    text: "Chromatin condenses into visible chromosomes, each with two sister chromatids joined at a centromere. The spindle forms, the nucleolus disappears, and the nuclear envelope breaks down.",
  },
  {
    name: "Metaphase",
    text: "Chromosomes line up along the equator (metaphase plate) of the cell. Spindle fibres attach to the centromeres. This is the best stage for karyotyping.",
  },
  {
    name: "Anaphase",
    text: "Sister chromatids are pulled apart to opposite poles as the spindle fibres shorten. The cell begins to elongate.",
  },
  {
    name: "Telophase",
    text: "Chromosomes decondense, the nuclear envelope and nucleolus reappear, and the spindle breaks down.",
  },
];

export const Chapter2: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12 bg-gradient-to-br from-emerald-600 via-emerald-700 to-lime-700 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-2xl"
      >
        <div className="absolute -top-10 -right-10 opacity-10">
          <Microscope size={260} />
        </div>
        <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Unit 2 · Grade 11 Biology
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
          CELL: THE UNIT OF LIFE
        </h1>
        <p className="text-emerald-50/90 text-lg max-w-2xl leading-relaxed">
          Every living organism is built from cells. In this chapter you will
          discover how cells were discovered, how prokaryotic and eukaryotic
          cells are organized, what each organelle does, and how cells divide.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
            <Layers size={16} /> 4 subtopics
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
            <Clock size={16} /> About 50 minutes
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm">
            <BookOpen size={16} /> 4 practice sets
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10 pb-20"
      >
        {/* Learning Objectives */}
        <motion.section
          variants={itemVariants}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Target size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Learning Objectives
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Describe how the cell theory developed and state its main principles.",
              "Compare the structures of prokaryotic and eukaryotic cells.",
              "Relate the structure of each organelle to the function it performs.",
              "Explain mitosis and meiosis and distinguish their roles in organisms.",
            ].map((objective, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2.1 */}
        <motion.section
          id="subtopic-2.1"
          variants={itemVariants}
          className="scroll-mt-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Microscope size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  2.1
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  Cell Theory
                </h2>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The cell is the smallest structural and functional unit of life.
              Every living organism — from a single bacterium to a blue whale —
              is built from one or more cells. This idea seems obvious today,
              but it took almost 200 years of observation to establish.
            </p>

            {/* Timeline */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                How the cell was discovered
              </h3>
              <div className="space-y-4">
                {cellTheoryTimeline.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {event.year}
                      </div>
                      {i < cellTheoryTimeline.length - 1 && (
                        <div className="w-px flex-1 bg-emerald-200 dark:bg-emerald-800 my-1" />
                      )}
                    </div>
                    <div className="pb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {event.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {event.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Three tenets */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The three principles of cell theory
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "All organisms are made of cells",
                  desc: "Every living thing consists of one or more cells, whether it is a bacterium or a human.",
                },
                {
                  title: "The cell is the basic unit",
                  desc: "The cell is the smallest unit that can carry out all the activities of life.",
                },
                {
                  title: "Cells come from cells",
                  desc: "New cells arise only from the division of pre-existing cells — never from non-living matter.",
                },
              ].map((tenet, i) => (
                <div
                  key={i}
                  className="p-5 bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center mb-3">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 text-sm">
                    {tenet.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tenet.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                Modern additions to cell theory
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>• Cells contain hereditary information (DNA) that is passed on during division.</li>
                <li>• All cells share a similar chemical composition and use similar metabolic pathways.</li>
                <li>• Cell activity depends on the activity of subcellular structures (organelles).</li>
              </ul>
            </div>

            {/* Microscopy */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Light microscope
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Uses visible light and glass lenses. Magnifies up to about
                  1,500× and can view living cells, but its resolution is limited
                  to about 200 nm.
                </p>
              </div>
              <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Microscope size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Electron microscope
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Uses a beam of electrons instead of light. Magnifies up to
                  1,000,000× with resolution near 0.2 nm, revealing organelles
                  in fine detail — but specimens must be dead and fixed.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Scale size={18} className="text-emerald-600 dark:text-emerald-400" />
                How small is a cell?
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Prokaryotic cells are about 0.1–5 µm across, while eukaryotic
                cells are usually 10–100 µm. Cells stay small because a cell
                needs enough surface area to exchange materials for its volume.
                As a cell grows, its volume increases faster than its surface
                area, so exchange becomes inefficient.
              </p>
            </div>

            {/* Exam tip */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Lightbulb size={18} /> Exam tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed">
                Remember the sequence: <strong>Hooke</strong> named the cell
                after seeing dead cork walls, while <strong>Leeuwenhoek</strong>{" "}
                was the first to see living cells. <strong>Schleiden</strong>{" "}
                studied plants, <strong>Schwann</strong> studied animals, and{" "}
                <strong>Virchow</strong> added “cells come from cells”.
              </p>
            </div>

            <Exercise
              number="2.1"
              question={
                <>
                  <p className="mb-2">
                    <strong>1.</strong> Which statement is NOT part of the
                    original cell theory?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-4">
                    A. All living organisms are made of cells.
                    <br />
                    B. The cell is the basic unit of structure and function.
                    <br />
                    C. All cells contain a nucleus.
                    <br />
                    D. New cells arise from pre-existing cells.
                  </p>
                  <p className="mt-4 mb-1">
                    <strong>2.</strong> Why are viruses not considered cells?
                  </p>
                </>
              }
              answer={
                <>
                  <p className="m-0 mb-3">
                    <strong>1. Answer: C.</strong> A nucleus is found only in
                    eukaryotic cells. Prokaryotes are cells without a
                    membrane-bound nucleus, yet they still satisfy the cell
                    theory.
                  </p>
                  <p className="m-0">
                    <strong>2.</strong> Viruses have no cellular structure, no
                    independent metabolism, and cannot reproduce on their own.
                    They must use a host cell’s machinery, so they are
                    acellular (non-cellular) particles, not cells.
                  </p>
                </>
              }
            />
          </div>
        </motion.section>

        {/* Section 2.2 */}
        <motion.section
          id="subtopic-2.2"
          variants={itemVariants}
          className="scroll-mt-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Layers size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  2.2
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  Cell Structure
                </h2>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Despite their huge diversity, almost all cells share three basic
              components: a <strong>cell membrane</strong>,{" "}
              <strong>cytoplasm</strong>, and{" "}
              <strong>genetic material</strong>. The presence or absence of a
              membrane-bound nucleus divides cells into two fundamental types.
            </p>

            {/* Prokaryote vs eukaryote */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-3">
                  Prokaryotic cell
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• No membrane-bound nucleus; DNA lies in the nucleoid.</li>
                  <li>• Circular DNA without histone proteins.</li>
                  <li>• 70S ribosomes; no membrane-bound organelles.</li>
                  <li>• Cell wall of peptidoglycan in bacteria.</li>
                  <li>• Usually 0.1–5 µm; examples: bacteria and archaea.</li>
                </ul>
              </div>
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-3">
                  Eukaryotic cell
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• True nucleus enclosed by a nuclear envelope.</li>
                  <li>• Linear chromosomes bound to histone proteins.</li>
                  <li>• 80S ribosomes; many membrane-bound organelles.</li>
                  <li>• Cell wall only in plants (cellulose) and fungi (chitin).</li>
                  <li>• Usually 10–100 µm; examples: plants, animals, fungi, protists.</li>
                </ul>
              </div>
            </div>

            {/* Cell membrane */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The cell membrane
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              The cell membrane is a thin (about 7–10 nm) barrier that controls
              what enters and leaves the cell. It is described by the{" "}
              <strong>fluid mosaic model</strong>: a fluid phospholipid bilayer
              studded with proteins that float within it like tiles in a mosaic.
            </p>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4">
              <div className="bg-sky-100 dark:bg-sky-900/40 text-center text-xs font-semibold text-sky-800 dark:text-sky-300 py-2">
                Hydrophilic phosphate heads (outer surface)
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 text-center text-xs font-semibold text-amber-800 dark:text-amber-300 py-3">
                Hydrophobic fatty acid tails (interior)
              </div>
              <div className="bg-sky-100 dark:bg-sky-900/40 text-center text-xs font-semibold text-sky-800 dark:text-sky-300 py-2">
                Hydrophilic phosphate heads (inner surface)
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  title: "Phospholipid bilayer",
                  desc: "Two layers of phospholipids with hydrophobic tails facing inward, forming a barrier to most polar molecules.",
                },
                {
                  title: "Membrane proteins",
                  desc: "Channel and carrier proteins transport substances; receptor proteins receive chemical signals.",
                },
                {
                  title: "Selective permeability",
                  desc: "The membrane allows some substances through while blocking others, keeping the cell’s internal environment stable.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Cytoplasm, wall, nucleus */}
            <div className="space-y-4 mb-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Droplets size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Cytoplasm and cytoskeleton
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The cytoplasm is everything inside the membrane except the
                  nucleus. It includes the jelly-like cytosol (about 70% water,
                  plus ions and organic molecules) and all the organelles. The
                  cytoskeleton is a protein framework that gives the cell shape
                  and allows organelles and materials to move.
                </p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Cell wall
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  A rigid layer outside the cell membrane that supports and
                  protects the cell and prevents it from bursting when it takes
                  in water. Its composition differs between organisms:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2 pr-4 font-semibold">Organism</th>
                        <th className="py-2 font-semibold">Main wall material</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300">
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-2 pr-4">Plants</td>
                        <td className="py-2">Cellulose</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-2 pr-4">Fungi</td>
                        <td className="py-2">Chitin</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-2 pr-4">Bacteria</td>
                        <td className="py-2">Peptidoglycan</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Animals</td>
                        <td className="py-2">No cell wall</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Dna size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Nucleus
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The nucleus is bounded by a double membrane (the nuclear
                  envelope) pierced by nuclear pores that allow RNA and proteins
                  to pass. It contains chromatin (DNA wrapped around histones)
                  and one or more nucleoli, where rRNA is made and ribosomes are
                  assembled. The nucleus controls cell activities by regulating
                  gene expression and is the site of DNA replication and
                  transcription.
                </p>
              </div>
            </div>

            {/* Plant vs animal */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Plant cells versus animal cells
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr className="text-slate-700 dark:text-slate-300">
                    <th className="px-4 py-3 font-bold">Feature</th>
                    <th className="px-4 py-3 font-bold">Plant cell</th>
                    <th className="px-4 py-3 font-bold">Animal cell</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  {[
                    ["Cell wall", "Present (cellulose)", "Absent"],
                    ["Chloroplasts", "Present", "Absent"],
                    ["Vacuole", "One large central vacuole", "Small, temporary vacuoles"],
                    ["Centrioles", "Usually absent", "Present"],
                    ["Shape", "Fixed, often rectangular", "Flexible, often rounded"],
                    ["Food storage", "Starch", "Glycogen"],
                    ["Cytokinesis", "Cell plate forms", "Cleavage furrow forms"],
                  ].map(([feature, plant, animal], i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 dark:border-slate-700/50"
                    >
                      <td className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">
                        {feature}
                      </td>
                      <td className="px-4 py-2.5">{plant}</td>
                      <td className="px-4 py-2.5">{animal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transport */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              How substances cross the membrane
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {transportTypes.map((type, i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-1">
                    {type.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {type.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Real-World Example */}
            <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 rounded-2xl p-6 mb-6 border border-emerald-100 dark:border-emerald-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-800/50 rounded-xl text-emerald-600 dark:text-emerald-400 mt-1">
                  <Droplets size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                    Real-world example: Why IV drips use 0.9% saline
                  </h4>
                  <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                    A 0.9% salt solution is isotonic to human blood, so red
                    blood cells keep their normal shape. Pure distilled water is
                    hypotonic, so water rushes into red blood cells and they
                    burst (haemolysis). Sea water is hypertonic, so cells lose
                    water and shrink (crenation). This is osmosis in action.
                  </p>
                </div>
              </div>
            </div>

            {/* Exam tip */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Lightbulb size={18} /> Exam tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed">
                Do not confuse the two barriers: the <strong>cell wall</strong>{" "}
                is freely permeable and gives support, while the{" "}
                <strong>cell membrane</strong> is selectively permeable and
                controls exchange.
              </p>
            </div>

            <Exercise
              number="2.2"
              question={
                <>
                  <p className="mb-2">
                    <strong>1.</strong> A plant cell is placed in distilled
                    water and does not burst, but an animal cell in the same
                    water swells and bursts. Explain why.
                  </p>
                  <p className="mt-4 mb-1">
                    <strong>2.</strong> Name one structure present in plant
                    cells but absent in animal cells, and state its function.
                  </p>
                </>
              }
              answer={
                <>
                  <p className="m-0 mb-3">
                    <strong>1.</strong> Water enters both cells by osmosis
                    because distilled water is hypotonic. The plant cell’s
                    rigid cellulose cell wall resists the increasing turgor
                    pressure and prevents lysis. The animal cell has no wall, so
                    its membrane eventually bursts.
                  </p>
                  <p className="m-0">
                    <strong>2.</strong> Chloroplast — it carries out
                    photosynthesis, converting light energy into glucose.
                    (A large central vacuole and a cellulose cell wall are also
                    acceptable answers with their functions.)
                  </p>
                </>
              }
            />
          </div>
        </motion.section>

        {/* Section 2.3 */}
        <motion.section
          id="subtopic-2.3"
          variants={itemVariants}
          className="scroll-mt-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Boxes size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  2.3
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  Cell Organelles
                </h2>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Eukaryotic cells are divided into compartments called organelles
              (literally “little organs”). Compartmentalization allows many
              different chemical reactions to occur at the same time under the
              right conditions. Each organelle has a structure suited to its
              function.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {organelles.map((organelle, i) => {
                const Icon = organelle.icon;
                return (
                  <div
                    key={i}
                    className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${organelle.iconClass}`}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                          {organelle.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {organelle.nickname}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      <strong className="text-slate-700 dark:text-slate-300">
                        Structure:
                      </strong>{" "}
                      {organelle.structure}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                      <strong className="text-slate-700 dark:text-slate-300">
                        Function:
                      </strong>{" "}
                      {organelle.fn}
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                      {organelle.foundIn}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Endosymbiotic theory */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-6 border border-teal-200/60 dark:border-teal-800">
              <h4 className="text-lg font-bold text-teal-900 dark:text-teal-300 mb-3 flex items-center gap-2">
                <Dna size={20} /> The endosymbiotic theory
              </h4>
              <p className="text-sm text-teal-800/90 dark:text-teal-200/80 leading-relaxed mb-3">
                Mitochondria and chloroplasts are believed to have originated
                from free-living bacteria that were engulfed by an ancestral
                eukaryotic cell — an idea proposed by Lynn Margulis. Evidence
                supporting this theory:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-teal-800/90 dark:text-teal-200/80">
                <p className="m-0">• They have a double membrane.</p>
                <p className="m-0">• They contain their own circular DNA.</p>
                <p className="m-0">• They have 70S ribosomes, like bacteria.</p>
                <p className="m-0">• They can replicate themselves independently.</p>
              </div>
            </div>

            {/* Quick reference table */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Quick reference: organelle functions
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr className="text-slate-700 dark:text-slate-300">
                    <th className="px-4 py-3 font-bold">Organelle</th>
                    <th className="px-4 py-3 font-bold">Main function</th>
                    <th className="px-4 py-3 font-bold">Found in</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  {[
                    ["Mitochondrion", "Aerobic respiration; ATP production", "Both"],
                    ["Chloroplast", "Photosynthesis", "Plants and algae"],
                    ["Ribosome", "Protein synthesis", "Both"],
                    ["Rough ER", "Protein folding and transport", "Both"],
                    ["Smooth ER", "Lipid synthesis and detoxification", "Both"],
                    ["Golgi apparatus", "Modification and packaging", "Both"],
                    ["Lysosome", "Intracellular digestion", "Mainly animals"],
                    ["Vacuole", "Storage; turgor pressure", "Large in plants"],
                    ["Centriole", "Spindle formation", "Animals"],
                  ].map(([name, fn, found], i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 dark:border-slate-700/50"
                    >
                      <td className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">
                        {name}
                      </td>
                      <td className="px-4 py-2.5">{fn}</td>
                      <td className="px-4 py-2.5">{found}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exam tip */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Lightbulb size={18} /> Exam tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed">
                Learn the ribosome sizes: <strong>70S</strong> ribosomes occur
                in prokaryotes and inside mitochondria and chloroplasts, while{" "}
                <strong>80S</strong> ribosomes are in the eukaryotic cytoplasm.
                This difference is exactly why some antibiotics can target
                bacterial ribosomes without harming human cells.
              </p>
            </div>

            <Exercise
              number="2.3"
              question={
                <>
                  <p className="mb-2">
                    <strong>1.</strong> Identify the organelle described in
                    each case:
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-4 mb-3">
                    (a) contains hydrolytic enzymes and digests worn-out
                    organelles
                    <br />
                    (b) carries out photosynthesis
                    <br />
                    (c) modifies and packages proteins for secretion
                    <br />
                    (d) is the site of protein synthesis
                  </p>
                  <p className="mb-1">
                    <strong>2.</strong> Why are mitochondria and chloroplasts
                    described as semi-autonomous organelles?
                  </p>
                </>
              }
              answer={
                <>
                  <p className="m-0 mb-3">
                    <strong>1.</strong> (a) Lysosome, (b) chloroplast, (c) Golgi
                    apparatus, (d) ribosome.
                  </p>
                  <p className="m-0">
                    <strong>2.</strong> They contain their own circular DNA and
                    70S ribosomes, so they can make some of their own proteins
                    and replicate independently — yet most of their proteins are
                    still coded by nuclear genes, so they are not fully
                    autonomous.
                  </p>
                </>
              }
            />
          </div>
        </motion.section>

        {/* Section 2.4 */}
        <motion.section
          id="subtopic-2.4"
          variants={itemVariants}
          className="scroll-mt-8"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Split size={22} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                  2.4
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  Cell Division
                </h2>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Cells do not live forever. They divide to allow organisms to grow,
              to replace damaged or worn-out cells, and to produce gametes for
              reproduction. The two main types of cell division are{" "}
              <strong>mitosis</strong> and <strong>meiosis</strong>.
            </p>

            {/* Cell cycle */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The cell cycle
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              The cell cycle is the sequence of events from one cell division
              to the next. It has two main phases: <strong>interphase</strong>{" "}
              (the longest stage) and the <strong>M phase</strong> (mitosis plus
              cytokinesis).
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {[
                {
                  phase: "G1",
                  name: "First gap",
                  desc: "Cell grows, makes proteins and new organelles. Normal metabolic activity occurs.",
                },
                {
                  phase: "S",
                  name: "Synthesis",
                  desc: "DNA is replicated, so each chromosome now has two sister chromatids.",
                },
                {
                  phase: "G2",
                  name: "Second gap",
                  desc: "Further growth and organelle duplication; the cell checks that DNA replication is complete.",
                },
                {
                  phase: "M",
                  name: "Mitosis",
                  desc: "Chromosomes are distributed to daughter nuclei, then cytokinesis divides the cytoplasm.",
                },
              ].map((stage, i) => (
                <div
                  key={i}
                  className="relative p-4 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-800"
                >
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {stage.phase}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Some cells leave the cycle and enter <strong>G0</strong>, a resting
              state in which they no longer divide — for example, mature nerve
              cells. Interphase makes up about 90% of the cell cycle. In humans,
              a body cell has 2n = 46 chromosomes; after the S phase it still
              has 46 chromosomes, but each consists of two sister chromatids.
            </p>

            {/* Mitosis */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Mitosis
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Mitosis produces two genetically identical daughter cells with the
              same chromosome number as the parent cell. It is responsible for
              growth, repair, and asexual reproduction in some organisms.
            </p>
            <div className="space-y-3 mb-4">
              {mitosisStages.map((stage, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                      {stage.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {stage.text}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-1">
                    Cytokinesis
                  </h4>
                  <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                    The cytoplasm divides. Animal cells form a cleavage furrow;
                    plant cells build a cell plate that becomes a new cell wall.
                    The result is two identical diploid daughter cells.
                  </p>
                </div>
              </div>
            </div>

            {/* Meiosis */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Meiosis
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Meiosis occurs in reproductive organs and produces gametes (sperm,
              eggs, pollen) or spores. It involves two consecutive divisions
              with only one round of DNA replication, so the chromosome number
              is halved. In humans, 2n = 46 cells produce gametes with n = 23.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                  Meiosis I — the reduction division
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    • Prophase I: homologous chromosomes pair up (synapsis) and
                    exchange segments by crossing over.
                  </li>
                  <li>
                    • Metaphase I: homologous pairs line up at the equator.
                  </li>
                  <li>
                    • Anaphase I: homologous chromosomes separate to opposite
                    poles; sister chromatids stay together.
                  </li>
                  <li>
                    • Telophase I: two haploid cells form, each chromosome still
                    has two chromatids.
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                  Meiosis II — like mitosis
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• No DNA replication occurs before this division.</li>
                  <li>
                    • Prophase II and metaphase II: chromosomes line up singly at
                    the equator.
                  </li>
                  <li>
                    • Anaphase II: sister chromatids separate and move to
                    opposite poles.
                  </li>
                  <li>
                    • Telophase II: four genetically different haploid cells are
                    produced.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-5 border border-violet-200 dark:border-violet-800 mb-6">
              <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-2 flex items-center gap-2">
                <Dna size={18} /> Sources of genetic variation in meiosis
              </h4>
              <ul className="space-y-2 text-sm text-violet-800/90 dark:text-violet-200/80">
                <li>
                  • <strong>Crossing over</strong> in prophase I exchanges
                  alleles between homologous chromosomes.
                </li>
                <li>
                  • <strong>Independent assortment</strong> in metaphase I
                  randomly arranges each homologous pair, giving 2²³ possible
                  combinations in humans.
                </li>
                <li>
                  • <strong>Random fertilisation</strong> combines one of many
                  possible sperm with one of many possible eggs.
                </li>
              </ul>
            </div>

            {/* Comparison table */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Mitosis versus meiosis
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr className="text-slate-700 dark:text-slate-300">
                    <th className="px-4 py-3 font-bold">Feature</th>
                    <th className="px-4 py-3 font-bold">Mitosis</th>
                    <th className="px-4 py-3 font-bold">Meiosis</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-400">
                  {[
                    ["Purpose", "Growth, repair, asexual reproduction", "Gamete production"],
                    ["Number of divisions", "One", "Two"],
                    ["Daughter cells", "Two", "Four"],
                    ["Chromosome number", "Same as parent (diploid)", "Half of parent (haploid)"],
                    ["Genetic variation", "Daughter cells are identical", "Daughter cells are genetically different"],
                    ["Where it occurs", "Body (somatic) cells", "Reproductive organs"],
                  ].map(([feature, mitosis, meiosis], i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 dark:border-slate-700/50"
                    >
                      <td className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300">
                        {feature}
                      </td>
                      <td className="px-4 py-2.5">{mitosis}</td>
                      <td className="px-4 py-2.5">{meiosis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cancer note */}
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-5 border border-rose-200 dark:border-rose-800 mb-6">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-2 flex items-center gap-2">
                <ShieldAlert size={18} /> When the cell cycle goes wrong: cancer
              </h4>
              <p className="text-sm text-rose-800/90 dark:text-rose-200/80 leading-relaxed">
                Cancer occurs when mutations disrupt the genes that control cell
                cycle checkpoints. Cells divide uncontrollably, ignore signals to
                stop, and may spread to other tissues. Carcinogens such as
                tobacco smoke and ultraviolet radiation increase the risk of
                such mutations.
              </p>
            </div>

            {/* Exam tip */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Lightbulb size={18} /> Exam tip
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200/90 leading-relaxed">
                Mitosis <strong>maintains</strong> the chromosome number (2n → 2n);
                meiosis <strong>halves</strong> it (2n → n). Crossing over and
                independent assortment are the two events that explain why
                siblings are genetically different.
              </p>
            </div>

            <Exercise
              number="2.4"
              question={
                <>
                  <p className="mb-2">
                    <strong>1.</strong> A diploid cell with 2n = 20 undergoes
                    meiosis. How many chromosomes will each gamete contain?
                  </p>
                  <p className="mt-4 mb-1">
                    <strong>2.</strong> Give two differences between mitosis and
                    meiosis.
                  </p>
                </>
              }
              answer={
                <>
                  <p className="m-0 mb-3">
                    <strong>1.</strong> Each gamete will contain 10 chromosomes
                    (n = 10), because meiosis halves the chromosome number.
                  </p>
                  <p className="m-0">
                    <strong>2.</strong> Mitosis involves one division and
                    produces two genetically identical diploid cells, while
                    meiosis involves two divisions and produces four genetically
                    different haploid cells. Mitosis is for growth and repair;
                    meiosis produces gametes.
                  </p>
                </>
              }
            />
          </div>
        </motion.section>

        {/* Chapter Summary */}
        <motion.section
          variants={itemVariants}
          className="bg-gradient-to-r from-emerald-600 to-lime-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 2 Summary</h3>
          <div className="space-y-3 text-emerald-50">
            <p>
              ✓ Cell theory states that organisms are made of cells, the cell is
              the basic unit of life, and cells arise from pre-existing cells.
            </p>
            <p>
              ✓ Prokaryotic cells lack a membrane-bound nucleus and organelles;
              eukaryotic cells have both.
            </p>
            <p>
              ✓ The plasma membrane is a fluid mosaic that is selectively
              permeable; the cell wall adds support and protection.
            </p>
            <p>
              ✓ Organelles compartmentalize the cell, and each structure is
              related to its function.
            </p>
            <p>
              ✓ Mitosis produces two identical diploid cells for growth and
              repair; meiosis produces four genetically varied haploid gametes.
            </p>
          </div>
        </motion.section>

        {/* Next Chapter */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
              Next up
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Chapter 3: Plant Physiology
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Photosynthesis, respiration, plant growth, and plant hormones.
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            Select it from the sidebar <ArrowRight size={16} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Chapter2;
