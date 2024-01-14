const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function generateToken(userId) {
  console.log(userId);
  return jwt.sign({ userId }, process.env.SECRET_KEY , { expiresIn: '1h' });
}

module.exports = { generateToken };