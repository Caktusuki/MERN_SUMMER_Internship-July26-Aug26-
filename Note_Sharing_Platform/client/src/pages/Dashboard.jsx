import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import NoteCard from "../components/NoteCard";
import api from "../utils/api";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [subject, setSubject] = useState("All");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const params = {};
                if (query) params.search = query;
                if (subject !== "All") params.subject = subject;
                const res = await api.get("/api/notes", { params });
                setNotes(res.data);
            } catch {
                setNotes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [query, subject]);

    const subjects = useMemo(() => {
        const all = notes.map((n) => n.subject).filter(Boolean);
        return ["All", ...new Set(all)];
    }, [notes]);

    const sorted = useMemo(() => {
        const copy = [...notes];
        if (sort === "downloads") copy.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        else copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return copy;
    }, [notes, sort]);

    return (
        <>
            <AppNavbar />
            <main className="app-main">
                <div className="app-head">
                    <div>
                        <h1 className="app-h1">Browse notes</h1>
                        <p className="app-sub">{notes.length} notes shared by your classmates</p>
                    </div>
                </div>

                <div className="search-row">
                    <div className="search-bar-group">
                        <div className="search-box">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#8A8F9C" strokeWidth="1.8" /><path d="m20 20-3.5-3.5" stroke="#8A8F9C" strokeWidth="1.8" strokeLinecap="round" /></svg>
                            <input
                                type="text"
                                placeholder="Search by title or course code..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="sort-toggle">
                            <button
                                className={`sort-btn ${sort === "newest" ? "sort-active" : ""}`}
                                onClick={() => setSort("newest")}
                            >
                                Newest
                            </button>
                            <button
                                className={`sort-btn ${sort === "downloads" ? "sort-active" : ""}`}
                                onClick={() => setSort("downloads")}
                            >
                                Most downloaded
                            </button>
                        </div>
                    </div>
                </div>

                <div className="chip-row">
                    {subjects.map((s) => (
                        <button
                            key={s}
                            className={`chip ${subject === s ? "chip-active" : ""}`}
                            onClick={() => setSubject(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="empty-state">Loading notes...</div>
                ) : sorted.length > 0 ? (
                    <div className="notes-grid">
                        {sorted.map((n) => (
                            <NoteCard note={n} key={n._id} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#CBD1DE" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M15 2v5h5" stroke="#CBD1DE" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="empty-state-text">No notes yet — be the first to upload</p>
                        <Link to="/upload" className="btn-submit empty-state-btn">Upload a note</Link>
                    </div>
                )}
            </main>
        </>
    );
}
