// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");

// router.get("/", authMiddleware, (req, res) => {
//   res.json({ message: "Profile accessed", user: req.user });
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { verifyToken } = require("../middleware/authMiddleware");
// const User = require("../models/User");

// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json({
//       message: "Profile data fetched successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.patch("/", verifyToken, async (req, res) => {
//   try {
//     const updates = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.patch("/update-score", verifyToken, async (req, res) => {
//   try {
//     const { score } = req.body;

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.similarityScore = score;
//     await user.save();

//     res.json({ message: "Similarity score updated" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating score" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware"); // ✅ Correct import
const User = require("../models/User");

// ✅ GET: Fetch profile of the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PATCH: Update user profile fields like bio, phone, LinkedIn, etc.
router.patch("/", verifyToken, async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PATCH: Update similarity score (from Resume Analyzer)
router.patch("/update-score", verifyToken, async (req, res) => {
  try {
    const { score } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.similarityScore = score;
    await user.save();

    res.json({ message: "Similarity score updated" });
  } catch (error) {
    console.error("Update score error:", error);
    res.status(500).json({ message: "Error updating score" });
  }
});

module.exports = router;

