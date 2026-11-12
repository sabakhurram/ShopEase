
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "The Everyday Tote",
    category: "BAGS & ACCESSORIES",
    description: "Designed for the moments that make everyday life beautiful.",
    price: "$89.00",
    color: "Sand",
    background: "#EAE1D5",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000",
  },
  {
    name: "The Modern Classic",
    category: "TIMELESS ACCESSORIES",
    description: "A refined everyday essential with effortless character.",
    price: "$125.00",
    color: "Brown",
    background: "#DED1C1",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000",
  },
  {
    name: "The Daily Essential",
    category: "LIFESTYLE COLLECTION",
    description: "Thoughtfully selected pieces for your everyday rituals.",
    price: "$65.00",
    color: "Ivory",
    background: "#EDEBE5",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000",
  },
];

const categories = [
  {
    name: "Bags & Accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
  },
];

function Home() {
 
  const showcaseRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.33) {
      setActiveIndex(0);
    } else if (progress < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  const product = products[activeIndex];
return(
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            THE ART OF EVERYDAY LIVING
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            Everyday pieces.
            <br />
            <em>Extraordinary</em> living.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover thoughtfully curated essentials that
            bring beauty, simplicity and character to your
            everyday life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link to="/products" className="hero-button">
              Explore Collection
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            className="hero-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span>01 / 03</span>
            <span>CURATED FOR YOUR EVERYDAY</span>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="hero-image-frame"
            initial={{ opacity: 0, y: -90, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000"
              alt="Premium neutral leather handbag"
            />
          </motion.div>

          <motion.div
            className="hero-floating-card"
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span>THE COLLECTION</span>
            <h3>Quiet luxury.</h3>
            <p>Beautifully considered essentials.</p>
          </motion.div>

          <div className="hero-image-number">01</div>
        </div>
      </section>

      {/* BRAND MESSAGE */}
      <section className="brand-message">
        <span>LESS, BUT BETTER.</span>
        <p>
          A considered collection of pieces made to be
          <em> loved, lived in, and kept.</em>
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="category-section" id="categories">
        <div className="section-top">
          <div>
            <span className="eyebrow">FIND YOUR STYLE</span>
            <h2>Explore our world.</h2>
          </div>

          <Link to="/products" className="text-link">
            Discover all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.div
              className="category-card"
              key={category.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Link to="/products">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <span className="category-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <h3>{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PRODUCT SPOTLIGHT */}
      
      {/* SCROLL-DRIVEN PRODUCT SHOWCASE */}
      <section className="spotlight-section">
        <div className="spotlight-heading">
          <span className="eyebrow">A CLOSER LOOK</span>
          <h2>Made to be yours.</h2>
          <p>
            Discover the details. Explore the collection.
            Find your everyday favourite.
          </p>
        </div>

        <div
          className="scroll-showcase-section"
          ref={showcaseRef}
        >
          <div className="scroll-showcase-sticky">
            <motion.div
              className="scroll-product-stage"
              animate={{ backgroundColor: product.background }}
              transition={{ duration: 0.7 }}
            >
              <div className="scroll-product-image">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    initial={{
                      opacity: 0,
                      y: -70,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 60,
                      scale: 0.94,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </AnimatePresence>
              </div>

              <div className="scroll-product-info">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.45 }}
                  >
                    <span className="eyebrow">
                      {product.category}
                    </span>

                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <h3>{product.price}</h3>

                    <span className="selected-color">
                      Selected: {product.color}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="scroll-product-controls">
                  {products.map((item, index) => (
                    <button
                      key={item.name}
                      className={
                        activeIndex === index
                          ? "scroll-product-dot active"
                          : "scroll-product-dot"
                      }
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View ${item.name}`}
                      aria-pressed={activeIndex === index}
                    />
                  ))}
                </div>

                <div className="scroll-product-progress">
                  <span>0{activeIndex + 1}</span>
                  <div>
                    <motion.div
                      animate={{
                        width: `${((activeIndex + 1) / 3) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span>03</span>
                </div>

                <Link
                  to="/products"
                  className="spotlight-button"
                >
                  Discover product <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </main>
  );

}

export default Home;
