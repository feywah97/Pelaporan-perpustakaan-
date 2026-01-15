
import React from 'react';
import { ToastMessage } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  toasts: ToastMessage[];
  onCloseToast: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  isAdmin, 
  onToggleAdmin,
  theme,
  onToggleTheme,
  toasts,
  onCloseToast
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-500 bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-[200] space-y-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center p-4 rounded-2xl shadow-2xl border min-w-[300px] animate-in slide-in-from-right-10 duration-300 ${
              toast.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' :
              toast.type === 'error' ? 'bg-rose-600 border-rose-500 text-white' :
              'bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <span className="mr-3 text-lg">
              {toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
            </span>
            <p className="text-sm font-bold flex-1">{toast.message}</p>
            <button onClick={() => onCloseToast(toast.id)} className="ml-4 opacity-50 hover:opacity-100">✕</button>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#064e3b] dark:bg-slate-900 text-white shrink-0 flex flex-col shadow-2xl z-20 relative border-r border-white/5">
        <div className="p-8 flex flex-col items-center border-b border-white/5">
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 bg-amber-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-24 h-24 bg-white rounded-3xl p-3 shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
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
            <p className="text-[10px] font-bold text-emerald-200/60 uppercase tracking-[0.3em] mt-1">UPT Perpustakaan</p>
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
              <div className="px-5 py-3 text-[10px] font-bold text-amber-400/50 uppercase tracking-widest">Workspace Admin</div>
              <NavItem active={currentPage === 'admin-dashboard'} onClick={() => onNavigate('admin-dashboard')} label="Dashboard" icon="📊" />
              <NavItem active={currentPage === 'admin-stats'} onClick={() => onNavigate('admin-stats')} label="Input Layanan" icon="➕" />
              <NavItem active={currentPage === 'admin-requests'} onClick={() => onNavigate('admin-requests')} label="Data Pengajuan" icon="📁" />
              <NavItem active={currentPage === 'admin-feedback'} onClick={() => onNavigate('admin-feedback')} label="Daftar Saran" icon="📨" />
            </>
          )}
        </nav>

        <div className="p-6 bg-black/10">
          <button 
            onClick={onToggleAdmin}
            className={`w-full flex items-center justify-center space-x-3 py-3.5 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest ${
              isAdmin 
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10' 
                : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 shadow-xl shadow-amber-900/40'
            }`}
          >
            <span>{isAdmin ? '🛡️ Keluar Admin' : '👤 Akses Admin'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">
                {currentPage.split('-').join(' ')}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Layanan Aktif</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={onToggleTheme}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 transition-all hover:scale-110 active:scale-95 border border-transparent dark:border-white/5"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="h-10 w-px bg-slate-200 dark:bg-white/5 mx-2"></div>
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">BBPP LEMBANG</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 lg:p-12 max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
      active 
        ? 'bg-amber-400 text-emerald-950 font-black shadow-lg shadow-amber-900/20' 
        : 'text-white/60 hover:bg-white/5 hover:text-white'
    }`}
  >
    {active && <span className="absolute left-2 w-1 h-4 bg-emerald-900 rounded-full"></span>}
    <span className="text-xl group-hover:scale-125 transition-transform">{icon}</span>
    <span className="text-xs uppercase tracking-widest">{label}</span>
  </button>
);
