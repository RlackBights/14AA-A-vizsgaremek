const transporter = require('../config/emailConfig');
const fs = require('fs');
const path = require('path');

function generateHtmlContentResetLink(resetLink, username) {
  // Read the HTML template file
  const templatePath = path.join(__dirname, '..', 'emailStyles', 'index.html');
  const htmlContent = fs.readFileSync(templatePath, 'utf-8');

  const replaceLink = `<a href="${resetLink}" target="_blank">Click here</a>`

  var pageContent = htmlContent.replace('{{username}}', username).replace('<!--Link comes here-->', replaceLink);
  return pageContent;
}

function generateHtmlContentSuccessfulReset(username){
  const templatePath = path.join(__dirname, '..', 'emailStyles', 'successful.html');
  const htmlContent = fs.readFileSync(templatePath, 'utf-8');
  return htmlContent.replace('{{username}}', username);
}

// Function to send a password reset email
async function sendPasswordResetEmail(userEmail, resetToken, username) {
  // Construct the reset link using the reset token
  const resetLink = `http://localhost:3000/password-reset/${resetToken}`;

  // Email content
  const mailOptions = {
    from: 'noreply@learnthebasics.com',
    to: userEmail,
    subject: 'Password Reset',
    html: generateHtmlContentResetLink(resetLink, username),
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

async function passwordResetSuccessful(userEmail, username){

  const mailOptions = {
    from: 'noreply@learnthebasics.com',
    to: userEmail,
    subject: 'Password Reset Successful',
    html: generateHtmlContentSuccessfulReset(username)
  }

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return { success: true, message: 'New password set email sent successful.' };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, message: 'Error sending successful reset email.' };
  }
}

module.exports = { sendPasswordResetEmail, passwordResetSuccessful };
