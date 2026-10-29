import React from 'react';
import { Cpu, BookOpen, ShieldCheck, LogIn, LogOut, Database, Cloud } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: 'home' | 'student' | 'teacher' | 'topic-detail';
  onNavigate: (view: 'home' | 'student' | 'teacher') => void;
  onOpenFirebaseModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenFirebaseModal
}) => {
  const { user, isTeacher, logout, openLoginModal, isFirebaseActive } = useAuth();

  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="header-inner">
          {/* Logo and Academic Brand */}
          <button 
            className="brand-wrapper" 
            onClick={() => onNavigate('home')}
            aria-label="DLCO Home"
          >
            <div className="brand-logo-icon">
              <Cpu size={26} strokeWidth={2.2} />
            </div>
            <div className="brand-titles">
              <span className="brand-main-title">Digital Logic and Computer Organization</span>
              <span className="brand-subtitle">Interactive Learning and Presentation Portal</span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="site-nav" role="navigation" aria-label="Main Navigation">
            <button
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
              id="nav-home-btn"
            >
              Home
            </button>

            <button
              className={`nav-link-btn ${currentView === 'student' || currentView === 'topic-detail' ? 'active' : ''}`}
              onClick={() => onNavigate('student')}
              id="nav-student-btn"
            >
              <BookOpen size={16} />
              <span>Student Area</span>
            </button>

            <button
              className={`nav-link-btn ${currentView === 'teacher' ? 'active' : ''}`}
              onClick={() => {
                if (!isTeacher) {
                  openLoginModal();
                } else {
                  onNavigate('teacher');
                }
              }}
              id="nav-teacher-btn"
            >
              <ShieldCheck size={16} />
              <span>Teacher Workspace</span>
            </button>

            {/* Storage Backend Indicator Pill */}
            <button
              className="btn-ghost"
              onClick={onOpenFirebaseModal}
              title={isFirebaseActive ? 'Connected to Firebase Cloud' : 'Running in Local Storage (IndexedDB)'}
              style={{
                fontSize: '0.78rem',
                border: '1px solid rgba(255,255,255,0.2)',
                color: isFirebaseActive ? '#86efac' : '#93c5fd',
                padding: '0.35rem 0.65rem'
              }}
            >
              {isFirebaseActive ? <Cloud size={14} /> : <Database size={14} />}
              <span>{isFirebaseActive ? 'Firebase' : 'Local DB'}</span>
            </button>

            {/* Auth Actions */}
            {isTeacher ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span 
                  style={{ 
                    fontSize: '0.825rem', 
                    color: '#93c5fd', 
                    fontWeight: 600,
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={user?.displayName || user?.email}
                >
                  {user?.displayName || 'Faculty'}
                </span>
                <button
                  className="btn-danger"
                  onClick={logout}
                  title="Sign out of teacher workspace"
                  id="nav-logout-btn"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                className="btn-primary"
                onClick={openLoginModal}
                id="nav-login-btn"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
              >
                <LogIn size={15} />
                <span>Faculty Login</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
