import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TeacherLoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    loginAsTeacher,
    authError,
    clearAuthError,
    isFirebaseActive
  } = useAuth();

  const [email, setEmail] = useState('faculty@dlco.edu');
  const [password, setPassword] = useState('Faculty@2026');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      await loginAsTeacher(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={closeLoginModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: '#eff6ff',
              color: '#2563eb',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex'
            }}>
              <Lock size={20} />
            </div>
            <div>
              <h3 className="modal-title" id="teacher-modal-title">Faculty Authorization</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {isFirebaseActive ? 'Authenticated via Firebase Auth' : 'Institutional Faculty Access'}
              </p>
            </div>
          </div>
          <button 
            className="btn-ghost" 
            onClick={closeLoginModal} 
            aria-label="Close dialog"
            style={{ padding: '0.4rem' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {authError && (
              <div className="notification-banner error">
                <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="faculty-email-input">
                Faculty Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={18} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: '#94a3b8' 
                  }} 
                />
                <input
                  id="faculty-email-input"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (authError) clearAuthError();
                  }}
                  placeholder="e.g. faculty@dlco.edu"
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="faculty-password-input">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <KeyRound 
                  size={18} 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: '#94a3b8' 
                  }} 
                />
                <input
                  id="faculty-password-input"
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError) clearAuthError();
                  }}
                  placeholder="Enter faculty password"
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.8rem',
              color: '#475569',
              marginTop: '1.25rem'
            }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.25rem' }}>
                Verified Faculty Test Credentials:
              </strong>
              <div>Email: <code style={{ color: '#2563eb', fontWeight: 600 }}>faculty@dlco.edu</code></div>
              <div>Password: <code style={{ color: '#2563eb', fontWeight: 600 }}>Faculty@2026</code></div>
              <p style={{ marginTop: '0.35rem', color: '#64748b' }}>
                Only authorized faculty members can upload, replace, or delete seminar presentation files.
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={closeLoginModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              id="faculty-submit-login-btn"
            >
              {isSubmitting ? 'Authenticating...' : 'Enter Faculty Workspace'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
