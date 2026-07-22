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
    <main className="auth">
      <div className="auth-card">
        <div className="auth-head">
          <h1>Get in Touch</h1>
          <p>Have questions or feedback? We'd love to hear from you.</p>
        </div>

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md mb-6">
            <p className="text-sm text-green-700 font-medium">
              Thank you for contacting us! We will get back to you shortly.
            </p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@university.edu"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              placeholder="Write your query here..."
              value={formData.message}
              onChange={onChange}
            ></textarea>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <p className="fine-print">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </main>
  );
}

export default Contact;
