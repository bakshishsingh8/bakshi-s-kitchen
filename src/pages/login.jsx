import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import sidephoto from "../assets/home-page.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";   // ✅ import login action
import "../style/login.css";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: yupResolver(validationSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

   // ✅ Handle login
  const onSubmit = async (data) => {
    try {
      // Simulate backend call → normally you'd fetch token from API
      const fakeToken = "my-jwt-token-" + Date.now();

      // Save token in localStorage
      localStorage.setItem("authToken", fakeToken);

      // Save user in Redux
      dispatch(login({ email: data.email }));

      // Redirect user to payment page
      navigate("/payment");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // ✅ Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("Token found:", token);
      // If already logged in, redirect directly to payment page
      navigate("/payment");
    }
  }, [navigate]);


  return (
    <div className="Login-background">
      <div className="Login-container">
        
        {/* Left Image Section */}
        <div className="Login-image">
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to website →
          </button>
          <img src={sidephoto} alt="background" />
        </div>

        {/* Right Form Section */}
        <div className="Login-form">
          <h1>Welcome Back</h1>
          <p>
            Don't have an account?{" "}
            <Link className="link" to="/signup">Sign up</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <span onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}

            {/* Forgot Password */}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button className="create-btn" type="submit">Log in</button>
          </form>

          <div className="divider">
            <span></span> Or login with <span></span>
          </div>

          <div className="social-buttons">
            <button className="google-btn"><FaGoogle /> Google</button>
            <button className="apple-btn"><FaApple /> Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


