import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, updateUserProfile, loading, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);

  // Check if the user is logged in
  useEffect(() => {
    // If user is logged out, redirect to login page
    if (!user) {
      window.location.href = "/login";
    } else {
      setProfileData(user);
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // You can expand this to update specific fields
      await updateUserProfile(profileData); // Assume updateUserProfile is set to update the profile
      swal("Profile updated successfully!", "", "success");
    } catch (error) {
      swal("Error", "There was an issue updating your profile", "error");
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // This will clear user data in context
    swal("You have logged out", "", "success");
    window.location.href = "/login"; // Redirect to login page
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="myprofile mt-5">
      <Container>
        <Card className="profile-card">
          <Card.Body>
            <h2 className="text-center mb-4">My Profile</h2>

            {/* Profile Image */}
            <img
              src={user?.profilePicture || "./images/defaultProfilePic.jpeg"} // Use default image if user profile picture is not set
              alt="Profile"
              className="profile-img mb-4"
            />

            <Form onSubmit={handleProfileUpdate}>
              {/* Name Field */}
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={profileData?.username || ""}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                />
              </Form.Group>

              {/* Email Field */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={profileData?.email || ""}
                  disabled
                />
              </Form.Group>

              {/* Phone Field */}
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={profileData?.phone || ""}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  required
                />
              </Form.Group>

              {/* Update Button */}
              <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Update Profile"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Link to="/change-password" className="mt-3 d-block text-center">
          Change Password
        </Link>
        <Button variant="danger" onClick={handleLogout} className="mt-3 d-block text-center">
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Profile;
