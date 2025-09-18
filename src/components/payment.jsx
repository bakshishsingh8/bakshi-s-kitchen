import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/auth/authSlice"; // ✅ import login action
import "../style/payment.css";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPopup, setShowPopup] = useState(false);

  const cartItems = useSelector((state) => state.counter?.foodItem || []);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Check localStorage & restore Redux before redirecting
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      if (!isAuthenticated) {
        // Restore Redux login from token
        dispatch(login({ email: "saved@email.com" }));
      }
    } else {
      // No token → force login
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isCartEmpty = cartItems.length === 0;

  const handleConfirmPayment = () => {
    if (!isCartEmpty) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="payment-container">
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

              <div className="radio-input">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                 <p className="p-input">Credit / Debit Card</p>
              </div>


              <div className="radio-input">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <p className="p-input"> UPI (Google Pay / PhonePe / Paytm)</p>
              </div>


              <div className="radio-input">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
               <p className="p-input"> Cash on Delivery</p>
              </div>

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

        <button
          disabled={isCartEmpty}
          className="confirm-btn"
          onClick={handleConfirmPayment}
        >
          Confirm Payment
        </button>

        {showPopup && (
          <div className="payment-popup">🎉 Thank you for your payment!</div>
        )}
      </div>
    </div>
  );
}

export default Payment;

