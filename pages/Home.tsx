
import React from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Selamat Datang di SIPELAP</h1>
        <p className="text-slate-600 text-lg">Platform layanan informasi dan pelaporan mandiri bagi pemustaka kami.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          title="Pengajuan Koleksi" 
          desc="Butuh referensi buku yang belum ada? Ajukan koleksi baru di sini agar kami sediakan untuk Anda."
          btnText="Ajukan Sekarang"
          btnColor="bg-blue-600"
          onClick={() => onNavigate('form-koleksi')}
          icon="📚"
        />
        <Card 
          title="Saran & Kritik" 
          desc="Bantu kami meningkatkan kualitas layanan dengan memberikan masukan berharga Anda."
          btnText="Beri Masukan"
          btnColor="bg-emerald-600"
          onClick={() => onNavigate('form-saran')}
          icon="💬"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-4">Informasi Terbaru</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">📅</div>
            <div>
              <h4 className="font-semibold">Penambahan Koleksi Digital</h4>
              <p className="text-sm text-slate-500">Kami baru saja menambahkan 500+ e-book ke dalam repository kami. Cek sekarang!</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">💡</div>
            <div>
              <h4 className="font-semibold">Layanan Konsultasi Pustakawan</h4>
              <p className="text-sm text-slate-500">Kini hadir secara online melalui zoom setiap hari Selasa dan Kamis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; desc: string; btnText: string; btnColor: string; onClick: () => void; icon: string }> = ({ title, desc, btnText, btnColor, onClick, icon }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm mb-6 leading-relaxed">{desc}</p>
    <button 
      onClick={onClick}
      className={`w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90 ${btnColor}`}
    >
      {btnText}
    </button>
  </div>
);
