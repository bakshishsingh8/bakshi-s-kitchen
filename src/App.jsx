import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { login } from "./redux/auth/authSlice"; // ✅ import login action
import CommonAPI from "./APIs/CommonAPi.jsx";

// ✅ PrivateRoute Component
function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("authToken"); // check token from storage

  return isAuthenticated && token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ On app load, sync Redux with localStorage token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // If token exists, set Redux auth state
      dispatch(login({ email: "user@email.com" })); 
      // you can later decode token or fetch profile instead of hardcoding
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

        {/* ✅ Protect Payment Page */}
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
        <CommonAPI/>

      {!hideLayout && <Footer />}
    </CartProvider>
  );
}
