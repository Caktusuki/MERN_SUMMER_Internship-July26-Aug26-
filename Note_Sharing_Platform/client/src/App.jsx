import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadNote from "./pages/UploadNote";
import NoteDetails from "./pages/NoteDetails";
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import Premium from "./pages/Premium";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#faf9f6] flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/features" element={<Features />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;