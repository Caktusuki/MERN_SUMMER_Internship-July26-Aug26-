import { Link } from 'react-router-dom';

function Premium() {
  return (
    <main className="simple">
      <div className="eyebrow">
        <span className="dot"></span>
        Premium
      </div>

      <h1>Take your studies further</h1>

      <p className="sub">
        Start free. Upgrade whenever unlimited downloads and
        priority processing start to matter.
      </p>

      <div className="plans">
        {/* Free Plan */}
        <div className="plan-card">
          <div className="plan-card-top">
            <h2 className="plan-card-name">Free</h2>
            <p className="plan-card-desc">Good for getting started.</p>
            <div className="plan-card-price">
              <span className="plan-card-amount">$0</span>
              <span className="plan-card-period">/ month</span>
            </div>
          </div>

          <ul className="plan-card-features">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              5 downloads a month
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Standard upload speed
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Browse peer reviews
            </li>
          </ul>

          <Link to="/register" className="plan-card-btn">Continue free</Link>
        </div>

        {/* Pro Plan */}
        <div className="plan-card plan-card--featured">
          <div className="plan-card-badge">Best value</div>
          <div className="plan-card-top">
            <h2 className="plan-card-name">Pro</h2>
            <p className="plan-card-desc">Perfect for active college students.</p>
            <div className="plan-card-price">
              <span className="plan-card-amount">$4.99</span>
              <span className="plan-card-period">/ month</span>
            </div>
          </div>

          <ul className="plan-card-features">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Unlimited note downloads
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Ad-free experience
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Early access to peer reviews
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Priority upload processing
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Verified badge on profile
            </li>
          </ul>

          <Link to="/register" className="plan-card-btn plan-card-btn--solid">Upgrade to premium</Link>
        </div>
      </div>
    </main>
  );
}

export default Premium;
