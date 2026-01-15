
import React from 'react';
import { EmailSimulation } from '../types';

interface EmailSimulationModalProps {
  email: EmailSimulation | null;
  onClose: () => void;
}

export const EmailSimulationModal: React.FC<EmailSimulationModalProps> = ({ email, onClose }) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📧</span>
            <h3 className="font-bold">Simulasi Notifikasi Email</h3>
          </div>
          <button onClick={onClose} className="hover:text-slate-400 transition-colors">✕</button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kepada</p>
            <p className="font-medium text-slate-800">{email.to}</p>
          </div>
          <div className="border-b border-slate-100 pb-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subjek</p>
            <p className="font-medium text-slate-800">{email.subject}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pesan</p>
            <div className={`p-4 rounded-xl text-sm leading-relaxed border ${
              email.type === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-rose-50 border-rose-100 text-rose-900'
            }`}>
              {email.body.split('\n').map((line, i) => (
                <p key={i} className={line === '' ? 'h-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
