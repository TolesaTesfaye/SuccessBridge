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

export const REMEDIAL_GEOGRAPHY_CONTENT: CourseContent = {
  subject: 'Remedial Geography',
  chapters: [
    {
      id: 'remedial-geography-ch1',
      title: 'Introduction to Geography',
      topics: [
        {
          id: 'remedial-geography-1-1',
          title: 'What is Geography?',
          content: [
            'Geography is the study of places on Earth and the relationships between people and their environments.',
            '',
            '**Two Main Branches of Geography:**',
            '• **Physical Geography**: Studies natural features and processes',
            '  - Mountains, rivers, climate, weather',
            '  - How natural forces shape the Earth',
            '',
            '• **Human Geography**: Studies people and their activities',
            '  - Cities, countries, cultures, economies',
            '  - How people interact with their environment',
            '',
            '**What Geographers Study:**',
            '• **Location**: Where places are on Earth',
            '• **Place**: What makes each location unique',
            '• **Region**: Areas with similar characteristics',
            '• **Movement**: How people, goods, and ideas travel',
            '• **Human-Environment Interaction**: How people and nature affect each other',
            '',
            '**Geography Skills:**',
            '• Reading and making maps',
            '• Understanding directions and distances',
            '• Analyzing patterns and relationships',
            '• Using geographic tools and technology',
            '',
            '**Why Geography Matters:**',
            '• Helps us understand world events and issues',
            '• Essential for travel and navigation',
            '• Important for business and trade',
            '• Helps solve environmental problems'
          ]
        },
        {
          id: 'remedial-geography-1-2',
          title: 'Maps and Location',
          content: [
            'Maps are essential tools that help us understand and navigate our world.',
            '',
            '**Types of Maps:**',
            '• **Political Maps**: Show countries, states, cities, and borders',
            '• **Physical Maps**: Show landforms like mountains and rivers',
            '• **Climate Maps**: Show weather patterns and temperature zones',
            '• **Road Maps**: Show highways, streets, and transportation routes',
            '',
            '**Map Elements:**',
            '• **Title**: Tells you what the map shows',
            '• **Legend/Key**: Explains symbols and colors used',
            '• **Scale**: Shows the relationship between map distance and real distance',
            '• **Compass Rose**: Shows directions (North, South, East, West)',
            '',
            '**Finding Location:**',
            '• **Absolute Location**: Exact position using coordinates',
            '  - Latitude: Lines running east-west (parallel to equator)',
            '  - Longitude: Lines running north-south (meeting at poles)',
            '',
            '• **Relative Location**: Position compared to other places',
            '  - "North of the city center"',
            '  - "Between the river and the mountain"',
            '',
            '**Cardinal Directions:**',
            '• **North (N)**: Toward the North Pole',
            '• **South (S)**: Toward the South Pole',
            '• **East (E)**: Direction of sunrise',
            '• **West (W)**: Direction of sunset',
            '• **Intermediate Directions**: Northeast, Southeast, Southwest, Northwest'
          ]
        }
      ]
    },
    {
      id: 'remedial-geography-ch2',
      title: 'Physical Features and Climate',
      topics: [
        {
          id: 'remedial-geography-2-1',
          title: 'Landforms and Water Bodies',
          content: [
            'Earth\'s surface has many different physical features that shape how people live.',
            '',
            '**Major Landforms:**',
            '• **Mountains**: High, steep areas of land',
            '  - Formed by volcanic activity or tectonic forces',
            '  - Examples: Himalayas, Rocky Mountains, Andes',
            '',
            '• **Plains**: Large, flat areas of land',
            '  - Good for farming and building cities',
            '  - Examples: Great Plains, Amazon Basin',
            '',
            '• **Plateaus**: High, flat areas with steep sides',
            '  - Often called "tablelands"',
            '  - Examples: Colorado Plateau, Tibetan Plateau',
            '',
            '• **Valleys**: Low areas between hills or mountains',
            '  - Often have rivers running through them',
            '  - Examples: Nile Valley, Central Valley',
            '',
            '**Water Bodies:**',
            '• **Oceans**: Largest bodies of salt water',
            '  - Pacific, Atlantic, Indian, Arctic, Southern',
            '',
            '• **Seas**: Smaller bodies of salt water',
            '  - Mediterranean Sea, Caribbean Sea',
            '',
            '• **Rivers**: Flowing bodies of fresh water',
            '  - Amazon, Nile, Mississippi, Yangtze',
            '',
            '• **Lakes**: Bodies of water surrounded by land',
            '  - Great Lakes, Lake Victoria, Caspian Sea'
          ]
        },
        {
          id: 'remedial-geography-2-2',
          title: 'Weather and Climate',
          content: [
            'Weather and climate greatly influence how and where people live on Earth.',
            '',
            '**Weather vs. Climate:**',
            '• **Weather**: Day-to-day atmospheric conditions',
            '  - Temperature, precipitation, wind, humidity',
            '  - Changes from day to day',
            '',
            '• **Climate**: Average weather patterns over long periods',
            '  - Typical conditions for a region',
            '  - Changes slowly over many years',
            '',
            '**Climate Zones:**',
            '• **Tropical**: Hot and humid year-round',
            '  - Near the equator',
            '  - Examples: Amazon rainforest, Central Africa',
            '',
            '• **Temperate**: Moderate temperatures with seasons',
            '  - Between tropical and polar regions',
            '  - Examples: Most of United States, Europe',
            '',
            '• **Polar**: Very cold with long winters',
            '  - Near the North and South poles',
            '  - Examples: Antarctica, northern Canada',
            '',
            '**Factors Affecting Climate:**',
            '• **Latitude**: Distance from the equator',
            '• **Altitude**: Height above sea level',
            '• **Distance from water**: Oceans moderate temperature',
            '• **Ocean currents**: Warm and cold currents affect climate',
            '• **Mountains**: Block air masses and create rain shadows',
            '',
            '**Climate and Human Life:**',
            '• Affects clothing, housing, and food choices',
            '• Influences agriculture and economic activities',
            '• Determines population distribution patterns'
          ]
        }
      ]
    }
  ]
}