import { useSelector, useDispatch } from "react-redux";
import API from "../services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";

function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    paymentMethod: "COD",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        orderItems: cartItems,
        shippingAddress: {
          address: form.address,
          address2: form.address2,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        totalPrice,
        customerInfo: {
          name: form.name,
          phone: form.phone,
        },
      };

      await API.post("/orders", orderData);

      toast.success("Order placed successfully");
      dispatch(clearCart());
    } catch (error) {
      toast.error("Order failed");
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Customer Info */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2">Customer Details</h3>

        <input
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-2 w-full"
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2">Shipping Address</h3>

        <input
          name="address"
          placeholder="Address Line 1"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="address2"
          placeholder="Address Line 2 (Optional)"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            name="city"
            placeholder="City"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            className="border p-2"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <input
            name="postalCode"
            placeholder="PIN Code"
            className="border p-2"
            onChange={handleChange}
          />

          <input
            name="country"
            value={form.country}
            className="border p-2"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Payment */}
      <div className="mb-5">
        <h3 className="font-semibold mb-2">Payment Method</h3>

        <select
          name="paymentMethod"
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
        </select>
      </div>

      {/* Summary */}
      <div className="mb-5 border p-3 rounded">
        <h3 className="font-semibold mb-2">Order Summary</h3>

        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={placeOrder}
        className="w-full bg-violet-900 text-white py-3 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;