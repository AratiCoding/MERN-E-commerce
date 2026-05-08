const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name required"],
      unique: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);