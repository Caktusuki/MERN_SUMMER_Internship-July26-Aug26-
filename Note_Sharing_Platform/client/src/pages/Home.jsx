import { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_NOTES = [
  {
    id: 1,
    title: 'Data Structures - Complete Unit 3',
    subject: 'Computer Science',
    author: 'Alex Mercer',
    downloads: 142,
    rating: 4.8,
    fileName: 'data-structures-u3.pdf',
  },
  {
    id: 2,
    title: 'Thermodynamics & Fluid Mechanics Notes',
    subject: 'Mechanical Engineering',
    author: 'Sarah Chen',
    downloads: 89,
    rating: 4.5,
    fileName: 'thermodynamics-notes.pdf',
  },
  {
    id: 3,
    title: 'Operating Systems - Processes & Threads',
    subject: 'Computer Science',
    author: 'David Kim',
    downloads: 215,
    rating: 4.9,
    fileName: 'operating-systems-qna.pdf',
  },
  {
    id: 4,
    title: 'Organic Chemistry - Carbonyl Compounds',
    subject: 'Chemistry',
    author: 'Elena Rostova',
    downloads: 64,
    rating: 4.2,
    fileName: 'organic-chem-carbonyls.pdf',
  },
  {
    id: 5,
    title: 'Calculus II - Integration Techniques',
    subject: 'Mathematics',
    author: 'Prof. Grant',
    downloads: 304,
    rating: 4.7,
    fileName: 'calculus-2-integration.pdf',
  },
  {
    id: 6,
    title: 'Database Management Systems - ER Diagram & SQL',
    subject: 'Computer Science',
    author: 'Arjun Mehta',
    downloads: 188,
    rating: 4.6,
    fileName: 'dbms-sql-guide.pdf',
  },
];

function Home() {
  const username = localStorage.getItem('username') || 'Student';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [downloadMsg, setDownloadMsg] = useState('');

  // Extract unique subjects
  const subjects = ['All', ...new Set(MOCK_NOTES.map((note) => note.subject))];

  // Filter notes
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
    <div className="flex-1 bg-gray-50 py-12 px-8">
      {/* Header section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome, {username}!
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Discover, study, and share high-quality notes uploaded by fellow peers.
          </p>
        </div>
        <div>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition-colors"
          >
            <span>📤</span> Upload Your Notes
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar: filters */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Filter by Subject
            </h3>
            <div className="flex flex-col gap-2">
              {subjects.map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    selectedSubject === subj
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Quick tips card */}
          <div className="bg-gradient-to-tr from-purple-900 to-indigo-800 text-white p-6 rounded-2xl shadow-sm">
            <h4 className="font-bold text-lg mb-2">Presentation Demo</h4>
            <p className="text-sm text-purple-200 leading-relaxed">
              This is the live catalog dashboard. Try searching for "SQL" or "Calculus" to filter matching records immediately.
            </p>
          </div>
        </div>

        {/* Right side: search and catalog list */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by title, subject, or uploader name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm placeholder-gray-400"
            />
          </div>

          {/* Downloading notification banner */}
          {downloadMsg && (
            <div className="bg-purple-50 border border-purple-200 text-purple-800 px-4 py-3 rounded-xl flex items-center gap-3 animate-pulse">
              <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{downloadMsg}</span>
            </div>
          )}

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                        {note.subject}
                      </span>
                      <span className="text-sm font-semibold text-amber-500 flex items-center gap-1">
                        ★ {note.rating}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-6">
                      Shared by <span className="font-semibold text-gray-600">{note.author}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">
                      📥 {note.downloads} downloads
                    </span>
                    <button
                      onClick={() => handleDownload(note.fileName)}
                      className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
              <span className="text-4xl">📭</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900">No notes found</h3>
              <p className="text-sm text-gray-500 mt-1">
                Try searching for something else or clear the subject filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;