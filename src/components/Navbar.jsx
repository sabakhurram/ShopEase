
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Search, UserRound, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Shop<span>Ease.</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Search">
            <Search size={20} />
          </button>

          <Link to="/login" className="icon-button" aria-label="Account">
            <UserRound size={20} />
          </Link>

          <Link to="/cart" className="cart-button" aria-label="Shopping cart">
            <ShoppingBag size={20} />
            <span>0</span>
          </Link>

          <button className="mobile-menu" aria-label="Open menu">
            <Menu size={23} />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
