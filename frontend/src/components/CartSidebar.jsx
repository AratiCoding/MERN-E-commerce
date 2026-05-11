import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../features/cartSlice";

import { useNavigate } from "react-router-dom";
function CartSidebar({ isOpen, onClose }) {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
const navigate = useNavigate();
  //  Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between border-b bg-gray-800 text-white">
          <h2 className="text-lg font-bold flex">  <svg 
      className="w-6 h-6 text-gray-200 mx-1" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="1.5" 
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg><span>Cart</span></h2>
          <button onClick={onClose}>X</button>
        </div>

        {/* Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">

  <div className="bg-gray-100 p-4 rounded-full mb-4">
    <svg 
      className="w-12 h-12 text-gray-300" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="1.5" 
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  </div>

  <h3 className="text-gray-800 font-semibold text-lg">Your cart is empty</h3>
  <p className="text-gray-500 text-sm mt-1">
    Looks like you haven't added anything to your cart yet.
  </p>
  
  
</div>
          ) : (
            cartItems.map((item) => (
  <div key={item._id} className="border p-2 mb-3 rounded">

    <div className="flex items-center justify-between mb-1">
 <h3 className="text-gray-800 font-semibold">
      {item.name}
    </h3>

    <p className="text-gray-600 ">
      ₹{item.price}
    </p>

    </div>
   
    <div className="flex items-center justify-between">

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => dispatch(decreaseQty(item._id))}
          className="bg-gray-300 px-2 rounded-sm"
        >
          -
        </button>

        <span className="font-semibold  text-gray-800">{item.qty}</span>

        <button
          onClick={() => dispatch(increaseQty(item._id))}
          className="bg-gray-300 px-2 rounded-sm"
        >
          +
        </button>

      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch(removeFromCart(item._id))}
        className="text-red-600 text-sm"
      >
              <svg class="w-5 h-5 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
      </button>
    </div>

  </div>
))
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t p-4 bg-white">
          <div className="flex justify-between font-bold text-lg mb-3 text-gray-800">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
           onClick={() => {
    onClose();
    navigate("/checkout");
  }}
          className="w-full bg-violet-900 text-white py-2 rounded-sm">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;