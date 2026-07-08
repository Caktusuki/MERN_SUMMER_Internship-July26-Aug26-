import { Link } from 'react-router-dom';

function Features() {
  const featuresList = [
    {
      title: 'Easy uploads',
      desc: "Drag and drop your PDFs, slideshows, or notes — they're ready to share in seconds.",
      iconColor: 'bg-blue-50 text-blue-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      )
    },
    {
      title: 'Smart organizing',
      desc: 'Notes are automatically sorted by university, course, and topic, so nothing gets lost.',
      iconColor: 'bg-green-50 text-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      title: 'Global access',
      desc: "Retrieve your study guides on any mobile or desktop browser, wherever you're studying.",
      iconColor: 'bg-amber-50 text-amber-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: 'Peer reviews',
      desc: 'Rate, review, and comment on notes shared by other students to find the best ones first.',
      iconColor: 'bg-pink-50 text-pink-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.367 1.243.58 1.828l-3.97 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.888a1 1 0 00-1.176 0l-3.97 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.97-2.888c-.784-.58-.378-1.828.58-1.828h4.907a1 1 0 00.95-.69l1.519-4.674z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex-1 bg-gray-50/50 py-24 px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-blue-600">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          Features
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Everything you need to study smarter
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
          Built for how students actually work — upload fast, find things fast,<br />
          and learn from each other along the way.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {featuresList.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between items-start space-y-6">
            <div className={`h-12 w-12 ${f.iconColor} rounded-xl flex items-center justify-center`}>
              {f.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Link
          to="/register"
          className="inline-block bg-[#1e293b] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-sm text-sm"
        >
          Get started now
        </Link>
      </div>
    </div>
  );
}

export default Features;
