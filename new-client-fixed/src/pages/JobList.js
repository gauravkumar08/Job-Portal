import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt. Ltd.",
    location: "Hyderabad, India",
    salary: "₹10-12 LPA",
    type: "Full-Time",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeCraft Inc.",
    location: "Remote",
    salary: "₹12-15 LPA",
    type: "Remote",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataCore Analytics",
    location: "Bangalore, India",
    salary: "₹8-10 LPA",
    type: "Full-Time",
  },
];

const JobList = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Jobs</h2>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded shadow p-5 bg-white hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {job.type}
              </span>
            </div>
            <p className="text-gray-800 font-medium">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-green-600 font-semibold">{job.salary}</p>
            <div className="mt-4">
              <Link
                to={`/jobs/${job.id}`}
                className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
