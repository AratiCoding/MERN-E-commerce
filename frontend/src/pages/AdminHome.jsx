function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-200">Users</div>
        <div className="p-4 bg-green-200">Products</div>
        <div className="p-4 bg-yellow-200">Orders</div>
      </div>
    </div>
  );
}

export default AdminHome;