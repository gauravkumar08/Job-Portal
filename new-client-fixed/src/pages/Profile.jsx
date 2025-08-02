import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      alert("Session expired or unauthorized. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">⏳ Loading profile...</p>;

  return user ? (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4">👤 Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "N/A"}</p>
      <p><strong>Resume Match Score:</strong> {user.similarityScore ?? 0}%</p>
      <p><strong>Registered On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  ) : (
    <p className="text-center mt-10 text-red-600">Failed to load profile.</p>
  );
};

export default Profile;

