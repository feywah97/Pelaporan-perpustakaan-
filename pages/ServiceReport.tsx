
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { ServiceStats } from '../types';

interface ServiceReportProps {
  stats: ServiceStats[];
  isDark: boolean;
}

export const ServiceReport: React.FC<ServiceReportProps> = ({ stats, isDark }) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const sortedStats = [...stats].sort((a, b) => a.timestamp - b.timestamp);
  const latestData = sortedStats.length > 0 ? sortedStats[sortedStats.length - 1] : null;
  
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';

  const totalKunjungan = stats.reduce((a, b) => a + b.onlineVisits + b.offlineVisits, 0);

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Laporan Publik Real-time</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Statistik <span className="text-emerald-600 dark:text-emerald-400">Layanan & Koleksi</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Transparansi data operasional UPT Perpustakaan BBPP Lembang untuk mendukung keterbukaan informasi publik.
        </p>
      </div>

      {/* Primary Metrics Group */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Kunjungan" value={totalKunjungan} icon="👥" color="emerald" sub="Online & Offline" />
        <MetricCard label="Pertumbuhan Koleksi" value={stats.reduce((a, b) => a + b.collectionsAdded, 0)} icon="📚" color="blue" sub="Judul Baru" />
        <MetricCard label="Visit Repository" value={stats.reduce((a, b) => a + b.repoVisits, 0)} icon="🌐" color="amber" sub="Akses Digital" />
        <MetricCard label="Unduhan Jurnal" value={stats.reduce((a, b) => a + b.repoDownloads, 0)} icon="📥" color="purple" sub="Knowledge Sharing" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visit Trends */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tren Kunjungan</h3>
              <p className="text-xs text-slate-500 mt-1">Perbandingan tren bulanan.</p>
            </div>
            {latestData && (
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Terakhir:</span>
                <p className="text-sm font-bold text-emerald-600">{latestData.month} {latestData.year}</p>
              </div>
            )}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sortedStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke={gridColor} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 10}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Area type="monotone" name="Online" dataKey="onlineVisits" stroke="#10b981" fillOpacity={1} fill="url(#colorOnline)" strokeWidth={3} />
                <Area type="monotone" name="Offline" dataKey="offlineVisits" stroke="#94a3b8" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repository Activity */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aktivitas Repository Digital</h3>
            <p className="text-xs text-slate-500 mt-1">Interaksi pemustaka dengan koleksi digital.</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: isDark ? '#1e293b' : '#f8fafc'}}
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar name="Downloads" dataKey="repoDownloads" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar name="Visits" dataKey="repoVisits" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Data Table for Transparency */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Rincian Laporan Bulanan</h3>
          <p className="text-xs text-slate-400 mt-1">Klik pada baris untuk melihat rincian aktivitas mendalam.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-5">Periode</th>
                <th className="px-8 py-5">Kunjungan (OFF/ON)</th>
                <th className="px-8 py-5">Koleksi Baru</th>
                <th className="px-8 py-5">Repo Download</th>
                <th className="px-8 py-5 text-right pr-12">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.slice().reverse().map(s => (
                <React.Fragment key={s.id}>
                  <tr 
                    onClick={() => toggleRow(s.id)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group ${expandedRowId === s.id ? 'bg-slate-50/80 dark:bg-slate-800/50' : ''}`}
                  >
                    <td className="px-8 py-6">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{s.month}</span>
                      <span className="ml-2 text-slate-400 dark:text-slate-500">{s.year}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">{s.offlineVisits}</span>
                        <span className="text-slate-200">/</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{s.onlineVisits}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">+{s.collectionsAdded}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300">
                        <span>{s.repoDownloads}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-medium tracking-tighter">Kali</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right pr-12">
                      <span className={`inline-block transition-transform duration-300 ${expandedRowId === s.id ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </td>
                  </tr>
                  {expandedRowId === s.id && (
                    <tr className="bg-slate-50/30 dark:bg-slate-900/40 animate-in slide-in-from-top-1 duration-300">
                      <td colSpan={5} className="px-8 py-10">
                        <div className="grid md:grid-cols-3 gap-8">
                          {/* Breakdown Kunjungan */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Rasio Kunjungan</h4>
                            <div className="flex items-end space-x-2">
                              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                <div 
                                  className="bg-emerald-500 h-full" 
                                  style={{ width: `${(s.onlineVisits / (s.onlineVisits + s.offlineVisits || 1)) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-emerald-600 font-bold">Online ({Math.round((s.onlineVisits / (s.onlineVisits + s.offlineVisits || 1)) * 100)}%)</span>
                              <span className="text-slate-400">Offline ({Math.round((s.offlineVisits / (s.onlineVisits + s.offlineVisits || 1)) * 100)}%)</span>
                            </div>
                          </div>

                          {/* Detail Repository */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Aktivitas Repository</h4>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
                                <p className="text-[10px] font-bold text-blue-400 uppercase">Conversion</p>
                                <p className="text-lg font-black text-blue-700 dark:text-blue-300">
                                  {((s.repoDownloads / (s.repoVisits || 1)) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div className="flex-1 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-2xl">
                                <p className="text-[10px] font-bold text-amber-500 uppercase">Total Akses</p>
                                <p className="text-lg font-black text-amber-700 dark:text-amber-300">
                                  {s.repoVisits + s.repoDownloads}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Insight Singkat */}
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status Koleksi</h4>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                                {s.collectionsAdded > 5 ? '🚀' : '📖'}
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed italic">
                                {s.collectionsAdded > 0 
                                  ? `Penambahan ${s.collectionsAdded} koleksi baru di bulan ${s.month} untuk memperkaya literasi perpustakaan.` 
                                  : "Fokus pemeliharaan koleksi yang ada dan penguatan sistem layanan digital."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-300 dark:text-slate-700 italic">Data rincian belum tersedia.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info CTA */}
      <div className="bg-emerald-600 dark:bg-emerald-700 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-900/20">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold">Suara Anda Penting</h3>
          <p className="text-emerald-100 opacity-90 text-sm">Bantu kami meningkatkan statistik ini dengan memberikan saran konstruktif.</p>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-white text-emerald-700 font-black rounded-2xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95">
          Berikan Masukan
        </button>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number; sub: string; icon: string; color: string }> = ({ label, value, sub, icon, color }) => {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
  };
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-900 dark:text-white">{value.toLocaleString()}</p>
      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">{sub}</p>
    </div>
  );
};
