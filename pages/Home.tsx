
import React from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // Mock check for stats for snapshot (real logic would pull from props)
  const hasStats = localStorage.getItem('library_stats');
  
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Pusat Layanan Digital</span>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Layanan Perpustakaan <br/> <span className="text-emerald-700 dark:text-emerald-400">Dalam Genggaman.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          Sistem Pelaporan & Layanan Perpustakaan (SIPELAP) hadir untuk memudahkan pemustaka dalam berinteraksi dan memberikan masukan konstruktif.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <ActionCard 
          title="Laporan Layanan" 
          desc="Lihat statistik kunjungan dan perkembangan koleksi terbaru kami secara transparan."
          btnText="Lihat Laporan"
          onClick={() => onNavigate('service-report')}
          icon="📈"
          accent="amber"
        />
        <ActionCard 
          title="Pengajuan Koleksi" 
          desc="Belum menemukan buku yang Anda cari? Ajukan judul buku baru untuk kami proses."
          btnText="Mulai Pengajuan"
          onClick={() => onNavigate('form-koleksi')}
          icon="📚"
          accent="blue"
        />
        <ActionCard 
          title="Saran & Kritik" 
          desc="Suara Anda adalah kompas kami. Berikan masukan untuk kualitas layanan yang lebih baik."
          btnText="Kirim Masukan"
          onClick={() => onNavigate('form-saran')}
          icon="✨"
          accent="emerald"
        />
      </div>

      {/* Snapshot Widget */}
      <div className="bg-slate-900 dark:bg-emerald-950 rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-200 dark:shadow-none">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-bold">Kilas Balik Layanan</h3>
            <p className="text-slate-400 text-sm">Lihat bagaimana kami berkembang melayani Anda setiap bulannya.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Akses Digital</span>
              <p className="text-2xl font-black mt-1">99%</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Ketersediaan</span>
              <p className="text-2xl font-black mt-1">24/7</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('service-report')}
            className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-900/20"
          >
            Pelajari Statistik 📊
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Warta Perpustakaan</h3>
          <div className="h-px flex-1 mx-6 bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          <NewsItem 
            emoji="🚀" 
            title="E-Resources Terbaru" 
            desc="Akses 1.000+ jurnal penelitian pertanian terbaru kini tersedia melalui portal repository." 
          />
          <NewsItem 
            emoji="☕" 
            title="Literacy Corner" 
            desc="Nikmati suasana baru area baca luar ruangan dengan fasilitas Wi-Fi yang lebih stabil." 
          />
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ title: string; desc: string; btnText: string; onClick: () => void; icon: string, accent: string }> = ({ title, desc, btnText, onClick, icon, accent }) => {
  const themes: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
  };
  const btnThemes: Record<string, string> = {
    blue: 'bg-blue-600 shadow-blue-100 dark:shadow-none hover:bg-blue-700',
    emerald: 'bg-emerald-600 shadow-emerald-100 dark:shadow-none hover:bg-emerald-700',
    amber: 'bg-amber-500 shadow-amber-100 dark:shadow-none hover:bg-amber-600'
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl dark:hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-500">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform group-hover:scale-110 duration-500 ${themes[accent]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 leading-relaxed line-clamp-2">{desc}</p>
      <button 
        onClick={onClick}
        className={`w-full py-3.5 rounded-2xl text-white font-bold transition-all shadow-lg text-sm ${btnThemes[accent]}`}
      >
        {btnText}
      </button>
    </div>
  );
};

const NewsItem: React.FC<{ emoji: string; title: string; desc: string }> = ({ emoji, title, desc }) => (
  <div className="flex items-start space-x-5">
    <div className="text-3xl grayscale hover:grayscale-0 transition-all duration-300">{emoji}</div>
    <div>
      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);
