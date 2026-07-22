import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import NoteCard from "../components/NoteCard";
import api from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, notesRes] = await Promise.all([
          api.get("/api/auth/me"),
          api.get("/api/notes/mine"),
        ]);
        setUser(userRes.data);
        setNotes(notesRes.data);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <AppNavbar />
        <main className="app-main">
          <div className="empty-state">Loading profile...</div>
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <AppNavbar />
        <main className="app-main">
          <div className="empty-state">
            Please <a href="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>log in</a> to view your profile.
          </div>
        </main>
      </>
    );
  }

  const initials = (user.username || "?").charAt(0).toUpperCase();
  const totalDownloads = notes.reduce((sum, n) => sum + (n.downloads || 0), 0);
  const ratedNotes = notes.filter((n) => n.avgRating > 0);
  const avgRating =
    ratedNotes.length > 0
      ? (ratedNotes.reduce((sum, n) => sum + n.avgRating, 0) / ratedNotes.length).toFixed(1)
      : "—";

  return (
    <>
      <AppNavbar />
      <main className="app-main">
        <div className="profile-head">
          <div className="avatar-lg">{initials}</div>
          <div>
            <h1 className="app-h1" style={{ marginBottom: 4 }}>{user.username}</h1>
            <p className="app-sub" style={{ margin: 0 }}>{user.email}</p>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-value">{notes.length}</div>
            <div className="stat-label">Notes uploaded</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalDownloads}</div>
            <div className="stat-label">Total downloads</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgRating}</div>
            <div className="stat-label">Average rating</div>
          </div>
        </div>

        <h3 className="detail-h3" style={{ marginTop: 40, marginBottom: 16 }}>Your uploads</h3>
        {notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map((n) => (
              <NoteCard note={n} key={n._id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">You haven't uploaded any notes yet.</div>
        )}
      </main>
    </>
  );
}
