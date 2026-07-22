import { Link } from 'react-router-dom'

function Landing() {
  const username = localStorage.getItem('username');

  return (
    <div className="hero">
      {/* Left Column: Hero Text */}
      <div>
        <div className="eyebrow">
          <span className="dot"></span>
          Trusted by 12,000+ students
        </div>

        <h1>
          Share notes.<br />
          Learn <span className="mark">together.</span>
        </h1>

        <p className="sub">
          NoteFi is a collaborative platform where students and professionals
          upload, share, and discover notes — organized by subject, topic,
          and institution.
        </p>

        <div className="cta-row">
          {username ? (
            <>
              <Link to="/home" className="btn-primary">Go to Dashboard</Link>
              <Link to="/contact" className="btn-secondary">Contact us</Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn-hero">Get started</Link>
              <Link to="/contact" className="btn-secondary">Contact us</Link>
              <Link to="/login" className="login-link">I already have an account</Link>
            </>
          )}
        </div>
      </div>

      {/* Right Column: Recently Shared Card */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">Recently shared</span>
          <span className="panel-live">
            <span className="dot"></span> Live
          </span>
        </div>

        <div className="note-item">
          <div className="note-icon icon-blue">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#3D5AF1" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M15 2v5h5" stroke="#3D5AF1" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="note-name">Data Structures — Unit 3</div>
            <div className="note-meta">PDF · Shared by student</div>
          </div>
        </div>

        <div className="note-item">
          <div className="note-icon icon-green">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#1F9D6E" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M15 2v5h5" stroke="#1F9D6E" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="note-name">Thermodynamics notes</div>
            <div className="note-meta">PDF · Shared by student</div>
          </div>
        </div>

        <div className="note-item">
          <div className="note-icon icon-amber">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#D97706" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M15 2v5h5" stroke="#D97706" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="note-name">Operating Systems Q&A</div>
            <div className="note-meta">PDF · Shared by student</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
