// ProductContext.js

import React, { createContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { api } from '../api';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api}/products`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
   
  const addReview = (productId, review) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        // Update the product's reviews array with the new review
        product.reviews.push(review);
        return product;
      }
      return product;
    });

    setProducts(updatedProducts);
    // Notify the user (example using swal)
    swal('Review Added', 'Your review has been added successfully', 'success');
  };

  return (
    <ProductContext.Provider value={{ products, addReview }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };