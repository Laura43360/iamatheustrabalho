import React, { useState } from 'react';
import { IrisApiResponse, IrisInput } from '../types';
import { SPECIES_CATALOG } from '../data/speciesData';
import {
  Sparkles,
  Flower2,
  Code2,
  Clock,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PredictionResultProps {
  result: IrisApiResponse | null;
  latencyMs: number | null;
  timestamp?: number;
  lastInput?: IrisInput | null;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  latencyMs,
  timestamp,
  lastInput,
}) => {
  const [showRawJson, setShowRawJson] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-300 text-center shadow-xs flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 ring-8 ring-slate-50">
          <Flower2 className="w-8 h-8 opacity-70" />
        </div>
        <h3 className="text-base font-bold text-slate-700 mb-1">
          Aguardando Consulta de Classificação
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mb-5">
          Preencha os 4 parâmetros no formulário ou selecione um preset e clique em{' '}
          <strong className="text-emerald-700">Prever Espécie da Íris</strong>.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Modelo treinado com as 3 classes: Setosa, Versicolor e Virginica</span>
        </div>
      </div>
    );
  }

  const speciesKey = result.predicao.trim();
  const info = SPECIES_CATALOG[speciesKey] || {
    name: result.predicao,
    scientificName: `Iris ${result.predicao.toLowerCase()}`,
    popularName: 'Espécie de Íris',
    codigo: result.codigo,
    themeColor: {
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      gradient: 'from-indigo-600 to-purple-600',
      accent: 'indigo',
    },
    summary: 'Classificação botânica retornada com sucesso pelo classificador.',
    features: ['Código do modelo: ' + result.codigo],
    benchmarks: {
      avgSepalLength: 6.0,
      avgSepalWidth: 3.0,
      avgPetalLength: 4.5,
      avgPetalWidth: 1.5,
    },
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Metrics comparison with benchmark averages
  const actual = result.dados_recebidos || lastInput;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/60 relative overflow-hidden transition-all">
      {/* Decorative Gradient Bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${info.themeColor.gradient}`}
      />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> Predição Concluída
          </span>
          {latencyMs !== null && (
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-slate-400" />
              {latencyMs}ms
            </span>
          )}
        </div>

        {/* Code badge */}
        <div className="flex items-center gap-1 text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>codigo: {result.codigo}</span>
        </div>
      </div>

      {/* HERO PREDICTION HIGHLIGHT (PROMINENT DISPLAY AS REQUESTED) */}
      <div
        className={`rounded-2xl p-6 mb-6 border ${info.themeColor.border} ${info.themeColor.bg} relative overflow-hidden`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Espécie Predita Pelo Modelo
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2
                className={`text-4xl sm:text-5xl font-black tracking-tight ${info.themeColor.text}`}
              >
                {result.predicao}
              </h2>
              <span className="text-base sm:text-lg italic font-medium text-slate-600">
                ({info.scientificName})
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
              {info.popularName}
            </p>
          </div>

          {/* Big Flower Icon & Code */}
          <div className="flex items-center gap-3">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${info.themeColor.gradient} flex items-center justify-center text-white shadow-lg ring-4 ring-white shrink-0`}
            >
              <Flower2 className="w-9 h-9" />
            </div>
          </div>
        </div>

        {/* Description summary */}
        <p className="mt-4 text-xs sm:text-sm text-slate-700/90 leading-relaxed border-t border-slate-200/60 pt-3">
          {info.summary}
        </p>

        {/* Distinctive botanical features bullet list */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          {info.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Received Data & Benchmark Comparison */}
      {actual && (
        <div className="mb-6 bg-slate-50/90 rounded-2xl p-4 border border-slate-200/70">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-600" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Dados Processados vs. Média da Espécie
              </h4>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              dataset Fisher 1936
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Sepal Length */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block">Sépala (Comp.)</span>
              <div className="text-base font-bold font-mono text-emerald-800">
                {actual.sepal_length.toFixed(1)}{' '}
                <span className="text-[10px] font-sans text-slate-500">cm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Média:</span>
                <span className="font-mono font-semibold">
                  {info.benchmarks.avgSepalLength} cm
                </span>
              </div>
            </div>

            {/* Sepal Width */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block">Sépala (Larg.)</span>
              <div className="text-base font-bold font-mono text-emerald-800">
                {actual.sepal_width.toFixed(1)}{' '}
                <span className="text-[10px] font-sans text-slate-500">cm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Média:</span>
                <span className="font-mono font-semibold">
                  {info.benchmarks.avgSepalWidth} cm
                </span>
              </div>
            </div>

            {/* Petal Length */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block">Pétala (Comp.)</span>
              <div className="text-base font-bold font-mono text-indigo-800">
                {actual.petal_length.toFixed(1)}{' '}
                <span className="text-[10px] font-sans text-slate-500">cm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Média:</span>
                <span className="font-mono font-semibold">
                  {info.benchmarks.avgPetalLength} cm
                </span>
              </div>
            </div>

            {/* Petal Width */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-500 block">Pétala (Larg.)</span>
              <div className="text-base font-bold font-mono text-indigo-800">
                {actual.petal_width.toFixed(1)}{' '}
                <span className="text-[10px] font-sans text-slate-500">cm</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Média:</span>
                <span className="font-mono font-semibold">
                  {info.benchmarks.avgPetalWidth} cm
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raw JSON Inspector Accordion */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowRawJson(!showRawJson)}
          className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-500" />
            <span>Inspecionar Resposta JSON da API</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span className="text-[11px] font-mono">{showRawJson ? 'Ocultar' : 'Expandir'}</span>
            {showRawJson ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showRawJson && (
          <div className="p-4 bg-slate-900 text-slate-100 text-xs font-mono relative">
            <button
              onClick={copyJson}
              className="absolute top-3 right-3 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
              title="Copiar JSON"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copiar
                </>
              )}
            </button>
            <pre className="overflow-x-auto pr-16 py-1">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
