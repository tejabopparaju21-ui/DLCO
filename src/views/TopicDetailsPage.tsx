import React from 'react';
import { ArrowLeft, CheckCircle2, Clock, UploadCloud } from 'lucide-react';
import type { Topic } from '../types';
import { PresentationViewer } from '../components/PresentationViewer';
import { useAuth } from '../context/AuthContext';

interface TopicDetailsPageProps {
  topic: Topic;
  onBackToTopics: () => void;
  onNavigateToUpload: (topicId: string) => void;
}

export const TopicDetailsPage: React.FC<TopicDetailsPageProps> = ({
  topic,
  onBackToTopics,
  onNavigateToUpload
}) => {
  const { isTeacher } = useAuth();
  const hasPresentation = Boolean(topic.presentation);

  return (
    <main className="topic-details-page" id="topic-details-view">
      <div className="container">
        {/* Navigation Bar */}
        <div className="back-nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className="back-btn"
            onClick={onBackToTopics}
            id="back-to-topics-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to All Topics</span>
          </button>

          {isTeacher && (
            <button
              className="btn-secondary"
              onClick={() => onNavigateToUpload(topic.id)}
              id="faculty-manage-topic-btn"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
            >
              <UploadCloud size={15} />
              <span>{hasPresentation ? 'Replace Presentation' : 'Upload Presentation'}</span>
            </button>
          )}
        </div>

        {/* Topic Overview Banner */}
        <section className="topic-details-hero" aria-labelledby="topic-title-heading">
          <div className="topic-details-header">
            <div>
              <div className="topic-number-chip">
                <span>Topic {topic.number < 10 ? `0${topic.number}` : topic.number}</span>
                <span>•</span>
                <span>{topic.category}</span>
              </div>
              <h1 className="topic-details-title" id="topic-title-heading">
                {topic.title}
              </h1>
            </div>

            <div>
              {hasPresentation ? (
                <span className="status-badge status-badge-available" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                  <CheckCircle2 size={14} />
                  <span>Presentation Available</span>
                </span>
              ) : (
                <span className="status-badge status-badge-empty" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                  <Clock size={14} />
                  <span>Awaiting Faculty Upload</span>
                </span>
              )}
            </div>
          </div>

          <p className="topic-details-desc">{topic.summary}</p>

          {/* Key Syllabus & Architectural Concepts */}
          <div className="key-concepts-box">
            <h2 className="key-concepts-title">Key Syllabus & Architectural Concepts</h2>
            <ul className="key-concepts-list">
              {topic.keyConcepts.map((concept, index) => (
                <li key={index} className="key-concept-tag">
                  {concept}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Seminar Presentation Section */}
        <section aria-labelledby="seminar-presentation-heading" style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 id="seminar-presentation-heading" style={{ fontSize: '1.4rem', color: 'var(--navy-darkest)', background: 'rgba(255, 255, 255, 0.92)', padding: '0.4rem 1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }}>
              Curriculum Seminar Presentation
            </h2>
            {topic.presentation?.description && (
              <span style={{ fontSize: '0.85rem', color: 'var(--slate-700)', fontStyle: 'italic', background: 'rgba(255, 255, 255, 0.92)', padding: '0.4rem 0.85rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }}>
                Note: {topic.presentation.description}
              </span>
            )}
          </div>

          <PresentationViewer
            topic={topic}
            onNavigateToUpload={onNavigateToUpload}
          />
        </section>
      </div>
    </main>
  );
};
