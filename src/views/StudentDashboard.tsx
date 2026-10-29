import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Clock } from 'lucide-react';
import type { Topic } from '../types';
import { TopicCard } from '../components/TopicCard';

interface StudentDashboardProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ topics, onSelectTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'available' | 'awaiting'>('all');

  const totalTopics = topics.length;
  const availableCount = topics.filter((t) => Boolean(t.presentation)).length;
  const awaitingCount = totalTopics - availableCount;

  // Filter topics while preserving exact numeric order
  const filteredTopics = useMemo(() => {
    return topics
      .filter((topic) => {
        // Search filter
        const matchesQuery =
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.number.toString() === searchQuery.trim();

        if (!matchesQuery) return false;

        // Availability filter
        if (filterMode === 'available') return Boolean(topic.presentation);
        if (filterMode === 'awaiting') return !topic.presentation;
        return true;
      })
      .sort((a, b) => a.number - b.number);
  }, [topics, searchQuery, filterMode]);

  return (
    <main className="student-dashboard-page" id="student-learning-area">
      <div className="container">
        {/* Academic Header Banner */}
        <div className="dashboard-header-card">
          <div className="dashboard-title-area">
            <span className="dashboard-kicker">Student Learning Area</span>
            <h1 className="dashboard-title">Memory Unit Topics</h1>
            <p className="dashboard-instructions">
              Explore all 12 curriculum topics in sequence. Select any topic card below to study core concepts,
              inspect syllabus architectures, and view verified seminar presentations.
            </p>
          </div>

          <div className="dashboard-stats-strip">
            <div className="stat-pill">
              <span className="stat-pill-val">{totalTopics}</span>
              <span className="stat-pill-lbl">Total Modules</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-val" style={{ color: '#86efac' }}>{availableCount}</span>
              <span className="stat-pill-lbl">Available</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-val" style={{ color: '#fde68a' }}>{awaitingCount}</span>
              <span className="stat-pill-lbl">Awaiting</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-search-bar" role="search">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search topics by title, keyword, or number (e.g. Cache, RAM, 01)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search memory topics"
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Filter topics by availability">
            <button
              className={`filter-btn ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => setFilterMode('all')}
              id="filter-all-btn"
            >
              All Topics ({totalTopics})
            </button>
            <button
              className={`filter-btn ${filterMode === 'available' ? 'active' : ''}`}
              onClick={() => setFilterMode('available')}
              id="filter-available-btn"
            >
              <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Available ({availableCount})
            </button>
            <button
              className={`filter-btn ${filterMode === 'awaiting' ? 'active' : ''}`}
              onClick={() => setFilterMode('awaiting')}
              id="filter-awaiting-btn"
            >
              <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Awaiting ({awaitingCount})
            </button>
          </div>
        </div>

        {/* Topic Cards Responsive Grid */}
        {filteredTopics.length > 0 ? (
          <div className="topics-grid" role="list">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelectTopic={onSelectTopic}
              />
            ))}
          </div>
        ) : (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '1rem' }}>
              No memory topics match your search query: "{searchQuery}".
            </p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setFilterMode('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
