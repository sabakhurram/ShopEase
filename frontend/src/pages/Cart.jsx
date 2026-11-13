
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={36} strokeWidth={1.4} />
          </div>

          <h1>Your Cart Is Empty</h1>

          <p>
            It looks like you haven't added anything to your cart yet.
            Explore our collection and find something you'll love.
          </p>

          <Link to="/products" className="continue-shopping-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <p className="cart-eyebrow">YOUR SELECTION</p>
            <h1>Shopping Cart</h1>
            <p className="cart-item-count">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              items in your cart
            </p>
          </div>

          <Link to="/products" className="back-to-shopping">
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="cart-layout">
          <section className="cart-items-section">
            <div className="cart-section-heading">
              <h2>Your Items</h2>
              <span>{cartItems.length} products</span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.itemKey}>
                  <Link
                    to={`/products/${item.productId}`}
                    className="cart-item-image"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="cart-image-placeholder">
                        <ShoppingBag size={28} />
                      </div>
                    )}
                  </Link>

                  <div className="cart-item-details">
                    <Link
                      to={`/products/${item.productId}`}
                      className="cart-item-name"
                    >
                      {item.name}
                    </Link>

                    {item.color && (
                      <p className="cart-item-option">
                        Color: {item.color}
                      </p>
                    )}

                    {item.size && (
                      <p className="cart-item-option">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="cart-item-price">
                      {formatPrice(item.price)}
                    </p>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.itemKey, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          disabled={item.quantity >= item.stock}
                          onClick={() =>
                            updateQuantity(item.itemKey, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-cart-item"
                        onClick={() => removeFromCart(item.itemKey)}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="shipping-note">Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Estimated Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="summary-disclaimer">
              Shipping charges and final order details will be confirmed
              during checkout.
            </p>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>

            <div className="cart-benefits">
              <div>
                <Truck size={18} />
                <span>Delivery details at checkout</span>
              </div>

              <div>
                <ShieldCheck size={18} />
                <span>Secure checkout</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
