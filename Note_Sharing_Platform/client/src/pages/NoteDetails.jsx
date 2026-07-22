import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import api from "../utils/api";

const STROKES = { blue: "#3D5AF1", green: "#1F9D6E", amber: "#D97706", pink: "#E11D48" };
const COLORS = ["blue", "green", "amber", "pink"];

function getColor(title) {
  const hash = (title || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

function Stars({ rating, size = 16 }) {
  const full = Math.round(rating);
  return (
    <span className="stars-mini">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < full ? "#FFB020" : "none"} stroke={i < full ? "#FFB020" : "#D4D2CA"}>
          <path d="M12 17.3 6.2 20.6l1.1-6.5L2.6 9.4l6.5-.9L12 2.6l2.9 5.9 6.5.9-4.7 4.7 1.1 6.5z" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const [noteRes, reviewsRes] = await Promise.all([
          api.get(`/api/notes/${id}`),
          api.get(`/api/notes/${id}/ratings`),
        ]);
        setNote(noteRes.data);
        setReviews(reviewsRes.data);
      } catch {
        setNote(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDownload = async () => {
    try {
      const res = await api.get(`/api/notes/${id}/download`);
      window.open(res.data.fileUrl, "_blank");
    } catch {
      alert("Failed to download note.");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/api/notes/${id}/ratings`, { rating, comment });
      const res = await api.get(`/api/notes/${id}/ratings`);
      setReviews(res.data);
      setComment("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <AppNavbar />
        <main className="app-main narrow">
          <div className="empty-state">Loading note...</div>
        </main>
      </>
    );
  }

  if (!note) {
    return (
      <>
        <AppNavbar />
        <main className="app-main narrow">
          <p className="app-sub">Note not found. <Link to="/dashboard">Back to dashboard</Link></p>
        </main>
      </>
    );
  }

  const color = note.color || getColor(note.title);
  const stroke = note.stroke || STROKES[color];
  const uploader = note.uploader?.username || note.uploader || "Unknown";
  const avgRating = note.avgRating || 0;

  return (
    <>
      <AppNavbar />
      <main className="app-main narrow">
        <Link to="/dashboard" className="back-link">← Back to dashboard</Link>

        <div className="detail-head">
          <div className={`note-icon icon-${color} icon-lg`}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M15 2v5h5" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="app-h1" style={{ marginBottom: 6 }}>{note.title}</h1>
            <p className="app-sub" style={{ margin: 0 }}>{note.subject} · {note.course} · Shared by {uploader}</p>
          </div>
        </div>

        <div className="detail-stats">
          <div><Stars rating={avgRating} /> <span className="detail-stat-label">{avgRating > 0 ? avgRating.toFixed(1) : "No"} rating</span></div>
          <div className="detail-stat-label">{note.downloads || 0} downloads</div>
          {note.fileType && <div className="detail-stat-label">{note.fileType.toUpperCase()}</div>}
        </div>

        <button className="btn-primary" style={{ marginTop: 4 }} onClick={handleDownload}>Download note</button>

        {note.description && (
          <div className="detail-section">
            <h3 className="detail-h3">Description</h3>
            <p className="detail-desc">{note.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3 className="detail-h3">Peer reviews ({reviews.length})</h3>

          <form className="review-form" onSubmit={handleReview}>
            <div className="review-stars-input">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} className="star-btn" onClick={() => setRating(n)} aria-label={`Rate ${n}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={n <= rating ? "#FFB020" : "none"} stroke={n <= rating ? "#FFB020" : "#D4D2CA"}>
                    <path d="M12 17.3 6.2 20.6l1.1-6.5L2.6 9.4l6.5-.9L12 2.6l2.9 5.9 6.5.9-4.7 4.7 1.1 6.5z" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
            <textarea
              rows="3"
              placeholder="Leave a review for other students..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button type="submit" className="btn-secondary" style={{ alignSelf: "flex-start" }} disabled={submitting}>
              {submitting ? "Posting..." : "Post review"}
            </button>
          </form>

          <div className="review-list">
            {reviews.map((r) => (
              <div className="review-item" key={r._id}>
                <div className="review-item-head">
                  <span className="review-name">{r.user?.username || "Anonymous"}</span>
                  <Stars rating={r.rating} size={13} />
                </div>
                {r.comment && <p className="review-comment">{r.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
