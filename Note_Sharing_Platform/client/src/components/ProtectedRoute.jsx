import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

export default function ProtectedRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    api.get("/api/auth/me")
      .then(() => setOk(true))
      .catch(() => setOk(false));
  }, []);

  if (ok === null) {
    return (
      <main className="auth">
        <div className="auth-card" style={{ textAlign: "center", padding: "48px 32px" }}>
          <p className="app-sub">Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!ok) return <Navigate to="/login" replace />;

  return children;
}
