import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-2xl font-bold text-gray-900">NoteFi</span>
      </Link>

      <div className="flex items-center gap-12 text-sm font-medium text-gray-500">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <Link to="/features" className="hover:text-gray-900 transition-colors">Feature</Link>
        <Link to="/premium" className="hover:text-gray-900 transition-colors">Premium</Link>
        <Link to="/how-it-works" className="hover:text-gray-900 transition-colors">How it Works</Link>
      </div>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              👋 Hi, {username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-all">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar