import React from 'react';
import { IrisInput } from '../types';
import { SAMPLE_PRESETS } from '../data/speciesData';
import {
  Send,
  Loader2,
  RotateCcw,
  Dices,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface PredictionFormProps {
  input: IrisInput;
  onChangeInput: (newInput: IrisInput) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onHoverField?: (part: 'sepal' | 'petal' | null) => void;
  errorMessage?: string | null;
}

interface FieldConfig {
  key: keyof IrisInput;
  label: string;
  category: 'sepal' | 'petal';
  min: number;
  max: number;
  step: number;
  typicalRange: string;
  description: string;
}

const FIELDS: FieldConfig[] = [
  {
    key: 'sepal_length',
    label: 'Comprimento da Sépala',
    category: 'sepal',
    min: 4.0,
    max: 8.5,
    step: 0.1,
    typicalRange: '4.3 - 7.9 cm',
    description: 'Extensão longitudinal da sépala externa',
  },
  {
    key: 'sepal_width',
    label: 'Largura da Sépala',
    category: 'sepal',
    min: 2.0,
    max: 4.5,
    step: 0.1,
    typicalRange: '2.0 - 4.4 cm',
    description: 'Maior largura transversal da sépala',
  },
  {
    key: 'petal_length',
    label: 'Comprimento da Pétala',
    category: 'petal',
    min: 1.0,
    max: 7.0,
    step: 0.1,
    typicalRange: '1.0 - 6.9 cm',
    description: 'Comprimento da pétala floral ereta',
  },
  {
    key: 'petal_width',
    label: 'Largura da Pétala',
    category: 'petal',
    min: 0.1,
    max: 2.6,
    step: 0.1,
    typicalRange: '0.1 - 2.5 cm',
    description: 'Largura da pétala floral',
  },
];

export const PredictionForm: React.FC<PredictionFormProps> = ({
  input,
  onChangeInput,
  onSubmit,
  isLoading,
  onHoverField,
  errorMessage,
}) => {
  const handleFieldChange = (key: keyof IrisInput, value: number) => {
    onChangeInput({
      ...input,
      [key]: Math.max(0.1, Number(value) || 0.1),
    });
  };

  const handleApplyPreset = (presetData: IrisInput) => {
    onChangeInput({ ...presetData });
  };

  const handleRandomize = () => {
    const randomFloat = (min: number, max: number) =>
      Number((Math.random() * (max - min) + min).toFixed(1));

    // Choose a random species archetype for realistic botanic combinations
    const archetypes = [
      { sl: [4.8, 5.5], sw: [3.0, 4.0], pl: [1.2, 1.8], pw: [0.1, 0.4] }, // Setosa-like
      { sl: [5.4, 6.4], sw: [2.5, 3.2], pl: [3.8, 4.8], pw: [1.0, 1.6] }, // Versicolor-like
      { sl: [6.2, 7.8], sw: [2.8, 3.8], pl: [5.1, 6.7], pw: [1.8, 2.5] }, // Virginica-like
    ];
    const pick = archetypes[Math.floor(Math.random() * archetypes.length)];

    onChangeInput({
      sepal_length: randomFloat(pick.sl[0], pick.sl[1]),
      sepal_width: randomFloat(pick.sw[0], pick.sw[1]),
      petal_length: randomFloat(pick.pl[0], pick.pl[1]),
      petal_width: randomFloat(pick.pw[0], pick.pw[1]),
    });
  };

  const handleReset = () => {
    onChangeInput({
      sepal_length: 5.8,
      sepal_width: 3.0,
      petal_length: 3.8,
      petal_width: 1.2,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md shadow-slate-200/50">
      {/* Form Title & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            Parâmetros Morfométricos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Insira as 4 medidas em centímetros para consulta ao modelo preditivo
          </p>
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRandomize}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            title="Gerar valores aleatórios realistas"
          >
            <Dices className="w-3.5 h-3.5 text-indigo-600" />
            Aleatório
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            title="Restaurar valores padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>

      {/* Preset Buttons Bar */}
      <div className="mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Predefinições Rápidas:
          </span>
          <span className="text-[10px] text-slate-600 hidden sm:inline">
            Clique para carregar amostra
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              disabled={isLoading}
              onClick={() => handleApplyPreset(preset.data)}
              className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all cursor-pointer group shadow-2xs disabled:opacity-50"
            >
              <div className="text-[11px] font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                {preset.name}
              </div>
              <div className="text-[10px] text-slate-600 truncate">
                {preset.species} ({preset.data.sepal_length}/{preset.data.petal_length}cm)
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          {FIELDS.map((field) => {
            const isSepal = field.category === 'sepal';
            const value = input[field.key] ?? field.min;

            return (
              <div
                key={field.key}
                onMouseEnter={() => onHoverField?.(field.category)}
                onMouseLeave={() => onHoverField?.(null)}
                className={`p-4 rounded-2xl border transition-all ${
                  isSepal
                    ? 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200'
                    : 'bg-indigo-50/30 border-indigo-100 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200'
                }`}
              >
                {/* Header of input field */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor={field.key}
                    className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSepal ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                    />
                    {field.label}
                  </label>
                  <span className="text-[10px] text-slate-600 font-medium">
                    Faixa comum: {field.typicalRange}
                  </span>
                </div>

                {/* Number Input + Value readout */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative flex-1">
                    <input
                      id={field.key}
                      name={field.key}
                      type="number"
                      step={field.step}
                      min="0.1"
                      max="15.0"
                      value={value}
                      onChange={(e) =>
                        handleFieldChange(field.key, parseFloat(e.target.value))
                      }
                      disabled={isLoading}
                      required
                      className="w-full bg-white px-3.5 py-2 rounded-xl text-base font-bold font-mono text-slate-800 border border-slate-300 focus:outline-none shadow-2xs"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-600 font-semibold pointer-events-none">
                      cm
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
                    {field.key}
                  </span>
                </div>

                {/* Range Slider for fast exploration */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={value}
                    onChange={(e) =>
                      handleFieldChange(field.key, parseFloat(e.target.value))
                    }
                    disabled={isLoading}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-${
                      isSepal ? 'emerald-600' : 'indigo-600'
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                    <span>{field.min} cm</span>
                    <span>{field.max} cm</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-600 mt-1.5 italic">
                  {field.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-0.5">Falha na predição:</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Endpoint: <code className="text-slate-700 font-mono text-[11px]">POST /api/predict</code></span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[240px] px-7 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:via-teal-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all transform active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Processando modelo ML...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Prever Espécie da Íris</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
