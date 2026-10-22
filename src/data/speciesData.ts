import { IrisInput, SpeciesInfo } from '../types';

export const SPECIES_CATALOG: Record<string, SpeciesInfo> = {
  Setosa: {
    name: 'Setosa',
    scientificName: 'Iris setosa',
    popularName: 'Íris Ártica (Bristle-pointed Iris)',
    codigo: 0,
    themeColor: {
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      gradient: 'from-emerald-500 to-teal-600',
      accent: 'emerald',
    },
    summary: 'Espécie caracterizada por pétalas visivelmente curtas e estreitas em relação às sépalas. É linearmente separável das outras duas espécies no dataset clássico de Fisher.',
    features: [
      'Pétalas muito pequenas (comprimento médio de apenas ~1.4 cm)',
      'Sépalas relativamente largas comparadas ao comprimento da pétala',
      'Flor compacta e adaptada a climas subárticos e costeiros',
      'Código de classe no modelo: 0'
    ],
    benchmarks: {
      avgSepalLength: 5.0,
      avgSepalWidth: 3.4,
      avgPetalLength: 1.5,
      avgPetalWidth: 0.2,
    },
  },
  Versicolor: {
    name: 'Versicolor',
    scientificName: 'Iris versicolor',
    popularName: 'Íris Azul ou Bandeira Azul (Blue Flag)',
    codigo: 1,
    themeColor: {
      bg: 'bg-blue-50/80',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      gradient: 'from-blue-600 to-indigo-600',
      accent: 'blue',
    },
    summary: 'Espécie com dimensões intermediárias entre Setosa e Virginica. Apresenta pétalas e sépalas bem equilibradas em proporções florais.',
    features: [
      'Pétalas de tamanho médio (~4.2 cm de comprimento)',
      'Sépalas moderadas (média de ~5.9 cm)',
      'Coloração tradicionalmente violeta-azulada marcante',
      'Código de classe no modelo: 1'
    ],
    benchmarks: {
      avgSepalLength: 5.9,
      avgSepalWidth: 2.8,
      avgPetalLength: 4.3,
      avgPetalWidth: 1.3,
    },
  },
  Virginica: {
    name: 'Virginica',
    scientificName: 'Iris virginica',
    popularName: 'Íris da Virgínia (Southern Blue Flag)',
    codigo: 2,
    themeColor: {
      bg: 'bg-purple-50/80',
      border: 'border-purple-200',
      text: 'text-purple-900',
      badge: 'bg-purple-100 text-purple-800 border-purple-300',
      gradient: 'from-purple-600 to-fuchsia-600',
      accent: 'purple',
    },
    summary: 'A maior das três espécies estudadas. Possui as pétalas e sépalas mais longas e volumosas, com floração exuberante em áreas úmidas da América do Norte.',
    features: [
      'Pétalas longas e largas (~5.5 cm de comprimento e ~2.0 cm de largura)',
      'Sépalas longas (podendo superar 7.5 cm)',
      'Porte mais alto e robusto entre as variedades',
      'Código de classe no modelo: 2'
    ],
    benchmarks: {
      avgSepalLength: 6.6,
      avgSepalWidth: 3.0,
      avgPetalLength: 5.5,
      avgPetalWidth: 2.0,
    },
  },
};

export interface SamplePreset {
  name: string;
  species: string;
  description: string;
  data: IrisInput;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: 'Exemplo do Enunciado',
    species: 'Virginica',
    description: 'Amostra especificada no modelo de payload oficial (sepal: 6.7x3.0, petal: 5.2x2.3)',
    data: {
      sepal_length: 6.7,
      sepal_width: 3.0,
      petal_length: 5.2,
      petal_width: 2.3,
    },
  },
  {
    name: 'Íris Setosa Típica',
    species: 'Setosa',
    description: 'Pétalas diminutas (1.4 cm) e sépalas largas (3.5 cm)',
    data: {
      sepal_length: 5.1,
      sepal_width: 3.5,
      petal_length: 1.4,
      petal_width: 0.2,
    },
  },
  {
    name: 'Íris Versicolor Típica',
    species: 'Versicolor',
    description: 'Dimensões medianas balanceadas (sepal: 5.9x2.7, petal: 4.2x1.3)',
    data: {
      sepal_length: 5.9,
      sepal_width: 2.7,
      petal_length: 4.2,
      petal_width: 1.3,
    },
  },
  {
    name: 'Íris Virginica Gigante',
    species: 'Virginica',
    description: 'Pétalas e sépalas bem desenvolvidas e proeminentes',
    data: {
      sepal_length: 7.2,
      sepal_width: 3.6,
      petal_length: 6.1,
      petal_width: 2.5,
    },
  },
];
