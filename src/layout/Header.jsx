import '../style/header.css';
import '../style/cart-toggle.css';
import '../style/cart-panel.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import MyImage from "../assets/ChatGPT Image Sep 5, 2025, 12_37_00 PM.png";
import { ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { incQty, decQty, clearCart } from "../redux/counter/counterSlice";
import { FaUserPlus } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const [openContactDropdown, setOpenContactDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuRef = useRef(null);
  const contactRef = useRef(null);

  const cartItems = useSelector((state) => state.counter.foodItem);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const location = useLocation();
  const activeCategoryId = location.pathname.startsWith("/menu/")
    ? location.pathname.split("/")[2]
    : null;

  // ✅ Detect outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuDropdown(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setOpenContactDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [location]); // runs when route changes

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <img className="logo-image" src={MyImage} alt="Example" width="300" />

        {/* Pages */}
        <div className="common-container">
          <div className="pagess">
            <Link className="home" to="/">Home</Link>
            <Link className="about" to="/about">About</Link>

            {/* Dropdown for Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => {
                  setOpenMenuDropdown(!openMenuDropdown);
                  setOpenContactDropdown(false);
                }}
                className="menu-qq"
              >
                Menu
              </button>
              {openMenuDropdown && (
                <div className="absolute top-11 mt-2 w-40 bg-white dark:bg-black-800 rounded-lg shadow-lg p-2">
                  <div
                    onClick={() => navigate("/menu/1")}
                    className={`menu-item ${activeCategoryId === "1" ? "active" : ""}`}
                  >
                    Fast Food
                  </div>
                  <div
                    onClick={() => navigate("/menu/2")}
                    className={`menu-item ${activeCategoryId === "2" ? "active" : ""}`}
                  >
                    Chinese Food
                  </div>
                  <div
                    onClick={() => navigate("/menu/3")}
                    className={`menu-item ${activeCategoryId === "3" ? "active" : ""}`}
                  >
                    Indian Food
                  </div>
                  <div
                    onClick={() => navigate("/menu/4")}
                    className={`menu-item ${activeCategoryId === "4" ? "active" : ""}`}
                  >
                    Italian Food
                  </div>
                  <div
                    onClick={() => navigate("/menu/5")}
                    className={`menu-item ${activeCategoryId === "5" ? "active" : ""}`}
                  >
                    Seafood
                  </div>
                  <div
                    onClick={() => navigate("/menu/6")}
                    className={`menu-item ${activeCategoryId === "6" ? "active" : ""}`}
                  >
                    Mughlai Food
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown for Contact Us */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => {
                  setOpenContactDropdown(!openContactDropdown);
                  setOpenMenuDropdown(false);
                }}
                className="contect"
              >
                <a>Contact Us</a>
              </button>
              {openContactDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">
                    <div className="social">Email: info@bakshiskitchen.com</div>
                  </div>
                  <div className="dropdown-item">
                    <div className="social">Phone: +91 98765 43210</div>
                  </div>
                  <div className="dropdown-item">
                    <div className="social">Location: New Delhi, India</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button
            id="cart-icon"
            className="cart-toggle"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart size={28} />
            {cartItems.length > 0 && (
              <span
                key={cartItems.reduce((sum, it) => sum + it.quantity, 0)}
                className="cart-badg"
              >
                {cartItems.reduce((sum, it) => sum + it.quantity, 0)}
              </span>
            )}
          </button>


          {/* ✅ Show Signup when not logged in */}
          {!isAuthenticated && (
            <Link className="singin" to="/signup">
              <button className="signup-btn">
                <FaUserPlus style={{ marginRight: "8px" }} />
              </button>
            </Link>
          )}

          {/* ✅ Show Logout when logged in */}
          {isAuthenticated && (
            <button
              className="logout-btn bg-red-500 text-white px-4 py-2 rounded-lg ml-3 "
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Sliding Cart Panel */}
        <div className={`cart-panel ${cartOpen ? "open" : ""}`}>
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="close-btn" onClick={() => setCartOpen(false)}>
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
                      className="text-black bg-amber-50 w-[23px] rounded-lg"
                      onClick={() => dispatch(decQty(it.childId))}
                    >
                      -
                    </button>
                    <span className="qty-val">{it.quantity}</span>
                    <button
                      className="text-black bg-amber-50 w-[23px] rounded-lg"
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

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                Total: <strong>₹{total}</strong>
              </div>
              <div className="cart-actions">
                <button
                  className="bg-amber-100 text-black w-[70px] rounded-lg h-[30px]"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear
                </button>
                <Link to="payment">
                  <button className="bg-[#9da4de] text-black w-[100px] rounded-lg h-[30px]">
                    Payment
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
