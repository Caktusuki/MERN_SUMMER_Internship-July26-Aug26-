import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function UploadNote() {
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Computer Science',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { title, subject, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title || !subject || !file) {
      return setError('Please provide a title, select a subject, and attach a file.');
    }

    setLoading(true);
    // Simulate API file upload
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="mb-8">
          <Link to="/home" className="text-sm font-semibold text-purple-600 hover:text-purple-500 flex items-center gap-1.5 mb-2">
            ← Back to Dashboard
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">Upload Your Study Notes</h2>
          <p className="mt-1 text-gray-500 text-sm">
            Share your knowledge. Upload PDFs, presentations, or documents.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6">
            <div className="flex">
              <span className="text-red-400">⚠️</span>
              <p className="ml-3 text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md mb-6">
            <div className="flex">
              <span className="text-green-500">✅</span>
              <p className="ml-3 text-sm text-green-700 font-medium">
                Note uploaded successfully! Redirecting back to dashboard...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Note Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm placeholder-gray-400"
                placeholder="e.g. Database Management Systems Unit 2"
                value={title}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Subject Category
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
                value={subject}
                onChange={onChange}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm placeholder-gray-400"
                placeholder="Briefly describe what this note covers..."
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                File Attachment (PDF / Document)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 transition-colors">
                <div className="space-y-1 text-center">
                  <span className="text-3xl">📄</span>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        className="sr-only"
                        onChange={onFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-400">PDF, DOC, PPT up to 10MB</p>
                  {file && (
                    <p className="text-sm font-semibold text-purple-600 mt-2">
                      📎 Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <Link
              to="/home"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors disabled:bg-purple-400 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadNote;