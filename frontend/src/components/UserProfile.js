// components/User/UserProfile.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Form, Button } from 'react-bootstrap';

const UserProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    // Add other profile fields here
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call updateUserProfile function from AuthContext to update the user profile
    updateUserProfile(formData);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Add other profile fields as needed */}

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;