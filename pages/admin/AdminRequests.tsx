
import React from 'react';
import { CollectionRequest } from '../../types';

interface AdminRequestsProps {
  requests: CollectionRequest[];
  onUpdate: (id: string, status: 'approved' | 'rejected') => void;
}

export const AdminRequests: React.FC<AdminRequestsProps> = ({ requests, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold">Daftar Pengajuan Koleksi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Info Koleksi</th>
                <th className="px-6 py-4">Tahun / Jumlah</th>
                <th className="px-6 py-4">Alasan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.slice().reverse().map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{r.title}</div>
                    <div className="text-xs text-slate-500">{r.author} • {r.publisher}</div>
                    <div className="text-[10px] text-blue-500 mt-1 font-mono uppercase">ISBN: {r.isbn}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>Thn: {r.year}</div>
                    <div className="font-bold">{r.quantity} Eks.</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-xs text-slate-600 line-clamp-2 italic">"{r.reason}"</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      r.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {r.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button onClick={() => onUpdate(r.id, 'approved')} className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200">✅</button>
                        <button onClick={() => onUpdate(r.id, 'rejected')} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">❌</button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Belum ada pengajuan koleksi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
