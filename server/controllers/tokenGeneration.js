const crypto = require('crypto');

function generateTemporaryPassword() {
  const tokenLength = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let temporaryPassword = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    temporaryPassword += chars[randomIndex];
  }

  const timestamp = Date.now().toString(); // Add a timestamp
  return `TMP_${temporaryPassword}_${timestamp}`;
}

module.exports = { generateTemporaryPassword };