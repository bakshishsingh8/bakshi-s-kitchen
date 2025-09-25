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
            {/* <li><a href="//menu/:id">Menu</a></li> */}
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
          <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a href="https://x.com/?lang=en"><i className="fab fa-twitter"></i></a>
          <a href="https://www.youtube.com"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Bakshi’s Kitchen. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
