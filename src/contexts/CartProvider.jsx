import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function addToCart(item, quantity = 1) {
    setCartItems((prev) => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 1) + quantity
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity
        return [...prev, { ...item, quantity }];
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function getItemQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity || 1 : 0;
  }

  function getTotalItems() {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        getTotalItems,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
