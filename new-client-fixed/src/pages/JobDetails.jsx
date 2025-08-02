import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
      <p className="text-lg font-semibold">{job.company}</p>
      <p className="text-gray-700 mb-2">{job.location}</p>
      <p className="text-green-600 font-semibold mb-4">₹{job.salary} LPA</p>
      <p className="text-gray-800">{job.description}</p>
      <p className="text-sm mt-4 text-gray-600">Type: {job.jobType}</p>
    </div>
  );
};

export default JobDetails;
