import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PortalEntriesProps {
  onOpenStudentPortal: () => void;
  onOpenTeacherDashboard: () => void;
}

export const PortalEntries: React.FC<PortalEntriesProps> = ({
  onOpenStudentPortal,
  onOpenTeacherDashboard
}) => {
  const { isTeacher, openLoginModal } = useAuth();

  return (
    <>
      {/* Two Visually Distinct Portal Entry Cards */}
      <section className="portal-entries-section" aria-labelledby="portal-entries-title">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-kicker">Academic Portals</span>
            <h2 className="section-title" id="portal-entries-title">Choose Your Learning Pathway</h2>
            <p className="section-subtitle">
              Tailored workspaces engineered specifically for engineering students studying DLCO and faculty managing course curriculum.
            </p>
          </div>

          <div className="portal-cards-grid">
            {/* Student Learning Area Card */}
            <div className="portal-entry-card portal-card-student">
              <div className="portal-card-icon-wrap">
                <GraduationCap size={32} />
              </div>

              <h3 className="portal-card-title">Student Learning Area</h3>
              <p className="portal-card-desc">
                Browse all 12 memory organization modules in curriculum sequence. Read architectural summaries,
                inspect syllabus objectives, view seminar presentations in-browser, and download verified slide decks.
              </p>

              <ul className="portal-card-features">
                <li>
                  <CheckCircle2 size={16} />
                  <span>Access all 12 memory organization seminar topics</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>In-page PDF viewer with native zoom, scroll & page controls</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Interactive slide deck player with key speaker notes</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Direct download for offline study in .pdf and .pptx formats</span>
                </li>
              </ul>

              <button
                className="btn-primary"
                onClick={onOpenStudentPortal}
                id="portal-student-entry-btn"
                style={{ width: '100%' }}
              >
                <span>Enter Student Learning Area</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Teacher Workspace Card */}
            <div className="portal-entry-card portal-card-teacher">
              <div className="portal-card-icon-wrap">
                <ShieldCheck size={32} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h3 className="portal-card-title" style={{ margin: 0 }}>Teacher Workspace</h3>
                {isTeacher ? (
                  <span className="status-badge status-badge-available">
                    <CheckCircle2 size={12} />
                    <span>Authorized</span>
                  </span>
                ) : (
                  <span className="status-badge status-badge-empty">
                    <Lock size={12} />
                    <span>Faculty Verification Required</span>
                  </span>
                )}
              </div>

              <p className="portal-card-desc">
                Manage curriculum courseware for every memory unit. Authorized professors can upload new presentations,
                replace existing course materials, provide lecture summaries, and manage file lifecycle with backend verification.
              </p>

              <ul className="portal-card-features">
                <li>
                  <CheckCircle2 size={16} />
                  <span>Multi-format support for .pdf, .pptx, and .ppt presentations</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Replace or update seminar slides with instant versioning</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Clean deletion safeguards with zero orphaned storage</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Cloud persistence via Firebase Storage & Firestore rules</span>
                </li>
              </ul>

              {isTeacher ? (
                <button
                  className="btn-secondary"
                  onClick={onOpenTeacherDashboard}
                  id="portal-teacher-entry-btn"
                  style={{ width: '100%', borderColor: 'var(--navy-primary)' }}
                >
                  <ShieldCheck size={18} />
                  <span>Open Teacher Dashboard</span>
                </button>
              ) : (
                <button
                  className="btn-secondary"
                  onClick={openLoginModal}
                  id="portal-teacher-login-btn"
                  style={{ width: '100%' }}
                >
                  <Lock size={18} />
                  <span>Verify Faculty Access</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" aria-labelledby="how-it-works-title">
        <div className="container">
          <div className="section-header-centered" style={{ marginBottom: '2.5rem' }}>
            <span className="section-kicker">Course Architecture</span>
            <h2 className="section-title" id="how-it-works-title">How The Portal Works</h2>
            <p className="section-subtitle">
              Structured academic workflow designed to support undergraduate classroom seminars and self-paced revision.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Select Module</h3>
              <p className="step-desc">
                Explore the 12 memory topics spanning hierarchy, RAM/ROM organization, cache mapping, virtual paging, and performance metrics.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Inspect & Present</h3>
              <p className="step-desc">
                View verified seminar slides directly within the browser using the integrated PDF viewer or slide presenter with speaker notes.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Faculty Managed</h3>
              <p className="step-desc">
                Department instructors upload official slides, replace revisions, and maintain synchronization between classroom lectures and digital archives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
