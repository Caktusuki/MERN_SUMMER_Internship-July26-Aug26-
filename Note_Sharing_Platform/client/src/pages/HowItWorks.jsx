import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <div className="flex-1 bg-gray-50/50 py-24 px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-blue-600">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          How it works
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Collaborative learning in three simple steps
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          From sign-up to your first download, NoteFi is built to get<br />
          out of your way.
        </p>
      </div>

      {/* Steps Row */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-4 relative pt-8 mb-20">
        
        {/* Step 1 */}
        <div className="flex-1 text-center flex flex-col items-center">
          <div className="h-14 w-14 bg-[#1a202c] text-white font-bold text-lg rounded-full flex items-center justify-center mb-6 shadow-sm">
            1
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Create an account</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Sign up in seconds. All you need is an email to join NoteFi.
          </p>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center pt-3 text-blue-500 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex-1 text-center flex flex-col items-center">
          <div className="h-14 w-14 bg-[#1a202c] text-white font-bold text-lg rounded-full flex items-center justify-center mb-6 shadow-sm">
            2
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Upload your notes</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Select a subject, write a brief description, and drag-and-drop your study file.
          </p>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center pt-3 text-blue-500 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex-1 text-center flex flex-col items-center">
          <div className="h-14 w-14 bg-[#1a202c] text-white font-bold text-lg rounded-full flex items-center justify-center mb-6 shadow-sm">
            3
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Download and learn</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Browse notes uploaded by other students, download study aids, and review them.
          </p>
        </div>

      </div>

      {/* Button */}
      <div className="text-center">
        <Link
          to="/register"
          className="btn-3d-slate"
        >
          Get started now
        </Link>
      </div>
    </div>
  );
}

export default HowItWorks;
