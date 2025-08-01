import React, { useState } from "react";
import axios from "axios";

const JobPostPage = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/jobs", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Job posted successfully!");
      setForm({ title: "", company: "", location: "", salary: "", description: "" });
    } catch (err) {
      console.error("Error posting job:", err);
      alert(err.response?.data?.message || "❌ Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">📢 Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="w-full p-2 border rounded"
          value={form.salary}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPostPage;
