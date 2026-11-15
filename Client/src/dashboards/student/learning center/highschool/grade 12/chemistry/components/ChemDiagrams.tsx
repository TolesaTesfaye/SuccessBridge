import React from "react";

/* Shared, theme-aware visual aids for Grade 12 Chemistry.
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

export const PhScaleDiagram: React.FC = () => (
  <DiagramFrame
    title="The pH scale with everyday examples"
    caption="Real-world connection: the sour taste of ergo and tej comes from acids on the left; pure water sits at neutral 7; wood-ash soap and lime sit on the basic right. Where a substance falls on this scale tells you how it will behave."
  >
    <svg viewBox="0 0 700 190" className="w-full h-auto" role="img" aria-label="pH scale from 0 to 14 with examples">
      {/* zones */}
      <rect x="40" y="40" width="290" height="34" rx="6" className="text-red-400" fill="currentColor" />
      <rect x="330" y="40" width="20" height="34" className="text-green-500" fill="currentColor" />
      <rect x="350" y="40" width="310" height="34" rx="6" className="text-blue-500" fill="currentColor" />

      {/* zone labels */}
      <text x="185" y="30" textAnchor="middle" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="16" fontWeight="700">ACIDIC</text>
      <text x="340" y="30" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="16" fontWeight="700">NEUTRAL</text>
      <text x="505" y="30" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="16" fontWeight="700">BASIC</text>

      {/* numbers */}
      <text x="40" y="95" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="14">0</text>
      <text x="340" y="95" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="14">7</text>
      <text x="660" y="95" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="14">14</text>

      {/* example markers */}
      <line x1="120" y1="74" x2="120" y2="120" className="text-red-500" stroke="currentColor" strokeWidth="2" />
      <text x="120" y="140" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="13">ergo / tej (~pH 3-4)</text>
      <text x="120" y="158" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">sour, acidic</text>

      <line x1="340" y1="74" x2="340" y2="120" className="text-green-500" stroke="currentColor" strokeWidth="2" />
      <text x="340" y="140" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="13">pure water (pH 7)</text>

      <line x1="560" y1="74" x2="560" y2="120" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="560" y="140" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="13">wood-ash soap / lime (~pH 10-12)</text>
      <text x="560" y="158" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">slippery, basic</text>

      {/* [H+] direction hint */}
      <text x="40" y="182" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">[H⁺] high →</text>
      <text x="660" y="182" textAnchor="end" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">← [OH⁻] high</text>
    </svg>
  </DiagramFrame>
);

export const ProtonTransferDiagram: React.FC = () => (
  <DiagramFrame
    title="Brønsted-Lowry: a proton (H⁺) jumps from acid to base"
    caption="Real-world connection: when ammonia cleans a sour (acidic) surface, NH₃ grabs an H⁺ — exactly the proton hand-off shown here. The acid becomes its conjugate base; the base becomes its conjugate acid."
  >
    <svg viewBox="0 0 700 170" className="w-full h-auto" role="img" aria-label="Proton transfer from acid to base forming conjugate pairs">
      <rect x="60" y="40" width="200" height="60" rx="10" className="text-red-100 dark:text-red-900/40" fill="currentColor" stroke="currentColor" />
      <rect x="60" y="40" width="200" height="60" rx="10" fill="none" className="text-red-500" stroke="currentColor" strokeWidth="2" />
      <text x="160" y="66" textAnchor="middle" className="text-red-700 dark:text-red-300" fill="currentColor" fontSize="16" fontWeight="700">ACID (HA)</text>
      <text x="160" y="86" textAnchor="middle" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="13">proton donor</text>

      <rect x="440" y="40" width="200" height="60" rx="10" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
      <rect x="440" y="40" width="200" height="60" rx="10" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="540" y="66" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="16" fontWeight="700">BASE (B)</text>
      <text x="540" y="86" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="13">proton acceptor</text>

      {/* transfer arrow */}
      <line x1="270" y1="70" x2="420" y2="70" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" />
      <polygon points="420,70 405,62 405,78" className="text-purple-600 dark:text-purple-400" fill="currentColor" />
      <text x="345" y="58" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="15" fontWeight="700">H⁺ transfers</text>

      {/* conjugates */}
      <text x="160" y="130" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="13">becomes conjugate base (A⁻)</text>
      <text x="540" y="130" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="13">becomes conjugate acid (HB⁺)</text>
      <text x="345" y="160" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">conjugate acid-base pairs: HA/A⁻  and  HB⁺/B</text>
    </svg>
  </DiagramFrame>
);

export const BufferActionDiagram: React.FC = () => (
  <DiagramFrame
    title="How a buffer soaks up added acid or base"
    caption="Real-world connection: your blood uses the H₂CO₃/HCO₃⁻ buffer this way to stay near pH 7.4. The weak acid neutralises added base; the conjugate base neutralises added acid — so pH barely moves."
  >
    <svg viewBox="0 0 700 200" className="w-full h-auto" role="img" aria-label="Buffer neutralising added acid and base to keep pH constant">
      <rect x="250" y="70" width="200" height="60" rx="10" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="250" y="70" width="200" height="60" rx="10" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="350" y="95" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="15" fontWeight="700">BUFFER</text>
      <text x="350" y="114" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="12">HA + A⁻</text>

      {/* added acid arrow */}
      <line x1="60" y1="60" x2="235" y2="85" className="text-red-500" stroke="currentColor" strokeWidth="3" />
      <polygon points="240,86 224,80 226,94" className="text-red-500" fill="currentColor" />
      <text x="60" y="45" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="14" fontWeight="700">add acid (H⁺)</text>
      <text x="60" y="105" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">A⁻ absorbs it → HA</text>

      {/* added base arrow */}
      <line x1="60" y1="150" x2="235" y2="115" className="text-blue-500" stroke="currentColor" strokeWidth="3" />
      <polygon points="240,114 226,110 224,124" className="text-blue-500" fill="currentColor" />
      <text x="60" y="170" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="14" fontWeight="700">add base (OH⁻)</text>
      <text x="60" y="188" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">HA absorbs it → A⁻</text>

      {/* result */}
      <line x1="460" y1="100" x2="560" y2="100" className="text-green-600" stroke="currentColor" strokeWidth="3" />
      <polygon points="565,100 550,92 550,108" className="text-green-600" fill="currentColor" />
      <text x="580" y="95" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="15" fontWeight="700">pH stays</text>
      <text x="580" y="113" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="15" fontWeight="700">~constant</text>
    </svg>
  </DiagramFrame>
);

export const SaltHydrolysisGrid: React.FC = () => {
  const cases = [
    { from: "Strong acid + Strong base", example: "NaCl", result: "Neutral", ph: "pH = 7", color: "green" },
    { from: "Weak acid + Strong base", example: "CH₃COONa", result: "Basic", ph: "pH > 7", color: "blue" },
    { from: "Strong acid + Weak base", example: "NH₄Cl", result: "Acidic", ph: "pH < 7", color: "red" },
    { from: "Weak acid + Weak base", example: "CH₃COONH₄", result: "Depends on Ka vs Kb", ph: "≈ 7", color: "amber" },
  ];
  const palette: Record<string, string> = {
    green: "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    blue: "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    red: "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    amber: "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
  };
  return (
    <DiagramFrame
      title="Predicting the pH of a salt solution at a glance"
      caption="Real-world connection: this is why farmers add basic wood ash to acidic soil — the carbonate salt hydrolyses to release OH⁻ and lift the pH toward neutral."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cases.map((c) => (
          <div key={c.example} className={`rounded-lg border-l-4 p-4 ${palette[c.color]}`}>
            <p className="text-sm font-bold">{c.from}</p>
            <p className="text-xs opacity-80 mt-1">e.g. {c.example}</p>
            <p className="text-sm font-bold mt-2">{c.result} · {c.ph}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

export const TitrationCurveDiagram: React.FC = () => (
  <DiagramFrame
    title="Titration curve: the steep jump marks the equivalence point"
    caption="Real-world connection: a lab technician adding base to an acid sample watches the pH stay flat, then jump sharply at the equivalence point — the moment to stop and read the volume. The indicator is chosen to change colour inside this jump."
  >
    <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="Titration curve showing equivalence point">
      {/* axes */}
      <line x1="70" y1="250" x2="660" y2="250" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <line x1="70" y1="250" x2="70" y2="30" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="285" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="14">volume of base added →</text>
      <text x="30" y="140" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="14" transform="rotate(-90 30 140)">pH</text>

      {/* curve */}
      <path d="M 80 220 C 200 210, 300 205, 340 190 C 360 120, 380 110, 400 90 C 440 70, 540 60, 650 55"
        fill="none" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" />

      {/* equivalence point */}
      <circle cx="372" cy="150" r="6" className="text-red-500" fill="currentColor" />
      <line x1="372" y1="150" x2="372" y2="250" className="text-red-400" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="392" y="140" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="14" fontWeight="700">equivalence point</text>

      {/* indicator range */}
      <rect x="352" y="100" width="40" height="90" className="text-yellow-300/40 dark:text-yellow-500/20" fill="currentColor" />
      <text x="402" y="105" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">indicator colour-change range</text>

      {/* flat regions */}
      <text x="150" y="238" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">buffer region (pH changes slowly)</text>
    </svg>
  </DiagramFrame>
);

/* ---------------- Chapter 2 diagrams ---------------- */

export const RedoxElectronTransferDiagram: React.FC = () => (
  <DiagramFrame
    title="Redox: electrons flow from the species oxidized to the species reduced"
    caption="Real-world connection: this exact hand-off powers a simple battery and also rusts iron — iron loses electrons (oxidizes) while oxygen gains them (reduces). Remember OIL RIG: Oxidation Is Loss, Reduction Is Gain."
  >
    <svg viewBox="0 0 700 180" className="w-full h-auto" role="img" aria-label="Electron transfer from zinc to copper ion">
      <rect x="60" y="50" width="190" height="60" rx="10" className="text-slate-100 dark:text-slate-800" fill="currentColor" />
      <rect x="60" y="50" width="190" height="60" rx="10" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" />
      <text x="155" y="75" textAnchor="middle" className="text-slate-800 dark:text-slate-200" fill="currentColor" fontSize="16" fontWeight="700">Zn</text>
      <text x="155" y="95" textAnchor="middle" className="text-amber-600 dark:text-amber-400" fill="currentColor" fontSize="13">OXIDIZED (loses 2e⁻)</text>

      <rect x="450" y="50" width="190" height="60" rx="10" className="text-slate-100 dark:text-slate-800" fill="currentColor" />
      <rect x="450" y="50" width="190" height="60" rx="10" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="545" y="75" textAnchor="middle" className="text-slate-800 dark:text-slate-200" fill="currentColor" fontSize="16" fontWeight="700">Cu²⁺</text>
      <text x="545" y="95" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="13">REDUCED (gains 2e⁻)</text>

      <line x1="260" y1="80" x2="430" y2="80" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" />
      <polygon points="435,80 420,72 420,88" className="text-purple-600 dark:text-purple-400" fill="currentColor" />
      <text x="345" y="66" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="15" fontWeight="700">2e⁻ transferred</text>

      <text x="155" y="140" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">Zn is the reducing agent</text>
      <text x="545" y="140" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">Cu²⁺ is the oxidizing agent</text>
      <text x="345" y="170" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">oxidation number: Zn 0 → +2 (up) · Cu +2 → 0 (down)</text>
    </svg>
  </DiagramFrame>
);

export const ElectrolyticCellDiagram: React.FC = () => (
  <DiagramFrame
    title="Electrolytic cell: electricity drives a non-spontaneous reaction"
    caption="Real-world connection: this is the setup an Addis Ababa workshop uses to electroplate a bracelet — the object is the cathode, and metal ions from solution deposit onto it as current flows."
  >
    <svg viewBox="0 0 700 320" className="w-full h-auto" role="img" aria-label="Electrolytic cell with battery, anode and cathode">
      {/* battery */}
      <rect x="300" y="20" width="100" height="40" rx="8" className="text-slate-200 dark:text-slate-700" fill="currentColor" />
      <text x="350" y="45" textAnchor="middle" className="text-slate-800 dark:text-slate-100" fill="currentColor" fontSize="14" fontWeight="700">battery</text>

      {/* wires */}
      <line x1="300" y1="40" x2="180" y2="40" className="text-slate-500" stroke="currentColor" strokeWidth="3" />
      <line x1="180" y1="40" x2="180" y2="120" className="text-slate-500" stroke="currentColor" strokeWidth="3" />
      <line x1="400" y1="40" x2="520" y2="40" className="text-slate-500" stroke="currentColor" strokeWidth="3" />
      <line x1="520" y1="40" x2="520" y2="120" className="text-slate-500" stroke="currentColor" strokeWidth="3" />

      {/* electron flow arrow on wire */}
      <line x1="240" y1="28" x2="430" y2="28" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="435,28 422,22 422,34" className="text-purple-600 dark:text-purple-400" fill="currentColor" />
      <text x="335" y="18" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="12">e⁻ flow (through wire)</text>

      {/* beaker */}
      <rect x="120" y="150" width="460" height="140" rx="8" className="text-blue-100 dark:text-blue-900/30" fill="currentColor" />
      <rect x="120" y="150" width="460" height="140" rx="8" fill="none" className="text-blue-400" stroke="currentColor" strokeWidth="2" />
      <text x="350" y="275" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="13">electrolyte (aqueous solution)</text>

      {/* electrodes */}
      <rect x="165" y="120" width="30" height="120" rx="4" className="text-slate-400" fill="currentColor" />
      <rect x="505" y="120" width="30" height="120" rx="4" className="text-slate-400" fill="currentColor" />
      <text x="180" y="112" textAnchor="middle" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="14" fontWeight="700">ANODE (+)</text>
      <text x="520" y="112" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="14" fontWeight="700">CATHODE (−)</text>
      <text x="180" y="262" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">oxidation</text>
      <text x="520" y="262" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">reduction</text>

      {/* ion flow */}
      <line x1="230" y1="200" x2="470" y2="200" className="text-green-600 dark:text-green-400" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="475,200 462,194 462,206" className="text-green-600 dark:text-green-400" fill="currentColor" />
      <text x="350" y="190" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="12">cations → to cathode</text>
    </svg>
  </DiagramFrame>
);

export const VoltaicCellDiagram: React.FC = () => (
  <DiagramFrame
    title="Voltaic (Daniell) cell: a spontaneous reaction makes electricity"
    caption="Real-world connection: every dry-cell battery in a torch or radio works on this principle — a spontaneous redox reaction pushes electrons through your device. When the reactants run out, the battery is 'dead'."
  >
    <svg viewBox="0 0 700 320" className="w-full h-auto" role="img" aria-label="Daniell voltaic cell with two half cells and salt bridge">
      {/* wire + load */}
      <line x1="180" y1="60" x2="320" y2="60" className="text-slate-500" stroke="currentColor" strokeWidth="3" />
      <line x1="380" y1="60" x2="520" y2="60" className="text-slate-500" stroke="currentColor" strokeWidth="3" />
      <circle cx="350" cy="60" r="22" className="text-yellow-300 dark:text-yellow-500/40" fill="currentColor" stroke="currentColor" />
      <text x="350" y="66" textAnchor="middle" className="text-slate-800 dark:text-slate-100" fill="currentColor" fontSize="12" fontWeight="700">load</text>
      <line x1="200" y1="46" x2="300" y2="46" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="305,46 292,40 292,52" className="text-purple-600 dark:text-purple-400" fill="currentColor" />
      <text x="250" y="34" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="12">e⁻ flow</text>

      {/* left beaker (anode) */}
      <rect x="110" y="120" width="160" height="150" rx="8" className="text-slate-100 dark:text-slate-800" fill="currentColor" />
      <rect x="110" y="120" width="160" height="150" rx="8" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" />
      <rect x="165" y="90" width="24" height="140" rx="4" className="text-slate-400" fill="currentColor" />
      <text x="190" y="112" textAnchor="middle" className="text-red-600 dark:text-red-400" fill="currentColor" fontSize="13" fontWeight="700">ANODE (−)</text>
      <text x="190" y="255" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">Zn | Zn²⁺</text>
      <text x="190" y="285" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="11">Zn → Zn²⁺ + 2e⁻</text>

      {/* right beaker (cathode) */}
      <rect x="430" y="120" width="160" height="150" rx="8" className="text-slate-100 dark:text-slate-800" fill="currentColor" />
      <rect x="430" y="120" width="160" height="150" rx="8" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <rect x="490" y="90" width="24" height="140" rx="4" className="text-slate-400" fill="currentColor" />
      <text x="510" y="112" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="13" fontWeight="700">CATHODE (+)</text>
      <text x="510" y="255" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">Cu²⁺ | Cu</text>
      <text x="510" y="285" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="11">Cu²⁺ + 2e⁻ → Cu</text>

      {/* salt bridge */}
      <path d="M 250 150 C 300 110, 400 110, 450 150" fill="none" className="text-green-600 dark:text-green-400" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <text x="350" y="105" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="12" fontWeight="700">salt bridge (ions migrate)</text>
    </svg>
  </DiagramFrame>
);

export const FaradayLawGraph: React.FC = () => (
  <DiagramFrame
    title="Faraday's first law: mass deposited grows in step with charge"
    caption="Real-world connection: an electroplater controls coating thickness by controlling current × time. Double the charge and you double the mass of metal deposited — a straight line through the origin."
  >
    <svg viewBox="0 0 700 260" className="w-full h-auto" role="img" aria-label="Graph of mass versus charge showing a straight line through the origin">
      <line x1="80" y1="220" x2="650" y2="220" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <line x1="80" y1="220" x2="80" y2="30" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="250" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="14">charge Q (coulombs) →</text>
      <text x="40" y="120" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="14" transform="rotate(-90 40 120)">mass m</text>

      <line x1="80" y1="220" x2="600" y2="60" className="text-purple-600 dark:text-purple-400" stroke="currentColor" strokeWidth="3" />
      <circle cx="80" cy="220" r="5" className="text-purple-600 dark:text-purple-400" fill="currentColor" />
      <text x="330" y="120" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="15" fontWeight="700">m = Z·Q = Z·I·t</text>
      <text x="120" y="60" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">slope = Z (electrochemical equivalent)</text>
    </svg>
  </DiagramFrame>
);

/* ---------------- Chapter 3 diagrams ---------------- */

export const HaberProcessDiagram: React.FC = () => (
  <DiagramFrame
    title="The Haber process: making ammonia from air and gas"
    caption="Real-world connection: the ammonia from this process becomes the nitrogen fertilizers (urea, DAP) spread on Ethiopian teff and wheat fields — without it, far fewer people could be fed."
  >
    <svg viewBox="0 0 700 220" className="w-full h-auto" role="img" aria-label="Haber process flow diagram">
      {/* inputs */}
      <rect x="30" y="30" width="150" height="46" rx="8" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
      <rect x="30" y="30" width="150" height="46" rx="8" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="105" y="50" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="14" fontWeight="700">N₂ (from air)</text>
      <text x="105" y="66" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="11">+ 3H₂ (from gas/water)</text>

      {/* reactor */}
      <rect x="260" y="60" width="180" height="70" rx="10" className="text-purple-100 dark:text-purple-900/40" fill="currentColor" />
      <rect x="260" y="60" width="180" height="70" rx="10" fill="none" className="text-purple-600" stroke="currentColor" strokeWidth="2" />
      <text x="350" y="85" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="14" fontWeight="700">Converter</text>
      <text x="350" y="103" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="11">~450 °C, ~200 atm</text>
      <text x="350" y="119" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="11">iron (Fe) catalyst</text>

      {/* arrows in */}
      <line x1="180" y1="53" x2="250" y2="80" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="255,82 242,76 244,88" className="text-slate-500" fill="currentColor" />

      {/* product */}
      <rect x="520" y="70" width="150" height="50" rx="8" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="520" y="70" width="150" height="50" rx="8" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="595" y="92" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="14" fontWeight="700">NH₃ (ammonia)</text>
      <text x="595" y="108" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="11">cooled &amp; liquefied</text>

      <line x1="440" y1="95" x2="510" y2="95" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="515,95 502,89 502,101" className="text-slate-500" fill="currentColor" />

      {/* recycle */}
      <path d="M 595 120 C 595 180, 350 190, 350 135" fill="none" className="text-amber-500" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="350,132 344,144 356,144" className="text-amber-500" fill="currentColor" />
      <text x="470" y="185" textAnchor="middle" className="text-amber-600 dark:text-amber-400" fill="currentColor" fontSize="12">unreacted N₂ + H₂ recycled</text>

      <text x="350" y="212" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="13">N₂ + 3H₂ ⇌ 2NH₃  (exothermic, reversible)</text>
    </svg>
  </DiagramFrame>
);

export const EthiopianIndustriesGrid: React.FC = () => {
  const items = [
    { name: "Glass", chem: "melting silica (SiO₂) with soda ash & limestone" },
    { name: "Ceramics", chem: "firing clay (silicates) at high temperature" },
    { name: "Cement", chem: "heating limestone + clay → clinker (calcium silicates)" },
    { name: "Sugar", chem: "extracting & crystallising sucrose from cane" },
    { name: "Paper & pulp", chem: "separating cellulose fibres from lignin" },
    { name: "Tannery", chem: "treating hides with tannins/chromium salts → leather" },
    { name: "Food processing", chem: "preservation via acids, salt, fermentation" },
    { name: "Ethanol", chem: "fermentation of sugars then distillation" },
    { name: "Soap & detergent", chem: "saponification of fats with NaOH" },
  ];
  return (
    <DiagramFrame
      title="Ethiopia's manufacturing industries and the chemistry behind each"
      caption="Real-world connection: from the cement that builds Addis Ababa's skyline to the sugar of Wonji and the leather of the tanneries, each industry is applied chemistry using local raw materials."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-3">
            <p className="text-sm font-bold text-purple-800 dark:text-purple-200">{it.name}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{it.chem}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

export const IndustrialSitingGrid: React.FC = () => {
  const factors = [
    { name: "Raw materials", detail: "Locating near limestone, salt, cane or ore keeps transport costs low." },
    { name: "Energy supply", detail: "Cement kilns, smelters and electrolysis need large, reliable electricity." },
    { name: "Water", detail: "Cooling and process water — tanneries, paper mills and sugar factories use a lot." },
    { name: "Transport links", detail: "Roads, rail and ports move bulky raw materials and finished products." },
    { name: "Labour", detail: "Skilled operators, technicians and engineers must be available nearby." },
    { name: "Market", detail: "Close customers cut distribution costs for heavy or perishable goods." },
    { name: "Capital & policy", detail: "Investment, tax incentives and industrial parks attract factories." },
    { name: "Waste disposal", detail: "Safe treatment of effluent and solid waste protects nearby communities." },
  ];
  return (
    <DiagramFrame
      title="Choosing where to build a chemical plant"
      caption="Real-world connection: Ethiopia's industrial parks are sited near roads, power and labour — but often near rivers too, so siting and waste treatment must be planned together."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {factors.map((f) => (
          <div key={f.name} className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-3">
            <p className="text-sm font-bold text-purple-800 dark:text-purple-200">{f.name}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{f.detail}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

export const ContactProcessDiagram: React.FC = () => (
  <DiagramFrame
    title="The contact process: sulfur → sulfur dioxide → sulfur trioxide → sulfuric acid"
    caption="Real-world connection: sulfuric acid is the most-produced industrial chemical in the world. In Ethiopia it is essential for fertilizer manufacture and lead-acid batteries."
  >
    <svg viewBox="0 0 700 230" className="w-full h-auto" role="img" aria-label="Contact process flow diagram">
      <rect x="20" y="70" width="110" height="56" rx="8" className="text-yellow-100 dark:text-yellow-900/40" fill="currentColor" />
      <rect x="20" y="70" width="110" height="56" rx="8" fill="none" className="text-yellow-600" stroke="currentColor" strokeWidth="2" />
      <text x="75" y="92" textAnchor="middle" className="text-yellow-700 dark:text-yellow-300" fill="currentColor" fontSize="13" fontWeight="700">Sulfur (S)</text>
      <text x="75" y="110" textAnchor="middle" className="text-yellow-600 dark:text-yellow-400" fill="currentColor" fontSize="11">burned in air</text>

      <line x1="130" y1="98" x2="158" y2="98" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="163,98 151,92 151,104" className="text-slate-500" fill="currentColor" />

      <rect x="168" y="70" width="126" height="56" rx="8" className="text-orange-100 dark:text-orange-900/40" fill="currentColor" />
      <rect x="168" y="70" width="126" height="56" rx="8" fill="none" className="text-orange-500" stroke="currentColor" strokeWidth="2" />
      <text x="231" y="92" textAnchor="middle" className="text-orange-700 dark:text-orange-300" fill="currentColor" fontSize="13" fontWeight="700">Burner</text>
      <text x="231" y="110" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="11">S + O₂ → SO₂</text>

      <line x1="294" y1="98" x2="324" y2="98" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="329,98 317,92 317,104" className="text-slate-500" fill="currentColor" />

      <rect x="334" y="58" width="156" height="80" rx="8" className="text-purple-100 dark:text-purple-900/40" fill="currentColor" />
      <rect x="334" y="58" width="156" height="80" rx="8" fill="none" className="text-purple-600" stroke="currentColor" strokeWidth="2" />
      <text x="412" y="80" textAnchor="middle" className="text-purple-700 dark:text-purple-300" fill="currentColor" fontSize="13" fontWeight="700">Converter</text>
      <text x="412" y="98" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="11">2SO₂ + O₂ ⇌ 2SO₃</text>
      <text x="412" y="114" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="11">V₂O₅ catalyst</text>
      <text x="412" y="130" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="11">~450 °C, 1–2 atm</text>

      <line x1="490" y1="98" x2="520" y2="98" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="525,98 513,92 513,104" className="text-slate-500" fill="currentColor" />

      <rect x="530" y="70" width="150" height="56" rx="8" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="530" y="70" width="150" height="56" rx="8" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="605" y="92" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="13" fontWeight="700">Absorption tower</text>
      <text x="605" y="110" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="11">SO₃ + H₂SO₄ → oleum</text>

      <text x="350" y="175" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">
        Oleum (H₂S₂O₇) is then carefully diluted with water: H₂S₂O₇ + H₂O → 2H₂SO₄
      </text>
      <text x="350" y="200" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">
        Adding SO₃ directly to water is avoided — it produces a dangerous acid mist.
      </text>
    </svg>
  </DiagramFrame>
);

export const CementProductionDiagram: React.FC = () => (
  <DiagramFrame
    title="From limestone and clay to cement"
    caption="Real-world connection: every apartment block, road and dam in Ethiopia depends on this chain. The kiln's CO₂ emissions make cement one of the world's largest industrial sources of greenhouse gases."
  >
    <svg viewBox="0 0 700 230" className="w-full h-auto" role="img" aria-label="Cement production flow diagram">
      <rect x="15" y="60" width="130" height="64" rx="8" className="text-slate-100 dark:text-slate-700" fill="currentColor" />
      <rect x="15" y="60" width="130" height="64" rx="8" fill="none" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <text x="80" y="84" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="13" fontWeight="700">Limestone + clay</text>
      <text x="80" y="102" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">crushed &amp; ground</text>
      <text x="80" y="116" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="11">(raw meal)</text>

      <line x1="145" y1="92" x2="176" y2="92" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="181,92 169,86 169,98" className="text-slate-500" fill="currentColor" />

      <rect x="186" y="45" width="164" height="94" rx="8" className="text-orange-100 dark:text-orange-900/40" fill="currentColor" />
      <rect x="186" y="45" width="164" height="94" rx="8" fill="none" className="text-orange-600" stroke="currentColor" strokeWidth="2" />
      <text x="268" y="68" textAnchor="middle" className="text-orange-700 dark:text-orange-300" fill="currentColor" fontSize="13" fontWeight="700">Rotary kiln</text>
      <text x="268" y="86" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="11">~1450 °C</text>
      <text x="268" y="103" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="11">CaCO₃ → CaO + CO₂</text>
      <text x="268" y="120" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="11">CaO + clay → calcium silicates</text>

      <line x1="350" y1="92" x2="381" y2="92" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="386,92 374,86 374,98" className="text-slate-500" fill="currentColor" />

      <rect x="391" y="55" width="150" height="74" rx="8" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
      <rect x="391" y="55" width="150" height="74" rx="8" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="466" y="80" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="13" fontWeight="700">Clinker + gypsum</text>
      <text x="466" y="98" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="11">cooled and ground</text>
      <text x="466" y="114" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="11">(≈95% clinker, 5% gypsum)</text>

      <line x1="541" y1="92" x2="572" y2="92" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="577,92 565,86 565,98" className="text-slate-500" fill="currentColor" />

      <rect x="582" y="62" width="100" height="60" rx="8" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="582" y="62" width="100" height="60" rx="8" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="632" y="86" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="13" fontWeight="700">Cement</text>
      <text x="632" y="104" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="11">packed &amp; sold</text>

      <text x="350" y="185" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="12">
        Cement + sand + gravel + water → concrete (setting is hydration, not drying)
      </text>
      <text x="350" y="208" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">
        Gypsum is added to control how fast the concrete sets.
      </text>
    </svg>
  </DiagramFrame>
);

/* ---------------- Chapter 4 diagrams ---------------- */

export const AdditionPolymerizationDiagram: React.FC = () => (
  <DiagramFrame
    title="Addition polymerization: ethene monomers join into polythene"
    caption="Real-world connection: the same reaction, with different monomers, makes the plastic bags, pipes, jerrycans and water tanks used across Ethiopia — and the litter that pollutes its rivers."
  >
    <svg viewBox="0 0 700 230" className="w-full h-auto" role="img" aria-label="Addition polymerization of ethene to polythene">
      {[70, 270, 470].map((x, i) => (
        <React.Fragment key={x}>
          <rect x={x} y="30" width="150" height="48" rx="8" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
          <rect x={x} y="30" width="150" height="48" rx="8" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
          <text x={x + 75} y="52" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="13" fontWeight="700">CH₂=CH₂</text>
          <text x={x + 75} y="68" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="11">ethene monomer {i + 1}</text>
        </React.Fragment>
      ))}

      <line x1="350" y1="88" x2="350" y2="128" className="text-purple-600" stroke="currentColor" strokeWidth="2" />
      <polygon points="350,134 344,121 356,121" className="text-purple-600" fill="currentColor" />
      <text x="365" y="112" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="12">radical initiator, heat / pressure</text>

      <rect x="60" y="142" width="580" height="52" rx="10" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="60" y="142" width="580" height="52" rx="10" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="350" y="165" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="14" fontWeight="700">–[ CH₂–CH₂–CH₂–CH₂–CH₂–CH₂ ]ₙ–</text>
      <text x="350" y="183" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="12">poly(ethene) = polythene — one long chain of carbon atoms</text>

      <text x="350" y="220" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">
        General form: n CH₂=CH₂ → [–CH₂–CH₂–]ₙ  (no small molecule is eliminated)
      </text>
    </svg>
  </DiagramFrame>
);

export const CondensationPolymerizationDiagram: React.FC = () => (
  <DiagramFrame
    title="Condensation polymerization: nylon-6,6 from two different monomers"
    caption="Real-world connection: nylon's strength and elasticity make it useful in toothbrushes, ropes, parachutes and clothing — and in Ethiopia's textile industry blends."
  >
    <svg viewBox="0 0 700 250" className="w-full h-auto" role="img" aria-label="Condensation polymerization forming nylon-6,6 and water">
      <rect x="20" y="25" width="250" height="66" rx="8" className="text-blue-100 dark:text-blue-900/40" fill="currentColor" />
      <rect x="20" y="25" width="250" height="66" rx="8" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="2" />
      <text x="145" y="48" textAnchor="middle" className="text-blue-700 dark:text-blue-300" fill="currentColor" fontSize="13" fontWeight="700">Adipic acid</text>
      <text x="145" y="68" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="12">HOOC–(CH₂)₄–COOH</text>
      <text x="145" y="84" textAnchor="middle" className="text-blue-600 dark:text-blue-400" fill="currentColor" fontSize="11">two –COOH groups</text>

      <rect x="352" y="25" width="300" height="66" rx="8" className="text-orange-100 dark:text-orange-900/40" fill="currentColor" />
      <rect x="352" y="25" width="300" height="66" rx="8" fill="none" className="text-orange-500" stroke="currentColor" strokeWidth="2" />
      <text x="502" y="48" textAnchor="middle" className="text-orange-700 dark:text-orange-300" fill="currentColor" fontSize="13" fontWeight="700">Hexamethylenediamine</text>
      <text x="502" y="68" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="12">H₂N–(CH₂)₆–NH₂</text>
      <text x="502" y="84" textAnchor="middle" className="text-orange-600 dark:text-orange-400" fill="currentColor" fontSize="11">two –NH₂ groups</text>

      <line x1="145" y1="91" x2="220" y2="132" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <line x1="502" y1="91" x2="430" y2="132" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="426,136 425,123 436,128" className="text-slate-500" fill="currentColor" />
      <polygon points="224,136 213,128 224,123" className="text-slate-500" fill="currentColor" />
      <text x="330" y="120" textAnchor="middle" className="text-purple-600 dark:text-purple-400" fill="currentColor" fontSize="12">condensation (loss of water)</text>

      <rect x="55" y="145" width="500" height="60" rx="10" className="text-green-100 dark:text-green-900/40" fill="currentColor" />
      <rect x="55" y="145" width="500" height="60" rx="10" fill="none" className="text-green-600" stroke="currentColor" strokeWidth="2" />
      <text x="305" y="169" textAnchor="middle" className="text-green-700 dark:text-green-300" fill="currentColor" fontSize="13" fontWeight="700">Nylon-6,6: [–OC–(CH₂)₄–CO–NH–(CH₂)₆–NH–]ₙ</text>
      <text x="305" y="190" textAnchor="middle" className="text-green-600 dark:text-green-400" fill="currentColor" fontSize="12">the new amide (–CO–NH–) links are the polymer bonds</text>

      <line x1="555" y1="175" x2="578" y2="175" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <polygon points="583,175 571,169 571,181" className="text-slate-500" fill="currentColor" />
      <rect x="588" y="152" width="94" height="46" rx="8" className="text-slate-100 dark:text-slate-700" fill="currentColor" />
      <rect x="588" y="152" width="94" height="46" rx="8" fill="none" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
      <text x="635" y="172" textAnchor="middle" className="text-slate-700 dark:text-slate-300" fill="currentColor" fontSize="12" fontWeight="700">n H₂O</text>
      <text x="635" y="188" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">by-product</text>

      <text x="350" y="235" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">
        Each monomer must have at least two reactive groups so the chain can keep growing.
      </text>
    </svg>
  </DiagramFrame>
);

export const PolymerClassificationGrid: React.FC = () => {
  const groups = [
    { title: "Natural", tone: "border-green-500 bg-green-50 dark:bg-green-900/20", items: "starch, cellulose, proteins, natural rubber" },
    { title: "Synthetic", tone: "border-purple-500 bg-purple-50 dark:bg-purple-900/20", items: "polythene, PVC, polystyrene, nylon, PET" },
    { title: "Addition", tone: "border-blue-500 bg-blue-50 dark:bg-blue-900/20", items: "monomers add with no by-product — polythene, PVC" },
    { title: "Condensation", tone: "border-orange-500 bg-orange-50 dark:bg-orange-900/20", items: "small molecule eliminated — nylon, PET, bakelite" },
    { title: "Thermoplastic", tone: "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20", items: "soften on heating, can be remoulded and recycled — PE, PP, PVC" },
    { title: "Thermosetting", tone: "border-red-500 bg-red-50 dark:bg-red-900/20", items: "set permanently, char instead of melting — bakelite, melamine" },
    { title: "Elastomer", tone: "border-amber-500 bg-amber-50 dark:bg-amber-900/20", items: "stretch and snap back — natural rubber, SBR" },
    { title: "Fibre", tone: "border-violet-500 bg-violet-50 dark:bg-violet-900/20", items: "long thin chains spun into thread — nylon, polyester, cotton" },
  ];
  return (
    <DiagramFrame
      title="Four useful ways to classify polymers"
      caption="Real-world connection: recycling bins ask you to sort by plastic type because thermoplastics can be melted and reshaped, while thermosets cannot — the chemistry decides what can be recycled."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {groups.map((g) => (
          <div key={g.title} className={`rounded-lg border-l-4 ${g.tone} p-3`}>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{g.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{g.items}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

/* ---------------- Chapter 5 diagrams ---------------- */

export const GreenhouseEffectDiagram: React.FC = () => (
  <DiagramFrame
    title="The greenhouse effect: why Earth stays warm"
    caption="Real-world connection: without this natural effect Earth would average about −18 °C. Burning more fossil fuel and cutting forests thicken the gas layer, trapping extra heat — the enhanced greenhouse effect behind climate change."
  >
    <svg viewBox="0 0 700 300" className="w-full h-auto" role="img" aria-label="Greenhouse effect diagram with sunlight entering and infrared heat trapped">
      <circle cx="65" cy="45" r="26" className="text-yellow-300" fill="currentColor" />
      <text x="65" y="51" textAnchor="middle" className="text-yellow-800" fill="currentColor" fontSize="13" fontWeight="700">Sun</text>

      <rect x="20" y="110" width="660" height="100" rx="12" className="text-sky-100 dark:text-sky-900/30" fill="currentColor" />
      <rect x="20" y="110" width="660" height="100" rx="12" fill="none" className="text-sky-400" stroke="currentColor" strokeWidth="2" strokeDasharray="8 5" />
      <text x="350" y="134" textAnchor="middle" className="text-sky-700 dark:text-sky-300" fill="currentColor" fontSize="13" fontWeight="700">
        ATMOSPHERE — CO₂, CH₄, N₂O, water vapour
      </text>

      <rect x="120" y="250" width="460" height="40" rx="20" className="text-green-200 dark:text-green-900/40" fill="currentColor" />
      <text x="350" y="276" textAnchor="middle" className="text-green-800 dark:text-green-300" fill="currentColor" fontSize="13" fontWeight="700">Earth's surface</text>

      <line x1="95" y1="62" x2="290" y2="238" className="text-yellow-500" stroke="currentColor" strokeWidth="4" />
      <polygon points="295,243 278,238 285,228" className="text-yellow-500" fill="currentColor" />
      <text x="120" y="100" className="text-yellow-700 dark:text-yellow-400" fill="currentColor" fontSize="12" fontWeight="700">incoming sunlight (short waves)</text>

      <line x1="400" y1="240" x2="610" y2="60" className="text-red-500" stroke="currentColor" strokeWidth="4" />
      <polygon points="614,56 598,62 606,72" className="text-red-500" fill="currentColor" />
      <text x="520" y="195" className="text-red-700 dark:text-red-400" fill="currentColor" fontSize="12" fontWeight="700">infrared heat escaping</text>

      <path d="M 470 210 C 545 195, 560 160, 500 148" fill="none" className="text-red-500" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
      <polygon points="497,145 508,141 502,153" className="text-red-500" fill="currentColor" />
      <text x="470" y="232" textAnchor="middle" className="text-red-700 dark:text-red-400" fill="currentColor" fontSize="11">some heat re-radiated back</text>
    </svg>
  </DiagramFrame>
);

export const PollutionTypesGrid: React.FC = () => {
  const types = [
    { title: "Air pollution", tone: "border-slate-500 bg-slate-50 dark:bg-slate-800", pollutants: "SO₂, NOₓ, CO, PM2.5, ozone, lead", effects: "acid rain, smog, asthma and other lung diseases" },
    { title: "Water pollution", tone: "border-blue-500 bg-blue-50 dark:bg-blue-900/20", pollutants: "sewage, fertilizers, heavy metals, oil, microbes", effects: "BOD rise, eutrophication, unsafe drinking water" },
    { title: "Soil pollution", tone: "border-amber-600 bg-amber-50 dark:bg-amber-900/20", pollutants: "pesticides, mine waste, plastics, industrial sludge", effects: "contaminated crops, loss of soil fertility" },
    { title: "Solid waste", tone: "border-red-500 bg-red-50 dark:bg-red-900/20", pollutants: "plastics, food waste, e-waste, batteries", effects: "land and water pollution, methane from dumps" },
  ];
  return (
    <DiagramFrame
      title="Four kinds of environmental pollution"
      caption="Real-world connection: a growing city like Addis Ababa faces all four at once — vehicle exhaust, untreated river water, farm chemicals and municipal waste."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {types.map((t) => (
          <div key={t.title} className={`rounded-lg border-l-4 ${t.tone} p-3`}>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1"><strong>Main pollutants:</strong> {t.pollutants}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1"><strong>Effects:</strong> {t.effects}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};

export const WaterTreatmentDiagram: React.FC = () => (
  <DiagramFrame
    title="How a municipal water-treatment plant cleans water"
    caption="Real-world connection: Addis Ababa's Legedadi, Gefersa and Dire treatment plants follow these same stages to turn river water into safe tap water."
  >
    <svg viewBox="0 0 760 190" className="w-full h-auto" role="img" aria-label="Water treatment stages from intake to distribution">
      {[
        { x: 15, w: 120, title: "Intake &", sub1: "screening", sub2: "remove leaves, grit" },
        { x: 165, w: 140, title: "Coagulation &", sub1: "sedimentation", sub2: "alum clumps fine mud" },
        { x: 335, w: 110, title: "Filtration", sub1: "sand & gravel", sub2: "traps small particles" },
        { x: 475, w: 130, title: "Disinfection", sub1: "chlorine / UV", sub2: "kills pathogens" },
        { x: 635, w: 110, title: "Storage &", sub1: "distribution", sub2: "safe tap water" },
      ].map((s) => (
        <React.Fragment key={s.title}>
          <rect x={s.x} y="45" width={s.w} height="86" rx="8" className="text-sky-100 dark:text-sky-900/40" fill="currentColor" />
          <rect x={s.x} y="45" width={s.w} height="86" rx="8" fill="none" className="text-sky-600" stroke="currentColor" strokeWidth="2" />
          <text x={s.x + s.w / 2} y="70" textAnchor="middle" className="text-sky-800 dark:text-sky-200" fill="currentColor" fontSize="12" fontWeight="700">{s.title}</text>
          <text x={s.x + s.w / 2} y="88" textAnchor="middle" className="text-sky-700 dark:text-sky-300" fill="currentColor" fontSize="12" fontWeight="700">{s.sub1}</text>
          <text x={s.x + s.w / 2} y="108" textAnchor="middle" className="text-slate-600 dark:text-slate-400" fill="currentColor" fontSize="10">{s.sub2}</text>
        </React.Fragment>
      ))}

      {[135, 305, 445, 605].map((x) => (
        <React.Fragment key={x}>
          <line x1={x} y1="88" x2={x + 24} y2="88" className="text-slate-500" stroke="currentColor" strokeWidth="2" />
          <polygon points={`${x + 30},88 ${x + 18},82 ${x + 18},94`} className="text-slate-500" fill="currentColor" />
        </React.Fragment>
      ))}

      <text x="380" y="165" textAnchor="middle" className="text-slate-500 dark:text-slate-400" fill="currentColor" fontSize="12">
        Boiling at home adds a final safety step where piped water is not fully reliable.
      </text>
    </svg>
  </DiagramFrame>
);

export const GreenChemistryPrinciplesGrid: React.FC = () => {
  const principles = [
    { n: 1, name: "Prevent waste", detail: "Design processes so little or no waste is created." },
    { n: 2, name: "Atom economy", detail: "Maximise the share of reactant atoms that end up in the product." },
    { n: 3, name: "Less hazardous synthesis", detail: "Choose routes that use and make safer substances." },
    { n: 4, name: "Safer chemicals", detail: "Design products that do their job with low toxicity." },
    { n: 5, name: "Safer solvents", detail: "Use water or no solvent where possible." },
    { n: 6, name: "Energy efficiency", detail: "Run reactions at mild temperature and pressure." },
    { n: 7, name: "Renewable feedstocks", detail: "Prefer biomass and recycled materials over fossil fuels." },
    { n: 8, name: "Fewer derivatives", detail: "Avoid unnecessary protecting groups and extra steps." },
    { n: 9, name: "Catalysis", detail: "Catalysts cut energy needs and improve selectivity." },
    { n: 10, name: "Design for degradation", detail: "Products should break down safely after use." },
    { n: 11, name: "Real-time analysis", detail: "Monitor processes to prevent pollution before it forms." },
    { n: 12, name: "Inherently safer chemistry", detail: "Minimise the chance of explosions, fires and spills." },
  ];
  return (
    <DiagramFrame
      title="The 12 principles of green chemistry"
      caption="Real-world connection: Ethiopian cement, textile and tannery plants are adopting cleaner-production ideas such as dust capture, water recycling and chrome recovery — these principles in action."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {principles.map((p) => (
          <div key={p.n} className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-3">
            <p className="text-sm font-bold text-green-800 dark:text-green-200">{p.n}. {p.name}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{p.detail}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
};
