
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CollectionForm } from './pages/CollectionForm';
import { FeedbackForm } from './pages/FeedbackForm';
import { ServiceReport } from './pages/ServiceReport';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStatsInput } from './pages/admin/AdminStatsInput';
import { AdminRequests } from './pages/admin/AdminRequests';
import { AdminFeedback } from './pages/admin/AdminFeedback';
import { EmailSimulationModal } from './components/EmailSimulationModal';
import { ServiceStats, CollectionRequest, UserFeedback, EmailSimulation, ToastMessage } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<EmailSimulation | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [stats, setStats] = useState<ServiceStats[]>(() => {
    const saved = localStorage.getItem('library_stats');
    return saved ? JSON.parse(saved) : [];
  });

  const [requests, setRequests] = useState<CollectionRequest[]>(() => {
    const saved = localStorage.getItem('library_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => {
    const saved = localStorage.getItem('library_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('library_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('library_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('library_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleUpdateRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Status pengajuan "${request.title}" diperbarui.`, 'info');

    const simulation: EmailSimulation = {
      to: request.email || 'pemustaka@example.com',
      subject: `Update Pengajuan Koleksi: ${request.title}`,
      type: status,
      body: status === 'approved' 
        ? `Halo,\n\nKabar gembira! Pengajuan koleksi Anda untuk judul "${request.title}" telah DISETUJUI.\n\nTim kami akan segera memproses pengadaannya.`
        : `Halo,\n\nMohon maaf, pengajuan untuk "${request.title}" belum dapat kami setujui saat ini karena kebijakan koleksi.`
    };

    setActiveNotification(simulation);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} stats={stats} />;
      case 'service-report':
        return <ServiceReport stats={stats} isDark={theme === 'dark'} />;
      case 'form-koleksi':
        return <CollectionForm onSubmit={(data) => {
          setRequests([...requests, data]);
          showToast("Pengajuan koleksi berhasil dikirim!");
        }} onBack={() => setCurrentPage('home')} />;
      case 'form-saran':
        return <FeedbackForm onSubmit={(data) => {
          setFeedbacks([...feedbacks, data]);
          showToast("Terima kasih atas saran Anda!");
        }} onBack={() => setCurrentPage('home')} />;
      case 'admin-dashboard':
        return <AdminDashboard stats={stats} requests={requests} feedbacks={feedbacks} isDark={theme === 'dark'} />;
      case 'admin-stats':
        return <AdminStatsInput onSubmit={(data) => {
          setStats([...stats, data]);
          showToast("Data statistik periode berhasil disimpan!");
        }} />;
      case 'admin-requests':
        return <AdminRequests requests={requests} onUpdate={handleUpdateRequestStatus} />;
      case 'admin-feedback':
        return <AdminFeedback feedbacks={feedbacks} />;
      default:
        return <Home onNavigate={setCurrentPage} stats={stats} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage} 
      isAdmin={isAdmin} 
      onToggleAdmin={() => {
        setIsAdmin(!isAdmin);
        setCurrentPage(isAdmin ? 'home' : 'admin-dashboard');
      }}
      theme={theme}
      onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      toasts={toasts}
      onCloseToast={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
    >
      {renderContent()}
      <EmailSimulationModal 
        email={activeNotification} 
        onClose={() => setActiveNotification(null)} 
      />
    </Layout>
  );
};

export default App;
