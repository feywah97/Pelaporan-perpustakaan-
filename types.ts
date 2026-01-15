
export interface ServiceStats {
  id: string;
  month: string;
  year: number;
  onlineVisits: number;
  offlineVisits: number;
  collectionsAdded: number;
  repoVisits: number;
  repoDownloads: number;
  timestamp: number;
}

export interface CollectionRequest {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  year: number;
  quantity: number;
  reason: string;
  email: string; // Added for notification
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface UserFeedback {
  id: string;
  name: string;
  institution: string;
  phone: string;
  content: string;
  date: string;
}

export type ViewType = 'user' | 'admin';

export interface EmailSimulation {
  to: string;
  subject: string;
  body: string;
  type: 'approved' | 'rejected';
}
