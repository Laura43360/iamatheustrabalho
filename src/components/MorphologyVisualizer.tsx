import React from 'react';
import { IrisInput } from '../types';
import { Ruler, Sparkles } from 'lucide-react';

interface MorphologyVisualizerProps {
  input: IrisInput;
  highlightedPart?: 'sepal' | 'petal' | null;
}

export const MorphologyVisualizer: React.FC<MorphologyVisualizerProps> = ({
  input,
  highlightedPart = null,
}) => {
  // Normalize sizes for visual representation
  // Max typical length: 8cm, width: 4cm
  const sepalLengthScale = Math.min(Math.max((input.sepal_length || 5.0) / 7.5, 0.4), 1.3);
  const sepalWidthScale = Math.min(Math.max((input.sepal_width || 3.0) / 3.8, 0.4), 1.4);
  const petalLengthScale = Math.min(Math.max((input.petal_length || 3.5) / 6.5, 0.25), 1.3);
  const petalWidthScale = Math.min(Math.max((input.petal_width || 1.3) / 2.5, 0.2), 1.5);

  const sepalHeightPx = 80 * sepalLengthScale;
  const sepalWidthPx = 42 * sepalWidthScale;

  const petalHeightPx = 65 * petalLengthScale;
  const petalWidthPx = 32 * petalWidthScale;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Anatomia & Proporção Visual
            </h3>
            <p className="text-[11px] text-slate-500">
              Visualização vetorial dinâmica sincronizada aos dados
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          Escala Dinâmica
        </span>
      </div>

      {/* Interactive Morphometry Diagram */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Flower SVG Representation */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-sm select-none"
          >
            <defs>
              <linearGradient id="sepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Stem & Base */}
            <path
              d="M 98 120 Q 100 160 102 195"
              stroke="url(#stemGrad)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Small leaf */}
            <path
              d="M 100 155 Q 120 145 130 155 Q 115 165 101 160"
              fill="#10b981"
              opacity="0.85"
            />

            {/* Outer Sepals (Sépala) - left and right falls */}
            {/* Left Sepal */}
            <g
              transform={`translate(100, 115) rotate(-40)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'sepal' ? 'filter drop-shadow(0 0 8px rgba(16,185,129,0.7))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={sepalHeightPx * 0.4}
                rx={sepalWidthPx * 0.45}
                ry={sepalHeightPx * 0.45}
                fill="url(#sepalGrad)"
                opacity="0.9"
                stroke="#065f46"
                strokeWidth="1.5"
              />
            </g>

            {/* Right Sepal */}
            <g
              transform={`translate(100, 115) rotate(40)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'sepal' ? 'filter drop-shadow(0 0 8px rgba(16,185,129,0.7))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={sepalHeightPx * 0.4}
                rx={sepalWidthPx * 0.45}
                ry={sepalHeightPx * 0.45}
                fill="url(#sepalGrad)"
                opacity="0.9"
                stroke="#065f46"
                strokeWidth="1.5"
              />
            </g>

            {/* Central Sepal Fall */}
            <g
              transform={`translate(100, 115)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'sepal' ? 'filter drop-shadow(0 0 8px rgba(16,185,129,0.7))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={sepalHeightPx * 0.5}
                rx={sepalWidthPx * 0.5}
                ry={sepalHeightPx * 0.5}
                fill="url(#sepalGrad)"
                opacity="0.95"
                stroke="#047857"
                strokeWidth="1.5"
              />
              {/* Sepal ridge details */}
              <line
                x1="0"
                y1="5"
                x2="0"
                y2={sepalHeightPx * 0.85}
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            </g>

            {/* Center Receptacle */}
            <circle cx="100" cy="115" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

            {/* Inner Petals (Pétalas / Standards) - upright petals */}
            {/* Left Petal */}
            <g
              transform={`translate(100, 112) rotate(-22)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'petal' ? 'filter drop-shadow(0 0 8px rgba(99,102,241,0.8))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={-petalHeightPx * 0.5}
                rx={petalWidthPx * 0.45}
                ry={petalHeightPx * 0.5}
                fill="url(#petalGrad)"
                opacity="0.9"
                stroke="#3730a3"
                strokeWidth="1.5"
              />
            </g>

            {/* Right Petal */}
            <g
              transform={`translate(100, 112) rotate(22)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'petal' ? 'filter drop-shadow(0 0 8px rgba(99,102,241,0.8))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={-petalHeightPx * 0.5}
                rx={petalWidthPx * 0.45}
                ry={petalHeightPx * 0.5}
                fill="url(#petalGrad)"
                opacity="0.9"
                stroke="#3730a3"
                strokeWidth="1.5"
              />
            </g>

            {/* Center Upright Petal */}
            <g
              transform={`translate(100, 112)`}
              className={`transition-all duration-300 ${
                highlightedPart === 'petal' ? 'filter drop-shadow(0 0 8px rgba(99,102,241,0.8))' : ''
              }`}
            >
              <ellipse
                cx="0"
                cy={-petalHeightPx * 0.52}
                rx={petalWidthPx * 0.5}
                ry={petalHeightPx * 0.52}
                fill="url(#petalGrad)"
                opacity="0.95"
                stroke="#312e81"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="-5"
                x2="0"
                y2={-petalHeightPx * 0.9}
                stroke="#c7d2fe"
                strokeWidth="1.5"
                opacity="0.7"
              />
            </g>
          </svg>
        </div>

        {/* Legend / Metrics Badges */}
        <div className="flex flex-col gap-2.5 w-full sm:w-auto">
          {/* Sepal Box */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              highlightedPart === 'sepal'
                ? 'bg-emerald-100/70 border-emerald-400 ring-2 ring-emerald-300'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                Sépalas (Externas)
              </span>
              <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-1.5 py-0.2 rounded font-mono font-semibold">
                sepal_*
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-900 font-mono">
              <div>
                <span className="text-emerald-700 block text-[10px] font-sans">Comprimento:</span>
                <span className="font-bold text-xs">{input.sepal_length.toFixed(1)} cm</span>
              </div>
              <div>
                <span className="text-emerald-700 block text-[10px] font-sans">Largura:</span>
                <span className="font-bold text-xs">{input.sepal_width.toFixed(1)} cm</span>
              </div>
            </div>
          </div>

          {/* Petal Box */}
          <div
            className={`p-2.5 rounded-xl border transition-all ${
              highlightedPart === 'petal'
                ? 'bg-indigo-100/70 border-indigo-400 ring-2 ring-indigo-300'
                : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-xs font-bold flex items-center gap-1.5 text-indigo-800">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                Pétalas (Internas)
              </span>
              <span className="text-[10px] bg-indigo-200/70 text-indigo-900 px-1.5 py-0.2 rounded font-mono font-semibold">
                petal_*
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-indigo-900 font-mono">
              <div>
                <span className="text-indigo-700 block text-[10px] font-sans">Comprimento:</span>
                <span className="font-bold text-xs">{input.petal_length.toFixed(1)} cm</span>
              </div>
              <div>
                <span className="text-indigo-700 block text-[10px] font-sans">Largura:</span>
                <span className="font-bold text-xs">{input.petal_width.toFixed(1)} cm</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>As dimensões das pétalas são os fatores mais determinantes na classificação.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
