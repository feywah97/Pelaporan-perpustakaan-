
import React, { useState } from 'react';
import { ServiceStats } from '../../types';

interface AdminStatsInputProps {
  onSubmit: (data: ServiceStats) => void;
}

export const AdminStatsInput: React.FC<AdminStatsInputProps> = ({ onSubmit }) => {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const [formData, setFormData] = useState({
    month: months[new Date().getMonth()],
    year: new Date().getFullYear(),
    onlineVisits: 0,
    offlineVisits: 0,
    collectionsAdded: 0,
    repoVisits: 0,
    repoDownloads: 0
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData: ServiceStats = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(`${formData.month} 1, ${formData.year}`).getTime()
    };
    onSubmit(newData);
    setMessage('Data berhasil disimpan!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-2">Input Data Layanan</h2>
        <p className="text-slate-500 mb-8">Masukkan akumulasi nilai statistik untuk periode tertentu.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Bulan</label>
              <select 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                value={formData.month}
                onChange={e => setFormData({...formData, month: e.target.value})}
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-500">Tahun</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-blue-600">Kunjungan Online</label>
              <input type="number" required value={formData.onlineVisits} onChange={e => setFormData({...formData, onlineVisits: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-blue-800">Kunjungan Offline</label>
              <input type="number" required value={formData.offlineVisits} onChange={e => setFormData({...formData, offlineVisits: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-1 p-4 bg-indigo-50 rounded-xl">
            <label className="text-xs font-bold uppercase text-indigo-600">Jumlah Koleksi yang Di-input</label>
            <input type="number" required value={formData.collectionsAdded} onChange={e => setFormData({...formData, collectionsAdded: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 bg-emerald-50 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-emerald-600">Kunjungan Repository</label>
              <input type="number" required value={formData.repoVisits} onChange={e => setFormData({...formData, repoVisits: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-emerald-800">Jumlah Download</label>
              <input type="number" required value={formData.repoDownloads} onChange={e => setFormData({...formData, repoDownloads: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-emerald-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Simpan Data Statistik</button>
          
          {message && (
            <div className="text-center py-2 bg-green-100 text-green-700 rounded-lg font-medium">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
