import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './views/HomePage';
import { StudentDashboard } from './views/StudentDashboard';
import { TopicDetailsPage } from './views/TopicDetailsPage';
import { TeacherDashboard } from './views/TeacherDashboard';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import type { Topic } from './types';
import { storageService } from './services/storageService';

type ViewMode = 'home' | 'student' | 'teacher' | 'topic-detail';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [teacherPreselectedTopicId, setTeacherPreselectedTopicId] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState<boolean>(false);

  // Load and refresh topics from persistent storage
  const loadTopics = useCallback(async () => {
    try {
      const data = await storageService.getAllTopics();
      setTopics(data);
    } catch (err) {
      console.error('Failed to load DLCO topics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedTopicId]);

  const handleNavigate = (view: 'home' | 'student' | 'teacher') => {
    setCurrentView(view);
    if (view !== 'teacher') {
      setTeacherPreselectedTopicId(null);
    }
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('topic-detail');
  };

  const handleBackToTopics = () => {
    setSelectedTopicId(null);
    setCurrentView('student');
  };

  const handleNavigateToUpload = (topicId: string) => {
    setTeacherPreselectedTopicId(topicId);
    setCurrentView('teacher');
  };

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  return (
    <div className="app-container">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
      />

      {isLoading ? (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          color: '#0f2744'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #bfdbfe',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontWeight: 600 }}>Initializing DLCO Courseware Portal...</p>
        </div>
      ) : (
        <>
          {currentView === 'home' && (
            <HomePage
              onNavigateToStudent={() => handleNavigate('student')}
              onNavigateToTeacher={() => handleNavigate('teacher')}
            />
          )}

          {currentView === 'student' && (
            <StudentDashboard
              topics={topics}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {currentView === 'topic-detail' && activeTopic && (
            <TopicDetailsPage
              topic={activeTopic}
              onBackToTopics={handleBackToTopics}
              onNavigateToUpload={handleNavigateToUpload}
            />
          )}

          {currentView === 'teacher' && (
            <TeacherDashboard
              topics={topics}
              onTopicsUpdated={loadTopics}
              onViewTopic={handleSelectTopic}
              preselectedTopicId={teacherPreselectedTopicId}
            />
          )}
        </>
      )}

      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <TeacherLoginModal />
      <FirebaseConfigModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
