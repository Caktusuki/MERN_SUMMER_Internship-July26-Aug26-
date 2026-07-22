import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";

const SUBJECTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Business & Economics",
  "Biology",
  "Other",
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");

  const handleFiles = (files) => {
    if (files && files[0]) setFile(files[0]);
  };

  const finalSubject = subject === "Other" ? customSubject : subject;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("subject", finalSubject);
      if (course.trim()) formData.append("course", course.trim());
      formData.append("description", description);

      const res = await fetch("/api/notes", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Upload failed. Please try again.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      setError("Couldn't reach the server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = file && title && finalSubject;

  return (
    <>
      <AppNavbar />
      <main className="app-main narrow">
        <h1 className="app-h1">Upload a note</h1>
        <p className="app-sub">Share your notes with classmates in under a minute.</p>

        {error && <p className="auth-error">{error}</p>}

        <form className="upload-form" onSubmit={handleSubmit}>
          <div
            className={`dropzone ${dragOver ? "dropzone-active" : ""} ${file ? "dropzone-filled" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => handleFiles(e.target.files)}
            />
            {file ? (
              <>
                <div className="dropzone-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#3D5AF1" strokeWidth="1.7" strokeLinejoin="round" /><path d="M15 2v5h5" stroke="#3D5AF1" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                </div>
                <div className="dropzone-filename">{file.name}</div>
                <div className="dropzone-hint">Click to replace file</div>
              </>
            ) : (
              <>
                <div className="dropzone-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 4v11m0-11 4 4m-4-4-4 4" stroke="#3D5AF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="#3D5AF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="dropzone-filename">Drag & drop your file here</div>
                <div className="dropzone-hint">or click to browse — PDF, DOC, PPT up to 25MB</div>
              </>
            )}
          </div>

          <div className="field">
            <label htmlFor="title">Note title</label>
            <input type="text" id="title" placeholder="e.g. Data Structures — Unit 3" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required>
              <option value="" disabled>Select a subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {subject === "Other" && (
            <div className="field">
              <label htmlFor="customSubject">Subject name</label>
              <input type="text" id="customSubject" placeholder="e.g. Architecture" value={customSubject} onChange={(e) => setCustomSubject(e.target.value)} required />
            </div>
          )}

          <div className="field">
            <label htmlFor="course">Course code <span className="field-optional">(optional)</span></label>
            <input type="text" id="course" placeholder="e.g. CS201" value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="desc">Description</label>
            <textarea id="desc" rows="4" placeholder="What's covered in these notes?" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <button type="submit" className="btn-submit" disabled={!canSubmit || loading}>
            {loading ? "Uploading..." : submitted ? "Uploaded ✓" : "Upload note"}
          </button>
          {!canSubmit && <p className="field-hint">Add a file, title, and subject to enable upload.</p>}
        </form>
      </main>
    </>
  );
}
