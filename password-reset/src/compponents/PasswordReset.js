import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Extract reset token from URL

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:8000/player/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigate('/login');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <label>New Password:</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default PasswordReset;
