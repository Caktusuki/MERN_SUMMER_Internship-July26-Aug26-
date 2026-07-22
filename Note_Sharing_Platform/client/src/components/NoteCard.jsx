import { Link } from "react-router-dom";

const COLORS = ["blue", "green", "amber", "pink"];
const STROKES = { blue: "#3D5AF1", green: "#1F9D6E", amber: "#D97706", pink: "#E11D48" };

function getColor(note) {
  if (note.color && STROKES[note.color]) return note.color;
  const hash = (note.title || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function NoteCard({ note }) {
  const noteId = note._id || note.id;
  const color = getColor(note);
  const stroke = note.stroke || STROKES[color];
  const rating = note.avgRating || note.rating || 0;
  const uploader = note.uploader?.username || note.uploader || "";

  return (
    <Link to={`/notes/${noteId}`} className="note-card">
      <div className={`note-icon icon-${color}`}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M15 2v5h5" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="note-card-body">
        <h3 className="note-card-title">{note.title}</h3>
        <p className="note-card-meta">
          {note.subject}{note.course ? ` · ${note.course}` : ""}
        </p>
        {uploader && (
          <div className="note-card-uploader">
            <span className="avatar-tiny">{getInitials(uploader)}</span>
            <span>{uploader}</span>
          </div>
        )}
      </div>

      <div className="note-card-foot">
        <div className="note-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFB020" stroke="#FFB020" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M12 17.3 6.2 20.6l1.1-6.5L2.6 9.4l6.5-.9L12 2.6l2.9 5.9 6.5.9-4.7 4.7 1.1 6.5z" />
          </svg>
          <span>{rating > 0 ? rating.toFixed(1) : "—"}</span>
        </div>
        <div className="note-stat-divider" />
        <div className="note-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v12m0 0 4-4m-4 4-4-4" />
            <path d="M5 18v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1" />
          </svg>
          <span>{note.downloads || 0}</span>
        </div>
      </div>
    </Link>
  );
}
