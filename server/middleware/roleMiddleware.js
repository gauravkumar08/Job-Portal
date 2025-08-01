const User = require("../models/User");

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (user && user.role === requiredRole) {
        next();
      } else {
        return res.status(403).json({ message: `Access denied, ${requiredRole} role required` });
      }
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
};

// Export both generic checkRole and a pre-configured checkRecruiter middleware
const checkRecruiter = checkRole("recruiter");

module.exports = { checkRole, checkRecruiter };
