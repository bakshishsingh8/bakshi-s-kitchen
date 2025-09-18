import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice"; // ✅ import login action

import sidephoto from "../assets/home-page.png";
import "../style/sign-in.css";

// ✅ Validation Schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: Yup.bool().oneOf([true], "You must accept terms & conditions"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => {
    // ✅ Save user info in Redux (simulate signup + login)
    dispatch(login({ email: data.email, firstName: data.firstName }));

    // ✅ Redirect to payment page
    navigate("/payment");
  };

  return (
    <div className="signup-backgound">
      <div className="signup-container">
        {/* Left Image Section */}
        <div className="signup-image">
          <button className="back-btn">Back to website →</button>
          <img src={sidephoto} alt="background" />
        </div>

        {/* Right Form Section */}
        <div className="signup-form">
          <h1>Create an account</h1>
          <p>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="name-inputs">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName")}
              />
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
              />
            </div>
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}

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
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            {/* <div className="checkbox">
              <input className="check-input" type="checkbox" {...register("terms")} />
              <p className="check-prg">
                I agree to the <a href="#">Terms & Conditions</a>
              </p>
            </div> */}
            {errors.terms && <p className="error">{errors.terms.message}</p>}

            <button className="create-btn" type="submit">
              Create account
            </button>
          </form>

          <div className="divider">
            <span></span> Or register with <span></span>
          </div>

          <div className="social-buttons">
            <button className="google-btn">
              <FaGoogle /> Google
            </button>
            <button className="apple-btn">
              <FaApple /> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

