// History Subject Configuration
// This file contains all chapters and subtopics for Remedial History

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

export const historyConfig: SubjectConfig = {
  name: 'History',
  color: {
    primary: 'amber',
    secondary: 'yellow',
    gradient: 'from-amber-600 to-yellow-600'
  },
  chapters: [
    {
      id: 'remedial-history-ch1',
      title: 'Chapter 1: Introduction',
      subtopics: [
        '1.1. Definition and Uses of History',
        '1.1.1. The Importance of History',
        '1.2. Historiography and Historical Interpretations',
        '1.2.1. Sources of History',
        '1.2.2. Dating in History',
        '1.3. Features, interdependence and achievements of major civilizations',
        '1.3.1. Civilizations in Africa',
        '1.3.2. Civilisations in Asia',
        '1.3.3. Ancient Civilisation of Latin America',
        '1.3.4. Civilisations in Europe'
      ]
    },
    {
      id: 'remedial-history-ch2',
      title: 'Chapter 2: State Formation and Population Movements in the Horn of Africa',
      subtopics: [
        '2.1. North: Punt, Dama\'at, Aksum and Zagwe',
        '2.2. South and southwest: Bizamo, Damot, Enarya and Gafat',
        '2.3. Muslim Sultanates: Shoa, Hadya, Fatagar, Bali, Ifat and Dawaro',
        '2.4. Interstate relations: causes of the conflict',
        '2.5. International dimensions of the war',
        '2.6. Population Movements, Expansion, and Integration in Ethiopia'
      ]
    },
    {
      id: 'remedial-history-ch3',
      title: 'Chapter 3: The Modern World since 1500',
      subtopics: [
        '3.1. The Renaissance',
        '3.2. The Age of Explorations and Discoveries',
        '3.3. The English Bourgeois Revolution',
        '3.4. The French Revolution',
        '3.5. American War of Independence',
        '3.6. The Industrial Revolution and Its consequences'
      ]
    },
    {
      id: 'remedial-history-ch4',
      title: 'Chapter 4: The Gondarine Period and Its Socio Economic and Political Development',
      subtopics: [
        '4.1. The Jesuit and their evangelization in Ethiopia',
        '4.2. The ascendancy of the Yejju dynasty',
        '4.3. Decadence with the ruling house and the Zemene Mesafint (The Era of Warlords)',
        '4.4. Polities of Shoa, Omo and the Gibe regions, the Emirate of Harar and Shiekdom of Assosa'
      ]
    },
    {
      id: 'remedial-history-ch5',
      title: 'Chapter 5: Africa and the Outside World to 1900s',
      subtopics: [
        '5.1. Genesis, development and Consequences of trans-Atlantic Slave trade',
        '5.2. Scramble of Africa',
        '5.3. Colonial Rule'
      ]
    },
    {
      id: 'remedial-history-ch6',
      title: 'Chapter 6: Formation of the Modern State of Ethiopia: 1855-1941',
      subtopics: [
        '6.1. Attempt at Reunification Through the Use of Force, 1855-1868',
        '6.2. Modernization',
        '6.3. Defending sovereignty and territorial integrity',
        '6.3.2. Italian Aggression against Ethiopia and the Battle of Adwa',
        '6.3.2. The Birth of the Italian Colony of Eritrea'
      ]
    },
    {
      id: 'remedial-history-ch7',
      title: 'Chapter 7: Major Global Developments',
      subtopics: [
        '7.1. The Two World Wars',
        '7.2. The Formation of the United Nations Organization (UNO)',
        '7.3. Division of the World into East and West and the Cold War'
      ]
    },
    {
      id: 'remedial-history-ch8',
      title: 'Chapter 8: African Move Towards Independence',
      subtopics: [
        '8.1. Resistance and revolts',
        '8.2. Pan-Africanism',
        '8.3. The Organization of African Unity',
        '8.4. Decolonization and Liberation struggles',
        'Effects of Colonialism in Africa'
      ]
    },
    {
      id: 'remedial-history-ch9',
      title: 'Chapter 9: Ethiopia from Liberation to Revolution',
      subtopics: [
        '9.1. Haile Selassie\'s Come Back and British Domination',
        '9.2. The Eritrean Problem',
        '9.3. Oppositions against Haile Selassie\'s Government'
      ]
    }
  ]
};
