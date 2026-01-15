
import React, { useState } from 'react';
import { UserFeedback } from '../types';

interface FeedbackFormProps {
  onSubmit: (data: UserFeedback) => void;
  onBack: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    phone: '',
    content: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: UserFeedback = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString()
    };
    onSubmit(newFeedback);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <div className="text-6xl">💝</div>
        <h2 className="text-2xl font-bold">Terima Kasih Atas Masukannya!</h2>
        <p className="text-slate-600">Saran dan kritik Anda sangat berarti bagi pengembangan perpustakaan kami.</p>
        <button onClick={onBack} className="px-6 py-2 bg-slate-900 text-white rounded-lg">Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Laporan Saran & Kritik</h2>
        <p className="text-slate-500 text-sm">Bagikan pengalaman Anda menggunakan layanan kami.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-500">Nama Lengkap</label>
          <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Masukkan nama Anda" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Instansi</label>
            <input required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: Univ. Indonesia" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Nomor HP/WA</label>
            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="08..." />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-500">Saran & Kritik</label>
          <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none min-h-[150px]" placeholder="Tuliskan masukan Anda di sini..." />
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="button" onClick={onBack} className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Batal</button>
          <button type="submit" className="flex-[2] py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">Kirim Masukan</button>
        </div>
      </form>
    </div>
  );
};
