// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();
//   const [job, setJob] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//     salary: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setJob({ ...job, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post("http://localhost:5000/api/jobs", job, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("✅ Job posted successfully!");
//       navigate("/jobs");
//     } catch (err) {
//       console.error("❌ Job post error:", err);
//       alert(err.response?.data?.message || "Job posting failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-bold text-center mb-6">📋 Post a New Job</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Job Title"
//           value={job.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="company"
//           placeholder="Company Name"
//           value={job.company}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={job.location}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="salary"
//           placeholder="Salary (e.g. ₹5 LPA)"
//           value={job.salary}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Job Description"
//           value={job.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded h-32"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Posting..." : "Post Job"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RecruiterDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";

const RecruiterDashboard = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "", // Required by backend
  });

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...job,
      salary: Number(job.salary), // Ensures salary is numeric
    };

    try {
      const res = await axios.post("http://localhost:5000/api/jobs", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Job posted successfully!");
      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        jobType: "",
      });
      fetchJobs(); // Refresh job list
    } catch (err) {
      console.error("❌ Job post error:", err);
      alert(err.response?.data?.message || "Job posting failed.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Post Job Form */}
      <div className="bg-white p-6 shadow rounded mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">📋 Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary (e.g. ₹500000)"
            value={job.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* ✅ Job Type Dropdown */}
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
            value={job.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>

      {/* Posted Jobs List */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-xl font-semibold mb-4">🗂️ Your Posted Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="border p-4 rounded">
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="text-gray-700">
                  {job.company} | {job.location} | 💰 {job.salary} | 🕒 {job.jobType}
                </p>
                <p className="text-sm text-gray-500 mb-2">{job.description}</p>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;



