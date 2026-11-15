
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  UserRound,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    setAccountMenuOpen(false);
    navigate("/");
  };

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

          <Link to="/#categories">Categories</Link>

          <Link to="/#about">About</Link>
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

          {/* Account Section */}
          {loading ? (
            <span className="icon-button">
              <UserRound size={20} />
            </span>
          ) : isAuthenticated ? (
            <div className="navbar-account">
              <button
                className="navbar-account-trigger"
                onClick={() =>
                  setAccountMenuOpen(!accountMenuOpen)
                }
                aria-label="Account menu"
                aria-expanded={accountMenuOpen}
              >
                <UserRound size={20} />
                <span>{user?.name?.split(" ")[0] || "Account"}</span>
              </button>

              {accountMenuOpen && (
                <div className="navbar-account-menu">
                  <p>Signed in as</p>
                  <strong>{user?.name}</strong>
                  <span className="navbar-account-email">
                    {user?.email}
                  </span>

                  <button
                    className="navbar-logout-button"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="icon-button"
              aria-label="Login"
            >
              <UserRound size={20} />
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="navbar-cart-link"
            aria-label={`Shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="cart-count-badge">
                {cartCount}
              </span>
            )}
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

          {loading ? null : isAuthenticated ? (
            <>
              <span className="mobile-account-name">
                Welcome, {user?.name}
              </span>

              <button
                className="mobile-logout-button"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/register" onClick={closeMenu}>
                Create Account
              </Link>
            </>
          )}

          <Link to="/cart" onClick={closeMenu}>
            Shopping Cart ({cartCount})
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
