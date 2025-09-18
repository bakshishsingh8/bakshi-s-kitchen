import { useState } from "react";
import "../style/about.css";

function About() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`about-page ${theme}`}>

      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Welcome to <span className="brand-name">Bakshi's Kitchen</span> 🍴
        </p>

        <p className="about-text">
          We believe food is more than just taste – it’s an experience. At{" "}
          <span className="brand-name">Bakshi's Kitchen</span>, we bring you
          freshly prepared dishes made with love, passion, and authentic
          ingredients.
        </p>

        <p className="about-text">
          Our journey started with a simple idea: serving food that makes you
          feel at home. Whether you’re craving something spicy 🌶️, sweet 🍰, or
          classic 🍔, we’ve got you covered.
        </p>

        <div className="about-highlights">
          <div className="highlight-card">✅ Fresh Ingredients</div>
          <div className="highlight-card">✅ Authentic Taste</div>
          <div className="highlight-card">✅ Customer First</div>
        </div>

        <p className="about-footer">
          Thank you for being part of our story 💖. We can’t wait to serve you!
        </p>
      </div>
    </div>
  );
}

export default About;