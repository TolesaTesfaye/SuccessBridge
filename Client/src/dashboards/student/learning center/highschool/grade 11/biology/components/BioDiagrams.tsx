import React from "react";

/* Shared, theme-aware visual aids for Grade 11 Biology.
   Each diagram is a self-contained responsive SVG (or card grid) that pairs a
   concept with a real-world connection so students can "see" the idea. */

interface FrameProps {
  title: string;
  caption?: string;
  children: React.ReactNode;
}

const DiagramFrame: React.FC<FrameProps> = ({ title, caption, children }) => (
  <figure className="my-4 md:my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 sm:p-4 md:p-6 shadow-sm">
    <figcaption className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-2 md:mb-3">
      {title}
    </figcaption>
    {children}
    {caption && (
      <p className="mt-2 md:mt-3 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {caption}
      </p>
    )}
  </figure>
);

/* ---------------- Chapter 1 diagrams ---------------- */

export const TaxonomyHierarchyDiagram: React.FC = () => {
  const levels = [
    { level: "Kingdom", example: "Animalia" },
    { level: "Phylum", example: "Chordata" },
    { level: "Class", example: "Mammalia" },
    { level: "Order", example: "Primates" },
    { level: "Family", example: "Hominidae" },
    { level: "Genus", example: "Homo" },
    { level: "Species", example: "Homo sapiens" },
  ];
  const widths = [620, 560, 500, 440, 380, 320, 260];

  return (
    <DiagramFrame
      title="The taxonomic hierarchy, using humans as the example"
      caption="Real-world connection: this is the same ladder a biologist climbs to identify any Ethiopian species — from the gelada monkey (Kingdom Animalia → Species Theropithecus gelada) to teff (Kingdom Plantae → Species Eragrostis tef)."
    >
      <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="Taxonomic hierarchy from kingdom to species with human example">
        <text x="350" y="18" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12" fontWeight="700">BROADEST</text>
        {levels.map((item, i) => {
          const y = 30 + i * 34;
          const w = widths[i];
          const x = 350 - w / 2;
          return (
            <g key={item.level}>
              <rect x={x} y={y} width={w} height="28" rx="7" className="text-emerald-100 dark:text-emerald-900/40" fill="currentColor" />
              <rect x={x} y={y} width={w} height="28" rx="7" fill="none" className="text-emerald-500" stroke="currentColor" strokeWidth="1.5" />
              <text x={x + 14} y={y + 19} className="text-emerald-800 dark:text-emerald-300" fill="currentColor" fontSize="13" fontWeight="700">{item.level}</text>
              <text x={x + w - 14} y={y + 19} textAnchor="end" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="12" fontStyle="italic">{item.example}</text>
            </g>
          );
        })}
        <text x="350" y="285" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12" fontWeight="700">MOST SPECIFIC</text>
      </svg>
    </DiagramFrame>
  );
};

export const BinomialNomenclatureDiagram: React.FC = () => (
  <DiagramFrame
    title="Anatomy of a scientific name: Panthera leo"
    caption="Real-world connection: the lion you see in Addis Ababa Zoo and the lion in the Serengeti are the same species because both carry the name Panthera leo — one language-neutral label understood by biologists everywhere."
  >
    <svg viewBox="0 0 700 190" className="w-full h-auto" role="img" aria-label="Binomial name Panthera leo with genus and species labels">
      <text x="300" y="78" textAnchor="middle" className="text-slate-900 dark:text-white" fill="currentColor" fontSize="40" fontStyle="italic" fontWeight="700">Panthera</text>
      <text x="452" y="78" textAnchor="middle" className="text-slate-900 dark:text-white" fill="currentColor" fontSize="40" fontStyle="italic" fontWeight="400">leo</text>

      <line x1="225" y1="92" x2="375" y2="92" className="text-emerald-600" stroke="currentColor" strokeWidth="2" />
      <line x1="410" y1="92" x2="495" y2="92" className="text-blue-600" stroke="currentColor" strokeWidth="2" />

      <line x1="300" y1="95" x2="225" y2="125" className="text-emerald-600" stroke="currentColor" strokeWidth="1.5" />
      <text x="222" y="143" textAnchor="middle" className="text-emerald-700 dark:text-emerald-300" fill="currentColor" fontSize="13" fontWeight="700">Genus — capitalised</text>

      <line x1="452" y1="95" x2="525" y2="125" className="text-blue-600" stroke="currentColor" strokeWidth="1.5" />
      <text x="528" y="143" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="13" fontWeight="700">Species epithet — lowercase</text>

      <text x="350" y="178" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">Always italicised in print — underlined when handwritten</text>
    </svg>
  </DiagramFrame>
);

/* ---------------- Chapter 2 diagrams ---------------- */

export const ProkaryoteVsEukaryoteDiagram: React.FC = () => (
  <DiagramFrame
    title="Prokaryotic and eukaryotic cells side by side"
    caption="Real-world connection: the bacteria that sour milk into yogurt and the cells of the teff plant are built on the same plan but differ in one key feature — bacteria keep their DNA loose in a nucleoid, while eukaryotic cells enclose it in a nucleus."
  >
    <svg viewBox="0 0 700 350" className="w-full h-auto" role="img" aria-label="Comparison of a prokaryotic bacterium and a eukaryotic animal cell">
      {/* titles */}
      <text x="170" y="22" textAnchor="middle" className="text-emerald-700 dark:text-emerald-300" fill="currentColor" fontSize="13" fontWeight="700">PROKARYOTE — bacterium</text>
      <text x="530" y="22" textAnchor="middle" className="text-sky-700 dark:text-sky-300" fill="currentColor" fontSize="13" fontWeight="700">EUKARYOTE — animal cell</text>

      {/* prokaryote */}
      <rect x="36" y="40" width="268" height="244" rx="30" className="text-emerald-50 dark:text-emerald-900/30" fill="currentColor" />
      <rect x="36" y="40" width="268" height="244" rx="30" fill="none" className="text-emerald-600" stroke="currentColor" strokeWidth="2" />
      <rect x="50" y="54" width="240" height="216" rx="22" fill="none" className="text-emerald-400" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M 135 170 q 16 -20 32 0 q 16 20 32 0 q 16 -20 32 0" fill="none" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="170" y="196" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="11" fontWeight="700">nucleoid (circular DNA)</text>
      {[
        [95, 105], [240, 100], [105, 230], [245, 225], [170, 95], [130, 245],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" className="text-slate-600 dark:text-slate-300" fill="currentColor" />
      ))}
      <text x="170" y="270" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">ribosomes scattered in cytoplasm</text>
      <path d="M 304 210 C 328 190, 344 230, 368 206" fill="none" className="text-emerald-700 dark:text-emerald-500" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="336" y="252" textAnchor="middle" className="text-emerald-700 dark:text-emerald-400" fill="currentColor" fontSize="10">flagellum</text>
      <text x="60" y="70" className="text-emerald-700 dark:text-emerald-400" fill="currentColor" fontSize="10">cell wall + capsule</text>

      {/* eukaryote */}
      <rect x="396" y="40" width="268" height="244" rx="80" className="text-sky-50 dark:text-sky-900/30" fill="currentColor" />
      <rect x="396" y="40" width="268" height="244" rx="80" fill="none" className="text-sky-600" stroke="currentColor" strokeWidth="2" />
      <circle cx="525" cy="140" r="50" className="text-violet-100 dark:text-violet-900/40" fill="currentColor" />
      <circle cx="525" cy="140" r="50" fill="none" className="text-violet-600" stroke="currentColor" strokeWidth="2" />
      <circle cx="525" cy="140" r="17" className="text-violet-500" fill="currentColor" />
      <text x="525" y="92" textAnchor="middle" className="text-violet-700 dark:text-violet-300" fill="currentColor" fontSize="11" fontWeight="700">nucleus</text>
      <ellipse cx="452" cy="236" rx="28" ry="13" transform="rotate(-20 452 236)" className="text-amber-200 dark:text-amber-900/50" fill="currentColor" />
      <ellipse cx="452" cy="236" rx="28" ry="13" transform="rotate(-20 452 236)" fill="none" className="text-amber-600" stroke="currentColor" strokeWidth="2" />
      <text x="452" y="266" textAnchor="middle" className="text-amber-700 dark:text-amber-300" fill="currentColor" fontSize="10">mitochondrion</text>
      <path d="M 592 110 q 14 10 0 20 q -14 10 0 20 q 14 10 0 20" fill="none" className="text-sky-600" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="640" y="150" className="text-sky-700 dark:text-sky-300" fill="currentColor" fontSize="10">ER</text>
      <path d="M 585 220 q 20 -12 40 0 M 588 230 q 17 -10 34 0 M 591 240 q 14 -8 28 0" fill="none" className="text-rose-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <text x="605" y="262" textAnchor="middle" className="text-rose-700 dark:text-rose-300" fill="currentColor" fontSize="10">Golgi</text>
      {[
        [430, 120], [460, 170], [600, 190], [555, 215],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" className="text-slate-600 dark:text-slate-300" fill="currentColor" />
      ))}

      <line x1="350" y1="60" x2="350" y2="270" className="text-slate-300 dark:text-slate-700" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
    </svg>
  </DiagramFrame>
);

export const FluidMosaicMembraneDiagram: React.FC = () => (
  <DiagramFrame
    title="The fluid mosaic model of the cell membrane"
    caption="Real-world connection: this 7–10 nm sheet decides what enters a cell. When you drink ORS during dehydration, water and ions cross through channel proteins like the ones shown — while the fatty interior keeps unwanted molecules out."
  >
    <svg viewBox="0 0 700 250" className="w-full h-auto" role="img" aria-label="Fluid mosaic membrane with phospholipids, proteins, cholesterol and glycoprotein">
      <text x="350" y="18" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11" fontWeight="700">outside the cell</text>

      {/* phospholipid heads and tails */}
      {Array.from({ length: 26 }, (_, i) => 46 + i * 24).map((x) => (
        <g key={x}>
          <line x1={x - 3} y1="82" x2={x - 3} y2="108" className="text-amber-400" stroke="currentColor" strokeWidth="2" />
          <line x1={x + 3} y1="82" x2={x + 3} y2="108" className="text-amber-400" stroke="currentColor" strokeWidth="2" />
          <circle cx={x} cy="76" r="7" className="text-sky-300 dark:text-sky-700" fill="currentColor" />
          <line x1={x - 3} y1="122" x2={x - 3} y2="148" className="text-amber-400" stroke="currentColor" strokeWidth="2" />
          <line x1={x + 3} y1="122" x2={x + 3} y2="148" className="text-amber-400" stroke="currentColor" strokeWidth="2" />
          <circle cx={x} cy="154" r="7" className="text-sky-300 dark:text-sky-700" fill="currentColor" />
        </g>
      ))}

      {/* channel protein */}
      <rect x="212" y="52" width="22" height="126" rx="8" className="text-violet-300 dark:text-violet-800" fill="currentColor" />
      <rect x="240" y="52" width="22" height="126" rx="8" className="text-violet-300 dark:text-violet-800" fill="currentColor" />
      <rect x="212" y="52" width="50" height="126" rx="8" fill="none" className="text-violet-600" stroke="currentColor" strokeWidth="2" />
      <text x="237" y="46" textAnchor="middle" className="text-violet-700 dark:text-violet-300" fill="currentColor" fontSize="10" fontWeight="700">channel protein</text>

      {/* carrier protein */}
      <rect x="480" y="52" width="46" height="126" rx="10" className="text-emerald-300 dark:text-emerald-800" fill="currentColor" />
      <rect x="480" y="52" width="46" height="126" rx="10" fill="none" className="text-emerald-600" stroke="currentColor" strokeWidth="2" />
      <path d="M 492 74 h 22 M 492 100 h 22 M 492 126 h 22" className="text-emerald-800 dark:text-emerald-900" stroke="currentColor" strokeWidth="2" />
      <text x="503" y="46" textAnchor="middle" className="text-emerald-700 dark:text-emerald-300" fill="currentColor" fontSize="10" fontWeight="700">carrier protein</text>

      {/* cholesterol */}
      <line x1="344" y1="96" x2="356" y2="118" className="text-rose-500" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <text x="350" y="134" textAnchor="middle" className="text-rose-700 dark:text-rose-300" fill="currentColor" fontSize="10">cholesterol</text>

      {/* glycoprotein */}
      <line x1="592" y1="70" x2="592" y2="44" className="text-amber-600" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="592" y1="52" x2="580" y2="40" className="text-amber-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="592" y1="52" x2="604" y2="40" className="text-amber-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="580" cy="38" r="4" className="text-amber-500" fill="currentColor" />
      <circle cx="604" cy="38" r="4" className="text-amber-500" fill="currentColor" />
      <text x="634" y="44" textAnchor="middle" className="text-amber-700 dark:text-amber-300" fill="currentColor" fontSize="10">glycoprotein</text>

      <text x="350" y="176" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">hydrophilic heads face water · hydrophobic tails face inward</text>
      <text x="350" y="236" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11" fontWeight="700">inside the cell</text>
    </svg>
  </DiagramFrame>
);

export const MitosisStagesDiagram: React.FC = () => (
  <DiagramFrame
    title="The four stages of mitosis"
    caption="Real-world connection: mitosis heals a cut on your hand and builds every new leaf of a teff plant. Because each daughter cell gets an identical set of chromosomes, the replacement skin and the new leaf cells work exactly like the originals."
  >
    <svg viewBox="0 0 700 245" className="w-full h-auto" role="img" aria-label="Mitosis stages: prophase, metaphase, anaphase, telophase">
      {[
        { x: 95, label: "Prophase" },
        { x: 265, label: "Metaphase" },
        { x: 435, label: "Anaphase" },
        { x: 605, label: "Telophase" },
      ].map((p) => (
        <g key={p.label}>
          <text x={p.x} y="18" textAnchor="middle" className="text-emerald-700 dark:text-emerald-300" fill="currentColor" fontSize="12" fontWeight="700">{p.label}</text>
          <circle cx={p.x} cy="96" r="62" className="text-emerald-50 dark:text-emerald-900/30" fill="currentColor" />
          <circle cx={p.x} cy="96" r="62" fill="none" className="text-emerald-500" stroke="currentColor" strokeWidth="2" />
        </g>
      ))}

      {/* prophase: condensing chromosomes */}
      <g className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 72 78 l 18 18 M 90 78 l -18 18" />
        <path d="M 112 98 l 18 18 M 130 98 l -18 18" />
        <path d="M 80 122 l 18 18 M 98 122 l -18 18" />
      </g>

      {/* metaphase: aligned at equator */}
      <g className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 256 70 l 18 18 M 274 70 l -18 18" />
        <path d="M 256 96 l 18 18 M 274 96 l -18 18" />
        <path d="M 256 122 l 18 18 M 274 122 l -18 18" />
      </g>
      <line x1="265" y1="34" x2="265" y2="158" className="text-slate-300 dark:text-slate-700" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" />

      {/* anaphase: chromatids move to poles */}
      <g className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M 408 82 l 16 14 l -16 14" />
        <path d="M 408 112 l 16 14" />
        <path d="M 462 82 l -16 14 l 16 14" />
        <path d="M 462 112 l -16 14" />
      </g>

      {/* telophase: two nuclei, cleavage furrow */}
      <circle cx="588" cy="96" r="26" className="text-violet-100 dark:text-violet-900/40" fill="currentColor" />
      <circle cx="588" cy="96" r="26" fill="none" className="text-violet-600" stroke="currentColor" strokeWidth="2" />
      <circle cx="622" cy="96" r="26" className="text-violet-100 dark:text-violet-900/40" fill="currentColor" />
      <circle cx="622" cy="96" r="26" fill="none" className="text-violet-600" stroke="currentColor" strokeWidth="2" />
      <circle cx="588" cy="96" r="8" className="text-violet-500" fill="currentColor" />
      <circle cx="622" cy="96" r="8" className="text-violet-500" fill="currentColor" />
      <path d="M 605 34 q -10 20 0 30 q 10 20 0 30 q -10 20 0 30" fill="none" className="text-slate-400" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />

      {/* stage notes */}
      <text x="95" y="182" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">chromosomes condense;</text>
      <text x="95" y="196" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">spindle forms</text>
      <text x="265" y="182" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">chromosomes line up</text>
      <text x="265" y="196" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">at the equator</text>
      <text x="435" y="182" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">sister chromatids</text>
      <text x="435" y="196" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">pull to opposite poles</text>
      <text x="605" y="182" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">two nuclei form;</text>
      <text x="605" y="196" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">cell pinches in two</text>

      <text x="350" y="228" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11" fontWeight="600">one 2n parent cell → two identical 2n daughter cells</text>
    </svg>
  </DiagramFrame>
);
