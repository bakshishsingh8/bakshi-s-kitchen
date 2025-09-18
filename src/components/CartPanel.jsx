import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { incQty, decQty, removeItem, clearCart } from "../redux/counter/counterSlice";

export default function CartPanel() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.counter.foodItem);
  const dispatch = useDispatch();
  console.log(cartItems, 'card item')
  const total = cartItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );

  return (
    <>
      {/* Floating Cart Button */}
      <button className="cart-toggle-btn" onClick={() => setOpen(!open)}>
        <ShoppingCart size={28} />
        {cartItems.length > 0 && (
          <span className="cart-badge">
            {cartItems.reduce((sum, it) => sum + it.quantity, 0)}
          </span>
        )}
      </button>

      {/* Sliding Cart Panel */}
      <div className={`cart-panel ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">No items added yet</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((it) => (
              <li key={it.childId} className="cart-row">
                <img className="cart-img" src={it.img} alt={it.name} />
                <div className="cart-meta">
                  <div className="cart-name">{it.name}</div>
                  <div className="cart-price">₹{it.price}</div>
                </div>
                <div className="cart-qty">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decQty(it.childId))}
                  >
                    -
                  </button>
                  <span className="qty-val">{it.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(incQty(it.childId))}
                  >
                    +
                  </button>
                </div>
                <div className="cart-line">₹{it.price * it.quantity}</div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            Total: <strong>₹{total}</strong>
          </div>
          <div className="cart-actions">
            <button
              className="clear-btn"
              disabled={cartItems.length === 0}
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </button>
            <button
              className="checkout-btn"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && <div className="cart-overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
}