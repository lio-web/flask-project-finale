import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api';

const PasswordReset = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${api}/reset_password/${token}`, {
        new_password: newPassword,
      });

      if (response.data.success) {
        setSuccess(response.data.success);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred during password reset.');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default PasswordReset;
