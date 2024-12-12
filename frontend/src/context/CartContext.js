// context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import swal from 'sweetalert';
import { AuthContext } from './AuthContext';
import { api } from '../api';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the server when the user is logged in
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await fetch(`${api}/carts`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const items = await response.json();
            setCartItems(items);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [user]);

  const addToCart = async (product, quantity) => {
    if (!user) {
      swal('Login Required', 'Please log in to add items to your cart', 'info');
      return;
    }
  
    try {
      const response = await fetch(`${api}/carts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setCartItems([...cartItems, result]); // Assuming the response contains the added item details
        swal('Item Added', 'Product added to your cart', 'success');
      } else {
        swal('Error', 'Failed to add item to your cart. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      swal('Error', 'Failed to add item to your cart. Please try again later.', 'error');
    }
  };
  
  
  

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${api}/carts/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.product_id !== productId));
        // Notify the user (example using swal)
        swal('Item Removed', 'Product removed from your cart', 'success');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const response = await fetch(`${api}/carts/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        setCartItems(
          cartItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        );
        // Notify the user (example using swal)
        swal('Quantity Updated', 'Quantity updated in your cart', 'success');
      }
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };