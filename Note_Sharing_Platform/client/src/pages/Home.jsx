import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MOCK_NOTES = [
  {
    id: 1,
    title: 'Data Structures - Complete Unit 3',
    subject: 'Computer Science',
    author: 'Alex Mercer',
    downloads: 142,
    rating: 4.8,
    fileName: 'data-structures-u3.pdf',
    color: 'blue',
    type: 'PDF',
  },
  {
    id: 2,
    title: 'Thermodynamics & Fluid Mechanics Notes',
    subject: 'Mechanical Engineering',
    author: 'Sarah Chen',
    downloads: 89,
    rating: 4.5,
    fileName: 'thermodynamics-notes.pdf',
    color: 'green',
    type: 'PDF',
  },
  {
    id: 3,
    title: 'Operating Systems - Processes & Threads',
    subject: 'Computer Science',
    author: 'David Kim',
    downloads: 215,
    rating: 4.9,
    fileName: 'operating-systems-qna.pdf',
    color: 'amber',
    type: 'PDF',
  },
  {
    id: 4,
    title: 'Organic Chemistry - Carbonyl Compounds',
    subject: 'Chemistry',
    author: 'Elena Rostova',
    downloads: 64,
    rating: 4.2,
    fileName: 'organic-chem-carbonyls.pdf',
    color: 'pink',
    type: 'PDF',
  },
  {
    id: 5,
    title: 'Calculus II - Integration Techniques',
    subject: 'Mathematics',
    author: 'Prof. Grant',
    downloads: 304,
    rating: 4.7,
    fileName: 'calculus-2-integration.pdf',
    color: 'blue',
    type: 'PDF',
  },
  {
    id: 6,
    title: 'Database Management Systems - ER Diagram & SQL',
    subject: 'Computer Science',
    author: 'Arjun Mehta',
    downloads: 188,
    rating: 4.6,
    fileName: 'dbms-sql-guide.pdf',
    color: 'green',
    type: 'PDF',
  },
];

const STROKE_COLORS = {
  blue: '#3D5AF1',
  green: '#1F9D6E',
  amber: '#D97706',
  pink: '#E11D48',
};

function Home() {
  const username = localStorage.getItem('username') || 'Student';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [downloadMsg, setDownloadMsg] = useState('');

  const subjects = ['All', ...new Set(MOCK_NOTES.map((note) => note.subject))];

  const filteredNotes = MOCK_NOTES.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (fileName) => {
    setDownloadMsg(`Downloading "${fileName}"...`);
    setTimeout(() => {
      setDownloadMsg('');
      alert(`Success: "${fileName}" has been downloaded.`);
    }, 1200);
  };

  return (
    <>
      <header>
        <Link to="/dashboard" className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>NoteFi</span>
        </Link>
        <nav>
          <Link to="/dashboard" className="active">Browse Notes</Link>
          <Link to="/upload">Upload Note</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="nav-right">
          <span className="avatar-mini">{username.charAt(0).toUpperCase()}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--accent)', background: 'var(--accent-soft)', padding: '4px 12px', borderRadius: '20px' }}>
            Hi, {username}
          </span>
          <div className="divider"></div>
          <Link to="/" onClick={() => { localStorage.removeItem('username'); }}>Log out</Link>
        </div>
      </header>

      <main className="app-main">
        <div className="app-head">
          <div>
            <h1 className="app-h1">Browse notes</h1>
            <p className="app-sub">{MOCK_NOTES.length} notes shared by your classmates</p>
          </div>
          <Link to="/upload" className="btn-primary">Upload note</Link>
        </div>

        <div className="search-row">
          <div className="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#8A8F9C" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="#8A8F9C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by title or course code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="chip-row">
          {subjects.map((s) => (
            <button
              key={s}
              className={`chip ${selectedSubject === s ? 'chip-active' : ''}`}
              onClick={() => setSelectedSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {downloadMsg && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm mb-4" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
            </svg>
            {downloadMsg}
          </div>
        )}

        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <Link to={`/notes/${note.id}`} key={note.id} className="note-card">
                <div className={`note-icon icon-${note.color}`}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke={STROKE_COLORS[note.color]} strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="M15 2v5h5" stroke={STROKE_COLORS[note.color]} strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="note-card-body">
                  <h3 className="note-card-title">{note.title}</h3>
                  <p className="note-card-meta">{note.subject} · {note.author}</p>
                  <div className="note-card-foot">
                    <span className="stars-mini">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(note.rating) ? "#FFB020" : "none"} stroke={i < Math.round(note.rating) ? "#FFB020" : "#D4D2CA"}>
                          <path d="M12 17.3 6.2 20.6l1.1-6.5L2.6 9.4l6.5-.9L12 2.6l2.9 5.9 6.5.9-4.7 4.7 1.1 6.5z" strokeWidth="1.4" strokeLinejoin="round" />
                        </svg>
                      ))}
                    </span>
                    <span className="note-card-downloads">{note.downloads} downloads</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No notes match your search yet. Try a different search term or subject.
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
