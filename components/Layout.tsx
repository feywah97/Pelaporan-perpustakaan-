
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, isAdmin, onToggleAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Identitas Hijau BBPP Lembang */}
      <aside className="w-full md:w-72 bg-[#016543] text-white shrink-0 flex flex-col shadow-2xl z-20">
        <div className="p-8 flex flex-col items-center border-b border-emerald-800/50">
          <div className="relative mb-6 group">
            {/* Background Glow Aura */}
            <div className="absolute -inset-2 bg-[#FFD100] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            {/* Logo Container */}
            <div className="relative w-28 h-28 bg-white rounded-full p-1.5 shadow-2xl flex items-center justify-center overflow-hidden border-2 border-[#FFD100]">
              <img 
                src="logo.png" 
                alt="Logo BBPP Lembang" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback jika file logo.png belum ada di root
                  (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/google/material-design-icons/master/png/maps/local_library/black/48dp.png';
                }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tighter text-[#FFD100]">SIPELAP</h1>
            <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-[0.25em] leading-tight mt-1 opacity-80">
              UPT Perpustakaan
            </p>
            <div className="mt-2 h-0.5 w-12 bg-[#FFD100] mx-auto rounded-full"></div>
            <p className="text-[9px] font-medium text-emerald-200 uppercase mt-2">
              BBPP Lembang
            </p>
          </div>
        </div>
        
        <nav className="mt-6 px-4 space-y-2 flex-1">
          {!isAdmin ? (
            <>
              <NavItem active={currentPage === 'home'} onClick={() => onNavigate('home')} label="Beranda" icon="🏠" />
              <NavItem active={currentPage === 'form-koleksi'} onClick={() => onNavigate('form-koleksi')} label="Pengajuan Koleksi" icon="📚" />
              <NavItem active={currentPage === 'form-saran'} onClick={() => onNavigate('form-saran')} label="Saran & Kritik" icon="💬" />
            </>
          ) : (
            <>
              <div className="px-4 py-2 text-[10px] font-bold text-emerald-300 uppercase tracking-widest opacity-60">Admin Panel</div>
              <NavItem active={currentPage === 'admin-dashboard'} onClick={() => onNavigate('admin-dashboard')} label="Dashboard" icon="📊" />
              <NavItem active={currentPage === 'admin-stats'} onClick={() => onNavigate('admin-stats')} label="Input Layanan" icon="➕" />
              <NavItem active={currentPage === 'admin-requests'} onClick={() => onNavigate('admin-requests')} label="Data Pengajuan" icon="📁" />
              <NavItem active={currentPage === 'admin-feedback'} onClick={() => onNavigate('admin-feedback')} label="Daftar Saran" icon="📨" />
            </>
          )}
        </nav>

        {/* Footer Sidebar / Switch Mode */}
        <div className="p-6 border-t border-emerald-800/50 bg-black/10">
          <button 
            onClick={onToggleAdmin}
            className={`w-full flex items-center justify-center space-x-3 py-3 rounded-xl transition-all duration-300 font-bold text-sm shadow-lg ${
              isAdmin 
                ? 'bg-emerald-900/50 hover:bg-emerald-800 text-white border border-emerald-700' 
                : 'bg-[#FFD100] hover:bg-yellow-500 text-[#016543] shadow-yellow-900/40 hover:-translate-y-0.5'
            }`}
          >
            <span>{isAdmin ? '👤 Mode Pemustaka' : '🛡️ Mode Admin'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-10 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-1 h-8 bg-[#016543] rounded-full hidden sm:block"></div>
            <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
              {currentPage.replace('admin-', 'Admin: ').replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center space-x-6">
             <div className="hidden sm:flex flex-col text-right">
               <span className="text-sm font-bold text-[#016543]">UPT Perpustakaan</span>
               <span className="text-[10px] text-slate-400 font-medium tracking-wide">Balai Besar Pelatihan Pertanian Lembang</span>
             </div>
             <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>
             <div className="text-sm font-bold text-emerald-800 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 shadow-sm">
               {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
          </div>
        </header>
        <div className="p-10 max-w-[1400px] mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-[#FFD100] text-[#016543] shadow-xl shadow-yellow-900/30 font-bold scale-[1.02]' 
        : 'text-emerald-50 hover:bg-white/10 hover:text-white'
    }`}
  >
    <span className={`text-xl transition-transform group-hover:scale-125 duration-300 ${active ? 'filter drop-shadow-md' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
      {icon}
    </span>
    <span className="text-sm font-semibold tracking-tight">{label}</span>
    {active && (
      <div className="ml-auto flex items-center">
        <div className="w-1.5 h-1.5 bg-[#016543] rounded-full"></div>
      </div>
    )}
  </button>
);
