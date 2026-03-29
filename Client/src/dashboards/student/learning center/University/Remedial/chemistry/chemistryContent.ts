export interface Topic {
  id: string
  title: string
  content: string[]
}

export interface Chapter {
  id: string
  title: string
  topics: Topic[]
}

export interface CourseContent {
  subject: string
  chapters: Chapter[]
}

export const REMEDIAL_CHEMISTRY_CONTENT: CourseContent = {
  subject: 'Remedial Chemistry',
  chapters: [
    {
      id: 'remedial-chemistry-ch1',
      title: 'Introduction to Chemistry',
      topics: [
        {
          id: 'remedial-chemistry-1-1',
          title: 'What is Chemistry?',
          content: [
            'Chemistry is the science that studies matter and the changes it undergoes.',
            '',
            '**What Chemistry Studies:**',
            '• **Matter**: Anything that has mass and takes up space',
            '• **Atoms**: The tiny building blocks that make up all matter',
            '• **Molecules**: Groups of atoms bonded together',
            '• **Chemical reactions**: When substances change into new substances',
            '',
            '**Chemistry vs. Other Sciences:**',
            '• **Physics**: Studies matter and energy in general',
            '• **Chemistry**: Focuses on atoms, molecules, and their interactions',
            '• **Biology**: Studies living things (which are made of chemicals)',
            '',
            '**Why Chemistry Matters:**',
            '• Understanding how medicines work in our bodies',
            '• Developing new materials like plastics and metals',
            '• Improving food production and preservation',
            '• Creating cleaner energy sources',
            '• Solving environmental problems',
            '',
            '**Chemistry in Daily Life:**',
            '• Cooking (chemical reactions change food)',
            '• Cleaning (soaps and detergents work through chemistry)',
            '• Breathing (oxygen reacts in our cells)',
            '• Digestion (breaking down food with chemical processes)'
          ]
        },
        {
          id: 'remedial-chemistry-1-2',
          title: 'Atoms and Elements',
          content: [
            'Atoms are the smallest units of matter that still have the properties of an element.',
            '',
            '**Structure of an Atom:**',
            '• **Nucleus**: The center of the atom',
            '  - Contains protons (positive charge)',
            '  - Contains neutrons (no charge)',
            '',
            '• **Electrons**: Tiny particles that orbit the nucleus',
            '  - Have negative charge',
            '  - Much smaller than protons and neutrons',
            '',
            '**Elements:**',
            '• Pure substances made of only one type of atom',
            '• Cannot be broken down into simpler substances',
            '• Examples: Hydrogen (H), Oxygen (O), Carbon (C), Gold (Au)',
            '',
            '**The Periodic Table:**',
            '• A chart that organizes all known elements',
            '• Elements are arranged by their properties',
            '• Each element has a symbol (like H for Hydrogen)',
            '• Shows important information about each element',
            '',
            '**Common Elements:**',
            '• **Hydrogen (H)**: Lightest element, found in water',
            '• **Oxygen (O)**: Essential for breathing and burning',
            '• **Carbon (C)**: Found in all living things',
            '• **Nitrogen (N)**: Makes up most of the air we breathe',
            '• **Iron (Fe)**: Used to make steel, found in blood'
          ]
        }
      ]
    },
    {
      id: 'remedial-chemistry-ch2',
      title: 'Chemical Compounds and Reactions',
      topics: [
        {
          id: 'remedial-chemistry-2-1',
          title: 'Compounds and Mixtures',
          content: [
            'When atoms combine, they can form compounds and mixtures with different properties.',
            '',
            '**Chemical Compounds:**',
            '• Formed when atoms of different elements bond together',
            '• Have different properties than the original elements',
            '• Examples:',
            '  - Water (H₂O): Hydrogen + Oxygen',
            '  - Salt (NaCl): Sodium + Chlorine',
            '  - Carbon dioxide (CO₂): Carbon + Oxygen',
            '',
            '**Chemical Formulas:**',
            '• Show which elements are in a compound',
            '• Numbers show how many atoms of each element',
            '• H₂O means 2 hydrogen atoms + 1 oxygen atom',
            '• CO₂ means 1 carbon atom + 2 oxygen atoms',
            '',
            '**Mixtures:**',
            '• Two or more substances mixed together',
            '• Each substance keeps its own properties',
            '• Can usually be separated by physical methods',
            '',
            '**Types of Mixtures:**',
            '• **Solutions**: One substance dissolves in another',
            '  - Salt water, sugar water, air',
            '• **Suspensions**: Particles float but don\'t dissolve',
            '  - Muddy water, paint',
            '• **Colloids**: Very small particles spread throughout',
            '  - Milk, fog, jello'
          ]
        },
        {
          id: 'remedial-chemistry-2-2',
          title: 'Chemical Reactions',
          content: [
            'Chemical reactions occur when substances interact to form new substances with different properties.',
            '',
            '**What Happens in Chemical Reactions:**',
            '• Atoms rearrange to form new compounds',
            '• Chemical bonds are broken and new ones form',
            '• The total number of atoms stays the same',
            '• Energy is often released or absorbed',
            '',
            '**Signs of Chemical Reactions:**',
            '• **Color change**: Leaves turning brown, rust forming',
            '• **Gas production**: Bubbling when baking soda meets vinegar',
            '• **Temperature change**: Hand warmers getting hot',
            '• **Light production**: Glow sticks, fireworks',
            '• **Precipitate formation**: Solid forming in a liquid',
            '',
            '**Types of Chemical Reactions:**',
            '• **Combustion**: Burning (fuel + oxygen → products + energy)',
            '  - Example: Wood burning to make ash, water, and carbon dioxide',
            '',
            '• **Acid-Base**: Acids and bases neutralize each other',
            '  - Example: Antacid tablets neutralizing stomach acid',
            '',
            '• **Oxidation**: Substances combine with oxygen',
            '  - Example: Iron rusting when exposed to air and water',
            '',
            '**Chemical Reactions in Daily Life:**',
            '• Cooking: Baking bread, frying eggs',
            '• Digestion: Breaking down food in your stomach',
            '• Photosynthesis: Plants making food from sunlight',
            '• Respiration: Your cells using oxygen to make energy'
          ]
        }
      ]
    }
  ]
}