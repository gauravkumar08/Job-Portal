// import React, { useState } from "react";

// function JobPostPage() {
//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     jobType: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Job posted:", form);
//     alert("Job posted successfully!");
//     setForm({ title: "", company: "", location: "", salary: "", description: "" });
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded p-8">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full border border-gray-300 p-3 rounded"
//           name="title"
//           type="text"
//           placeholder="Job Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="w-full border border-gray-300 p-3 rounded"
//           name="company"
//           type="text"
//           placeholder="Company Name"
//           value={form.company}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="w-full border border-gray-300 p-3 rounded"
//           name="location"
//           type="text"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="w-full border border-gray-300 p-3 rounded"
//           name="salary"
//           type="text"
//           placeholder="Salary (e.g. ₹10,00,000)"
//           value={form.salary}
//           onChange={handleChange}
//         />
//         <textarea
//           className="w-full border border-gray-300 p-3 rounded"
//           name="description"
//           rows="4"
//           placeholder="Job Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
//         >
//           Post Job
//         </button>
//       </form>
//     </div>
//   );
// }

// export default JobPostPage;

import React, { useState } from "react";
import axios from "axios";

const JobPostPage = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/jobs", {
        ...job,
        salary: Number(job.salary),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Job posted successfully!");
      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
      });
    } catch (err) {
      console.error("❌ Error posting job:", err);
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
          value={job.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={job.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={job.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          className="w-full p-2 border rounded"
          value={job.salary}
          onChange={handleChange}
          required
        />
        <select
          name="jobType"
          value={job.jobType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          className="w-full p-2 border rounded"
          value={job.description}
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
