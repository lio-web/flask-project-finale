import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure 'root' exists in public/index.html

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
