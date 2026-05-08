const express = require("express");
const router = express.Router();
const { createOrder, getOrders,  updateOrder, deleteOrder } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");
// Create order
router.post("/", protect, createOrder);

// ADMIN
router.get("/", protect, admin, getOrders);
router.put("/:id", protect, admin, updateOrder);
router.delete("/:id", protect, admin, deleteOrder)

module.exports = router;