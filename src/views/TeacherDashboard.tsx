import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  Trash2, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Database,
  Cloud,
  Lock,
  Layers,
  X
} from 'lucide-react';
import type { Topic } from '../types';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

interface TeacherDashboardProps {
  topics: Topic[];
  onTopicsUpdated: () => Promise<void>;
  onViewTopic: (topicId: string) => void;
  preselectedTopicId?: string | null;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  topics,
  onTopicsUpdated,
  onViewTopic,
  preselectedTopicId
}) => {
  const { user, isTeacher, openLoginModal, isFirebaseActive } = useAuth();

  // Form State
  const [selectedTopicId, setSelectedTopicId] = useState<string>(preselectedTopicId || 'topic-1');
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Deletion Confirmation Modal State
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Replacement Confirmation Modal State
  const [pendingUploadPayload, setPendingUploadPayload] = useState<{ topic: Topic; file: File; desc: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  // If not authorized, display restricted access view
  if (!isTeacher) {
    return (
      <main className="teacher-dashboard-page" id="teacher-auth-guard">
        <div className="container">
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '5rem 2rem',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '2rem auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Lock size={32} />
            </div>
            <h1 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.75rem' }}>
              Faculty Authorization Required
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              The Teacher Workspace and Presentation Management console are restricted exclusively to verified course faculty.
              Students can view and download published presentations directly in the Student Learning Area.
            </p>
            <button
              className="btn-primary"
              onClick={openLoginModal}
              id="faculty-login-guard-btn"
              style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}
            >
              <ShieldCheck size={18} />
              <span>Sign In as Course Faculty</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Calculated Real Metrics
  const totalTopics = topics.length;
  const uploadedCount = topics.filter((t) => Boolean(t.presentation)).length;
  const awaitingCount = totalTopics - uploadedCount;
  const targetTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  const handleFileSelect = (file: File) => {
    setNotification(null);
    const ext = file.name.split('.').pop()?.toLowerCase();

    // Validate format (.pdf, .pptx, .ppt)
    if (!ext || !['pdf', 'pptx', 'ppt'].includes(ext)) {
      setNotification({
        type: 'error',
        message: 'Invalid file format. Please upload a PDF (.pdf) or PowerPoint (.pptx, .ppt) document.'
      });
      setSelectedFile(null);
      return;
    }

    // Validate size (50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setNotification({
        type: 'error',
        message: `File size exceeds 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload an optimized file.`
      });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !targetTopic || !user) return;

    // If target topic already has a presentation, prompt replacement confirmation
    if (targetTopic.presentation) {
      setPendingUploadPayload({
        topic: targetTopic,
        file: selectedFile,
        desc: description
      });
      return;
    }

    await executeUpload(targetTopic.id, selectedFile, description);
  };

  const executeUpload = async (topicId: string, file: File, desc: string) => {
    if (!user) return;
    setIsUploading(true);
    setUploadProgress(10);
    setNotification(null);

    try {
      await storageService.uploadPresentation(
        topicId,
        file,
        desc,
        user,
        (progress) => setUploadProgress(progress)
      );

      await onTopicsUpdated();
      setNotification({
        type: 'success',
        message: `Successfully uploaded seminar presentation "${file.name}" for Topic ${targetTopic.number}: ${targetTopic.title}.`
      });

      // Reset form
      setSelectedFile(null);
      setDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to upload presentation. Please try again.'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setPendingUploadPayload(null);
    }
  };

  const executeDelete = async () => {
    if (!topicToDelete || !user) return;
    setIsDeleting(true);
    setNotification(null);

    try {
      await storageService.deletePresentation(topicToDelete.id, user);
      await onTopicsUpdated();
      setNotification({
        type: 'success',
        message: `Presentation for Topic ${topicToDelete.number} was deleted. Topic status is now "Awaiting Upload".`
      });
      setTopicToDelete(null);
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to delete presentation.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="teacher-dashboard-page" id="teacher-workspace-page">
      <div className="container">
        {/* Faculty Header Banner */}
        <div className="teacher-header">
          <div>
            <h1 className="teacher-header-title">Teacher Workspace</h1>
            <p className="teacher-header-sub">
              Faculty Courseware Management Portal • Logged in as: <strong>{user?.displayName || user?.email}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: isFirebaseActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.15)',
              color: isFirebaseActive ? '#86efac' : '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {isFirebaseActive ? <Cloud size={14} /> : <Database size={14} />}
              <span>{isFirebaseActive ? 'Firebase Cloud Active' : 'IndexedDB Persistence Mode'}</span>
            </span>
          </div>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className={`notification-banner ${notification.type}`} role="alert">
            {notification.type === 'success' && <CheckCircle2 size={18} style={{ flexShrink: 0 }} />}
            {notification.type === 'error' && <AlertTriangle size={18} style={{ flexShrink: 0 }} />}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              style={{ marginLeft: 'auto', color: 'inherit', padding: '2px' }}
              aria-label="Dismiss alert"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Dynamic Metric Statistics Strip */}
        <div className="teacher-stats-row">
          <div className="stat-metric-card">
            <div className="stat-metric-icon stat-icon-blue">
              <Layers size={24} />
            </div>
            <div className="stat-metric-info">
              <span className="stat-metric-number">{totalTopics}</span>
              <span className="stat-metric-title">Curriculum Topics</span>
            </div>
          </div>

          <div className="stat-metric-card">
            <div className="stat-metric-icon stat-icon-green">
              <CheckCircle2 size={24} />
            </div>
            <div className="stat-metric-info">
              <span className="stat-metric-number" style={{ color: '#047857' }}>{uploadedCount}</span>
              <span className="stat-metric-title">Presentations Active</span>
            </div>
          </div>

          <div className="stat-metric-card">
            <div className="stat-metric-icon stat-icon-amber">
              <Clock size={24} />
            </div>
            <div className="stat-metric-info">
              <span className="stat-metric-number" style={{ color: '#b45309' }}>{awaitingCount}</span>
              <span className="stat-metric-title">Pending Slides</span>
            </div>
          </div>

          <div className="stat-metric-card">
            <div className="stat-metric-icon stat-icon-purple">
              {isFirebaseActive ? <Cloud size={24} /> : <Database size={24} />}
            </div>
            <div className="stat-metric-info">
              <span className="stat-metric-number" style={{ fontSize: '1.25rem', color: '#6b21a8' }}>
                {isFirebaseActive ? 'Cloud Sync' : 'Local Storage'}
              </span>
              <span className="stat-metric-title">Backend Status</span>
            </div>
          </div>
        </div>

        {/* Upload / Replace Presentation Form Panel */}
        <section className="teacher-upload-panel" aria-labelledby="upload-section-title">
          <h2 className="panel-title" id="upload-section-title">Upload or Replace Presentation</h2>
          <p className="panel-subtitle">
            Publish official seminar slide decks (.pdf, .pptx, or .ppt) for individual curriculum topics.
          </p>

          <form onSubmit={handleFormSubmit}>
            <div className="upload-form-grid">
              {/* Left Column: Topic Selector & Notes */}
              <div>
                <div className="form-group">
                  <label className="form-label" htmlFor="topic-selector-select">
                    1. Select Curriculum Topic
                  </label>
                  <select
                    id="topic-selector-select"
                    className="form-select"
                    value={selectedTopicId}
                    onChange={(e) => {
                      setSelectedTopicId(e.target.value);
                      const t = topics.find((item) => item.id === e.target.value);
                      if (t?.presentation?.description) {
                        setDescription(t.presentation.description);
                      } else {
                        setDescription('');
                      }
                    }}
                  >
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        Topic {t.number < 10 ? `0${t.number}` : t.number}: {t.title} {t.presentation ? '✓ (Published)' : '— (Pending)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="topic-notes-textarea">
                    2. Faculty Seminar Notes / Lecture Description (Optional)
                  </label>
                  <textarea
                    id="topic-notes-textarea"
                    className="form-textarea"
                    placeholder="Enter short seminar summary, reference book chapters, or speaker instructions for students..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {targetTopic?.presentation && (
                  <div style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.825rem',
                    color: '#1e40af'
                  }}>
                    <strong>Current Active File: </strong>
                    <span>{targetTopic.presentation.fileName}</span> (Uploaded {new Date(targetTopic.presentation.uploadedAt).toLocaleDateString()})
                    <p style={{ marginTop: '0.25rem', fontSize: '0.775rem', color: '#3b82f6' }}>
                      Uploading a new file will replace this version with the newest upload.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: File Drag & Drop Zone */}
              <div>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  3. Select Presentation File (.pdf, .pptx, .ppt)
                </label>

                <div
                  className={`file-dropzone ${isDragActive ? 'drag-active' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragActive(true);
                  }}
                  onDragLeave={() => setIsDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Click or drop presentation file here"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".pdf,.pptx,.ppt,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    style={{ display: 'none' }}
                    id="faculty-file-input"
                  />

                  <UploadCloud size={40} className="dropzone-icon" />
                  <div className="dropzone-prompt">
                    Click to browse or drag & drop presentation file
                  </div>
                  <div className="dropzone-support">
                    Supported formats: PDF (.pdf) and PowerPoint (.pptx, .ppt) • Max size: 50MB
                  </div>
                </div>

                {/* Selected File Banner */}
                {selectedFile && (
                  <div className="selected-file-banner">
                    <div className="selected-file-details">
                      <FileCheck size={20} color="#2563eb" />
                      <div>
                        <div className="selected-file-name">{selectedFile.name}</div>
                        <div className="selected-file-size">
                          {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      aria-label="Remove selected file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                      <span>Uploading to course storage...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!selectedFile || isUploading}
                    id="submit-upload-presentation-btn"
                    style={{
                      opacity: !selectedFile || isUploading ? 0.6 : 1,
                      cursor: !selectedFile || isUploading ? 'not-allowed' : 'pointer',
                      padding: '0.75rem 1.5rem'
                    }}
                  >
                    <UploadCloud size={16} />
                    <span>{isUploading ? 'Uploading...' : targetTopic?.presentation ? 'Replace Presentation' : 'Upload Presentation'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Manage Presentations Table */}
        <section className="management-table-card" aria-labelledby="manage-table-heading">
          <div className="management-table-header">
            <div>
              <h2 id="manage-table-heading" style={{ fontSize: '1.3rem', color: 'var(--navy-darkest)' }}>
                Topic Presentations Directory
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Complete curriculum inventory of memory modules and uploaded files.
              </p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="presentation-table" aria-label="Curriculum Topics and Presentations Table">
              <thead>
                <tr>
                  <th scope="col">Topic #</th>
                  <th scope="col">Curriculum Title</th>
                  <th scope="col">Presentation File</th>
                  <th scope="col">Format</th>
                  <th scope="col">Status</th>
                  <th scope="col">Uploaded By</th>
                  <th scope="col">Last Modified</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((t) => {
                  const pres = t.presentation;
                  return (
                    <tr key={t.id} id={`table-row-${t.id}`}>
                      <td>
                        <span className="topic-number-badge">
                          {t.number < 10 ? `0${t.number}` : t.number}
                        </span>
                      </td>

                      <td>
                        <strong style={{ color: '#0f2744' }}>{t.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.category}</div>
                      </td>

                      <td>
                        {pres ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <FileText size={16} color="#2563eb" />
                            <span style={{ fontWeight: 500, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={pres.fileName}>
                              {pres.fileName}
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem' }}>
                            None uploaded
                          </span>
                        )}
                      </td>

                      <td>
                        {pres ? (
                          <span className={`file-type-pill pill-${pres.fileType}`}>
                            .{pres.fileType.toUpperCase()}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      <td>
                        {pres ? (
                          <span className="status-badge status-badge-available">
                            <CheckCircle2 size={12} />
                            <span>Available</span>
                          </span>
                        ) : (
                          <span className="status-badge status-badge-empty">
                            <Clock size={12} />
                            <span>Awaiting</span>
                          </span>
                        )}
                      </td>

                      <td>
                        <span style={{ fontSize: '0.825rem', color: '#475569' }}>
                          {pres?.uploadedBy || '—'}
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
                          {pres?.uploadedAt ? new Date(pres.uploadedAt).toLocaleDateString() : '—'}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          <button
                            className="btn-table-action btn-secondary"
                            onClick={() => onViewTopic(t.id)}
                            title="Inspect in Student Area"
                            id={`action-view-${t.number}`}
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </button>

                          <button
                            className="btn-table-action btn-secondary"
                            onClick={() => {
                              setSelectedTopicId(t.id);
                              window.scrollTo({ top: 300, behavior: 'smooth' });
                            }}
                            title="Select in upload form"
                            id={`action-replace-${t.number}`}
                          >
                            <RefreshCw size={14} />
                            <span>{pres ? 'Replace' : 'Upload'}</span>
                          </button>

                          {pres && (
                            <button
                              className="btn-table-action btn-danger"
                              onClick={() => setTopicToDelete(t)}
                              title="Delete presentation"
                              id={`action-delete-${t.number}`}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {topicToDelete && (
        <div 
          className="modal-backdrop" 
          onClick={() => setTopicToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex'
                }}>
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3 className="modal-title" id="delete-confirm-title">Confirm Deletion</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Topic {topicToDelete.number}: {topicToDelete.title}
                  </p>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setTopicToDelete(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Are you sure you want to delete the presentation{' '}
                <strong>"{topicToDelete.presentation?.fileName}"</strong>?
              </p>
              <p style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                This presentation will immediately become unavailable to students, and the topic status will revert to "Awaiting Upload".
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setTopicToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={executeDelete}
                disabled={isDeleting}
                id="confirm-delete-action-btn"
              >
                {isDeleting ? 'Deleting...' : 'Delete Presentation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace Confirmation Modal */}
      {pendingUploadPayload && (
        <div 
          className="modal-backdrop" 
          onClick={() => setPendingUploadPayload(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="replace-confirm-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  background: '#fffbeb',
                  color: '#b45309',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex'
                }}>
                  <RefreshCw size={20} />
                </div>
                <div>
                  <h3 className="modal-title" id="replace-confirm-title">Replace Existing Presentation?</h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Topic {pendingUploadPayload.topic.number}: {pendingUploadPayload.topic.title}
                  </p>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setPendingUploadPayload(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Topic {pendingUploadPayload.topic.number} already has an active presentation:
              </p>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.75rem',
                margin: '0.75rem 0',
                fontSize: '0.85rem'
              }}>
                <div>Current: <strong style={{ color: '#0f172a' }}>{pendingUploadPayload.topic.presentation?.fileName}</strong></div>
                <div>New: <strong style={{ color: '#2563eb' }}>{pendingUploadPayload.file.name}</strong></div>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Replacing will update the student view to the new file and discard the old version without leaving orphaned storage.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPendingUploadPayload(null)}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => executeUpload(pendingUploadPayload.topic.id, pendingUploadPayload.file, pendingUploadPayload.desc)}
                disabled={isUploading}
                id="confirm-replace-action-btn"
              >
                {isUploading ? 'Replacing...' : 'Yes, Replace File'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
