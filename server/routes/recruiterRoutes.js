const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const Job = require("../models/Job");
const Application = require("../models/JobApplication");

router.get("/applications", verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title")
      .populate("applicant", "name email");

    res.json({ message: "Recruiter's applications fetched", applications });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
