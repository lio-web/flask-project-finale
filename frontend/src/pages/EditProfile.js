// Profile.js

import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user data and update the form when the user changes
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state while updating the profile
    swal({
      text: "Updating profile...",
      button: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });

    // Add logic to update the user profile
    try {
      await updateUserProfile(formData);
      swal(
        "Profile Updated",
        "Your profile has been updated successfully!",
        "success"
      );
      navigate("/profile")
    } catch (error) {
      swal(
        "Error",
        "Failed to update the profile. Please try again later.",
        "error"
      );
    }
  };

  return (
    <Container className="mt-5">
      <h2>My Profile</h2>
      <Card className="mt-4" style={{ maxWidth: "400px", margin: "auto" }}>
        <img
        src="data:image/jpeg;base64,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"
          alt="Profile Picture"
          className="profile-picture"
        />
        <Form onSubmit={handleSubmit} className="p-4">
          <Form.Group controlId="username" className="form-group">
            <Form.Label className="form-label">username</Form.Label>
            <Form.Control
              type="text"
              placeholder={user?.username}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="form-group">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={user?.email}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="form-group">
            <Form.Label className="form-label">Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder={user?.phone}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </Form>
        <Link to="/profile" className="editbtn">Cancel</Link>
      </Card>
    </Container>
  );
};

export default EditProfile;