import { Link } from 'react-router-dom';

function Premium() {
  return (
    <div className="flex-1 bg-gray-50/50 py-24 px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-blue-600">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          Premium
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Take your studies further
        </h2>
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          Start free. Upgrade whenever unlimited downloads and<br />
          priority processing start to matter.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Free Plan Card */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Free</h3>
              <p className="text-sm text-gray-400 mt-1">Good for getting started.</p>
            </div>
            
            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-400 text-sm ml-2">/ month</span>
            </div>

            <ul className="space-y-3.5 pt-4 border-t border-gray-50">
              {['5 downloads a month', 'Standard upload speed', 'Browse peer reviews'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="text-blue-600">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <Link
              to="/register"
              className="block text-center w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm"
            >
              Continue free
            </Link>
          </div>
        </div>

        {/* Pro Plan Card */}
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 shadow-md flex flex-col justify-between relative">
          {/* Best Value Badge */}
          <div className="absolute -top-3.5 right-6 bg-[#0f172a] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Best value
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pro</h3>
              <p className="text-sm text-gray-400 mt-1">Perfect for active college students.</p>
            </div>

            <div className="flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">$4.99</span>
              <span className="text-gray-400 text-sm ml-2">/ month</span>
            </div>

            <ul className="space-y-3.5 pt-4 border-t border-gray-50">
              {[
                'Unlimited note downloads',
                'Ad-free experience',
                'Early access to peer reviews',
                'Priority upload processing',
                'Verified badge on profile'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="text-blue-600">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <Link
              to="/register"
              className="block text-center w-full bg-[#1e293b] text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-sm"
            >
              Upgrade to premium
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Premium;
