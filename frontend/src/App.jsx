import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminHome from "./pages/AdminHome";
import AdminCategories from "./pages/AdminCategories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
function App() {
  return (
    <Router>
        <Navbar />
         <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        
        <Route path="/" element={<Home />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route index element={<AdminHome />} />  
  <Route path="users" element={<AdminUsers />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="categories" element={<AdminCategories />} />
  <Route path="/admin/orders" element={<AdminOrders />} />
</Route>
      </Routes>
    </Router>
  );
}

export default App;