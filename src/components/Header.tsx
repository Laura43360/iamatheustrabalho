import React from 'react';
import { Flower2, Activity, Info, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  apiStatus: 'online' | 'offline' | 'checking';
  apiLatency?: number;
  onCheckStatus: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  apiStatus,
  apiLatency,
  onCheckStatus,
  onOpenInfo,
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-2 ring-white">
            <Flower2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 via-emerald-950 to-indigo-950 bg-clip-text text-transparent">
                Iris Species Predictor
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500" /> ML Classifier
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Previsão botânica baseada no modelo clássico de Fisher
            </p>
          </div>
        </div>

        {/* Status and Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* API Health Pill */}
          <button
            onClick={onCheckStatus}
            title="Clique para testar conexão com a API Flask no Render"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              apiStatus === 'online'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : apiStatus === 'offline'
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {apiStatus === 'online' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  apiStatus === 'online'
                    ? 'bg-emerald-500'
                    : apiStatus === 'offline'
                    ? 'bg-rose-500'
                    : 'bg-amber-500'
                }`}
              ></span>
            </span>
            <span className="font-mono text-[11px]">
              {apiStatus === 'checking'
                ? 'Testando API...'
                : apiStatus === 'online'
                ? `API Online ${apiLatency ? `(${apiLatency}ms)` : ''}`
                : 'API Inacessível'}
            </span>
            <RefreshCw
              className={`w-3 h-3 opacity-60 ${
                apiStatus === 'checking' ? 'animate-spin' : ''
              }`}
            />
          </button>

          {/* Info Button */}
          <button
            onClick={onOpenInfo}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Sobre o Modelo & API"
            aria-label="Informações sobre o modelo"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
