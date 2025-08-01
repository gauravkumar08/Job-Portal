const Job = require("../models/Job");

// @desc    Create a job (Recruiter only)
// @route   POST /api/jobs
// @access  Private
exports.createJob = async (req, res) => {
  try {
    // Only recruiters can post jobs
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    const { title, description, location, company, salary, jobType } = req.body;

    if (!title || !description || !location || !company || !salary || !jobType) {
      return res.status(400).json({ message: "All job fields are required" });
    }

    const job = new Job({
      title,
      description,
      location,
      company,
      salary,
      jobType,
      createdBy: req.user.id,
    });

    await job.save();

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs", error: err.message });
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err.message });
  }
};


// exports.getJobs = async (req, res) => {
//   try {
//     // Optional: Add filtering here based on query params (skill, location, etc.)
//     const jobs = await Job.find().populate("createdBy", "name email");
//     res.json({ jobs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };