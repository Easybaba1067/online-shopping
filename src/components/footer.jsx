import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import "../css-files/footer.css";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2 className="footer-logo">The Easyb Store</h2>
            <p className="footer-text">Your one-stop ecommerce destination.</p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li>
                <a href="/featured" className="footer-link">
                  Featured
                </a>
              </li>
              <li>
                <a href="/popular" className="footer-link">
                  Popular
                </a>
              </li>
              <li>
                <a href="/women" className="footer-link">
                  Women
                </a>
              </li>
              <li>
                <a href="/men" className="footer-link">
                  Men
                </a>
              </li>
              <li>
                <a href="/Kids" className="footer-link">
                  Kids
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <p className="footer-text">Email: theeasybstudio@gmail.com</p>
            <p className="footer-text">Phone: +234 913 719 0738</p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="footer-social">
              <a href="/" className="footer-icon">
                <Facebook />
              </a>
              <a href="/" className="footer-icon">
                <Twitter />
              </a>
              <a href="/" className="footer-icon">
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">
            © {new Date().getFullYear()} Easyb store. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
