export interface IrisInput {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
}

export interface IrisApiResponse {
  codigo: number;
  dados_recebidos: {
    sepal_length: number;
    sepal_width: number;
    petal_length: number;
    petal_width: number;
  };
  predicao: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: number;
  input: IrisInput;
  response: IrisApiResponse;
  latencyMs: number;
}

export interface SpeciesInfo {
  name: string;
  scientificName: string;
  popularName: string;
  codigo: number;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    gradient: string;
    accent: string;
  };
  summary: string;
  features: string[];
  benchmarks: {
    avgSepalLength: number;
    avgSepalWidth: number;
    avgPetalLength: number;
    avgPetalWidth: number;
  };
}
