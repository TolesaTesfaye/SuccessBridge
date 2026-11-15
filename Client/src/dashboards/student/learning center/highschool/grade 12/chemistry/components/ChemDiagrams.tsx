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
  <figure className="my-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 md:p-6 shadow-sm">
    <figcaption className="text-sm md:text-base font-bold text-slate-900 dark:text-white mb-3">
      {title}
    </figcaption>
    {children}
    {caption && (
      <p className="mt-3 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
