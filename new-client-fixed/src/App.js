import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobPostPage from "./pages/JobPostPage";
import CandidateProfile from "./pages/CandidateProfile";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import WalletConnect from "./components/WalletConnect";
import RecruiterDashboard from "./pages/RecruiterDashboard";

function HomePage() {
  return (
    <section className="text-center py-20 px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Job</h2>
      <p className="text-gray-600 text-lg mb-6">
        Connect with professionals, apply for jobs, and grow your career.
      </p>
      <div className="space-x-4">
        <Link to="/jobs">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Browse Jobs
          </button>
        </Link>
      </div>
    </section>
  );
}

// ❌ Access denied for unauthorized roles
const AccessDenied = () => (
  <div className="text-center mt-10 text-red-600 text-xl font-semibold">
    ❌ Access Denied. Recruiters only.
  </div>
);

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    // Watch changes to token/role in localStorage on mount or refresh
    const handleStorageChange = () => {
      setUserToken(localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserToken(null);
    setUserRole(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">JobConnect</h1>
          <div className="space-x-4 flex items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>

            {/* ✅ Recruiter-Only Links */}
            {userRole === "recruiter" && (
              <>
                <Link to="/post-job" className="text-gray-700 hover:text-blue-600">Post</Link>
                <Link to="/recruiter-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              </>
            )}

            <Link to="/resume-analyzer" className="text-gray-700 hover:text-blue-600">Analyzer</Link>

            {userToken && (
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            )}

            {/* Wallet Button */}
            <WalletConnect />

            {/* Auth Buttons */}
            {!userToken ? (
              <>
                <Link to="/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
                </Link>
                <Link to="/register">
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route
            path="/post-job"
            element={
              userToken && userRole === "recruiter" ? (
                <JobPostPage />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/recruiter-dashboard"
            element={
              userToken && userRole === "recruiter" ? (
                <RecruiterDashboard />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
