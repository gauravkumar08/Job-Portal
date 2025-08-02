const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "under review", "accepted", "rejected"],
      default: "applied",
    },
    resume: {
      type: String, // resume file path (if using upload)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
