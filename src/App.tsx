/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { IrisApiResponse, IrisInput, PredictionHistoryItem } from './types';
import { checkApiHealth, predictIrisSpecies } from './services/irisApi';
import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { MorphologyVisualizer } from './components/MorphologyVisualizer';
import { HistoryList } from './components/HistoryList';
import { ApiInfoModal } from './components/ApiInfoModal';
import { Leaf, Award, ExternalLink } from 'lucide-react';

const INITIAL_INPUT: IrisInput = {
  sepal_length: 6.7,
  sepal_width: 3.0,
  petal_length: 5.2,
  petal_width: 2.3,
};

export default function App() {
  const [input, setInput] = useState<IrisInput>(INITIAL_INPUT);
  const [result, setResult] = useState<IrisApiResponse | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);
  const [highlightedPart, setHighlightedPart] = useState<'sepal' | 'petal' | null>(null);

  // API connectivity status
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [apiLatency, setApiLatency] = useState<number | undefined>(undefined);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);

  // Ping API on load
  const refreshApiStatus = useCallback(async () => {
    setApiStatus('checking');
    const health = await checkApiHealth();
    setApiStatus(health.status);
    setApiLatency(health.latencyMs);
  }, []);

  const handlePredict = async (e?: React.FormEvent, customInput?: IrisInput) => {
    if (e) e.preventDefault();
    const dataToPredict = customInput || input;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await predictIrisSpecies(dataToPredict);
      setResult(response.data);
      setLatencyMs(response.latencyMs);
      setApiStatus('online');
      setApiLatency(response.latencyMs);

      // Add to session history
      const historyItem: PredictionHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
        input: { ...dataToPredict },
        response: response.data,
        latencyMs: response.latencyMs,
      };

      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]); // keep up to 20
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Ocorreu um erro inesperado ao conectar à API de predição.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Perform initial prediction on first load with the default prompt sample
  useEffect(() => {
    refreshApiStatus();
    handlePredict(undefined, INITIAL_INPUT);
  }, [refreshApiStatus]);

  const handleSelectHistory = (historyInput: IrisInput) => {
    setInput(historyInput);
    handlePredict(undefined, historyInput);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header bar */}
      <Header
        apiStatus={apiStatus}
        apiLatency={apiLatency}
        onCheckStatus={refreshApiStatus}
        onOpenInfo={() => setIsInfoModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Banner Introduction */}
        <div className="mb-7 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold mb-3 border border-white/15">
              <Leaf className="w-3.5 h-3.5" />
              Machine Learning Botânico &middot; Dataset Iris de Fisher
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Classificador Inteligente de Espécies de Íris
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Consulte a rede neural / modelo treinado via requisição POST em tempo real.
              Ajuste as dimensões das sépalas e pétalas para prever com precisão entre as espécies{' '}
              <strong className="text-emerald-400">Iris setosa</strong>,{' '}
              <strong className="text-blue-400">Iris versicolor</strong> e{' '}
              <strong className="text-purple-400">Iris virginica</strong>.
            </p>
          </div>

          <div className="relative z-10 flex sm:flex-col gap-2 shrink-0">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Classes</span>
              <span className="text-lg font-black text-white">3 Espécies</span>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Features</span>
              <span className="text-lg font-black text-emerald-400">4 Variáveis</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Left Column: Form & Morphology Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <PredictionForm
              input={input}
              onChangeInput={setInput}
              onSubmit={handlePredict}
              isLoading={isLoading}
              onHoverField={setHighlightedPart}
              errorMessage={errorMessage}
            />

            <MorphologyVisualizer
              input={input}
              highlightedPart={highlightedPart}
            />
          </div>

          {/* Right Column: Prediction Result & History (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prominent result card */}
            <PredictionResult
              result={result}
              latencyMs={latencyMs}
              lastInput={input}
            />

            {/* History of predictions */}
            <HistoryList
              history={history}
              onSelectHistoryItem={handleSelectHistory}
              onClearHistory={() => setHistory([])}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Dashboard de Predição da Flor Iris &bull; Pronto para Vercel (esbuild ^0.28.0)</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsInfoModalOpen(true)}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Documentação da API
            </button>
            <a
              href="https://flaskappaula2026-6gpb.onrender.com/api/predict"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-700 transition-colors"
            >
              <span>Endpoint Render</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      <ApiInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}
