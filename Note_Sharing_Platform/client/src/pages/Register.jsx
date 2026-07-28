import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);

    try {
      await api.post('/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate('/verify-email', { state: { email: formData.email } });
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
          <h1>Create your account</h1>
          <p>Join NoteFi to start sharing and discovering notes</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            <span className="auth-error-icon">!</span>
            <span className="auth-error-msg">{error}</span>
            <button className="auth-error-dismiss" onClick={() => setError('')} type="button">×</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="name"
              required
              placeholder="john_doe"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@university.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Sign up'}
          </button>
        </form>

        <p className="fine-print">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
