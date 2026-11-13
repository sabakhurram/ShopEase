
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import "./Products.css";
import { Link } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [sortOption, setSortOption] = useState("default");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
  "All",
  "Fashion",
  "Bags & Accessories",
  "Watches",
  "Home & Living",
  "Beauty & Fragrance",
];

const filteredProducts = products
  .filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  })
  .sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    }

    if (sortOption === "high-to-low") {
      return b.price - a.price;
    }

    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });
  if (loading) {
    return <p className="products-message">Loading products...</p>;
  }

  if (error) {
    return <p className="products-message error">{error}</p>;
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="eyebrow">THE SHOP</p>
        <h1>Discover our collection</h1>
        <p>Thoughtfully selected pieces for everyday living.</p>
      </section>
<section className="products-toolbar">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
<div className="sort-container">
  <label htmlFor="sort-products">Sort by:</label>

  <select
    id="sort-products"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="default">Featured</option>
    <option value="low-to-high">Price: Low to High</option>
    <option value="high-to-low">Price: High to Low</option>
    <option value="name">Name: A to Z</option>
  </select>
</div>
  <div className="category-filters">
    {categories.map((category) => (
      <button
        key={category}
        className={
          selectedCategory === category ? "active" : ""
        }
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
</section>
   <section className="products-grid">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
     <Link
  to={`/products/${product._id}`}
  className="product-card-link"
>
  <article className="product-card">
    <div className="product-image">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
      />
    </div>

    <div className="product-info">
      <p>{product.category}</p>
      <h2>{product.name}</h2>
      <span>${Number(product.price).toFixed(2)}</span>
    </div>
  </article>
</Link>
    ))
  ) : (
    <p className="no-products">
      No products found. Try another search or category.
    </p>
  )}
</section>
    </main>
  );
}

export default Products;
