import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="auth">
      <div className="auth-card" style={{ textAlign: "center", padding: "48px 32px" }}>
        <div style={{ fontSize: "64px", fontWeight: "700", color: "var(--accent)", lineHeight: 1, marginBottom: "12px" }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--heading)", fontSize: "22px", marginBottom: "8px" }}>
          Page not found
        </h1>
        <p className="app-sub" style={{ marginBottom: "28px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-hero">
          Go home
        </Link>
      </div>
    </main>
  );
}
