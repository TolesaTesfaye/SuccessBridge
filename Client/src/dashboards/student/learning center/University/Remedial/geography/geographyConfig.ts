// Geography Subject Configuration
// This file contains all chapters and subtopics for Remedial Geography

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
    primary: 'emerald',
    secondary: 'lime',
    gradient: 'from-emerald-600 to-lime-600'
  },
  chapters: [
    {
      id: 'remedial-geography-unit1',
      title: 'Unit 1: Introduction',
      subtopics: [
        '1.1. The Science of Geography',
        '1.1.1. Definitions and Concepts',
        '1.1.2. Branches of Geography',
        '1.1.3. Scope/Coverage of Geography',
        '1.1.4. Approaches in Geography',
        '1.1.5. Major School of Thoughts in Geography',
        '1.1.6. Relationship between Geography and other disciplines'
      ]
    },
    {
      id: 'remedial-geography-unit2',
      title: 'Unit 2: Map Reading and Interpretations',
      subtopics: [
        '2.1. Definition and Concepts',
        '2.2. Uses of Maps',
        '2.3. Classification of Maps',
        '2.4. Marginal and Border Information',
        '2.5. Conventional Signs and Symbols',
        '2.6. Relief Representation on Maps'
      ]
    },
    {
      id: 'remedial-geography-unit3',
      title: 'Unit 3: The Physical Environment of the Earth',
      subtopics: [
        '3.1. Physical Environment of the World',
        '3.1.1. The Earth in the Universe',
        '3.1.2. Forces That Change the Surface of the Earth',
        '3.1.3. Weather and Climate',
        '3.1.4. Natural Regions of the Earth',
        '3.1.5. Ecosystem',
        '3.2. Physical Environment of Africa',
        '3.2.1. Position, Size, and Shape of Africa',
        '3.2.2. Geological and Relief Structure of Africa',
        '3.2.3. Climate of Africa',
        '3.2.4. Drainage in Africa',
        '3.2.5. Natural Vegetation and Wild Animals of Africa',
        '3.2.6. Soils of Africa',
        '3.2.7. Problems and Conservation Measures of Soils in Africa',
        '3.3. Physical Environment of Ethiopia',
        '3.3.1. Geological Structure and Relief of the Horn of Africa',
        '3.3.2. Climate of Ethiopia',
        '3.3.3. Natural Vegetation and Wild Animals of Ethiopia',
        '3.3.4. Soils of Ethiopia'
      ]
    },
    {
      id: 'remedial-geography-unit4',
      title: 'Unit 4: Human Population',
      subtopics: [
        '4.1. Concept and Facts about Human Population',
        '4.1.2. Components of Population Change',
        '4.1.3. Spatial Distribution of Human Population',
        '4.1.4. Population characteristics',
        '4.1.5. Sources of Population Data',
        '4.1.6. Population theories',
        '4.2. Human Population of the World',
        '4.2.1. Size and Trend of World Population Growth',
        '4.2.2. Spatial Distribution of World Population',
        '4.3. Population of Africa',
        '4.3.1. Aspects of Population, Economy and Natural Resources of Africa',
        '4.4. Population of Ethiopia',
        '4.4.1. Population Size and Growth Rate',
        '4.4.2. Components of Population Change in Ethiopia',
        '4.4.3. Population Structure of Ethiopia',
        '4.4.4. Impacts of Rapid Population Growth',
        '4.4.5. Population Policy of Ethiopia',
        '4.4.6. Urbanization'
      ]
    },
    {
      id: 'remedial-geography-unit5',
      title: 'Unit 5: Economic Growth and Sustainable Development',
      subtopics: [
        '5.1. Economic Activities',
        '5.1.1. Classification of Economic Activities',
        '5.2. Natural Resources',
        '5.2.1. Classification of Natural Resources',
        '5.2.2. Natural Resources of Africa and its Politics',
        '5.3. Economic Systems',
        '5.4. Concept and Indicators of Economic Development',
        '5.5. Sustainable Economic Development',
        '5.6. Globalization',
        '5.7. Economic Growth and Development in Ethiopia',
        '5.7.1. An Overview of Economic Growth and Development Trend in Ethiopia',
        '5.7.2. Major Features of Ethiopian Economy',
        '5.7.3. Challenges and Prospects of Socio-Economic Development for Ethiopia'
      ]
    }
  ]
};
