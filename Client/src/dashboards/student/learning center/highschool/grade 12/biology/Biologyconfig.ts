// Grade 12 Biology Subject Configuration
// This file contains all chapters and subtopics for Grade 12 Biology

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
  grade: 'Grade 12',
  color: {
    primary: 'green',
    secondary: 'emerald',
    gradient: 'from-green-600 to-emerald-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Application of Biology',
      subtopics: [
        '1.1. Application in Conservation of Natural Resources',
        '1.2. Application in Agriculture',
        '1.3. Application in Medicine',
        '1.4. Application in Industry'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Cell Biology',
      subtopics: [
        '2.1. Cell Structure and Function',
        '2.2. Cell Membrane and Transport',
        '2.3. Cell Division',
        '2.4. Cell Metabolism'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Genetics',
      subtopics: [
        '3.1. Mendelian Genetics',
        '3.2. DNA Structure and Replication',
        '3.3. Protein Synthesis',
        '3.4. Genetic Engineering'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Evolution',
      subtopics: [
        '4.1. Theories of Evolution',
        '4.2. Evidence for Evolution',
        '4.3. Natural Selection',
        '4.4. Speciation'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Ecology',
      subtopics: [
        '5.1. Ecosystem Structure',
        '5.2. Energy Flow',
        '5.3. Biogeochemical Cycles',
        '5.4. Population Ecology'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Human Biology',
      subtopics: [
        '6.1. Digestive System',
        '6.2. Circulatory System',
        '6.3. Respiratory System',
        '6.4. Nervous System'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Plant Biology',
      subtopics: [
        '7.1. Plant Structure',
        '7.2. Photosynthesis',
        '7.3. Plant Reproduction',
        '7.4. Plant Hormones'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Microbiology',
      subtopics: [
        '8.1. Bacteria',
        '8.2. Viruses',
        '8.3. Fungi',
        '8.4. Protists'
      ]
    }
  ]
};
