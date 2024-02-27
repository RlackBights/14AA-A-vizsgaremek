import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const { resetToken } = useParams(); // Extract reset token from URL

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:8000/player/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      }).then((res) => res.json());

      if (response.status === 200) {
        console.log(response.message);
        window.location.href = 'http://localhost:3000';
      } else {
        console.error(response.error);
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