// const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   company: String,
//   location: String,
//   salary: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Job", jobSchema);

// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   company: { type: String, required: true },
//   salary: { type: Number, required: true },
//   jobType: { type: String, enum: ['full-time', 'part-time', 'contract', 'remote'], required: true },
//   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Job', jobSchema);

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [0, "Salary must be a positive number"],
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote'],
    required: [true, "Job type is required"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "PostedBy (recruiter ID) is required"],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);

