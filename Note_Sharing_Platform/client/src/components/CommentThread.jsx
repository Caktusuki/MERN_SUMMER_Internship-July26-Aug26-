import { useState } from "react";
import api from "../utils/api";

function timeAgo(date) {
  const sec = Math.floor((Date.now() - new Date(date)) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(date).toLocaleDateString();
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function CommentThread({
  comment,
  noteId,
  depth,
  myVotes,
  onVote,
  onReplyPosted,
  currentUserId,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [savingEdit, setSavingEdit] = useState(false);

  const score = (comment.upvotes || 0) - (comment.downvotes || 0);
  const myVote = myVotes[comment._id];
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isOwner = currentUserId && comment.user && comment.user._id === currentUserId;
  const isDeleted = comment.text === "[deleted]" && !comment.user;

  const handleVote = async (type) => {
    try {
      const res = await api.post(`/api/notes/${noteId}/comments/${comment._id}/vote`, { type });
      onVote(comment._id, myVote === type ? null : type, res.data.upvotes, res.data.downvotes);
    } catch { /* noop */ }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/api/notes/${noteId}/comments`, {
        text: replyText,
        parentCommentId: comment._id,
      });
      setReplyText("");
      setShowReply(false);
      onReplyPosted();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post reply.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editText.trim()) return;
    setSavingEdit(true);
    try {
      await api.put(`/api/notes/${noteId}/comments/${comment._id}`, { text: editText });
      setEditing(false);
      onReplyPosted();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to edit comment.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/api/notes/${noteId}/comments/${comment._id}`);
      onReplyPosted();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment.");
    }
  };

  return (
    <div className={`thread depth-${depth}`}>
      <div className="thread-card">
        <button
          className="thread-collapse"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14m0 0 7-7m-7 7-7-7" />
            </svg>
          ) : hasReplies ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" />
            </svg>
          ) : (
            <span className="thread-collapse-spacer" />
          )}
        </button>

        <div className="thread-body">
          <div className="thread-head">
            {!isDeleted && <span className="thread-avatar">{getInitials(comment.user?.username)}</span>}
            {isDeleted ? (
              <span className="thread-author-deleted">[deleted]</span>
            ) : (
              <>
                <span className="thread-author">{comment.user?.username || "Anonymous"}</span>
                <span className="thread-time">{timeAgo(comment.createdAt)}{comment.edited ? " (edited)" : ""}</span>
              </>
            )}
          </div>

          {editing ? (
            <div className="thread-edit-form">
              <textarea
                rows="3"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="thread-edit-actions">
                <button className="btn-primary btn-xs" onClick={handleEdit} disabled={savingEdit}>
                  {savingEdit ? "Saving..." : "Save"}
                </button>
                <button className="btn-ghost btn-xs" onClick={() => { setEditing(false); setEditText(comment.text); }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="thread-text">{isDeleted ? "" : comment.text}</div>

              {!isDeleted && (
                <div className="thread-actions">
                  <button
                    className={`thread-vote ${myVote === "up" ? "tv-up" : ""}`}
                    onClick={() => handleVote("up")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 19V5m0 0-7 7m7-7 7 7" />
                    </svg>
                  </button>
                  <span className={`thread-score ${score > 0 ? "ts-up" : score < 0 ? "ts-down" : ""}`}>
                    {score}
                  </span>
                  <button
                    className={`thread-vote ${myVote === "down" ? "tv-down" : ""}`}
                    onClick={() => handleVote("down")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14m0 0 7-7m-7 7-7-7" />
                    </svg>
                  </button>
                  <span className="thread-action-divider" />
                  <button className="thread-action-btn" onClick={() => setShowReply(!showReply)}>
                    Reply
                  </button>
                  <button className="thread-action-btn" onClick={() => {
                    const url = `${window.location.origin}/notes/${noteId}`;
                    navigator.clipboard.writeText(url);
                  }}>
                    Share
                  </button>
                  {isOwner && (
                    <>
                      <span className="thread-action-divider" />
                      <button className="thread-action-btn" onClick={() => { setEditing(true); setEditText(comment.text); }}>
                        Edit
                      </button>
                      <button className="thread-action-btn thread-action-danger" onClick={handleDelete}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}

              {showReply && (
                <div className="thread-reply-form">
                  <textarea
                    rows="2"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="thread-reply-actions">
                    <button className="btn-primary btn-xs" onClick={handleReply} disabled={submitting}>
                      {submitting ? "Posting..." : "Reply"}
                    </button>
                    <button
                      className="btn-ghost btn-xs"
                      onClick={() => { setShowReply(false); setReplyText(""); }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {!collapsed && hasReplies && (
            <div className="thread-replies">
              {comment.replies.map(reply => (
                <CommentThread
                  key={reply._id}
                  comment={reply}
                  noteId={noteId}
                  depth={depth + 1}
                  myVotes={myVotes}
                  onVote={onVote}
                  onReplyPosted={onReplyPosted}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
