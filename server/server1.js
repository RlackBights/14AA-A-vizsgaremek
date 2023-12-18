const express = require('express');
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8000;
const cors = require('cors');
const mysql = require('mysql2/promise');
import bcrypt from 'bcrypt';
const https = require('https');
const fs = require('fs');

app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: "*",
}));

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'bgs.jedlik.eu',
    user: process.env.MYSQL_USER || 'learnthebasics',
    password: process.env.MYSQL_PASSWORD || 'LtB20231214',
    database: process.env.MYSQL_DATABASE || 'learnthebasics',
});


app.use(express.json());
