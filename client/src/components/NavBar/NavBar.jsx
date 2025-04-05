import { useState } from 'react';
import { BiCollection } from 'react-icons/bi';
import { FaGamepad, FaSearch, FaUserShield } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <FaGamepad className="navbar__logo" />
        PixelPlay
      </Link>

      <div className="navbar__links-container">
        <form className="navbar__search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="navbar__search-input"
          />
          <button type="submit" className="navbar__search-button">
            <FaSearch />
          </button>
        </form>

        <NavLink to="/wishlist" className="navbar__link">
          <BiCollection className="navbar__icon" />
          PixelShelf
        </NavLink>

        <NavLink to="/admin/login" className="navbar__link">
          <FaUserShield className="navbar__icon" />
          Admin Login
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
