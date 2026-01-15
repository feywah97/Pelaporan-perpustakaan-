
import React from 'react';
import { CollectionRequest } from '../../types';

interface AdminRequestsProps {
  requests: CollectionRequest[];
  onUpdate: (id: string, status: 'approved' | 'rejected') => void;
}

export const AdminRequests: React.FC<AdminRequestsProps> = ({ requests, onUpdate }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Daftar Pengajuan Koleksi</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{requests.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-5">Info Koleksi</th>
                <th className="px-8 py-5">Tahun / Jumlah</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {requests.slice().reverse().map(r => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{r.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{r.author} • {r.publisher}</div>
                    <div className="text-[10px] text-blue-500 dark:text-blue-400 mt-1 font-mono uppercase tracking-tighter">ISBN: {r.isbn}</div>
                  </td>
                  <td className="px-8 py-6 text-sm">
                    <div className="text-slate-400 dark:text-slate-500 text-xs">Tahun {r.year}</div>
                    <div className="font-bold text-slate-700 dark:text-slate-300">{r.quantity} Eks.</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      r.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      r.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {r.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button onClick={() => onUpdate(r.id, 'approved')} className="p-2.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all">✅</button>
                        <button onClick={() => onUpdate(r.id, 'rejected')} className="p-2.5 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/60 transition-all">❌</button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Terverifikasi</span>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 dark:text-slate-600">Belum ada pengajuan koleksi baru.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
