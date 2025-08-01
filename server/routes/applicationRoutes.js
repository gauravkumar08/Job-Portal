const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRecruiter } = require("../middleware/roleMiddleware");
const applicationController = require("../controllers/applicationController");
const upload = require("../middleware/uploadMiddleware");

// Applicant: get their own applications
router.get("/", verifyToken, applicationController.getApplications);

// Recruiter: get applications for jobs they posted
router.get("/recruiter", verifyToken, checkRecruiter, applicationController.getRecruiterApplications);

// Apply to job with resume upload
router.post(
  "/apply",
  verifyToken,
  upload.single("resume"),
  applicationController.applyToJob
);

// Recruiter updates application status
router.patch(
  "/:applicationId/status",
  verifyToken,
  checkRecruiter,
  applicationController.updateApplicationStatus
);

module.exports = router;
