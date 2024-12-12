import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./Register.css"; // Import the CSS file
import { api } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null); // To handle validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(null); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`${api}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        swal("Registration Successful", "You have successfully registered!", "success");
        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }); // Clear form
        navigate("/login");
      } else {
        // Registration failed
        swal("Registration Failed", data.error || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container className="register">
      <h2 style={{ fontFamily: 'Impact, sans-serif', fontSize: '50px' }}>REGISTER NOW!</h2>
      <Card className="mt-4" style={{ maxWidth: "400px", margin: "auto", backgroundColor: 'rgb(40, 83, 199)' }}>
        <Form onSubmit={handleSubmit} className="p-4">
          <Form.Group controlId="username" className="form-group">
            <Form.Label className="form-label" style={{ color: 'white' }}>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="form-group">
            <Form.Label className="form-label" style={{ color: 'white' }}>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="form-group">
            <Form.Label className="form-label" style={{ color: 'white' }}>Phone Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="form-group">
            <Form.Label className="form-label" style={{ color: 'white' }}>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="form-group">
            <Form.Label className="form-label" style={{ color: 'white' }}>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <div className="alert alert-danger mt-2">{error}</div>} {/* Display error message */}

          <Button
            variant="outline-light"
            type="submit"
            className="submit-button"
            style={{ borderWidth: '4px' }}
          >
            Register
          </Button>
        </Form>
        <p className="mt-3 text-white">
          Already have an account? <Link to="/login" className="text-white">Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
