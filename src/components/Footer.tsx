import React from 'react';
import { Cpu, ShieldCheck, BookOpen, Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'student' | 'teacher') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                background: '#2563eb',
                color: '#fff',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={18} />
              </div>
              <h3 className="footer-brand-title">Digital Logic and Computer Organization</h3>
            </div>
            <p className="footer-brand-sub">Interactive Learning and Presentation Portal</p>
            <p className="footer-desc">
              Dedicated academic courseware platform for undergraduate engineering students and faculty.
              Providing verified seminar slide decks, memory organization architectures, and pedagogical notes.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Academic Modules</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  onClick={() => onNavigate('student')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Memory Hierarchy (Topic 01)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('student')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Cache Memory Architecture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('student')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  Virtual Memory & Paging
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('student')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  Replacement Algorithms
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Faculty & Portals</h4>
            <ul className="footer-links-list">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  Portal Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('student')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  Student Learning Area
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('teacher')}
                  style={{ color: 'inherit', textAlign: 'left', font: 'inherit' }}
                >
                  <ShieldCheck size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  Faculty Presentation Manager
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Digital Logic and Computer Organization. All academic rights reserved.</p>
          <p style={{ color: '#64748b' }}>Curriculum Standard: Computer Science & Engineering (DLCO-CS301)</p>
        </div>
      </div>
    </footer>
  );
};
