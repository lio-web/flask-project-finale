// Layout.js

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Layout.css"

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define an array of routes where Navbar and Footer should be hidden
  const excludeRoutes = ['/login', '/register'];

  // Check if the current route is in the array of excluded routes
  const shouldHideNavbarFooter = excludeRoutes.includes(location.pathname);

  return (
    <div className="container">
      {!shouldHideNavbarFooter && <Navbar />}
      <div className="container bg-light min-vh-100 my-3 p-3">
        <Container className="">
          {children}
        </Container>
      </div>
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;