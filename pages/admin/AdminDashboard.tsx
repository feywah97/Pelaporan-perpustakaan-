
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
}

export const AdminDashboard: React.FC<DashboardProps> = ({ stats, requests, feedbacks }) => {
  const sortedStats = [...stats].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6).reverse();

  // Calculate status distribution for Pie Chart
  const statusCounts = requests.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, { pending: 0, approved: 0, rejected: 0 } as Record<string, number>);

  const statusData = [
    { name: 'Tertunda', value: statusCounts.pending, color: '#f59e0b' }, // Amber 500
    { name: 'Disetujui', value: statusCounts.approved, color: '#10b981' }, // Emerald 500
    { name: 'Ditolak', value: statusCounts.rejected, color: '#ef4444' },  // Red 500
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Kunjungan Bulan Ini" value={stats.length > 0 ? (stats[stats.length-1].onlineVisits + stats[stats.length-1].offlineVisits).toLocaleString() : '0'} icon="👥" color="bg-blue-500" />
        <StatCard title="Total Pengajuan" value={requests.length.toString()} icon="📚" color="bg-indigo-500" />
        <StatCard title="Total Download" value={stats.reduce((acc, curr) => acc + curr.repoDownloads, 0).toLocaleString()} icon="📥" color="bg-emerald-500" />
        <StatCard title="Saran Masuk" value={feedbacks.length.toString()} icon="💬" color="bg-purple-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visits Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Tren Kunjungan (6 Bulan Terakhir)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Bar name="Online" dataKey="onlineVisits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar name="Offline" dataKey="offlineVisits" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repository Stats */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Aktivitas Repository</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Bar name="Kunjungan" dataKey="repoVisits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar name="Download" dataKey="repoDownloads" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Section: Status Distribution */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Distribusi Status Pengajuan</h3>
            <p className="text-sm text-slate-500">Visualisasi status penyelesaian permohonan koleksi baru.</p>
          </div>
          <div className="flex gap-4">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-medium text-slate-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="h-[250px] col-span-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatusMetric label="Total Tertunda" value={statusCounts.pending} color="text-amber-600" bg="bg-amber-50" border="border-amber-100" />
            <StatusMetric label="Total Disetujui" value={statusCounts.approved} color="text-emerald-600" bg="bg-emerald-50" border="border-emerald-100" />
            <StatusMetric label="Total Ditolak" value={statusCounts.rejected} color="text-rose-600" bg="bg-rose-50" border="border-rose-100" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold">Data Layanan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Kunjungan (On/Off)</th>
                <th className="px-6 py-4">Koleksi Baru</th>
                <th className="px-6 py-4">Repo (Vis/Down)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.slice().reverse().map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{s.month} {s.year}</td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-bold">{s.onlineVisits}</span> / 
                    <span className="text-slate-500 font-medium ml-1">{s.offlineVisits}</span>
                  </td>
                  <td className="px-6 py-4">{s.collectionsAdded}</td>
                  <td className="px-6 py-4">
                    <span className="text-purple-600 font-bold">{s.repoVisits}</span> / 
                    <span className="text-emerald-600 font-bold ml-1">{s.repoDownloads}</span>
                  </td>
                </tr>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Belum ada data statistik tersedia.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-current/20`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const StatusMetric: React.FC<{ label: string; value: number; color: string; bg: string; border: string }> = ({ label, value, color, bg, border }) => (
  <div className={`${bg} ${border} border p-4 rounded-xl flex flex-col items-center justify-center text-center`}>
    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</span>
    <span className={`text-3xl font-black ${color}`}>{value}</span>
  </div>
);
