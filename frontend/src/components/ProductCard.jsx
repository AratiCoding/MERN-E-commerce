import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [showModal, setShowModal] = useState(false);

  //  Check if already in cart
  const isInCart = cartItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      
      navigate("/login");
      return;
    }

    dispatch(addToCart(product));
  };

  return (
    <>
      <div className="border p-4 rounded shadow">
        {/*  Image Click → Modal */}
        <img
        src={
    product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${product.image}`
      : "https://via.placeholder.com/150"
  }
          alt={product.name}
          className="w-full h-40 object-cover cursor-pointer"
          onClick={() => setShowModal(true)}
        />

        <h3 className="text-lg mt-2">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>

        {/*  Button UI change */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`mt-2 px-3 py-1 text-white rounded-sm ${
            isInCart ? "bg-green-500 cursor-not-allowed" : "bg-violet-900"
          }`}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
      </div>

      {/*  Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded w-96 relative">
            {/* Close */}
            <button
              className="absolute top-2 right-2 text-lg"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <img
  src={
    product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${product.image}`
      : "https://via.placeholder.com/150"
  }
              alt={product.name}
              className="w-full h-48 object-cover mb-3"
            />

            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mb-2">₹{product.price}</p>

            <p className="text-sm text-gray-500">
              {product.description || "No description available"}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`mt-2 px-3 py-1 text-white rounded-sm ${
            isInCart ? "bg-green-500 cursor-not-allowed" : "bg-violet-900"
          }`}
            >
              {isInCart ? "Already in Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;