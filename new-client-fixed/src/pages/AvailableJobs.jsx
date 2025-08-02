import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId, jobTitle) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`✅ You applied for ${jobTitle}`);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to apply.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs found</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-6 border rounded-lg bg-white shadow-md relative"
            >
              <h3 className="text-xl font-bold text-blue-700">{job.title}</h3>
              <p className="font-semibold text-gray-800">{job.company}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-green-600 font-semibold">
                ₹{job.salary} LPA
              </p>
              <p className="text-sm mt-2 text-gray-700">{job.description}</p>
              <span className="absolute top-6 right-6 text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
                {job.jobType}
              </span>
              <button
                onClick={() => handleApply(job._id, job.title)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableJobs;
