import { Link } from "react-router-dom";
import pixelplay from "../../assets/logo/logo.png";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        <Link to="/" className="navbar__brand">
          <img src={pixelplay} alt="PixelPlay Logo" className="navbar__logo" />
          PixelPlay
        </Link>

        
        <ul className="navbar__links">
          <li>
            <Link to="/pixelshelf" className="navbar__link">PixelShelf</Link>
          </li>
          <li>
            <Link to="/admin" className="navbar__link">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
