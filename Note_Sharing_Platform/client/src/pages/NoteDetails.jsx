import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import CommentThread from "../components/CommentThread";
import api from "../utils/api";
import { setCurrentNote } from "../utils/noteContext";

const STROKES = { blue: "#3D5AF1", green: "#1F9D6E", amber: "#D97706", pink: "#E11D48" };
const COLORS = ["blue", "green", "amber", "pink"];

function getColor(title) {
  const hash = (title || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [myVote, setMyVote] = useState(null);
  const [commentTree, setCommentTree] = useState([]);
  const [commentVotes, setCommentVotes] = useState({});
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (previewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [previewOpen]);

  const fetchComments = useCallback(async () => {
    try {
      const [cr, cvr] = await Promise.all([
        api.get(`/api/notes/${id}/comments`),
        api.get(`/api/notes/${id}/comments/votes`).catch(() => ({ data: {} })),
      ]);
      setCommentTree(cr.data);
      setCommentVotes(cvr.data);
    } catch { /* noop */ }
  }, [id]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const [noteRes, meRes] = await Promise.all([
          api.get(`/api/notes/${id}`),
          api.get('/api/auth/me').catch(() => ({ data: null })),
        ]);
        setNote(noteRes.data);
        setCurrentUser(meRes.data);
        setUpvotes(noteRes.data.upvotes || 0);
        setDownvotes(noteRes.data.downvotes || 0);
        if (noteRes.data.summary) {
          setSummary(noteRes.data.summary);
          setTags(noteRes.data.tags || []);
        }
        setCurrentNote({
          title: noteRes.data.title,
          subject: noteRes.data.subject,
          course: noteRes.data.course,
          description: noteRes.data.description,
          summary: noteRes.data.summary,
        });

        const voteRes = await api.get(`/api/notes/${id}/vote`).catch(() => ({ data: { type: null } }));
        setMyVote(voteRes.data.type);

        await fetchComments();
      } catch {
        setNote(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, fetchComments]);

  const handleDownload = async () => {
    try {
      const res = await api.get(`/api/notes/${id}/download`);
      window.open(res.data.fileUrl, "_blank");
    } catch {
      alert("Failed to download note.");
    }
  };

  const handleVote = async (type) => {
    try {
      const res = await api.post(`/api/notes/${id}/vote`, { type });
      setUpvotes(res.data.upvotes);
      setDownvotes(res.data.downvotes);
      setMyVote(myVote === type ? null : type);
    } catch { /* noop */ }
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/api/notes/${id}/comments`, { text: commentText });
      setCommentText("");
      await fetchComments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentVote = useCallback((commentId, type, up, down) => {
    setCommentVotes(prev => ({ ...prev, [commentId]: type }));
    const updateTree = (nodes) =>
      nodes.map(n => {
        if (n._id === commentId) return { ...n, upvotes: up, downvotes: down };
        if (n.replies) return { ...n, replies: updateTree(n.replies) };
        return n;
      });
    setCommentTree(prev => updateTree(prev));
  }, []);

  const handleSummarize = async (regenerate = false) => {
    setSummarizing(true);
    try {
      const url = regenerate ? `/api/notes/${id}/summarize?force=true` : `/api/notes/${id}/summarize`;
      const res = await api.post(url);
      setSummary(res.data.summary);
      setTags(res.data.tags || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate summary.");
    } finally {
      setSummarizing(false);
    }
  };

  function countAll(c) {
    let n = 1;
    if (c.replies) c.replies.forEach(r => { n += countAll(r); });
    return n;
  }
  const totalComments = commentTree.reduce((sum, c) => sum + countAll(c), 0);

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
  const stroke = note.color ? STROKES[note.color] : STROKES[color];
  const uploader = note.uploader?.username || note.uploader || "Unknown";
  const netScore = upvotes - downvotes;

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
            <p className="app-sub" style={{ margin: 0 }}>{note.subject} · {note.course || "—"} · Shared by {uploader}</p>
          </div>
        </div>

        <div className="detail-stats">
          <div>{note.downloads || 0} downloads</div>
          {note.fileType && <div className="detail-stat-label">{note.fileType.toUpperCase()}</div>}
        </div>

        <div className="vote-row">
          <button
            className={`vote-btn ${myVote === "up" ? "vote-active-up" : ""}`}
            onClick={() => handleVote("up")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5m0 0-7 7m7-7 7 7" />
            </svg>
            {upvotes}
          </button>
          <button
            className={`vote-btn ${myVote === "down" ? "vote-active-down" : ""}`}
            onClick={() => handleVote("down")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14m0 0 7-7m-7 7-7-7" />
            </svg>
            {downvotes}
          </button>
          <span className="vote-net" style={{ color: netScore > 0 ? "#1F9D6E" : netScore < 0 ? "#C0362C" : "var(--ink-soft)" }}>
            {netScore >= 0 ? "+" : ""}{netScore}
          </span>
        </div>

        <div className="detail-actions">
          <button className="btn-primary" onClick={handleDownload}>Download note</button>
          <button className="btn-secondary" onClick={() => setPreviewOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview
          </button>
          <button className="btn-ai" onClick={() => handleSummarize(!!summary)} disabled={summarizing}>
            {summarizing ? (
              <>
                <svg className="ai-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4m-7.07-3.93 2.83-2.83m8.48-8.48 2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83" strokeLinecap="round" /></svg>
                Generating...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                {summary ? "Regenerate summary" : "Generate AI Summary"}
              </>
            )}
          </button>
        </div>

        {summary && (
          <div className="detail-section ai-summary">
            <h3 className="detail-h3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              AI Summary
            </h3>
            <p className="detail-desc">{summary}</p>
            {tags.length > 0 && (
              <div className="ai-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="ai-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {note.description && (
          <div className="detail-section">
            <h3 className="detail-h3">Description</h3>
            <p className="detail-desc">{note.description}</p>
          </div>
        )}

        <div className="detail-section">
          <h3 className="detail-h3">Comments ({totalComments})</h3>

          <div className="comment-form">
            <textarea
              rows="3"
              placeholder="What do you think?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn-primary btn-sm" onClick={handleNewComment} disabled={submitting}>
              {submitting ? "Posting..." : "Comment"}
            </button>
          </div>

          <div className="thread-container">
            {commentTree.map(c => (
              <CommentThread
                key={c._id}
                comment={c}
                noteId={id}
                depth={0}
                myVotes={commentVotes}
                onVote={handleCommentVote}
                onReplyPosted={fetchComments}
                currentUserId={currentUser?._id}
              />
            ))}
            {commentTree.length === 0 && (
              <div className="empty-state" style={{ marginTop: 16 }}>
                <p className="empty-state-text">No comments yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {previewOpen && (
        <div className="preview-overlay" onClick={() => setPreviewOpen(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <span className="preview-title">{note.title}</span>
              <button className="preview-close" onClick={() => setPreviewOpen(false)}>×</button>
            </div>
            <div className="preview-body">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(note.fileUrl)}&embedded=true`}
                title="Note preview"
                className="preview-frame"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
