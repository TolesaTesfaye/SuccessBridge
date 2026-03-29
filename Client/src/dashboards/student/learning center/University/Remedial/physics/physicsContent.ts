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

export const REMEDIAL_PHYSICS_CONTENT: CourseContent = {
  subject: 'Remedial Physics',
  chapters: [
    {
      id: 'remedial-physics-ch1',
      title: 'Introduction to Physics',
      topics: [
        {
          id: 'remedial-physics-1-1',
          title: 'What is Physics?',
          content: [
            'Physics is the study of matter, energy, and how they interact with each other.',
            '',
            '**What Physics Studies:**',
            '• **Matter**: Everything that has mass and takes up space',
            '• **Energy**: The ability to do work or cause change',
            '• **Motion**: How objects move and change position',
            '• **Forces**: Pushes and pulls that affect motion',
            '',
            '**Why Study Physics?**',
            '• Helps us understand how the world works',
            '• Explains everyday phenomena like why things fall',
            '• Foundation for technology and engineering',
            '• Develops problem-solving skills',
            '',
            '**Physics in Daily Life:**',
            '• Walking, running, and riding bikes (motion and forces)',
            '• Using phones and computers (electricity and magnetism)',
            '• Cooking food (heat and energy transfer)',
            '• Seeing colors and light (optics and waves)'
          ]
        },
        {
          id: 'remedial-physics-1-2',
          title: 'Basic Measurements',
          content: [
            'In physics, we need to measure things accurately to understand how they work.',
            '',
            '**Fundamental Quantities:**',
            '• **Length**: How long, wide, or tall something is',
            '  - Unit: Meter (m)',
            '  - Examples: height of a person, length of a room',
            '',
            '• **Mass**: How much matter an object contains',
            '  - Unit: Kilogram (kg)',
            '  - Examples: weight of a book, mass of a car',
            '',
            '• **Time**: Duration of events',
            '  - Unit: Second (s)',
            '  - Examples: how long it takes to run 100m',
            '',
            '**Measuring Tools:**',
            '• **Ruler/Meter stick**: For measuring length',
            '• **Balance/Scale**: For measuring mass',
            '• **Stopwatch**: For measuring time',
            '• **Thermometer**: For measuring temperature',
            '',
            '**Why Accurate Measurement Matters:**',
            '• Helps us make predictions',
            '• Allows us to compare different objects',
            '• Essential for scientific experiments',
            '• Needed for building and engineering'
          ]
        }
      ]
    },
    {
      id: 'remedial-physics-ch2',
      title: 'Motion and Forces',
      topics: [
        {
          id: 'remedial-physics-2-1',
          title: 'Understanding Motion',
          content: [
            'Motion is when an object changes its position over time.',
            '',
            '**Types of Motion:**',
            '• **Linear Motion**: Moving in a straight line',
            '  - Example: A car driving down a straight road',
            '',
            '• **Circular Motion**: Moving in a circle',
            '  - Example: A wheel spinning, planets orbiting the sun',
            '',
            '• **Oscillatory Motion**: Moving back and forth',
            '  - Example: A pendulum swinging, a guitar string vibrating',
            '',
            '**Describing Motion:**',
            '• **Position**: Where an object is located',
            '• **Distance**: How far an object has traveled',
            '• **Speed**: How fast an object is moving',
            '  - Speed = Distance ÷ Time',
            '  - Example: If you travel 100 meters in 10 seconds, your speed is 10 m/s',
            '',
            '**Rest vs. Motion:**',
            '• An object is at rest if it doesn\'t change position',
            '• An object is in motion if it changes position over time',
            '• Motion is relative - depends on your point of view'
          ]
        },
        {
          id: 'remedial-physics-2-2',
          title: 'Forces and Their Effects',
          content: [
            'A force is a push or pull that can change how an object moves.',
            '',
            '**What Forces Can Do:**',
            '• Start motion (push a stationary ball)',
            '• Stop motion (catch a flying ball)',
            '• Change direction (hit a ball with a bat)',
            '• Change speed (press car brakes)',
            '',
            '**Types of Forces:**',
            '• **Contact Forces**: Objects must touch',
            '  - Pushing a door',
            '  - Pulling a rope',
            '  - Friction when sliding',
            '',
            '• **Non-contact Forces**: Act at a distance',
            '  - Gravity pulling objects down',
            '  - Magnets attracting metal',
            '  - Electric forces between charges',
            '',
            '**Gravity:**',
            '• The force that pulls objects toward Earth',
            '• Makes things fall down when dropped',
            '• Keeps us on the ground',
            '• Stronger for heavier objects',
            '',
            '**Friction:**',
            '• The force that opposes motion',
            '• Makes it harder to slide objects',
            '• Helps us walk without slipping',
            '• Can be useful (car brakes) or problematic (machine wear)'
          ]
        }
      ]
    }
  ]
}