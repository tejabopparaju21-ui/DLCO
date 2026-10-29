import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Layers, Cpu, HardDrive, Database, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeroSectionProps {
  onExploreTopics: () => void;
  onOpenTeacherDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTopics,
  onOpenTeacherDashboard
}) => {
  const { isTeacher, openLoginModal } = useAuth();
  const [activeTier, setActiveTier] = useState<number>(1);

  const tiers = [
    {
      id: 0,
      name: 'CPU Registers',
      latency: '0.25 - 0.5 ns',
      capacity: '64 - 128 Words',
      tech: 'Static CMOS Flip-Flops',
      class: 'tier-1',
      icon: <Zap size={14} />
    },
    {
      id: 1,
      name: 'L1 / L2 / L3 Cache',
      latency: '0.5 - 20 ns',
      capacity: '64 KB - 32 MB',
      tech: 'On-Die SRAM (6T Cells)',
      class: 'tier-2',
      icon: <Layers size={14} />
    },
    {
      id: 2,
      name: 'Main Memory (RAM)',
      latency: '50 - 80 ns',
      capacity: '8 GB - 64 GB',
      tech: 'Synchronous DRAM (1T-1C)',
      class: 'tier-3',
      icon: <Cpu size={14} />
    },
    {
      id: 3,
      name: 'Secondary Storage',
      latency: '10 µs - 10 ms',
      capacity: '512 GB - 4 TB',
      tech: 'NVMe Flash SSD / Magnetic HDD',
      class: 'tier-4',
      icon: <HardDrive size={14} />
    }
  ];

  return (
    <section className="hero-section" aria-labelledby="hero-main-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headlines & CTA */}
          <div>
            <div className="hero-badge">
              <Layers size={14} />
              <span>Computer Architecture & Engineering Courseware</span>
            </div>

            <h1 className="hero-headline" id="hero-main-heading">
              Learn. Understand. <span className="hero-headline-accent">Present.</span>
            </h1>

            <p className="hero-description">
              Explore the fundamental principles of computer memory hierarchy, internal chip organization,
              cache mapping, and system performance. Access verified, curriculum-aligned seminar presentations
              tailored for engineering students and faculty.
            </p>

            <div className="hero-actions">
              <button
                className="btn-primary hero-btn-large"
                onClick={onExploreTopics}
                id="hero-explore-btn"
              >
                <span>Explore Topics</span>
                <ArrowRight size={18} />
              </button>

              {isTeacher ? (
                <button
                  className="hero-btn-secondary"
                  onClick={onOpenTeacherDashboard}
                  id="hero-teacher-dash-btn"
                >
                  <ShieldCheck size={18} />
                  <span>Teacher Dashboard</span>
                </button>
              ) : (
                <button
                  className="hero-btn-secondary"
                  onClick={openLoginModal}
                  id="hero-faculty-entry-btn"
                >
                  <ShieldCheck size={18} />
                  <span>Faculty Workspace</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Memory Pyramid Graphic */}
          <div>
            <div className="hero-visual-card">
              <div className="visual-pyramid-header">
                <span className="visual-pyramid-title">
                  <Database size={18} style={{ color: '#60a5fa' }} />
                  <span>Memory Hierarchy Subsystem</span>
                </span>
                <span className="visual-pyramid-tag">Interactive Model</span>
              </div>

              <div className="pyramid-tiers">
                {tiers.map((t) => (
                  <div
                    key={t.id}
                    className={`pyramid-tier ${t.class}`}
                    style={{
                      cursor: 'pointer',
                      transform: activeTier === t.id ? 'scale(1.02)' : 'scale(1)',
                      outline: activeTier === t.id ? '2px solid #60a5fa' : 'none'
                    }}
                    onMouseEnter={() => setActiveTier(t.id)}
                    onClick={() => setActiveTier(t.id)}
                  >
                    <div className="tier-label">
                      {t.icon}
                      <span>{t.name}</span>
                    </div>
                    <span className="tier-metric">{t.latency}</span>
                  </div>
                ))}
              </div>

              {/* Active Tier Technical Detail Callout */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem 1rem',
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                fontSize: '0.75rem',
                color: '#cbd5e1'
              }}>
                <div>
                  <span style={{ color: '#93c5fd', display: 'block', fontWeight: 600 }}>Level</span>
                  <span>{tiers[activeTier].name}</span>
                </div>
                <div>
                  <span style={{ color: '#93c5fd', display: 'block', fontWeight: 600 }}>Capacity</span>
                  <span>{tiers[activeTier].capacity}</span>
                </div>
                <div>
                  <span style={{ color: '#93c5fd', display: 'block', fontWeight: 600 }}>Technology</span>
                  <span>{tiers[activeTier].tech}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
