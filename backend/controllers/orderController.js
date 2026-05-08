const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
   const { orderItems, shippingAddress, totalPrice, paymentMethod, customerInfo } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      orderItems,   
      shippingAddress,
      totalPrice,
      customerInfo,
      paymentMethod,
      user: req.user._id 
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS (ADMIN)
const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// UPDATE ORDER STATUS
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.orderStatus || order.orderStatus;

      if (req.body.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
      }

      if (req.body.isDelivered) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };