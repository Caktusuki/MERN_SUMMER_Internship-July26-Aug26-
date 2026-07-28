import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
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
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Chatbot from "./components/Chatbot";

function NavigationWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/dashboard", "/home", "/profile", "/upload", "/notes"];
  const shouldHide = hideNavbarPaths.some((path) => location.pathname.startsWith(path));

  if (shouldHide) return null;
  return <Navbar />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#faf9f6] flex flex-col">
        <NavigationWrapper />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/features" element={<Features />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadNote /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;