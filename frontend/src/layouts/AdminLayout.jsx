import { Link, Outlet } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaUsers, FaBoxOpen, FaTags, FaShoppingCart, FaBars } from "react-icons/fa";
import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile header with hamburger */}
      <header className="md:hidden flex items-center justify-between bg-gray-800 text-white py-8 px-4 w-full fixed top-0 z-20">
        <div className="flex items-center gap-3">
          <FaUser className="text-xl" />
          <h2 className="text-xl font-semibold">Admin</h2>
        </div>
        <button onClick={toggleSidebar}>
          <FaBars className="text-2xl" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 w-64 h-full bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex md:flex-col md:h-full
          pt-16 md:pt-0
        `}
      >
        
        {/* Sidebar header for desktop only */}
        <div className="flex items-center gap-3 mb-4">
          <FaUser className="text-xl" />
          <h2 className="text-xl font-semibold">Admin</h2>
        </div>

        <div className="border-b mb-5"></div>

        {/* Sidebar nav links */}
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-5  mt-4 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;