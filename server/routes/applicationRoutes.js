const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRecruiter } = require("../middleware/roleMiddleware");
const applicationController = require("../controllers/applicationController");
const upload = require("../middleware/uploadMiddleware");

// ✅ Apply to a job (basic)
router.post("/", verifyToken, async (req, res) => {
  const { jobId } = req.body;
  const candidateId = req.user.id;

  try {
    // Prevent duplicate applications
    const existing = await Application.findOne({ jobId, candidateId });
    if (existing) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // Save new application
    const application = new Application({ jobId, candidateId });
    await application.save();

    res.status(201).json({ message: "Applied successfully" });
  } catch (err) {
    console.error("❌ Error applying:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get applications for current candidate
router.get("/", verifyToken, applicationController.getApplications);

// ✅ Get all applications for jobs posted by current recruiter
router.get("/recruiter", verifyToken, checkRecruiter, applicationController.getRecruiterApplications);

// ✅ Apply to a job with resume upload (optional)
router.post(
  "/apply",
  verifyToken,
  upload.single("resume"),
  applicationController.applyToJob
);

// ✅ Update application status (recruiter only)
router.patch(
  "/:applicationId/status",
  verifyToken,
  checkRecruiter,
  applicationController.updateApplicationStatus
);

module.exports = router;
