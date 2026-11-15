import React from "react";

/* Shared, theme-aware visual aids for Grade 12 Biology.
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

export const ConservationApproachesGrid: React.FC = () => {
  const approaches = [
    {
      tag: "IN-SITU",
      title: "Protect the habitat",
      text: "National parks, wildlife corridors and watershed forests keep species in their natural ecosystem — e.g. Bale Mountains and Simien Mountains.",
      border: "border-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      label: "text-emerald-800 dark:text-emerald-300",
    },
    {
      tag: "EX-SITU",
      title: "Breed and reintroduce",
      text: "Zoos, seed banks and captive breeding programs safeguard species whose wild populations are too small to survive alone.",
      border: "border-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      label: "text-blue-800 dark:text-blue-300",
    },
    {
      tag: "SUSTAINABLE USE",
      title: "Harvest at replacement rate",
      text: "Quotas, seasonal bans and size limits let fish, forests and wildlife regenerate — e.g. the Lake Tana fishery bans.",
      border: "border-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      label: "text-amber-800 dark:text-amber-300",
    },
  ];

  return (
    <DiagramFrame
      title="Three ways biology protects natural resources"
      caption="Real-world connection: Ethiopia's Ethiopian wolf is protected by all three approaches at once — habitat guards in the Bale Mountains, a captive breeding program, and community agreements that reduce grazing and disease pressure."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {approaches.map((a) => (
          <div key={a.tag} className={`rounded-lg border-l-4 ${a.border} ${a.bg} p-3`}>
            <p className={`text-[10px] font-black tracking-widest ${a.label}`}>{a.tag}</p>
            <p className={`text-sm font-bold mt-1 ${a.label}`}>{a.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

export const NitrogenFixationDiagram: React.FC = () => (
  <DiagramFrame
    title="Rhizobium turns air nitrogen into plant-usable ammonia"
    caption="Real-world connection: Ethiopian farmers intercrop cereals with faba bean, chickpea or lentil. The bacteria inside the root nodules fix N₂ from the air, cutting chemical fertilizer needs by 40–50% and leaving nitrogen in the soil for the next cereal crop."
  >
    <svg viewBox="0 0 700 292" className="w-full h-auto" role="img" aria-label="Nitrogen fixation inside legume root nodules">
      {/* air */}
      <rect x="30" y="24" width="190" height="58" rx="12" className="text-sky-100 dark:text-sky-900/40" fill="currentColor" />
      <rect x="30" y="24" width="190" height="58" rx="12" fill="none" className="text-sky-500" stroke="currentColor" strokeWidth="2" />
      <text x="125" y="48" textAnchor="middle" className="text-sky-700 dark:text-sky-300" fill="currentColor" fontSize="14" fontWeight="700">N₂ in the air</text>
      <text x="125" y="66" textAnchor="middle" className="text-sky-600 dark:text-sky-400" fill="currentColor" fontSize="11">plants cannot use this form</text>

      {/* soil */}
      <line x1="20" y1="200" x2="680" y2="200" className="text-amber-600 dark:text-amber-500" stroke="currentColor" strokeWidth="2" strokeDasharray="7 5" />
      <text x="30" y="192" className="text-amber-700 dark:text-amber-400" fill="currentColor" fontSize="11">soil surface</text>

      {/* plant */}
      <line x1="430" y1="200" x2="430" y2="82" className="text-emerald-700 dark:text-emerald-600" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="398" cy="96" rx="34" ry="13" transform="rotate(-22 398 96)" className="text-emerald-500 dark:text-emerald-400" fill="currentColor" />
      <ellipse cx="462" cy="88" rx="34" ry="13" transform="rotate(20 462 88)" className="text-emerald-500 dark:text-emerald-400" fill="currentColor" />
      <ellipse cx="430" cy="70" rx="26" ry="12" className="text-emerald-600 dark:text-emerald-500" fill="currentColor" />

      {/* roots */}
      <path d="M430 200 C 400 224, 366 232, 334 246" fill="none" className="text-emerald-800 dark:text-emerald-700" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M430 200 C 458 226, 492 234, 520 246" fill="none" className="text-emerald-800 dark:text-emerald-700" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="352" cy="243" r="15" className="text-rose-200 dark:text-rose-900/50" fill="currentColor" />
      <circle cx="352" cy="243" r="15" fill="none" className="text-rose-500" stroke="currentColor" strokeWidth="2" />
      <circle cx="502" cy="246" r="13" className="text-rose-200 dark:text-rose-900/50" fill="currentColor" />
      <circle cx="502" cy="246" r="13" fill="none" className="text-rose-500" stroke="currentColor" strokeWidth="2" />
      <text x="352" y="247" textAnchor="middle" className="text-rose-700 dark:text-rose-300" fill="currentColor" fontSize="10" fontWeight="700">nodule</text>
      <text x="502" y="250" textAnchor="middle" className="text-rose-700 dark:text-rose-300" fill="currentColor" fontSize="10" fontWeight="700">nodule</text>

      {/* air -> nodule */}
      <path d="M 205 64 C 280 130, 300 190, 342 230" fill="none" className="text-sky-500" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="348,236 334,232 341,221" className="text-sky-500" fill="currentColor" />
      <text x="238" y="130" className="text-sky-600 dark:text-sky-400" fill="currentColor" fontSize="11">N₂ diffuses into roots</text>

      {/* bacteria + conversion */}
      <text x="352" y="222" textAnchor="middle" className="text-rose-700 dark:text-rose-300" fill="currentColor" fontSize="11" fontWeight="700">Rhizobium</text>
      <rect x="540" y="212" width="140" height="48" rx="8" className="text-amber-50 dark:text-amber-900/40" fill="currentColor" />
      <rect x="540" y="212" width="140" height="48" rx="8" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" />
      <text x="610" y="232" textAnchor="middle" className="text-amber-800 dark:text-amber-300" fill="currentColor" fontSize="13" fontWeight="700">N₂ → NH₃</text>
      <text x="610" y="248" textAnchor="middle" className="text-amber-700 dark:text-amber-400" fill="currentColor" fontSize="10">ammonia (usable)</text>
      <line x1="368" y1="242" x2="534" y2="236" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="539,236 526,231 526,241" className="text-slate-500" fill="currentColor" />

      {/* ammonia -> shoots */}
      <path d="M 470 210 C 500 180, 500 140, 452 112" fill="none" className="text-emerald-600 dark:text-emerald-400" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="449,106 445,120 457,118" className="text-emerald-600 dark:text-emerald-400" fill="currentColor" />
      <text x="505" y="160" className="text-emerald-700 dark:text-emerald-300" fill="currentColor" fontSize="11">amino acids build leaves</text>

      {/* equation */}
      <text x="350" y="272" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12" fontWeight="600">N₂ + 8H⁺ + 8e⁻ → 2NH₃ + H₂ (nitrogenase enzyme)</text>
    </svg>
  </DiagramFrame>
);

export const InsulinProductionDiagram: React.FC = () => (
  <DiagramFrame
    title="From a human gene to a vial of insulin"
    caption="Real-world connection: before 1982 insulin came only from pig and cattle pancreas. Today bacteria carrying the human insulin gene produce it in fermenters — the same biotechnology used in Ethiopia's pharmaceutical research and vaccine production."
  >
    <svg viewBox="0 0 700 220" className="w-full h-auto" role="img" aria-label="Flow diagram of recombinant insulin production">
      {/* box 1 */}
      <rect x="16" y="46" width="150" height="72" rx="10" className="text-emerald-100 dark:text-emerald-900/40" fill="currentColor" />
      <rect x="16" y="46" width="150" height="72" rx="10" fill="none" className="text-emerald-500" stroke="currentColor" strokeWidth="2" />
      <text x="91" y="72" textAnchor="middle" className="text-emerald-800 dark:text-emerald-300" fill="currentColor" fontSize="13" fontWeight="700">Human insulin gene</text>
      <text x="91" y="92" textAnchor="middle" className="text-emerald-700 dark:text-emerald-400" fill="currentColor" fontSize="10">cut from human DNA</text>

      {/* box 2 */}
      <rect x="196" y="46" width="150" height="72" rx="10" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
      <rect x="196" y="46" width="150" height="72" rx="10" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="271" y="72" textAnchor="middle" className="text-blue-800 dark:text-blue-300" fill="currentColor" fontSize="13" fontWeight="700">Plasmid vector</text>
      <text x="271" y="92" textAnchor="middle" className="text-blue-700 dark:text-blue-400" fill="currentColor" fontSize="10">gene inserted into loop</text>

      {/* box 3 */}
      <rect x="376" y="46" width="150" height="72" rx="10" className="text-purple-100 dark:text-purple-900/40" fill="currentColor" />
      <rect x="376" y="46" width="150" height="72" rx="10" fill="none" className="text-purple-500" stroke="currentColor" strokeWidth="2" />
      <text x="451" y="72" textAnchor="middle" className="text-purple-800 dark:text-purple-300" fill="currentColor" fontSize="13" fontWeight="700">Bacteria (E. coli)</text>
      <text x="451" y="92" textAnchor="middle" className="text-purple-700 dark:text-purple-400" fill="currentColor" fontSize="10">take up the plasmid</text>

      {/* box 4 */}
      <rect x="556" y="46" width="128" height="72" rx="10" className="text-amber-100 dark:text-amber-900/40" fill="currentColor" />
      <rect x="556" y="46" width="128" height="72" rx="10" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" />
      <text x="620" y="72" textAnchor="middle" className="text-amber-800 dark:text-amber-300" fill="currentColor" fontSize="13" fontWeight="700">Fermenter</text>
      <text x="620" y="92" textAnchor="middle" className="text-amber-700 dark:text-amber-400" fill="currentColor" fontSize="10">grow &amp; express</text>

      {/* arrows */}
      {[170, 350, 530].map((x) => (
        <g key={x}>
          <line x1={x} y1="82" x2={x + 20} y2="82" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
          <polygon points={`${x + 25},82 ${x + 12},76 ${x + 12},88`} className="text-slate-500" fill="currentColor" />
        </g>
      ))}

      {/* output */}
      <line x1="620" y1="118" x2="620" y2="148" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="620,154 614,141 626,141" className="text-slate-500" fill="currentColor" />
      <rect x="390" y="154" width="296" height="48" rx="10" className="text-green-50 dark:text-green-900/30" fill="currentColor" />
      <rect x="390" y="154" width="296" height="48" rx="10" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="538" y="175" textAnchor="middle" className="text-green-800 dark:text-green-300" fill="currentColor" fontSize="13" fontWeight="700">Purified human insulin</text>
      <text x="538" y="192" textAnchor="middle" className="text-green-700 dark:text-green-400" fill="currentColor" fontSize="10">identical to the hormone the body makes</text>

      <text x="91" y="150" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">step 1</text>
      <text x="271" y="150" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">step 2</text>
      <text x="451" y="150" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">step 3</text>
      <text x="620" y="150" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">step 4</text>
    </svg>
  </DiagramFrame>
);

export const IndustrialBiotechDiagram: React.FC = () => (
  <DiagramFrame
    title="A bioreactor: microbes as living factories"
    caption="Real-world connection: Ethiopian sugar factories ferment molasses into ethanol, dairies use Lactobacillus to make yogurt and cheese, and wastewater plants use microbes to clean sewage — all controlled bioreactions shown here."
  >
    <svg viewBox="0 0 700 240" className="w-full h-auto" role="img" aria-label="Bioreactor converting raw materials into useful products">
      {/* raw materials */}
      <rect x="16" y="56" width="170" height="80" rx="10" className="text-amber-100 dark:text-amber-900/40" fill="currentColor" />
      <rect x="16" y="56" width="170" height="80" rx="10" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" />
      <text x="101" y="82" textAnchor="middle" className="text-amber-800 dark:text-amber-300" fill="currentColor" fontSize="13" fontWeight="700">Raw materials</text>
      <text x="101" y="101" textAnchor="middle" className="text-amber-700 dark:text-amber-400" fill="currentColor" fontSize="10">molasses, milk, starch,</text>
      <text x="101" y="117" textAnchor="middle" className="text-amber-700 dark:text-amber-400" fill="currentColor" fontSize="10">crop residues</text>

      {/* bioreactor */}
      <rect x="264" y="34" width="170" height="124" rx="44" className="text-emerald-100 dark:text-emerald-900/40" fill="currentColor" />
      <rect x="264" y="34" width="170" height="124" rx="44" fill="none" className="text-emerald-600" stroke="currentColor" strokeWidth="2" />
      <circle cx="322" cy="90" r="9" className="text-emerald-500" fill="currentColor" />
      <circle cx="360" cy="112" r="7" className="text-emerald-500" fill="currentColor" />
      <circle cx="392" cy="80" r="8" className="text-emerald-500" fill="currentColor" />
      <text x="349" y="142" textAnchor="middle" className="text-emerald-800 dark:text-emerald-300" fill="currentColor" fontSize="13" fontWeight="700">Bioreactor</text>
      <text x="349" y="158" textAnchor="middle" className="text-emerald-700 dark:text-emerald-400" fill="currentColor" fontSize="10">30–37 °C, controlled pH</text>
      <line x1="300" y1="34" x2="300" y2="14" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <line x1="398" y1="34" x2="398" y2="14" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <line x1="292" y1="14" x2="406" y2="14" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <text x="430" y="18" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="10">stirrer</text>

      {/* products */}
      <rect x="514" y="46" width="170" height="100" rx="10" className="text-sky-100 dark:text-sky-900/40" fill="currentColor" />
      <rect x="514" y="46" width="170" height="100" rx="10" fill="none" className="text-sky-500" stroke="currentColor" strokeWidth="2" />
      <text x="599" y="72" textAnchor="middle" className="text-sky-800 dark:text-sky-300" fill="currentColor" fontSize="13" fontWeight="700">Products</text>
      <text x="599" y="92" textAnchor="middle" className="text-sky-700 dark:text-sky-400" fill="currentColor" fontSize="10">ethanol · biogas</text>
      <text x="599" y="108" textAnchor="middle" className="text-sky-700 dark:text-sky-400" fill="currentColor" fontSize="10">yogurt · cheese</text>
      <text x="599" y="124" textAnchor="middle" className="text-sky-700 dark:text-sky-400" fill="currentColor" fontSize="10">enzymes · antibiotics</text>

      {/* arrows */}
      <line x1="190" y1="96" x2="256" y2="96" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="261,96 248,90 248,102" className="text-slate-500" fill="currentColor" />
      <line x1="438" y1="96" x2="506" y2="96" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="511,96 498,90 498,102" className="text-slate-500" fill="currentColor" />

      {/* labels */}
      <text x="223" y="86" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">feed</text>
      <text x="472" y="86" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">harvest</text>

      {/* downstream */}
      <rect x="264" y="184" width="170" height="38" rx="8" className="text-slate-50 dark:text-slate-800" fill="currentColor" />
      <rect x="264" y="184" width="170" height="38" rx="8" fill="none" className="text-slate-400" stroke="currentColor" strokeWidth="2" />
      <text x="349" y="208" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="11">distil · filter · purify</text>
      <line x1="349" y1="158" x2="349" y2="178" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="349,183 343,170 355,170" className="text-slate-500" fill="currentColor" />

      <text x="350" y="234" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12" fontWeight="600">microbe + raw material → controlled fermentation → useful product</text>
    </svg>
  </DiagramFrame>
);
