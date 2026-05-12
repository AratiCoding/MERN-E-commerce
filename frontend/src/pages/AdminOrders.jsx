import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/orders");
    console.log("data:", data);
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, { orderStatus: status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await API.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-lg md:text-2xl">Orders Management</h2>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200 border">
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="p-2 border">
              <td className="p-2 border">{o.user?._id}</td>
              <td className="p-2 border">
                {o.user?.name || o.customerInfo?.name}
              </td>
              <td className="p-2 border">
                {o.orderItems.map((item) => (
                  <div key={item.product}>
                    {item.name} x {item.qty}
                  </div>
                ))}
              </td>

              <td className="p-2 border">₹{o.totalPrice}</td>

              <td className="p-2 border">
                {o.shippingAddress?.address}, {o.shippingAddress?.city}
              </td>

              <td className="p-2 border">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold
      ${
        o.orderStatus === "Pending"
          ? "bg-yellow-100 text-yellow-600"
          : o.orderStatus === "Shipped"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600"
      }
    `}
                >
                  {o.orderStatus}
                </span>
              </td>

              <td className="p-2 border">
                <button onClick={() => deleteOrder(o._id)}>
                  <svg
                    class="w-6 h-6 text-red-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
