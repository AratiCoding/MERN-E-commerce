import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import CartSidebar from "./CartSidebar";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between py-2 px-4 bg-gray-800 text-white relative">
      <Link to="/" className="flex items-center">
        <img
          src="/images/krishna-logo-without-bg.png"
          alt="Digital Shop Krishna Logo"
          className="h-16 w-auto object-contain hover:opacity-90 transition-opacity rounded-2xl"
        />
      </Link>

      <div className="flex gap-4 items-center">
        {/* Cart */}
        {user?.role === "user" && (
          <button onClick={() => setIsCartOpen(true)} className="relative">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            {/* Badge */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        )}

        {/* Admin */}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {/* Auth */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Circle */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer text-white font-bold mx-2"
            >
              {user.email.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50 overflow-hidden">
                {/* Email */}
                <div className="px-4 py-2 border-b text-sm text-gray-700">
                  {user.email}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 px-4 py-2 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Navbar;
