import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import swal from 'sweetalert';

const Login = () => {
  const { login } = useContext(AuthContext); // Auth context providing login functionality
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form data on input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Clear error on input focus
  const handleInputFocus = () => {
    setError(null);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Attempt login
      await login(formData); // `login` should be an async function
      setLoading(false);

      // Show success message
      swal('Success', 'Logged in successfully!', 'success');

      // Redirect to profile/dashboard
      navigate('/Profile');
    } catch (err) {
      setLoading(false);

      // Handle error message
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p className="mt-3">
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
              <p className="mt-3">
                <Link to="/request-password-reset">Forgot password?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
