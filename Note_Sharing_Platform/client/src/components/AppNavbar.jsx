import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AppNavbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // cookie might already be gone
    }
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header>
      <Link to="/dashboard" className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>NoteFi</span>
      </Link>

      <nav>
        <Link to="/dashboard">Browse Notes</Link>
        <Link to="/upload">Upload Note</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <div className="nav-right">
        {username ? (
          <>
            <Link to="/profile" className="nav-profile-link">
              <span className="avatar-mini">
                {username.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)', background: 'var(--accent-soft)', padding: '4px 12px', borderRadius: '20px' }}>
                Hi, {username}
              </span>
            </Link>
            <div className="divider"></div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <div className="divider"></div>
            <Link to="/register" className="btn-signup">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}
