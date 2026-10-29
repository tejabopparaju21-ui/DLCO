import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  AlertCircle, 
  UploadCloud 
} from 'lucide-react';
import type { Topic } from '../types';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';

interface PresentationViewerProps {
  topic: Topic;
  onNavigateToUpload?: (topicId: string) => void;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  topic,
  onNavigateToUpload
}) => {
  const { isTeacher } = useAuth();
  const presentation = topic.presentation;

  const [activeTab, setActiveTab] = useState<'pdf' | 'slides'>('pdf');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [resolvedFileUrl, setResolvedFileUrl] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (presentation) {
      setIsLoadingFile(true);
      storageService
        .getFileObjectUrl(topic.id, presentation)
        .then((url) => {
          if (isMounted) {
            setResolvedFileUrl(url);
            setIsLoadingFile(false);
          }
        })
        .catch((err) => {
          console.error('Error resolving presentation file url:', err);
          if (isMounted) setIsLoadingFile(false);
        });

      // Default to slides view if file is PPT/PPTX since browser native PDF viewer cannot render raw PPT binaries
      if (presentation.fileType !== 'pdf') {
        setActiveTab('slides');
      } else {
        setActiveTab('pdf');
      }
    } else {
      setResolvedFileUrl('');
    }

    setCurrentSlideIndex(0);

    return () => {
      isMounted = false;
    };
  }, [topic.id, presentation]);

  // Keyboard navigation for slide deck
  useEffect(() => {
    if (activeTab !== 'slides' || !presentation?.slides || presentation.slides.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, (presentation.slides?.length || 1) - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, presentation]);

  // Empty state when no presentation has been uploaded
  if (!presentation) {
    return (
      <div className="presentation-empty-state" role="status" aria-live="polite">
        <div className="empty-state-icon-wrap">
          <Presentation size={36} />
        </div>
        <h3 className="empty-state-title">No Presentation Uploaded Yet</h3>
        <p className="empty-state-desc">
          The course instructor has not yet published the seminar presentation for{' '}
          <strong>Topic {topic.number}: {topic.title}</strong>. 
          When uploaded, official slides and downloadable decks will appear here automatically.
        </p>

        {isTeacher ? (
          <button
            className="btn-primary"
            onClick={() => onNavigateToUpload && onNavigateToUpload(topic.id)}
            id="empty-state-upload-btn"
          >
            <UploadCloud size={16} />
            <span>Upload Topic {topic.number} Presentation</span>
          </button>
        ) : (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#f1f5f9',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#64748b'
          }}>
            <AlertCircle size={15} />
            <span>Students: Check back following upcoming classroom lectures.</span>
          </div>
        )}
      </div>
    );
  }

  const slides = presentation.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const isPdf = presentation.fileType === 'pdf';

  return (
    <div className="presentation-viewer-container" id="presentation-viewer">
      {/* Viewer Header / Toolbar */}
      <div className="presentation-toolbar">
        <div className="toolbar-file-info">
          <div style={{
            background: isPdf ? '#dc2626' : '#ea580c',
            color: '#fff',
            padding: '6px 8px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)'
          }}>
            {presentation.fileType.toUpperCase()}
          </div>
          <div>
            <div className="toolbar-file-name">{presentation.fileName}</div>
            <div className="toolbar-meta">
              <span>{Math.round(presentation.fileSize / 1024)} KB</span>
              <span style={{ margin: '0 6px' }}>•</span>
              <span>Uploaded {new Date(presentation.uploadedAt).toLocaleDateString()}</span>
              {presentation.uploadedBy && (
                <>
                  <span style={{ margin: '0 6px' }}>•</span>
                  <span>{presentation.uploadedBy}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Tabs and Download Action */}
        <div className="toolbar-actions">
          {isPdf && (
            <button
              className={`viewer-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveTab('pdf')}
              id="tab-pdf-viewer"
            >
              <FileText size={15} />
              <span>PDF Viewer</span>
            </button>
          )}

          {slides.length > 0 && (
            <button
              className={`viewer-tab-btn ${activeTab === 'slides' ? 'active' : ''}`}
              onClick={() => setActiveTab('slides')}
              id="tab-slides-viewer"
            >
              <Presentation size={15} />
              <span>Interactive Slides ({slides.length})</span>
            </button>
          )}

          {resolvedFileUrl && (
            <a
              href={resolvedFileUrl}
              download={presentation.fileName}
              className="btn-download-deck"
              id="download-presentation-btn"
              title="Download presentation to your device"
            >
              <Download size={15} />
              <span>Download File</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Presentation Body */}
      {isLoadingFile ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
          <p>Loading course presentation...</p>
        </div>
      ) : activeTab === 'pdf' && isPdf ? (
        /* PDF In-Page Native Viewer with Fallback */
        <div className="pdf-embed-wrapper">
          <object
            data={resolvedFileUrl}
            type="application/pdf"
            className="pdf-embed-frame"
            aria-label={`${presentation.fileName} PDF Preview`}
          >
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem', color: '#475569' }}>
                Your browser is unable to display this PDF directly inside the frame.
              </p>
              <a
                href={resolvedFileUrl}
                download={presentation.fileName}
                className="btn-primary"
              >
                <Download size={16} />
                <span>Download {presentation.fileName}</span>
              </a>
            </div>
          </object>
        </div>
      ) : (
        /* Interactive Seminar Slide Deck Viewer */
        <div className="slide-deck-viewer">
          {slides.length > 0 && currentSlide ? (
            <div className="slide-canvas">
              <div className="slide-canvas-header">
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    Topic {topic.number}: {topic.title}
                  </span>
                </div>
                <div className="slide-number-indicator">
                  Slide {currentSlideIndex + 1} of {slides.length}
                </div>
              </div>

              <h2 className="slide-canvas-title">{currentSlide.title}</h2>

              <ul className="slide-bullet-list">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              {currentSlide.speakerNotes && (
                <div className="slide-speaker-notes">
                  <strong style={{ color: '#0f2744' }}>Speaker Notes / Faculty Insight: </strong>
                  <span>{currentSlide.speakerNotes}</span>
                </div>
              )}

              {/* Slide Deck Navigation Buttons */}
              <div className="slide-deck-controls">
                <button
                  className="btn-secondary"
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentSlideIndex === 0}
                  id="slide-prev-btn"
                  style={{
                    opacity: currentSlideIndex === 0 ? 0.5 : 1,
                    cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous Slide</span>
                </button>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        border: 'none',
                        background: i === currentSlideIndex ? 'var(--royal-blue)' : '#cbd5e1',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    />
                  ))}
                </div>

                <button
                  className="btn-primary"
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  id="slide-next-btn"
                  style={{
                    opacity: currentSlideIndex === slides.length - 1 ? 0.5 : 1,
                    cursor: currentSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>Next Slide</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                This presentation file ({presentation.fileName}) is ready for download.
              </p>
              {resolvedFileUrl && (
                <a
                  href={resolvedFileUrl}
                  download={presentation.fileName}
                  className="btn-primary"
                >
                  <Download size={16} />
                  <span>Download Presentation Deck</span>
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
