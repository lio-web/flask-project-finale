import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import RequestPasswordReset from './pages/RequestPasswordReset';
import PasswordReset from './pages/ResetPassword';
import PasswordResetSuccess from './pages/PasswordResetSuccess';
import EditProfile from './pages/EditProfile';
import Reviews from './pages/Reviews';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path='/reviews' element={<Reviews/>} />
              <Route path="/request-password-reset" element={<RequestPasswordReset />} />
              <Route path="/reset-password/:token" element={<PasswordReset />} />
              <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;