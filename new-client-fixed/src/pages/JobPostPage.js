import React, { useState } from "react";

function JobPostPage() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job posted:", form);
    alert("Job posted successfully!");
    setForm({ title: "", company: "", location: "", salary: "", description: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border border-gray-300 p-3 rounded"
          name="title"
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 p-3 rounded"
          name="company"
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 p-3 rounded"
          name="location"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 p-3 rounded"
          name="salary"
          type="text"
          placeholder="Salary (e.g. ₹10,00,000)"
          value={form.salary}
          onChange={handleChange}
        />
        <textarea
          className="w-full border border-gray-300 p-3 rounded"
          name="description"
          rows="4"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default JobPostPage;
