import { Link } from 'react-router-dom'

function Landing() {
  const token = localStorage.getItem('token');

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Hero Text */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-blue-600">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            Trusted by 12,000+ students
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Share notes.<br />
            Learn <span className="bg-[#fef08a] px-2 py-0.5 rounded-md inline-block">together.</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            NoteFi is a collaborative platform where students and professionals
            upload, share, and discover notes — organized by subject, topic,
            and institution.
          </p>

          {/* Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            {token ? (
              <>
                <Link
                  to="/home"
                  className="btn-3d-slate"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/contact"
                  className="bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Contact us
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-3d-slate"
                >
                  Get started
                </Link>
                <Link
                  to="/contact"
                  className="bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Contact us
                </Link>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold px-4 py-3.5 transition-colors text-sm"
                >
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Recently Shared Card */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Recently shared
          </div>
          
          <div className="space-y-4">
            {/* Item 1: Blue Icon */}
            <div className="flex items-center gap-4 p-4 border border-gray-50 hover:border-gray-100 rounded-2xl transition-all">
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-semibold text-lg flex-shrink-0">
                📄
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">Data Structures — Unit 3</p>
                <p className="text-sm text-gray-400">PDF · Shared by student</p>
              </div>
            </div>

            {/* Item 2: Green Icon */}
            <div className="flex items-center gap-4 p-4 border border-gray-50 hover:border-gray-100 rounded-2xl transition-all">
              <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center font-semibold text-lg flex-shrink-0">
                📄
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">Thermodynamics notes</p>
                <p className="text-sm text-gray-400">PDF · Shared by student</p>
              </div>
            </div>

            {/* Item 3: Orange Icon */}
            <div className="flex items-center gap-4 p-4 border border-gray-50 hover:border-gray-100 rounded-2xl transition-all">
              <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-semibold text-lg flex-shrink-0">
                📄
              </div>
              <div>
                <p className="text-base font-bold text-gray-900">Operating Systems Q&A</p>
                <p className="text-sm text-gray-400">PDF · Shared by student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing