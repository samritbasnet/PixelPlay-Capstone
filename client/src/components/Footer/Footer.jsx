import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__col footer__brand">
          <h3 className="footer__logo">🎮 PixelPlay</h3>
          <p className="footer__description">Explore. Collect. Play.</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Explore</h4>
          <ul className="footer__links">
            <li>
              <a href="http://localhost:5174/">Home</a>
            </li>
            <li>
              <a href="http://localhost:5174/wishlist">Pixelshelf</a>
            </li>
            <li>
              <a href="http://localhost:5174/admin/login">Admin</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__links">
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Follow Us</h4>
          <div className="footer__socials">
            <a href="https://x.com/home">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/">
              <FaYoutube />
            </a>
            <a href="https://discord.com/">
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} PixelPlay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
