
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData: ServiceStats = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(`${formData.month} 1, ${formData.year}`).getTime()
    };
    onSubmit(newData);
    // Reset form for next entry but keep month/year for convenience
    setFormData({
      ...formData,
      onlineVisits: 0,
      offlineVisits: 0,
      collectionsAdded: 0,
      repoVisits: 0,
      repoDownloads: 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-slate-100 dark:border-white/5">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6">📝</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Input Capaian Layanan</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Lengkapi rekapitulasi performa bulanan dengan presisi.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Periode Section */}
          <div className="grid md:grid-cols-2 gap-8 p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Pilih Bulan Laporan</label>
              <select 
                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                value={formData.month}
                onChange={e => setFormData({...formData, month: e.target.value})}
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Tahun Anggaran</label>
              <input 
                type="number"
                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 dark:text-slate-200"
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <MetricSection title="Aktivitas Pemustaka" icon="👥">
              <StepperInput label="Kunjungan Online" value={formData.onlineVisits} onChange={v => setFormData({...formData, onlineVisits: v})} />
              <StepperInput label="Kunjungan Offline" value={formData.offlineVisits} onChange={v => setFormData({...formData, offlineVisits: v})} />
            </MetricSection>

            <MetricSection title="Layanan Digital" icon="💾">
              <StepperInput label="Visit Repository" value={formData.repoVisits} onChange={v => setFormData({...formData, repoVisits: v})} />
              <StepperInput label="Total Downloads" value={formData.repoDownloads} onChange={v => setFormData({...formData, repoDownloads: v})} />
            </MetricSection>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-white/5">
            <StepperInput label="Penambahan Koleksi Baru (Judul)" value={formData.collectionsAdded} onChange={v => setFormData({...formData, collectionsAdded: v})} fullWidth />
          </div>

          <button type="submit" className="group w-full py-6 bg-emerald-600 text-white font-black rounded-[2rem] hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-emerald-900/20 transition-all duration-300 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm">
            <span>💾 Simpan Laporan Periode</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const MetricSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3 pb-2 border-b border-slate-100 dark:border-white/5">
      <span className="text-xl">{icon}</span>
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{title}</h3>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const StepperInput: React.FC<{ label: string; value: number; onChange: (v: number) => void; fullWidth?: boolean }> = ({ label, value, onChange, fullWidth }) => (
  <div className={`space-y-3 ${fullWidth ? 'max-w-md mx-auto' : ''}`}>
    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-white/5 shadow-inner">
      <button 
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm text-slate-600 dark:text-white hover:bg-rose-50 hover:text-rose-600 transition-colors"
      >
        −
      </button>
      <input 
        type="number" 
        value={value} 
        onChange={e => onChange(parseInt(e.target.value) || 0)} 
        className="flex-1 bg-transparent border-none outline-none text-center font-black text-slate-800 dark:text-white text-lg"
      />
      <button 
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm text-slate-600 dark:text-white hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
      >
        +
      </button>
    </div>
  </div>
);
