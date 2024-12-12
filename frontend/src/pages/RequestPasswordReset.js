import React, { useState } from 'react';
import axios from 'axios';
import "./RequestPasswordReset.css"
import { api } from '../api';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRequestPasswordReset = async () => {
    try {
      const response = await axios.post(`${api}/request_password_reset`, { email });

      if (response.data.success) {
        setSuccess(response.data.success);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  };

  return (
    <div className='mt-5 mypassword'>
      <h2>Request Password Reset</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        className='myinput'
        placeholder='Enter email address'
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRequestPasswordReset} className='mybtn'>Request Password Reset</button>
    </div>
  );
};

export default RequestPasswordReset;