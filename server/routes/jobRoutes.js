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


const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Get all jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Failed to fetch jobs:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ✅ Post a new job (recruiter only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    // 🔒 Basic validation (recommended)
    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const job = new Job({
      ...req.body,
      postedBy: req.user.id, // From verified token
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("❌ Error saving job:", err);
    res.status(500).json({ message: "Failed to post job" });
  }
});

// ✅ Get current recruiter's jobs
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("❌ Error fetching recruiter's jobs:", err);
    res.status(500).json({ message: "Failed to fetch your jobs" });
  }
});

// ✅ Delete a job
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

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

