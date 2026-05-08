const Category = require("../models/Category");

// CREATE
exports.createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  const created = await category.save();
  res.json(created);
};

// GET ALL
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// UPDATE
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;

    if (req.file) {
      category.image = `/uploads/${req.file.filename}`;
    }

    const updated = await category.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category removed" });
};