// const express = require("express");
// const router = express.Router();
// const jobController = require("../controllers/jobController");
// const { verifyToken } = require("../middleware/authMiddleware");
// const { checkRole } = require("../middleware/roleMiddleware"); // Note the {}

// router.post("/", verifyToken, checkRole("recruiter"), jobController.createJob);

// router.get("/", jobController.getAllJobs);
// router.get("/:id", jobController.getJobById);
// router.get("/feed", verifyToken, jobController.getJobs);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jobController = require("../controllers/jobController");
// const { verifyToken } = require("../middleware/authMiddleware");
// const { checkRole } = require("../middleware/roleMiddleware");


// router.post("/", verifyToken, checkRole("recruiter"), jobController.createJob);


// router.get("/", jobController.getAllJobs);

// router.get("/feed", verifyToken, jobController.getAllJobs); 

// router.get("/:id", jobController.getJobById);


// router.get("/my-jobs", authMiddleware, async (req, res) => {
//   try {
//     const recruiterId = req.user.id;
//     const jobs = await Job.find({ postedBy: recruiterId });
//     res.json(jobs);
//   } catch (err) {
//     console.error("❌ Error fetching recruiter's jobs:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// module.exports = router;


// routes/jobRoutes.js

const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Get job by ID (MUST come before /:id routes like /my-jobs or /delete)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error("❌ Error fetching job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Failed to fetch jobs:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ✅ Create job
router.post("/", verifyToken, async (req, res) => {
  const { title, company, location, salary, jobType, description } = req.body;
  if (!title || !company || !location || !salary || !jobType || !description) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  try {
    const job = new Job({
      title,
      company,
      location,
      salary: Number(salary),
      jobType,
      description,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("❌ Error saving job:", err);
    res.status(500).json({ message: "Failed to post job" });
  }
});

// ✅ Recruiter's own jobs
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Error fetching recruiter's jobs:", err);
    res.status(500).json({ message: "Failed to fetch your jobs" });
  }
});

// ✅ Delete job
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting job:", err);
    res.status(500).json({ message: "Failed to delete job" });
  }
});

module.exports = router;

