const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;


const emailController = require('./emailController');
const tokenGeneration = require('./tokenGeneration');

async function executeQuery(query, values, res, successMessage) {
    try {
        const connection = await db.pool.getConnection();
        const [results] = await connection.query(query, values);

        connection.release()

        return [ 200, {message: successMessage, data: results}];
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};


const playerController = {

    registerPlayer: async function (req, res) {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        try {
            // Check if email is already used
            const emailQuery = 'SELECT * FROM userTbl WHERE email = ?';
            const usernameQuery = 'SELECT * FROM userTbl WHERE username = ?';
            const emailCheck = await executeQuery(emailQuery, email, res, "");
            const usernameCheck = await executeQuery(usernameQuery, username, res, "");

            if (emailCheck[1].data.length > 0) {
                return res.status(400).json({ error: 'Email already in use!' });
            }
            else if (usernameCheck[1].data.length > 0) {
                return res.status(400).json({ error: 'Username already exists!' });
            }

            // Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'INSERT INTO userTbl (email, username, password)'
                + 'VALUES (?,?,?)';

            const values = [email, username, hashedPassword];
            const registerSuccessMessage = 'User registered successfully';
            const querySuccRegister = await executeQuery(query, values, res, registerSuccessMessage);
            res.status(querySuccRegister[0]).json(querySuccRegister[1]);
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(error.status || 500).json({ error: error.message || 'User registration failed' });
        }
    },

    loginUser: async function (req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Don't leave fields empty" });
        }

        try {

            
            const userQuery = 'SELECT * FROM userTbl WHERE username = ? OR email = ?';
            const user = await executeQuery(userQuery, [username, username], res, '')

            if (user[1].data.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            };

            const passwordMatch = await bcrypt.compare(password, user[1].data[0].password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const informationSent = [
                user[1].data[0].username,
                user[1].data[0].password
            ]

            res.status(200).json({ message: 'Login successful', data: informationSent });
        } catch (error) {
            console.error('Error during user login:', error);
            res.status(500).json({ error: 'User login failed' });
        }
    },

    forgotPassword: async function (req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required!' });
        }

        try {
            const query = 'SELECT * FROM userTbl WHERE email = ?';
            const user = await executeQuery(query, email, res, '')

            if (user[1].data.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the user's password reset token is already used
            if (user[1].data[0].passwordResetToken && !user[1].data.isUsed) {
                return res.status(400).json({ error: 'Password reset link has already been used' });
            }

            // Generate a reset token using JWT
            const resetToken = tokenGeneration.generateToken(user[1].data[0].uid);

            console.log(resetToken)

            // // Set user's password reset token
            const updateQuery = 'UPDATE userTbl SET passwordResetToken = ?, isUsed = false WHERE email = ?';
            const updateValues = [resetToken, email];
            await executeQuery(updateQuery, updateValues, res, '');

            // // Send password reset email
            const emailResult = await emailController.sendPasswordResetEmail(email, resetToken, user[0].username);

            if (emailResult.success) {
                res.status(200).json({ message: 'Password reset email sent successfully' });
            } else {
                res.status(500).json({ error: 'Error sending password reset email.' });
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            res.status(500).json({ error: 'Password reset failed' });
        }
    },

    resetPassword: async function (req, res) {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({ error: "Both token and the new password are required!" });
        }

        try {
            const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);


            const query = 'SELECT * FROM userTbl WHERE uid = ? AND passwordResetToken = ? AND isUsed = false';
            const results = await executeQuery(query, [decoded.userId, resetToken], res, '');


            if (results[1].data[0].length === 0) {
                connection.release();
                return res.status(400).json({ message: 'Invalid or expired reset token' });
            }
            console.log(results[1].data[0].email)

            // Update user's password and mark the reset token as used
            const updateQuery = 'UPDATE userTbl SET password = ?, passwordResetToken = null, isUsed = true WHERE uid = ?';
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await executeQuery(updateQuery, [hashedPassword, decoded.userId], res, "");

            const emailResult = await emailController.passwordResetSuccessful(results[1].data[0].email, results[1].data[0].username);

            if (emailResult.success) {
                res.status(200).json({ message: 'Password reset was successful and password changed email sent successfully' });
            } else {
                res.status(500).json({ error: 'Error sending the password changed email' });
            }


        } catch (error) {
            console.error('Error during password reset:', error);
            res.status(400).json({ message: 'Invalid or expired reset token' });
        }
    },

};

module.exports = { playerController, executeQuery };