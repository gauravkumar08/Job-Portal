const Application = require("../models/JobApplication");

// Get applications submitted by the logged-in user (applicant)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "title company location")
      .sort({ createdAt: -1 });

    res.json({ message: "Applications fetched successfully", applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get applications for jobs posted by the logged-in recruiter
exports.getRecruiterApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "job",
        match: { postedBy: req.user.id },
        select: "title company location",
      })
      .populate("applicant", "name email");

    // Filter applications to only those where job postedBy matches recruiter
    const filtered = applications.filter(app => app.job !== null);

    res.json({ message: "Recruiter's job applications fetched", applications: filtered });
  } catch (error) {
    console.error("Error fetching recruiter applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Apply to a job with optional resume upload
exports.applyToJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const userId = req.user.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Check if user already applied
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    // Save resume file path if uploaded
    let resumeLink = "";
    if (req.file) {
      resumeLink = req.file.path; // Adjust if needed for your frontend URL
    }

    const newApplication = new Application({
      job: jobId,
      applicant: userId,
      resumeLink,
      coverLetter,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully", application: newApplication });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update application status by recruiter
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ["applied", "reviewing", "interview", "rejected", "hired"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
