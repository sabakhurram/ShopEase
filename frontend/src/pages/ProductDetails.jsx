
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
const { addToCart } = useCart();
const navigate = useNavigate();
const [cartMessage, setCartMessage] = useState("");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        const productData = data.product || data;

        setProduct(productData);
        setSelectedImage(productData.images?.[0] || "");
        setSelectedColor(productData.colors?.[0]?.name || "");
        setSelectedSize(productData.sizes?.[0] || "");
        setQuantity(1);
        setActiveTab("description");
      } catch (err) {
        setError(err.message || "Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-message">
        <p>Loading product details...</p>
      </div>
    );
    
  }

  if (error || !product) {
 
    return (
      <div className="product-details-message">
        <h2>Product unavailable</h2>
        <p>
          We couldn't find this product. It may have been removed
          or is temporarily unavailable.
        </p>
        <Link to="/products" className="back-to-shop">
          <ArrowLeft size={17} />
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const stock = product.stock ?? 0;
  const isAvailable = stock > 0;

  const selectionRequired =
    (colors.length > 0 && !selectedColor) ||
    (sizes.length > 0 && !selectedSize);

  const canPurchase = isAvailable && !selectionRequired;
     const handleAddToCart = () => {
  if (!canPurchase) return;

  addToCart(product, quantity, selectedColor, selectedSize);

  setCartMessage(`${product.name} added to your cart.`);
};
const handleBuyNow = () => {
  if (!canPurchase) return;

  addToCart(product, quantity, selectedColor, selectedSize);
  navigate("/checkout");
};
  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(stock, current + 1));
  };

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        <div className="details-topbar">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <p>ShopEase / {product.category}</p>
        </div>

        <div className="marketplace-layout">

          {/* LEFT: PRODUCT GALLERY */}
          <section className="marketplace-gallery">
            <div className="main-product-image">
              {selectedImage ? (
                <img src={selectedImage} alt={product.name} />
              ) : (
                <div className="image-placeholder">
                  No product image available
                </div>
              )}
            </div>

            {images.length > 0 && (
              <div className="product-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    className={selectedImage === image ? "selected" : ""}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === image}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="gallery-caption">
              View product from different angles
            </p>
          </section>

          {/* CENTER: PRODUCT INFORMATION */}
          <section className="marketplace-product-info">
            <p className="detail-category">{product.category}</p>

            <h1>{product.name}</h1>

            <div className="product-review-summary">
              <span className="review-placeholder">
                No reviews yet
              </span>
              <span className="review-separator">|</span>
              <span>{stock} items in stock</span>
            </div>

            <div className="center-price">
              ${Number(product.price).toFixed(2)}
            </div>

            <div className="product-option-divider" />

            {/* COLOR OPTIONS */}
            {colors.length > 0 && (
              <div className="product-option-group">
                <div className="option-heading">
                  <span>Color:</span>
                  <strong>{selectedColor}</strong>
                </div>

                <div className="color-options">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={
                        selectedColor === color.name
                          ? "color-swatch selected"
                          : "color-swatch"
                      }
                      style={{ "--swatch-color": color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name}`}
                      aria-pressed={selectedColor === color.name}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check size={14} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE OPTIONS */}
            {sizes.length > 0 && (
              <div className="product-option-group">
                <div className="option-heading">
                  <span>Size:</span>
                  <strong>{selectedSize}</strong>
                </div>

                <div className="size-options">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "size-option selected"
                          : "size-option"
                      }
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCT INFORMATION TABS */}
            <div className="product-information-tabs">
              <div className="tab-buttons">
                <button
                  className={activeTab === "description" ? "active" : ""}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>

                <button
                  className={activeTab === "reviews" ? "active" : ""}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "description" ? (
                  <p>{product.description}</p>
                ) : (
                  <p className="empty-reviews">
                    There are no customer reviews yet.
                    Reviews will appear here once customers submit them.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT: PURCHASE PANEL */}
          <aside className="purchase-panel">
            <div className="purchase-price">
              <span>Price</span>
              <strong>${Number(product.price).toFixed(2)}</strong>
            </div>

            <div className="purchase-stock">
              <span className={isAvailable ? "in-stock" : "out-of-stock"}>
                {isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="purchase-quantity">
              <label htmlFor="product-quantity">Quantity</label>

              <div className="quantity-control">
                <button
                  onClick={decreaseQuantity}
                  disabled={!isAvailable || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span id="product-quantity">{quantity}</span>

                <button
                  onClick={increaseQuantity}
                  disabled={!isAvailable || quantity >= stock}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {selectionRequired && (
              <p className="selection-message">
                Please select the available product options.
              </p>
            )}

           <button
  className="add-to-cart-button"
  onClick={handleAddToCart}
  disabled={!canPurchase}
>
  <ShoppingBag size={18} />
  Add to Cart
</button>
<button
  className="buy-now-button"
  onClick={handleBuyNow}
  disabled={!canPurchase}
>
  Buy Now
</button>
{cartMessage && (
  <p className="cart-success-message" role="status">
    {cartMessage}
  </p>
)}
            <div className="purchase-divider" />

            <div className="purchase-benefits">
              <div>
                <Truck size={19} />
                <span>
                  <strong>Delivery</strong>
                  Reliable delivery service
                </span>
              </div>

              <div>
                <ShieldCheck size={19} />
                <span>
                  <strong>Secure Shopping</strong>
                  Your shopping is protected
                </span>
              </div>

              <div>
                <RotateCcw size={19} />
                <span>
                  <strong>Customer Support</strong>
                  We're here to help
                </span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
