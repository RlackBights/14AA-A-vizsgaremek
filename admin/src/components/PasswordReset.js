import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { backend, userContext } from '../App';

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const user = useContext(userContext);

  const resetToken = window.location.href.split('password-reset/')[1];
  console.log(resetToken);

  useEffect(() => {
      async function fetchData() {
        const fetchParams = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({token: resetToken}),
        }
        const res = await fetch(backend + '/player/validateResetToken', fetchParams).then((res) => res.json());
        if (Object.keys(res).includes('error')) window.location.href = '/learnthebasics';
      }

      fetchData();
  });

  return (
    <div>
      <h2>Password Reset</h2>
      <label>New Password:</label>
      <input type="password" id='new-password' /><br/>
      <label>Confirm Password:</label>
      <input type="password" id='confirm-password' />
      <br/>
      <button onClick={async () => {
        const newPasswordInput = document.getElementById('new-password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const fetchParams = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: resetToken,
            password: newPasswordInput.value,
            confirmPassword: confirmPasswordInput.value,
          })}
        const response = await fetch(backend + '/player/resetPassword', fetchParams).then((res) => res.json());
        if (Object.keys(response).includes('error')) {
          alert(response.error);
        } else {
          alert('Password reset successful!');
        }
      }}>Reset Password</button>
    </div>
  );
};