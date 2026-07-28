import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">
        <div className="auth-head">
          <h1>Forgot password?</h1>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>
            <span className="auth-error-msg">{error}</span>
            <button className="auth-error-dismiss" onClick={() => setError('')} type="button">×</button>
          </div>
        )}

        {sent ? (
          <div className="auth-success">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F9D6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p>Check your inbox for the reset link. It expires in 15 minutes.</p>
            <Link to="/login" className="btn-submit" style={{ display: "inline-block", textAlign: "center", marginTop: "12px", textDecoration: "none" }}>
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="fine-print">
          <Link to="/login">← Back to login</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
