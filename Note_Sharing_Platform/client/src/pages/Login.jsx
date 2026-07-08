import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      // Redirect using window.location to refresh the Navbar state
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#faf9f6]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Log in to access your shared notes and dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm" role="alert">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:z-10 text-sm transition-all bg-gray-50/30"
                placeholder="***********@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 focus:z-10 text-sm transition-all bg-gray-50/30"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-[#1e293b] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
