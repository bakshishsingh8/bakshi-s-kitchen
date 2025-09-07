import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section">
          <h2 className="footer-logo">Bakshi’s Kitchen</h2>
          <p className="footer-text">
            Delicious meals made with love. Order now and enjoy the taste of perfection!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p><i className="fas fa-phone"></i> +91 98765 43210</p>
          <p><i className="fas fa-envelope"></i> info@bakshiskitchen.com</p>
          <p><i className="fas fa-map-marker-alt"></i> New Delhi, India</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section social-icons">
          <h3>Follow Us</h3>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Bakshi’s Kitchen. All Rights Reserved.</p>
      </div>
    </footer>
  );
}





// import { Link } from "react-router-dom";
// import "../style/footer.css";

// export default function Footer() {
//     return (
//         <footer className="footer">
//             <div className="footer-container">
//                 {/* Brand Section */}
//                 <div className="footer-brand">
//                     <h2>Bakshi’s Kitchen</h2>
//                     <p>Your one-stop destination for delicious food and quick delivery.</p>
//                 </div>

//                 {/* Quick Links */}
//                 <div className="footer-links">
//                     <h3>Quick Links</h3>
//                     <ul>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/menu">Menu</Link></li>
//                         <li><Link to="/about">About Us</Link></li>
//                         <li><Link to="/contact">Contact</Link></li>
//                     </ul>
//                 </div>

//                 {/* Contact Info */}
//                 <div className="footer-contact">
//                     <h3>Contact Us</h3>
//                     <p>Email: support@bakshiskitchen.com</p>
//                     <p>Phone: +91 98765 43210</p>
//                 </div>

//                 {/* Social Media */}
//                 <div className="footer-social">
//                     <h3>Follow Us</h3>
//                     <div className="social-icons">
//                         <a href="#"><i className="fab fa-facebook-f"></i></a>
//                         <a href="#"><i className="fab fa-instagram"></i></a>
//                         <a href="#"><i className="fab fa-twitter"></i></a>
//                         <a href="#"><i className="fab fa-youtube"></i></a>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer Bottom */}
//             <div className="footer-bottom">
//                 <p>© {new Date().getFullYear()} Bakshi’s Kitchen. All Rights Reserved.</p>
//             </div>
//         </footer>
//     );
// }
