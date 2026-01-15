
import React from 'react';
import { ServiceStats } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
  stats: ServiceStats[];
}

export const Home: React.FC<HomeProps> = ({ onNavigate, stats }) => {
  const latestMonth = stats.length > 0 ? stats[stats.length - 1] : null;
  const visitTarget = 500; // Target contoh
  const currentVisits = latestMonth ? (latestMonth.onlineVisits + latestMonth.offlineVisits) : 0;
  const progressPercent = Math.min(100, (currentVisits / visitTarget) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 pt-4">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-3 px-5 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Digital Transformation 2024</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Literasi <br/> <span className="text-emerald-600 dark:text-emerald-400">Tanpa Batas.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
            Selamat datang di SIPELAP. Kelola kebutuhan literasi Anda dengan transparansi data dan layanan digital terpadu.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => onNavigate('service-report')}
              className="px-10 py-5 bg-emerald-600 text-white font-black rounded-3xl hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 shadow-2xl shadow-emerald-900/20 transition-all uppercase tracking-widest text-xs"
            >
              📊 Lihat Laporan
            </button>
            <button 
              onClick={() => onNavigate('form-koleksi')}
              className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-black rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
            >
              📚 Ajukan Koleksi
            </button>
          </div>
        </div>

        {/* Dynamic Target Widget */}
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <span className="text-6xl">🎯</span>
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Pencapaian Kunjungan</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">{currentVisits}</span>
              <span className="text-xs font-bold text-slate-400">Target: {visitTarget}</span>
            </div>
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
              {progressPercent >= 100 ? "Luar biasa! Target kunjungan bulan ini telah tercapai. ✨" : `Kekurangan ${visitTarget - currentVisits} kunjungan lagi untuk mencapai target bulan ini.`}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <HomeCard 
          icon="📈" 
          title="Transparansi" 
          desc="Data kunjungan, koleksi, dan repository yang selalu diperbarui setiap bulan." 
          onClick={() => onNavigate('service-report')}
          color="amber"
        />
        <HomeCard 
          icon="📦" 
          title="Pengadaan" 
          desc="Berpartisipasi dalam pengayaan koleksi dengan mengajukan judul buku baru." 
          onClick={() => onNavigate('form-koleksi')}
          color="emerald"
        />
        <HomeCard 
          icon="💬" 
          title="Interaksi" 
          desc="Ruang bagi Anda untuk memberikan masukan demi kenyamanan layanan." 
          onClick={() => onNavigate('form-saran')}
          color="blue"
        />
      </div>

      {/* Stats Quick Preview */}
      <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20"></div>)}
          </div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight">Perpustakaan <span className="text-emerald-400">Digital</span> Masa Depan</h2>
            <p className="text-slate-400 max-w-md font-medium leading-relaxed">Menggabungkan kemudahan teknologi dengan kekayaan intelektual untuk BBPP Lembang yang lebih unggul.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <StatSmall label="Akses Online" val="99.9%" />
            <StatSmall label="Kepuasan" val="4.8/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeCard: React.FC<{ icon: string; title: string; desc: string; onClick: () => void; color: string }> = ({ icon, title, desc, onClick, color }) => {
  const themes: Record<string, string> = {
    amber: 'hover:border-amber-400/50 bg-amber-50/30 dark:bg-amber-900/10',
    emerald: 'hover:border-emerald-400/50 bg-emerald-50/30 dark:bg-emerald-900/10',
    blue: 'hover:border-blue-400/50 bg-blue-50/30 dark:bg-blue-900/10'
  };
  return (
    <button 
      onClick={onClick}
      className={`p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 text-left transition-all duration-500 hover:-translate-y-2 group ${themes[color]}`}
    >
      <div className="text-4xl mb-8 transform group-hover:scale-125 transition-transform duration-500">{icon}</div>
      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </button>
  );
};

const StatSmall: React.FC<{ label: string; val: string }> = ({ label, val }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center min-w-[140px] hover:bg-white/10 transition-colors">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-white">{val}</p>
  </div>
);
