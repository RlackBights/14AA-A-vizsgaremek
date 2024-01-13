const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const emailController = require('./emailController');
const tokenGeneration = require('./tokenGeneration');

const executeQuery = async function (query, values, res, successMessage) {
    try {
        const connection = await db.pool.getConnection();
        const [results] = await connection.query(query, values);

        connection.release();

        console.log(successMessage);
        res.status(200).json({ message: successMessage, data: results });
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

        try {
            // Check if email is already used
            const emailQuery = 'SELECT * FROM userTbl WHERE email = ?';
            const usernameQuery = 'SELECT * FROM userTbl WHERE username = ?';
            const connection = await db.pool.getConnection();
            const [emailCheck] = await connection.query(emailQuery, email);
            const [usernameCheck] = await connection.query(usernameQuery, username);
            connection.release();

            if (emailCheck.length > 0) {
                return res.status(400).json({ error: 'Email already in use!' });
            }
            else if (usernameCheck.length > 0) {
                return res.status(400).json({ error: 'Username already exists!' });
            }

            // Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'INSERT INTO userTbl (email, username, password)'
                + 'VALUES (?,?,?)';

            const values = [email, username, hashedPassword];
            const registerSuccessMessage = 'User registered successfully';
            executeQuery(query, values, res, registerSuccessMessage);
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
            const connection = await db.pool.getConnection();
            const query = 'SELECT * FROM userTbl WHERE username = ? OR email = ?';
            const [user] = await connection.query(query, [username, username]);

            console.log(user);
            if (user.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            };


            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const informationSent = [
                user[0].username,
                user[0].password
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
            const connection = await db.pool.getConnection();
            const query = 'SELECT * FROM userTbl WHERE email = ?';
            const [user] = await connection.query(query, email);

            if (user.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the user's password reset token is already used
            if (user[0].passwordResetToken && !user[0].isUsed) {
                return res.status(400).json({ error: 'Password reset link has already been used' });
            }

            // Generate a reset token using JWT
            const resetToken = tokenGeneration.generateToken(user[0].uid);

            // Set user's password reset token
            const updateQuery = 'UPDATE userTbl SET passwordResetToken = ?, isUsed = false WHERE email = ?';
            const updateValues = [resetToken, email];
            await connection.query(updateQuery, updateValues);

            // Send password reset email
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

            const connection = await db.pool.getConnection();
            const query = 'SELECT * FROM userTbl WHERE uid = ? AND passwordResetToken = ? AND isUsed = false';
            const [results] = await connection.query(query, [decoded.userId, resetToken]);

            if (results.length === 0) {
                connection.release();
                return res.status(400).json({ message: 'Invalid or expired reset token' });
            }

            // Update user's password and mark the reset token as used
            const updateQuery = 'UPDATE userTbl SET password = ?, passwordResetToken = null, isUsed = true WHERE uid = ?';
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await connection.query(updateQuery, [hashedPassword, decoded.userId]);
            connection.release();

            const emailResult = await emailController.passwordResetSuccessful(results[0].email, results[0].username);

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

module.exports = { playerController };