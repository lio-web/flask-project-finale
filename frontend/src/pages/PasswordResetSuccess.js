import React from 'react';
import { useParams } from 'react-router-dom';

const PasswordResetSuccess = () => {
  const { token } = useParams();

  return (
    <div>
      <h2>Password Reset Successful</h2>
      <p>Your password has been successfully reset.</p>
    </div>
  );
};

export default PasswordResetSuccess;