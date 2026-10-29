import React, { useState } from 'react';
import { X, Cloud, Database, CheckCircle2, AlertTriangle } from 'lucide-react';
import { isFirebaseConfigured, getMissingFirebaseEnvKeys } from '../services/firebase';
import { storageService } from '../services/storageService';
import type { StorageConfig } from '../types';

interface FirebaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({ isOpen, onClose }) => {
  const isConfigured = isFirebaseConfigured();
  const missingKeys = getMissingFirebaseEnvKeys();

  const [apiKey, setApiKey] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyCustomConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !projectId) {
      setStatusMessage('API Key and Project ID are required.');
      return;
    }

    const config: StorageConfig = {
      apiKey,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId,
      storageBucket: storageBucket || `${projectId}.appspot.com`,
      messagingSenderId: '',
      appId: ''
    };

    const success = storageService.setCustomFirebaseConfig(config);
    if (success) {
      setStatusMessage('Firebase configuration successfully initialized!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1200);
    } else {
      setStatusMessage('Failed to initialize Firebase with provided credentials. Please check details.');
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="backend-modal-title"
    >
      <div className="modal-card" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              background: isConfigured ? '#ecfdf5' : '#eff6ff',
              color: isConfigured ? '#047857' : '#2563eb',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex'
            }}>
              {isConfigured ? <Cloud size={20} /> : <Database size={20} />}
            </div>
            <div>
              <h3 className="modal-title" id="backend-modal-title">Cloud & Storage Architecture</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Status: {isConfigured ? 'Firebase Cloud Connected' : 'Local IndexedDB Engine Active'}
              </p>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close dialog" style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {isConfigured ? (
            <div className="notification-banner success">
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Firebase Cloud Services are Fully Active!</strong>
                <p style={{ fontSize: '0.825rem', marginTop: '0.2rem' }}>
                  Authentication, Firestore topic metadata, and Cloud Storage for presentation files are connected.
                </p>
              </div>
            </div>
          ) : (
            <div className="notification-banner info">
              <Database size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Active Backend: Browser IndexedDB Storage Engine</strong>
                <p style={{ fontSize: '0.825rem', marginTop: '0.2rem' }}>
                  The application is running with full persistent local storage. Uploaded presentation files (.pdf, .pptx, .ppt) are stored as durable binary Blobs and persist across page refreshes.
                </p>
              </div>
            </div>
          )}

          {!isConfigured && missingKeys.length > 0 && (
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontWeight: 600, fontSize: '0.875rem' }}>
                <AlertTriangle size={16} />
                <span>To Connect Shared Multi-User Firebase Cloud:</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#78350f', marginTop: '0.35rem' }}>
                The following environment variables are not yet populated in your <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px' }}>.env</code> file:
              </p>
              <ul style={{ 
                margin: '0.5rem 0 0.5rem 1.25rem', 
                fontSize: '0.775rem', 
                color: '#92400e',
                fontFamily: 'var(--font-mono)' 
              }}>
                {missingKeys.map((key) => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
              <p style={{ fontSize: '0.775rem', color: '#78350f' }}>
                Refer to <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px' }}>.env.example</code>, or deploy <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px' }}>firestore.rules</code> and <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '4px' }}>storage.rules</code> to your Firebase Console.
              </p>
            </div>
          )}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.75rem' }}>
              Direct Firebase Configuration (Optional)
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1rem' }}>
              You can optionally enter your Firebase project parameters here for instant session synchronization:
            </p>

            {statusMessage && (
              <div className="notification-banner info" style={{ marginBottom: '1rem' }}>
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleApplyCustomConfig}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Firebase API Key</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..." 
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Project ID</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={projectId} 
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="dlco-academic-portal" 
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Storage Bucket</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={storageBucket} 
                  onChange={(e) => setStorageBucket(e.target.value)}
                  placeholder="dlco-academic-portal.appspot.com" 
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                  Initialize Cloud Connection
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
