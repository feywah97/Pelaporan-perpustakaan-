
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell 
} from 'recharts';
import { ServiceStats, CollectionRequest, UserFeedback } from '../../types';

interface DashboardProps {
  stats: ServiceStats[];
  requests: CollectionRequest[];
  feedbacks: UserFeedback[];
  isDark?: boolean;
}

export const AdminDashboard: React.FC<DashboardProps> = ({ stats, requests, feedbacks, isDark }) => {
  const sortedStats = [...stats].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6).reverse();

  const statusCounts = requests.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, { pending: 0, approved: 0, rejected: 0 } as Record<string, number>);

  const statusData = [
    { name: 'Pending', value: statusCounts.pending, color: isDark ? '#64748b' : '#94a3b8' }, 
    { name: 'Disetujui', value: statusCounts.approved, color: '#10b981' }, 
    { name: 'Ditolak', value: statusCounts.rejected, color: '#f43f5e' },
  ].filter(item => item.value > 0);

  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Total Kunjungan" value={stats.reduce((a, b) => a + b.onlineVisits + b.offlineVisits, 0)} icon="👥" color="emerald" />
        <MetricCard label="Pengajuan Masuk" value={requests.length} icon="📚" color="blue" />
        <MetricCard label="Digital Downloads" value={stats.reduce((a, b) => a + b.repoDownloads, 0)} icon="📥" color="amber" />
        <MetricCard label="Saran Pemustaka" value={feedbacks.length} icon="💬" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Tren Layanan Bulanan</h3>
            <div className="flex space-x-3">
              <span className="flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase"><div className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"></div> Online</span>
              <span className="flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase"><div className="w-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mr-1.5"></div> Offline</span>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke={gridColor} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: labelColor, fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: isDark ? '#0f172a' : '#f8fafc'}} 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#1e293b',
                    boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar name="Kunjungan Online" dataKey="onlineVisits" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar name="Kunjungan Offline" dataKey="offlineVisits" fill={isDark ? '#334155' : '#e2e8f0'} radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-8">Status Pengajuan</h3>
          <div className="h-[240px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {statusData.map((entry, index) => <Cell key={index} fill={entry.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{requests.length}</span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Total</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
             {statusData.map(s => (
               <div key={s.name} className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: s.color}}></div>
                   <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.name}</span>
                 </div>
                 <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{s.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Riwayat Layanan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
                <th className="px-8 py-5">Periode</th>
                <th className="px-8 py-5 text-center">Visit (ON/OFF)</th>
                <th className="px-8 py-5 text-center">Koleksi Baru</th>
                <th className="px-8 py-5 text-center">Repo Act.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {stats.slice().reverse().map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-700 dark:text-slate-200">{s.month}</span>
                    <span className="ml-2 text-slate-400 dark:text-slate-500">{s.year}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{s.onlineVisits}</span>
                      <span className="text-slate-200 dark:text-slate-700">/</span>
                      <span className="text-slate-500 dark:text-slate-400">{s.offlineVisits}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{s.collectionsAdded}</span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{s.repoDownloads}</span>
                    <span className="text-slate-400 dark:text-slate-500 ml-1 text-xs">DLs</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number | string; icon: string; color: string }> = ({ label, value, icon, color }) => {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
  };
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-900 dark:text-white">{value.toLocaleString()}</p>
    </div>
  );
};
