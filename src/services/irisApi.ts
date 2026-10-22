import { IrisApiResponse, IrisInput } from '../types';

export const API_URL = 'https://flaskappaula2026-6gpb.onrender.com/api/predict';

export interface PredictResult {
  data: IrisApiResponse;
  latencyMs: number;
}

export async function predictIrisSpecies(input: IrisInput): Promise<PredictResult> {
  const startTime = performance.now();

  // Basic client-side numerical check
  if (
    input.sepal_length <= 0 ||
    input.sepal_width <= 0 ||
    input.petal_length <= 0 ||
    input.petal_width <= 0
  ) {
    throw new Error('Todas as medidas devem ser números positivos maiores que zero.');
  }

  const payload = {
    sepal_length: Number(input.sepal_length),
    sepal_width: Number(input.sepal_width),
    petal_length: Number(input.petal_length),
    petal_width: Number(input.petal_width),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout for cold start tolerance

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);

    if (!response.ok) {
      let errorDetail = `Servidor retornou status HTTP ${response.status} (${response.statusText})`;
      try {
        const errorBody = await response.text();
        if (errorBody && errorBody.includes('Internal Server Error')) {
          errorDetail = 'Erro interno no backend Flask da API. Verifique os valores inseridos ou tente novamente.';
        }
      } catch {
        // ignore parsing error
      }
      throw new Error(errorDetail);
    }

    const data: IrisApiResponse = await response.json();

    if (!data || typeof data.predicao === 'undefined') {
      throw new Error('Resposta da API em formato inesperado (campo "predicao" não encontrado).');
    }

    return {
      data,
      latencyMs,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(
        'A requisição excedeu o tempo limite (25s). Se o servidor no Render estava em repouso (cold start), ele pode demorar para acordar. Por favor, tente novamente.'
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro de conexão desconhecido ao chamar a API de predição.');
  }
}

export async function checkApiHealth(): Promise<{ status: 'online' | 'offline' | 'checking'; latencyMs?: number }> {
  const startTime = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sepal_length: 5.1,
        sepal_width: 3.5,
        petal_length: 1.4,
        petal_width: 0.2,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);

    if (response.ok) {
      return { status: 'online', latencyMs };
    }
    return { status: 'offline' };
  } catch {
    return { status: 'offline' };
  }
}
