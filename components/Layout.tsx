
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  isAdmin, 
  onToggleAdmin,
  theme,
  onToggleTheme
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-300 bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar - Brand Identity Emerald */}
      <aside className="w-full md:w-72 bg-[#064e3b] dark:bg-[#022c22] text-white shrink-0 flex flex-col shadow-xl z-20">
        <div className="p-8 flex flex-col items-center border-b border-emerald-800/30">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-white rounded-3xl p-3 shadow-lg flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/google/material-design-icons/master/png/maps/local_library/black/48dp.png';
                }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight text-amber-400">SIPELAP</h1>
            <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.2em] mt-1 opacity-70">
              UPT Perpustakaan
            </p>
          </div>
        </div>
        
        <nav className="mt-8 px-4 space-y-1.5 flex-1 overflow-y-auto">
          {!isAdmin ? (
            <>
              <NavItem active={currentPage === 'home'} onClick={() => onNavigate('home')} label="Beranda" icon="🏠" />
              <NavItem active={currentPage === 'service-report'} onClick={() => onNavigate('service-report')} label="Laporan Layanan" icon="📈" />
              <NavItem active={currentPage === 'form-koleksi'} onClick={() => onNavigate('form-koleksi')} label="Pengajuan Koleksi" icon="📚" />
              <NavItem active={currentPage === 'form-saran'} onClick={() => onNavigate('form-saran')} label="Saran & Kritik" icon="💬" />
            </>
          ) : (
            <>
              <div className="px-5 py-3 text-[10px] font-bold text-emerald-400 uppercase tracking-widest opacity-50">Manajemen Admin</div>
              <NavItem active={currentPage === 'admin-dashboard'} onClick={() => onNavigate('admin-dashboard')} label="Dashboard" icon="📊" />
              <NavItem active={currentPage === 'admin-stats'} onClick={() => onNavigate('admin-stats')} label="Input Layanan" icon="➕" />
              <NavItem active={currentPage === 'admin-requests'} onClick={() => onNavigate('admin-requests')} label="Data Pengajuan" icon="📁" />
              <NavItem active={currentPage === 'admin-feedback'} onClick={() => onNavigate('admin-feedback')} label="Daftar Saran" icon="📨" />
            </>
          )}
        </nav>

        <div className="p-6 bg-emerald-950/30 space-y-3">
          <button 
            onClick={onToggleAdmin}
            className={`w-full flex items-center justify-center space-x-3 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${
              isAdmin 
                ? 'bg-emerald-800/40 hover:bg-emerald-700 text-white border border-emerald-700/50' 
                : 'bg-amber-400 hover:bg-amber-50 text-emerald-950 shadow-lg shadow-amber-900/20'
            }`}
          >
            <span>{isAdmin ? '👤 Mode Pemustaka' : '🛡️ Mode Admin'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-amber-400 rounded-full"></div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 capitalize">
              {currentPage.replace('admin-', '').replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all hover:scale-110 active:scale-95"
              title={theme === 'light' ? 'Ganti ke Dark Mode' : 'Ganti ke Bright Mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

             <div className="hidden lg:flex flex-col text-right">
               <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">BBPP Lembang</span>
             </div>
             <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
               {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
             </div>
          </div>
        </header>
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-amber-400 text-emerald-950 shadow-md font-bold' 
        : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm tracking-tight">{label}</span>
  </button>
);
