////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "../redux/auth/authSlice"; 
import { clearCart } from "../redux/counter/counterSlice"; // ✅ import clearCart
import "../style/payment.css";
import { Button, message } from "antd";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [messageApi, contextHolder] = message.useMessage();

  const cartItems = useSelector((state) => state.counter?.foodItem || []);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Restore Redux from localStorage
  useEffect(() => {
    const storedUser = (localStorage.getItem("authToken"));
    if (storedUser) {
      // if (!isAuthenticated) {
        // dispatch(login({ email: storedUser.email }));
      // }
    } else {
      console.log("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isCartEmpty = cartItems.length === 0;

  // ✅ Handle Payment
  const handleConfirmPayment = () => {
    let token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!isCartEmpty) {
      messageApi.open({
        type: "success",
        content: "🎉 Payment Successful!",
        className: "custom-class"
      });

      // ✅ Clear cart after successful payment
      dispatch(clearCart());

      // ✅ Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  console.log("Payment component rendered. Cart items:");

  return (
    <div className="payment-container">
      {contextHolder}

      <div className="payment-card">
        <h2 className="text-2xl font-bold text-white-800 mb-6 text-center">
          Bakshi's Kitchen - Payment
        </h2>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {isCartEmpty ? (
            <p className="text-red-600 font-semibold">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.childId}
                className="flex justify-between text-gray-700"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          )}
          {!isCartEmpty && (
            <div className="flex justify-between text-gray-900 font-bold mt-2 border-t pt-2">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        {!isCartEmpty && (
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="space-y-3">

              <label className="radio-input flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="p-input">Credit / Debit Card</span>
              </label>

              <label className="radio-input flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="p-input">UPI (Google Pay / PhonePe / Paytm)</span>
              </label>

              <label className="radio-input flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="p-input">Cash on Delivery</span>
              </label>

            </div>
          </div>
        )}

        {/* Payment Details */}
        {!isCartEmpty && paymentMethod === "card" && (
          <div className="mb-6 text-[#1f2937]">
            <h3>Card Details</h3>
            <input type="text" placeholder="Card Number" />
            <div className="flex gap-3">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>
          </div>
        )}

        {!isCartEmpty && paymentMethod === "upi" && (
          <div className="mb-6">
            <h3>UPI ID</h3>
            <input type="text" placeholder="yourname@upi" />
          </div>
        )}

        <Button
          type="primary"
          disabled={isCartEmpty}
          className="confirm-btn"
          onClick={()=>handleConfirmPayment()}
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
}

export default Payment;
