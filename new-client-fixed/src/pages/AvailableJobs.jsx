// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AvailableJobs = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/jobs");
//         setJobs(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching jobs:", err);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleApply = async (jobId, jobTitle) => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.post(
//         "http://localhost:5000/api/applications",
//         { jobId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert(`✅ You applied for ${jobTitle}`);
//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Failed to apply.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>
//       {jobs.length === 0 ? (
//         <p className="text-gray-600 text-center">No jobs found</p>
//       ) : (
//         <ul className="space-y-6">
//           {jobs.map((job) => (
//             <li
//               key={job._id}
//               className="p-6 border rounded-lg bg-white shadow-md relative"
//             >
//               <h3 className="text-xl font-bold text-blue-700">{job.title}</h3>
//               <p className="font-semibold text-gray-800">{job.company}</p>
//               <p className="text-sm text-gray-600">{job.location}</p>
//               <p className="text-green-600 font-semibold">
//                 ₹{job.salary} LPA
//               </p>
//               <p className="text-sm mt-2 text-gray-700">{job.description}</p>
//               <span className="absolute top-6 right-6 text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
//                 {job.jobType}
//               </span>
//               <button
//                 onClick={() => handleApply(job._id, job.title)}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Apply Now
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AvailableJobs;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesType = jobTypeFilter
        ? job.jobType === jobTypeFilter
        : true;

      return matchesSearch && matchesType;
    });

    setFilteredJobs(filtered);
  }, [search, jobTypeFilter, jobs]);

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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, company, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-2 rounded"
        />
        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="w-full md:w-1/4 border p-2 rounded"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {/* 🧾 Job Listings */}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-600 text-center">No jobs match your search</p>
      ) : (
        <ul className="space-y-6">
          {filteredJobs.map((job) => (
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
