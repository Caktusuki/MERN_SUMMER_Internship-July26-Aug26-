import { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import { getCurrentNote } from "../utils/noteContext";

const WELCOME = { role: "bot", text: "Hi! I'm NoteFi, your AI study assistant. Ask me anything about your notes or studies." };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(20);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClose = () => {
    setOpen(false);
    setMessages([WELCOME]);
    setInput("");
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        message: text,
        history: [...messages, userMsg].slice(-10),
      };
      const ctx = getCurrentNote();
      if (ctx) payload.noteContext = ctx;

      const res = await api.post("/api/chatbot", payload);
      setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);
      if (res.data.remaining !== undefined) setRemaining(res.data.remaining);
    } catch (err) {
      const msg = err.response?.data?.message || "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-header-dot" />
            NoteFi Assistant
            <span className="chatbot-remaining">{remaining}/20</span>
            <button className="chatbot-close" onClick={handleClose}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${m.role}`}>
                {m.role === "bot" && (
                  <span className="chatbot-avatar">N</span>
                )}
                <div className={`chatbot-bubble chatbot-bubble--${m.role}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg--bot">
                <span className="chatbot-avatar">N</span>
                <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <form className="chatbot-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              type="text"
              placeholder={remaining <= 0 ? "Daily limit reached" : "Ask me anything..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || remaining <= 0}
            />
            <button type="submit" disabled={loading || !input.trim() || remaining <= 0}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
