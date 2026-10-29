import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  Cpu, 
  HardDrive, 
  Database,
  Sliders,
  Gauge
} from 'lucide-react';
import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onSelectTopic: (topicId: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelectTopic }) => {
  const hasPresentation = Boolean(topic.presentation);

  // Return a contextual icon matching the topic's subject
  const getTopicIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Layers size={18} />;
      case 2:
      case 3:
      case 4:
        return <Cpu size={18} />;
      case 5:
        return <HardDrive size={18} />;
      case 6:
      case 7:
      case 8:
        return <Database size={18} />;
      case 9:
      case 10:
        return <Sliders size={18} />;
      case 11:
      case 12:
      default:
        return <Gauge size={18} />;
    }
  };

  return (
    <div 
      className={`topic-card ${hasPresentation ? 'has-presentation' : ''}`}
      id={`topic-card-${topic.number}`}
    >
      <div className="topic-card-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="topic-number-badge">
            Topic {topic.number < 10 ? `0${topic.number}` : topic.number}
          </span>
          <span style={{ color: hasPresentation ? '#2563eb' : '#64748b' }}>
            {getTopicIcon(topic.number)}
          </span>
        </div>

        {hasPresentation ? (
          <span className="status-badge status-badge-available">
            <CheckCircle2 size={12} />
            <span>Presentation Available</span>
          </span>
        ) : (
          <span className="status-badge status-badge-empty">
            <Clock size={12} />
            <span>Awaiting Upload</span>
          </span>
        )}
      </div>

      <h3 className="topic-card-title">{topic.title}</h3>
      <span className="topic-card-category">{topic.category}</span>
      <p className="topic-card-summary">{topic.summary}</p>

      <div className="topic-card-footer">
        <div>
          {hasPresentation && topic.presentation ? (
            <span className={`file-type-pill pill-${topic.presentation.fileType}`}>
              .{topic.presentation.fileType.toUpperCase()}
            </span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Pending Seminar Slides
            </span>
          )}
        </div>

        <button
          className={hasPresentation ? 'btn-primary' : 'btn-secondary'}
          onClick={() => onSelectTopic(topic.id)}
          id={`view-topic-btn-${topic.number}`}
          style={{
            fontSize: '0.825rem',
            padding: '0.45rem 0.85rem'
          }}
        >
          <span>{hasPresentation ? 'View Presentation' : 'Inspect Topic'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
