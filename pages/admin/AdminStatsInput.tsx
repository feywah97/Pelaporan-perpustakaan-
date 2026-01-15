
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
    setMessage('✅ Data statistik berhasil tersimpan');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-sm border border-slate-100">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900">Rekapitulasi Layanan</h2>
          <p className="text-slate-500 mt-2">Input akumulasi data performa perpustakaan per periode.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Periode Selection */}
          <div className="grid grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[2rem]">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pilih Bulan</label>
              <select 
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700"
                value={formData.month}
                onChange={e => setFormData({...formData, month: e.target.value})}
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tahun</label>
              <input 
                type="number"
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700"
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Metrics Groups */}
          <div className="space-y-8">
            <FormSection title="Data Kunjungan Pemustaka" icon="👥" color="text-blue-600">
              <div className="grid sm:grid-cols-2 gap-6">
                <InputField label="Kunjungan Online" value={formData.onlineVisits} onChange={v => setFormData({...formData, onlineVisits: v})} />
                <InputField label="Kunjungan Offline" value={formData.offlineVisits} onChange={v => setFormData({...formData, offlineVisits: v})} />
              </div>
            </FormSection>

            <FormSection title="Koleksi & Repository" icon="📦" color="text-emerald-600">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField label="Koleksi Baru" value={formData.collectionsAdded} onChange={v => setFormData({...formData, collectionsAdded: v})} />
                <InputField label="Visit Repository" value={formData.repoVisits} onChange={v => setFormData({...formData, repoVisits: v})} />
                <InputField label="Total Downloads" value={formData.repoDownloads} onChange={v => setFormData({...formData, repoDownloads: v})} />
              </div>
            </FormSection>
          </div>

          <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 hover:-translate-y-1 shadow-xl shadow-emerald-100 transition-all duration-300">
            Simpan Laporan Sekarang
          </button>
          
          {message && (
            <div className="text-center py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold animate-pulse">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const FormSection: React.FC<{ title: string; icon: string; color: string; children: React.ReactNode }> = ({ title, icon, color, children }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3">
      <span className="text-xl">{icon}</span>
      <h3 className={`text-sm font-black uppercase tracking-widest ${color}`}>{title}</h3>
    </div>
    {children}
  </div>
);

const InputField: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter ml-1">{label}</label>
    <input 
      type="number" 
      required 
      value={value} 
      onChange={e => onChange(parseInt(e.target.value) || 0)} 
      className="w-full px-5 py-3.5 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-400 transition-all font-bold text-slate-700"
    />
  </div>
);
