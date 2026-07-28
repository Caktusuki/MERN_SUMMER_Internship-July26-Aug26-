import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef([]);

  useEffect(() => {
    if (!email) navigate('/register');
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError('');
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      const newCode = pasted.split('').concat(Array(6).fill('')).slice(0, 6);
      setCode(newCode);
      inputs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      return setError('Please enter the full 6-digit code');
    }

    setLoading(true);
    try {
      const res = await api.post('/api/auth/verify-email', { email, code: fullCode });
      localStorage.setItem('username', res.data.username);
      setSuccess(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await api.post('/api/auth/resend-code', { email });
      setCooldown(60);
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="auth">
      <div className="auth-card">
        <div className="auth-head">
          <div className="verify-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
          </div>
          <h1>Verify your email</h1>
          <p>We sent a 6-digit code to <strong>{email}</strong></p>
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
            <p>Email verified! Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="verify-code-inputs" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="verify-code-input"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}

        <p className="fine-print" style={{ textAlign: "center" }}>
          {cooldown > 0 ? (
            <span>Resend code in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="verify-resend-btn"
            >
              {resending ? 'Sending...' : 'Resend code'}
            </button>
          )}
        </p>

        <p className="fine-print" style={{ textAlign: "center" }}>
          <Link to="/register">← Back to sign up</Link>
        </p>
      </div>
    </main>
  );
}

export default VerifyEmail;
