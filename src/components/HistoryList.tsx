import React from 'react';
import { PredictionHistoryItem, IrisInput } from '../types';
import { SPECIES_CATALOG } from '../data/speciesData';
import { History, Trash2, ArrowUpRight, Clock, Layers } from 'lucide-react';

interface HistoryListProps {
  history: PredictionHistoryItem[];
  onSelectHistoryItem: (input: IrisInput) => void;
  onClearHistory: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-slate-200/50">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Histórico de Predições ({history.length})
            </h3>
            <p className="text-[11px] text-slate-500">
              Amostras submetidas nesta sessão
            </p>
          </div>
        </div>

        <button
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
          title="Limpar histórico"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Limpar</span>
        </button>
      </div>

      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {history.map((item) => {
          const info = SPECIES_CATALOG[item.response.predicao];
          const timeStr = new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Species and time */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black tracking-wide border shadow-2xs ${
                    info?.themeColor.badge || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.response.predicao}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-700 font-semibold">
                      codigo: {item.response.codigo}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {timeStr} ({item.latencyMs}ms)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Sépala: {item.input.sepal_length}×{item.input.sepal_width} cm |{' '}
                    Pétala: {item.input.petal_length}×{item.input.petal_width} cm
                  </div>
                </div>
              </div>

              {/* Action to reload into form */}
              <button
                onClick={() => onSelectHistoryItem(item.input)}
                className="self-end sm:self-center px-2.5 py-1 text-xs font-semibold text-slate-600 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                title="Carregar estas medidas no formulário"
              >
                <span>Recarregar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
