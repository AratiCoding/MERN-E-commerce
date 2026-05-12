import { Link, Outlet } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaUsers, FaBoxOpen, FaTags, FaShoppingCart } from "react-icons/fa";

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col p-4">
        <div className="flex items-center gap-3 mb-4">
          <FaUser className="text-xl" />
          <h2 className="text-xl font-semibold">Admin</h2>
        </div>

        <div className="border-b mb-5"></div>

        <nav className="flex-1 overflow-y-auto flex flex-col gap-3">
          <Link to="/admin" className="flex items-center gap-4">
            <FaTachometerAlt className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link to="/admin/users" className="flex items-center gap-4">
            <FaUsers className="w-5 h-5" />
            <span>Users</span>
          </Link>

          <Link to="/admin/categories" className="flex items-center gap-4">
            <FaTags className="w-5 h-5" />
            <span>Categories</span>
          </Link>

          <Link to="/admin/products" className="flex items-center gap-4">
            <FaBoxOpen className="w-5 h-5" />
            <span>Products</span>
          </Link>

          <Link to="/admin/orders" className="flex items-center gap-4">
            <FaShoppingCart className="w-5 h-5" />
            <span>Orders</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;