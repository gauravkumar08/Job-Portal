import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("❌ Error fetching job details:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center mt-10">⏳ Loading...</p>;

  if (!job) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <p className="text-red-600 text-lg">❌ Job not found</p>
        <Link
          to="/jobs"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          🔙 Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-700 mb-1">
        {job.company} - {job.location}
      </p>
      <p className="text-green-600 font-semibold mb-4">
        ₹{job.salary} LPA • {job.jobType}
      </p>

      <h2 className="text-lg font-semibold mt-4">Job Description</h2>
      <p className="text-gray-800 mt-1">{job.description}</p>

      <h2 className="text-lg font-semibold mt-4">Requirements</h2>
      <ul className="list-disc list-inside text-gray-800 mt-1 space-y-1">
        <li>2+ years experience in relevant role</li>
        <li>Good communication skills</li>
        <li>Knowledge of required tech stack</li>
      </ul>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => alert("✅ You have applied for this job!")}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
