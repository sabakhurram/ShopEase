
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formMessage, setFormMessage] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormMessage(
      "Your details are valid. Order processing will be connected next."
    );
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">
            <ShoppingBag size={34} />
          </div>
          <h1>Your cart is empty</h1>
          <p>Add products to your cart before proceeding to checkout.</p>
          <Link to="/products" className="checkout-back-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <div>
            <p className="checkout-eyebrow">ALMOST YOURS</p>
            <h1>Checkout</h1>
            <p>Complete your details to place your order.</p>
          </div>

          <Link to="/cart" className="checkout-back-link">
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form-section">
            <section className="checkout-card">
              <div className="checkout-section-title">
                <span className="checkout-step-number">01</span>
                <div>
                  <h2>Contact Information</h2>
                  <p>Enter your details so we can contact you.</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field full-width">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 3XX XXXXXXX"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-section-title">
                <span className="checkout-step-number">02</span>
                <div>
                  <h2>Shipping Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-field full-width">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="House number, street and area"
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    autoComplete="address-level2"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="Postal code"
                    autoComplete="postal-code"
                  />
                </div>

                <div className="checkout-field full-width">
                  <label htmlFor="deliveryNotes">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    placeholder="Any directions or special delivery instructions?"
                    rows={3}
                  />
                </div>
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-section-title">
                <span className="checkout-step-number">03</span>
                <div>
                  <h2>Payment Method</h2>
                  <p>Select how you would like to pay.</p>
                </div>
              </div>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span className="payment-option-content">
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives at your doorstep.</small>
                </span>
                <span className="payment-option-tag">Available</span>
              </label>
            </section>

            {formMessage && (
              <p className="checkout-form-message" role="status">
                {formMessage}
              </p>
            )}

            <button type="submit" className="place-order-button">
              Place Order
            </button>

            <p className="checkout-secure-note">
              <LockKeyhole size={14} />
              Your information is used only to process your order.
            </p>
          </div>

          <aside className="checkout-order-summary">
            <h2>Order Summary</h2>
            <p className="checkout-summary-caption">
              Review your selected products.
            </p>

            <div className="checkout-products">
              {cartItems.map((item) => (
                <div className="checkout-product" key={item.itemKey}>
                  <div className="checkout-product-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <ShoppingBag size={22} />
                    )}
                    <span>{item.quantity}</span>
                  </div>

                  <div className="checkout-product-info">
                    <strong>{item.name}</strong>
                    {item.color && <small>Color: {item.color}</small>}
                    {item.size && <small>Size: {item.size}</small>}
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>Estimated Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="checkout-service-notes">
              <div>
                <Truck size={17} />
                <span>Delivery details confirmed with your order</span>
              </div>
              <div>
                <MapPin size={17} />
                <span>Delivered to your provided address</span>
              </div>
              <div>
                <PackageCheck size={17} />
                <span>Order confirmation after successful placement</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
