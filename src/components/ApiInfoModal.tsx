import React from 'react';
import { X, Server, Database, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';
import { API_URL } from '../services/irisApi';

interface ApiInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiInfoModal: React.FC<ApiInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Sobre a API & Arquitetura
            </h3>
            <p className="text-xs text-slate-500">
              Especificações técnicas da integração
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          {/* Endpoint box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" /> Endpoint de Predição:
            </div>
            <code className="block bg-slate-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[11px] select-all break-all">
              POST {API_URL}
            </code>
          </div>

          {/* Model Payload / Return schema */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Payload Enviado:</span>
              <pre className="font-mono text-[10px] bg-white p-2 rounded-lg border border-slate-200 text-slate-700">
{`{
  "sepal_length": 6.7,
  "sepal_width": 3.0,
  "petal_length": 5.2,
  "petal_width": 2.3
}`}
              </pre>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Retorno Esperado:</span>
              <pre className="font-mono text-[10px] bg-white p-2 rounded-lg border border-slate-200 text-slate-700">
{`{
  "codigo": 2,
  "dados_recebidos": {
    "sepal_length": 6.7,
    "sepal_width": 3.0,
    "petal_length": 5.2,
    "petal_width": 2.3
  },
  "predicao": "Virginica"
}`}
              </pre>
            </div>
          </div>

          {/* Species Code Map */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-indigo-950">
            <span className="font-bold block mb-1">Mapeamento de Classes & Código:</span>
            <ul className="space-y-1 text-[11px]">
              <li><strong className="font-mono">codigo: 0</strong> → <strong>Iris setosa</strong> (Pétalas pequenas)</li>
              <li><strong className="font-mono">codigo: 1</strong> → <strong>Iris versicolor</strong> (Dimensões médias)</li>
              <li><strong className="font-mono">codigo: 2</strong> → <strong>Iris virginica</strong> (Maior espécie)</li>
            </ul>
          </div>

          {/* Vercel & Deploy notes */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compatibilidade Vercel & Build:</span>
            </div>
            <p className="text-[11px]">
              Configurado com <code className="font-mono font-semibold">esbuild ^0.28.0</code> e{' '}
              <code className="font-mono font-semibold">vite @8.3.0</code> garantindo build e empacotamento sem inconsistências em pipelines de produção na Vercel.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
