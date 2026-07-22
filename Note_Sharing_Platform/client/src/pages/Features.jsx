import { Link } from 'react-router-dom';

function Features() {
  const featuresList = [
    {
      title: 'Easy uploads',
      desc: "Drag and drop your PDFs, slideshows, or notes — they're ready to share in seconds.",
      iconColor: 'icon-blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="#3D5AF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Smart organizing',
      desc: 'Notes are automatically sorted by university, course, and topic, so nothing gets lost.',
      iconColor: 'icon-green',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" stroke="#1F9D6E" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Global access',
      desc: "Retrieve your study guides on any mobile or desktop browser, wherever you're studying.",
      iconColor: 'icon-amber',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="#D97706" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Peer reviews',
      desc: 'Rate, review, and comment on notes shared by other students to find the best ones first.',
      iconColor: 'icon-pink',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 17.3 6.2 20.6l1.1-6.5L2.6 9.4l6.5-.9L12 2.6l2.9 5.9 6.5.9-4.7 4.7 1.1 6.5z" stroke="#E11D48" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      )
    },
  ];

  return (
    <main className="simple">
      <div className="eyebrow">
        <span className="dot"></span>
        Features
      </div>

      <h1>Everything you need to study smarter</h1>

      <p className="sub">
        Built for how students actually work — upload fast, find things fast,
        and learn from each other along the way.
      </p>

      <div className="grid">
        {featuresList.map((f, i) => (
          <div key={i} className="card">
            <div className={`icon ${f.iconColor}`}>
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="cta-wrap">
        <Link to="/register" className="btn-primary">Get started now</Link>
      </div>
    </main>
  );
}

export default Features;
