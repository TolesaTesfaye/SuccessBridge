// Physics Subject Configuration
// This file contains all chapters and subtopics for Remedial Physics

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

export const physicsConfig: SubjectConfig = {
  name: 'Physics',
  color: {
    primary: 'orange',
    secondary: 'red',
    gradient: 'from-orange-600 to-red-600'
  },
  chapters: [
    {
      id: 'remedial-physics-ch1',
      title: 'Chapter 1: Vectors',
      subtopics: [
        '1.1. Vectors',
        '1.1.1. Vector and Scalar quantities',
        '1.1.2. Vector Representation',
        '1.1.3. Vector Addition and subsection',
        '1.1.4. Vector Components',
        '1.1.5. Unit Vector',
        '1.2. Multiplication of vectors',
        '1.2.1. Scalar-vector multiplication',
        '1.2.2. Dot product',
        '1.2.3. Cross Product'
      ]
    },
    {
      id: 'remedial-physics-ch2',
      title: 'Chapter 2: Kinematics',
      subtopics: [
        '2.1. Kinematics of the particle',
        '2.1.1. One or two dimensional (2D) motion',
        '2.1.2. Motion in 1D',
        '2.1.3. Two dimension (2D) motion'
      ]
    },
    {
      id: 'remedial-physics-ch3',
      title: 'Chapter 3: Angular Motion',
      subtopics: [
        '3.1. Angular Motion',
        '3.1.1. Rotational Kinematics'
      ]
    },
    {
      id: 'remedial-physics-ch4',
      title: 'Chapter 4: Dynamics',
      subtopics: [
        '4.1. Dynamics',
        '4.2. Linear momentum',
        '4.2.1. Conservation of Momentum',
        '4.2.2. Collision',
        '4.3. Center of Mass and Moment of Inertia',
        '4.3.1. Center of Mass',
        '4.3.2. Moment of Inertia',
        '4.4. Torque and angular momentum',
        '4.5. Conditions of Equilibrium (First and second)'
      ]
    },
    {
      id: 'remedial-physics-ch5',
      title: 'Chapter 5: Work, Energy and Power',
      subtopics: [
        '5.1. Work done by constant and variable forces',
        '5.1.1. Work done by a variable force',
        '5.2. Conservation of energy',
        '5.3. Work energy theorem',
        '5.4. Conservative forces',
        '5.5. Power'
      ]
    },
    {
      id: 'remedial-physics-ch6',
      title: 'Chapter 6: Oscillation and Waves',
      subtopics: [
        '6.1. Oscillatory motion',
        '6.1.1. Harmonic Motion',
        '6.1.2. Damped and Forced Oscillation',
        '6.2. Properties of wave (frequency, wave length, period)',
        '6.3. Types of Waves',
        '6.3.1. Transverse and longitudinal',
        '6.3.2. Mechanical and Electromagnetic wave',
        '6.4. Wave behavior (reflection, refraction, interference, diffraction)',
        '6.5. Wave equation'
      ]
    },
    {
      id: 'remedial-physics-ch7',
      title: 'Chapter 7: Heat and Thermodynamics',
      subtopics: [
        '7.1. Temperature and Heat',
        '7.2. The effect of heat on materials',
        '7.2.1. Specific Heat and Latent Heat',
        '7.3. Laws of thermodynamics (zeros, first and second Laws)',
        '7.3.1. Zeros Laws of thermodynamics',
        '7.3.2. First Laws of thermodynamics'
      ]
    },
    {
      id: 'remedial-physics-ch8',
      title: 'Chapter 8: Electrostatics',
      subtopics: [
        '8.1. Coulomb\'s law',
        '8.2. Electric Field (E)',
        '8.2.1. Electric Field Intensity',
        '8.3. Electric Field Lines',
        '8.4. Electric potential of a point charge',
        '8.4.1. Motion of charged particles in an electric field',
        '8.5. Capacitance and Capacitor networks',
        '8.6. The Parallel Plate Capacitor',
        '8.6.1. Energy Stored in a Capacitor',
        '8.7. Capacitance net work'
      ]
    }
  ]
};
