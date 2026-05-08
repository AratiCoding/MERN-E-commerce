const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const Category = require("./models/Category");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const categoriesData = [
  { name: "Mobile" },
  { name: "Laptop" },
  { name: "Shoes" },
  { name: "Clothing" },
];

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Old data removed");

    // Insert categories
    const createdCategories = await Category.insertMany(categoriesData);

    console.log("Categories added");

    // Create 100 products
    const products = [];

    for (let i = 1; i <= 100; i++) {
      const randomCategory =
        createdCategories[Math.floor(Math.random() * createdCategories.length)];

      products.push({
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        price: Math.floor(Math.random() * 5000) + 500,
        image: "https://via.placeholder.com/150",
        category: randomCategory._id,
        stock: Math.floor(Math.random() * 50) + 1,
      });
    }

    await Product.insertMany(products);

    console.log("100 Products inserted");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();