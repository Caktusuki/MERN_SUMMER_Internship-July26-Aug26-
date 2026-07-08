import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-10 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
          <p className="mt-2 text-gray-500 text-sm">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md mb-6">
            <p className="text-sm text-green-700 font-medium">
              Thank you for contacting us! We will get back to you shortly.
            </p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
              placeholder="Write your query here..."
              value={formData.message}
              onChange={onChange}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm disabled:bg-purple-400 flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
