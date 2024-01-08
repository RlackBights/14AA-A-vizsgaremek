const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || 'bgs.jedlik.eu',
    user: process.env.MYSQL_USER || 'learnthebasics',
    password: process.env.MYSQL_PASSWORD || 'LtB20231214',
    database: process.env.MYSQL_DATABASE || 'learnthebasics'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MYSQL database!');
    connection.release();
});

module.exports = { pool };
