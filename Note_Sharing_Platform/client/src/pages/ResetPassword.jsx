import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!token) {
    return (
      <main className="auth">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <h1>Invalid link</h1>
          <p className="app-sub" style={{ margin: "12px 0 24px" }}>This password reset link is invalid or missing.</p>
          <Link to="/forgot-password" className="btn-submit" style={{ display: "inline-block", textDecoration: "none" }}>
            Request a new link
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);

    try {
      await api.post('/api/auth/reset-password', { token, password });
      setSuccess(true);
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
          <h1>Set new password</h1>
          <p>Choose a strong password for your account</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>
            <span className="auth-error-msg">{error}</span>
            <button className="auth-error-dismiss" onClick={() => setError('')} type="button">×</button>
          </div>
        )}

        {success ? (
          <div className="auth-success">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F9D6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p>Password reset successful!</p>
            <Link to="/login" className="btn-submit" style={{ display: "inline-block", textAlign: "center", marginTop: "12px", textDecoration: "none" }}>
              Log in with new password
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="password">New password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset password'}
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

export default ResetPassword;
