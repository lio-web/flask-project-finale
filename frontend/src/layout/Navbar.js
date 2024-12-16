import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  FaShoppingCart,
  FaUser,
  FaHome,
  FaList,
  FaSignInAlt,
  // FaUserPlus,
  FaStar,

} from "react-icons/fa";

import "./MyNavbar.css";
import { AuthContext } from "../context/AuthContext";

const MyNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Call the logout function from AuthContext
    logout();
  };

  return (
    <Navbar  variant="dark" expand="lg" fixed="top" >
      <Container>
      <Navbar.Brand className="mylogo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontFamily:'courier'}}>
          <img src="/applogo.png" alt="app logo" className="myapplogo" />
          <strong>MULTI HARDWARE</strong>
        </Link>
      </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="nav-link">
              <FaHome className="mr-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="nav-link">
              <FaList className="mr-1" /> Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-link">
              <FaShoppingCart className="mr-1" /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews" className="nav-link">
              <FaStar className="mr-1" /> Review
            </Nav.Link>
            {!user ? (
              <Nav.Link as={Link} to="/login" className="nav-link">
                <FaSignInAlt className="mr-1" /> Login
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/" onClick={handleLogout} className="nav-link"> 
                <FaSignInAlt className="mr-1" /> Logout
              </Nav.Link>
            )}

            {/* <Nav.Link as={Link} to="/register" className="nav-link">
              <FaUserPlus className="mr-1" /> Register
            </Nav.Link> */}
            <Nav.Link as={Link} to="/profile" className="nav-link">
              <FaUser className="mr-1" /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;