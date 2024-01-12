const transporter = require('../config/emailConfig');
const fs = require('fs');
const path = require('path');

function generateHtmlContent(temporaryPassword, username) {
  // Read the HTML template file
  const templatePath = path.join(__dirname, '..', 'emailStyles', 'index.html');
  const htmlContent = fs.readFileSync(templatePath, 'utf-8');

  return htmlContent.replace('{{username}}', username + "</strong> is: <strong>" + temporaryPassword + "</strong>");
}

// Function to send a password reset email
async function sendPasswordResetEmail(userEmail, temporaryPassword, username) {
  // Email content
  const mailOptions = {
    from: 'noreply@learnthebasics.com',
    to: userEmail,
    subject: 'Password Reset',
    html: generateHtmlContent(temporaryPassword, username),
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return { success: true, message: 'Password reset email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, message: 'Error sending password reset email.' };
  }
}

module.exports = { sendPasswordResetEmail };
