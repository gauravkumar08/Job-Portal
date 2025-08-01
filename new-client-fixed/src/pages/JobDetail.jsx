// src/pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    description: "Build beautiful UIs using React and Tailwind CSS.",
    requirements: [
      "2+ years experience in frontend development",
      "Knowledge of React and Tailwind",
      "Good communication skills"
    ],
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "CodeWorks",
    location: "Bangalore",
    description: "Develop scalable backend services using Node.js.",
    requirements: [
      "Strong knowledge of Node.js and MongoDB",
      "Experience with REST APIs",
      "Understanding of cloud infrastructure"
    ],
  }
];

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((job) => job.id === id);

  if (!job) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-2xl font-semibold">Job not found</h2>
        <button onClick={() => navigate("/jobs")} className="mt-4 text-blue-600 underline">
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-gray-600 mt-2">{job.company} - {job.location}</p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Job Description</h3>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Requirements</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {job.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => alert("Applied!")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
}

export default JobDetail;
