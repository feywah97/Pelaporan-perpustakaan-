
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
import { ServiceStats, CollectionRequest, UserFeedback, EmailSimulation } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<EmailSimulation | null>(null);
  
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

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleUpdateRequestStatus = (id: string, status: 'approved' | 'rejected') => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));

    const simulation: EmailSimulation = {
      to: request.email || 'pemustaka@example.com',
      subject: `Update Pengajuan Koleksi: ${request.title}`,
      type: status,
      body: status === 'approved' 
        ? `Halo ${request.email.split('@')[0]},\n\nKabar gembira! Pengajuan koleksi Anda untuk judul "${request.title}" telah DISETUJUI oleh tim pustakawan.\n\nKoleksi ini akan segera kami proses untuk pengadaan. Terima kasih telah berkontribusi dalam pengayaan koleksi perpustakaan kami.`
        : `Halo ${request.email.split('@')[0]},\n\nKami telah meninjau pengajuan koleksi Anda untuk judul "${request.title}".\n\nMohon maaf, saat ini pengajuan tersebut BELUM DAPAT KAMI PROSES karena keterbatasan anggaran atau kesesuaian dengan kebijakan koleksi saat ini.\n\nTetap berikan saran koleksi lainnya di masa mendatang.`
    };

    setActiveNotification(simulation);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'service-report':
        return <ServiceReport stats={stats} isDark={theme === 'dark'} />;
      case 'form-koleksi':
        return <CollectionForm onSubmit={(data) => setRequests([...requests, data])} onBack={() => navigate('home')} />;
      case 'form-saran':
        return <FeedbackForm onSubmit={(data) => setFeedbacks([...feedbacks, data])} onBack={() => navigate('home')} />;
      case 'admin-dashboard':
        return <AdminDashboard stats={stats} requests={requests} feedbacks={feedbacks} isDark={theme === 'dark'} />;
      case 'admin-stats':
        return <AdminStatsInput onSubmit={(data) => setStats([...stats, data])} />;
      case 'admin-requests':
        return <AdminRequests requests={requests} onUpdate={handleUpdateRequestStatus} />;
      case 'admin-feedback':
        return <AdminFeedback feedbacks={feedbacks} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={navigate} 
      isAdmin={isAdmin} 
      onToggleAdmin={() => {
        setIsAdmin(!isAdmin);
        if (!isAdmin) navigate('admin-dashboard');
        else navigate('home');
      }}
      theme={theme}
      onToggleTheme={toggleTheme}
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
