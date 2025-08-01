const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: { type: String },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ["applied", "reviewing", "interview", "rejected", "hired"],
    default: "applied"
  }
}, { timestamps: true });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
