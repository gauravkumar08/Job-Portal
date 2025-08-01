// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },


//   role: { type: String, enum: ["applicant", "recruiter"], default: "applicant" },

//   bio: { type: String, default: "" },
//   linkedInUrl: { type: String, default: "" },
//   skills: { type: [String], default: [] },
//   walletAddress: { type: String, default: "" },
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);





// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   bio: String,
//   linkedInUrl: String,
//   skills: [String],
//   walletAddress: String
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    bio: { type: String, default: "" },
    linkedInUrl: { type: String, default: "" },
    skills: { type: [String], default: [] },
    walletAddress: { type: String, default: "" },
    similarityScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

