
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopease-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, color = "", size = "") => {
    if (!product || product.stock <= 0) return;

    const itemKey = `${product._id}-${color}-${size}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.itemKey === itemKey
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.itemKey === itemKey
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          itemKey,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          color,
          size,
          quantity: Math.min(quantity, product.stock),
          stock: product.stock,
        },
      ];
    });
  };

  const updateQuantity = (itemKey, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.itemKey === itemKey
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(quantity), item.stock)
              ),
            }
          : item
      )
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.itemKey !== itemKey)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
