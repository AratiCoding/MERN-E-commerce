const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// Protected route (user)
router.get("/user", protect, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user,
  });
});

// Admin route
router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

module.exports = router;