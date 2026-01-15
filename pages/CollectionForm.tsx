
import React, { useState } from 'react';
import { CollectionRequest } from '../types';

interface CollectionFormProps {
  onSubmit: (data: CollectionRequest) => void;
  onBack: () => void;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    email: '',
    year: new Date().getFullYear(),
    quantity: 1,
    reason: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: CollectionRequest = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      date: new Date().toISOString()
    };
    onSubmit(newRequest);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <div className="text-6xl">✅</div>
        <h2 className="text-2xl font-bold">Terima Kasih!</h2>
        <p className="text-slate-600">Pengajuan koleksi Anda telah kami terima. Kami akan mengirimkan notifikasi ke email <strong>{formData.email}</strong> saat status berubah.</p>
        <button onClick={onBack} className="px-6 py-2 bg-slate-900 text-white rounded-lg">Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Formulir Pengajuan Koleksi</h2>
        <p className="text-slate-500 text-sm">Silakan lengkapi data koleksi yang ingin diajukan untuk pengadaan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Judul Koleksi</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Belajar React 18" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Pengarang</label>
            <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Penulis" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Email Pemustaka</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="alamat@email.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">ISBN/ISSN</label>
            <input required value={formData.isbn} onChange={e => setFormData({...formData, isbn: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="978-..." />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Penerbit</label>
            <input required value={formData.publisher} onChange={e => setFormData({...formData, publisher: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Penerbit" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Tahun Terbit</label>
            <input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-500">Jumlah Koleksi</label>
          <input type="number" min="1" required value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-slate-500">Alasan Pengajuan</label>
          <textarea required value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]" placeholder="Berikan alasan mengapa koleksi ini dibutuhkan..." />
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="button" onClick={onBack} className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Batal</button>
          <button type="submit" className="flex-[2] py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Kirim Pengajuan</button>
        </div>
      </form>
    </div>
  );
};
