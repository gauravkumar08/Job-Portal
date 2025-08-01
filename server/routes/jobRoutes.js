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
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ✅ Post a new job (recruiter only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Post job error:", err);
    res.status(500).json({ message: "Failed to post job" });
  }
});

// ✅ Get jobs posted by current recruiter
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your jobs" });
  }
});

// ✅ Delete job (recruiter only)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized or job not found" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

module.exports = router;
