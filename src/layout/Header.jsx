import '../style/header.css'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import MyImage from "../assets/ChatGPT Image Sep 5, 2025, 12_37_00 PM.png"; // path relative to this file


function Navbar() {
  const [theme, setTheme] = useState("dark"); // default dark

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  return (

    // <h1>hlo this is the header file from my side </h1>
    <div className="navbar">
      <img className='logo-image' src={MyImage} alt="Example" width="300" />

      {/* Theme toggle */}
      
<div className='pagess'>
        <button className='dark-light'
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
         
        >
         Switch to {theme === "light" ? "Dark 🌙" : "Light ☀️"} Mode
        </button>

        {/* <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button> */}
      
      {/* <h1>hlo this is the header file from my side </h1> */}
      
        <Link className='home' to="/">Home</Link>

        <Link className='about' to="/about">About</Link>
        <Link className='contect' to="/contects">Contect Us</Link>
      </div>
    </div>
  )
}


export default Navbar