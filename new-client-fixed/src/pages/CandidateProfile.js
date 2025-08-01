import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setForm(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch("http://localhost:5000/api/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">Failed to load user.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Candidate Profile</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="font-semibold">Full Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        ) : (
          <p>{user.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="font-semibold">Email:</label>
        <p>{user.email}</p>
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="font-semibold">Phone:</label>
        {editMode ? (
          <input
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        ) : (
          <p>{user.phone || "Not provided"}</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4">
        <label className="font-semibold">Skills (comma-separated):</label>
        {editMode ? (
          <input
            type="text"
            name="skills"
            value={form.skills?.join(", ") || ""}
            onChange={(e) =>
              setForm({
                ...form,
                skills: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border rounded p-2"
          />
        ) : (
          <ul className="list-disc list-inside">
            {user.skills?.length > 0 ? (
              user.skills.map((skill, idx) => <li key={idx}>{skill}</li>)
            ) : (
              <li>No skills listed</li>
            )}
          </ul>
        )}
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="font-semibold">About Me:</label>
        {editMode ? (
          <textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={3}
          />
        ) : (
          <p>{user.bio || "No bio provided"}</p>
        )}
      </div>

      {/* Save Button */}
      {editMode && (
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default CandidateProfile;
