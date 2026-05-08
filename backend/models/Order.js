const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
   },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },
    customerInfo: {
  name: String,
  phone: String,
},

paymentMethod: {
  type: String,
  default: "COD",
},
orderStatus: {
  type: String,
  default: "Pending", // Pending, Shipped, Delivered
},

paidAt: Date,
deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);