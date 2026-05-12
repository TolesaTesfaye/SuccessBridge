// Grade 11 Biology Subject Configuration

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  grade: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

export const biologyConfig: SubjectConfig = {
  name: 'Biology',
  grade: 'Grade 11',
  color: {
    primary: 'emerald',
    secondary: 'lime',
    gradient: 'from-emerald-600 to-lime-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: The Living World',
      subtopics: [
        '1.1. What is Living?',
        '1.2. Biodiversity',
        '1.3. Taxonomic Categories',
        '1.4. Nomenclature'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Cell: The Unit of Life',
      subtopics: [
        '2.1. Cell Theory',
        '2.2. Cell Structure',
        '2.3. Cell Organelles',
        '2.4. Cell Division'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Plant Physiology',
      subtopics: [
        '3.1. Photosynthesis',
        '3.2. Respiration',
        '3.3. Plant Growth',
        '3.4. Plant Hormones'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Human Physiology',
      subtopics: [
        '4.1. Digestive System',
        '4.2. Respiratory System',
        '4.3. Circulatory System',
        '4.4. Excretory System'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Genetics',
      subtopics: [
        '5.1. Mendel\'s Laws',
        '5.2. Chromosomal Theory',
        '5.3. DNA Structure',
        '5.4. Genetic Disorders'
      ]
    }
  ]
};
