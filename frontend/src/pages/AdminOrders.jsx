import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/orders");
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
    <div className="p-5">

      <h2 className="text-xl font-bold mb-4">Orders Management</h2>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>

              {o.user?.name || o.customerInfo?.name}


              <td>
                {o.orderItems.map((item) => (
                  <div key={item.product}>
                    {item.name} x {item.qty}
                  </div>
                ))}
              </td>

              <td>₹{o.totalPrice}</td>

              <td>
                {o.shippingAddress?.address}, {o.shippingAddress?.city}
              </td>

              <td>
                <select
                  value={o.orderStatus}
                  onChange={(e) =>
                    updateStatus(o._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => deleteOrder(o._id)}
                  
                >
                       <svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
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