// Geography Subject Configuration
// This file contains all chapters and subtopics for Geography

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

export const geographyConfig: SubjectConfig = {
  name: 'Geography',
  color: {
    primary: 'teal',
    secondary: 'cyan',
    gradient: 'from-teal-600 to-cyan-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Introduction to Geography',
      subtopics: [
        '1.1. Definition and Scope of Geography',
        '1.2. Branches of Geography',
        '1.3. Importance of Geography',
        '1.4. Geographic Tools and Techniques',
        '1.5. Map Reading and Interpretation'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: The Earth and Its Structure',
      subtopics: [
        '2.1. Origin and Evolution of Earth',
        '2.2. Internal Structure of Earth',
        '2.3. Plate Tectonics',
        '2.4. Earthquakes and Volcanoes',
        '2.5. Mountain Building'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Landforms and Their Evolution',
      subtopics: [
        '3.1. Weathering and Erosion',
        '3.2. River Landforms',
        '3.3. Coastal Landforms',
        '3.4. Glacial Landforms',
        '3.5. Desert Landforms'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Climate and Weather',
      subtopics: [
        '4.1. Atmosphere and Its Composition',
        '4.2. Temperature Distribution',
        '4.3. Atmospheric Pressure and Winds',
        '4.4. Precipitation',
        '4.5. Climate Classification'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Water Resources',
      subtopics: [
        '5.1. Hydrological Cycle',
        '5.2. Oceans and Their Features',
        '5.3. Rivers and Lakes',
        '5.4. Groundwater',
        '5.5. Water Conservation'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Natural Resources',
      subtopics: [
        '6.1. Types of Natural Resources',
        '6.2. Soil Resources',
        '6.3. Forest Resources',
        '6.4. Mineral Resources',
        '6.5. Energy Resources'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Population Geography',
      subtopics: [
        '7.1. Population Distribution and Density',
        '7.2. Population Growth',
        '7.3. Population Composition',
        '7.4. Migration',
        '7.5. Population Problems and Policies'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Human Activities',
      subtopics: [
        '8.1. Agriculture',
        '8.2. Industries',
        '8.3. Transportation',
        '8.4. Trade and Commerce',
        '8.5. Urbanization'
      ]
    }
  ]
};
