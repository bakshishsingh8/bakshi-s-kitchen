import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import Signup from "./pages/sign-up.jsx";
import Login from "./pages/login.jsx";
import FrontPage from "./components/FrontPage.jsx";
import Footer from "./components/footer.jsx";
import MenuPage from "./components/MenuPage.jsx";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Navbar from "./layout/Header.jsx";
import About from "./components/about.jsx";
import Payment from "./components/payment.jsx";
import { login } from "./redux/auth/authSlice";

// ✅ PrivateRoute Component
function PrivateRoute({ children }) {
  const storedUser =localStorage.getItem("authToken");
  console.log(storedUser,'get stre')
  return storedUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ On app load, sync Redux with localStorage user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.token) {
      dispatch(login({ email: storedUser.email }));
    }
  }, [dispatch]);

  // Hide Navbar & Footer on these pages
  const hideLayout = ["/signup", "/payment", "/login"].includes(location.pathname);

  return (
    <CartProvider>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/CC" element={<FrontPage />} />
        <Route path="/menu/:id" element={<MenuPage />} />
        <Route path="/about" element={<About />} />

        {/* ✅ Protected Payment Page */}
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </CartProvider>
  );
}
