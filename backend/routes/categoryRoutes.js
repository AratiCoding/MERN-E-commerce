const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const upload = require("../middleware/uploadMiddleware");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/")
  .get(getCategories)
  .post(protect, admin, upload.single("image"), createCategory);

router.route("/:id")
  .put(protect, admin, upload.single("image"), updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;