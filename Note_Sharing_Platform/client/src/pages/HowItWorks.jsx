import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <main className="simple">
      <div className="eyebrow">
        <span className="dot"></span>
        How it works
      </div>

      <h1>Collaborative learning in three simple steps</h1>

      <p className="sub">
        From sign-up to your first download, NoteFi is built to get
        out of your way.
      </p>

      <div className="steps">
        <div className="step">
          <div className="step-num">1</div>
          <h3>Create an account</h3>
          <p>Sign up in seconds. All you need is an email to join NoteFi.</p>
        </div>

        <div className="step-arrow">
          <svg viewBox="0 0 40 24" fill="none">
            <path d="M2 12h32m0 0l-7-5m7 5l-7 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="step">
          <div className="step-num">2</div>
          <h3>Upload your notes</h3>
          <p>Select a subject, write a brief description, and drag-and-drop your study file.</p>
        </div>

        <div className="step-arrow">
          <svg viewBox="0 0 40 24" fill="none">
            <path d="M2 12h32m0 0l-7-5m7 5l-7 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="step">
          <div className="step-num">3</div>
          <h3>Download and learn</h3>
          <p>Browse notes uploaded by other students, download study aids, and review them.</p>
        </div>
      </div>

      <div className="cta-wrap">
        <Link to="/register" className="btn-primary">Get started now</Link>
      </div>
    </main>
  );
}

export default HowItWorks;
