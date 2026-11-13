
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  UserRound,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          Shop<span>Ease.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/products">
            Shop
          </NavLink>

          <Link to="/#categories">
            Categories
          </Link>

          <Link to="/#about">
            About
          </Link>
        </nav>

        {/* Navigation Actions */}
        <div className="nav-actions">
          <Link
            to="/products"
            className="icon-button"
            aria-label="Browse products"
          >
            <Search size={20} />
          </Link>

          <Link
            to="/login"
            className="icon-button"
            aria-label="Account"
          >
            <UserRound size={20} />
          </Link>

          <Link
            to="/cart"
            className="cart-button"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
            <span>0</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation">
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Shop
          </NavLink>

          <Link to="/#categories" onClick={closeMenu}>
            Categories
          </Link>

          <Link to="/#about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/login" onClick={closeMenu}>
            My Account
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            Shopping Cart
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
