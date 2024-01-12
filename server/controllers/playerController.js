const db = require('../database/db');
const bcrypt = require('bcrypt');

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

const executeMultipleQueries = async function (queries, values, res, successMessage) {
    try {
        const connection = await db.pool.getConnection();
        await connection.beginTransaction();

        for (let i = 0; i < queries.length; i++) {
            await connection.query(queries[i], values[i]);
        }

        await connection.commit();
        connection.release();

        res.status(200).json({ message: successMessage });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

const playerController = {

    registerPlayer: async function (req, res) {
        const { username, password, isAdmin } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            // Check if username exists
            const usernameQuery = 'SELECT * FROM userTbl WHERE name = ?';
            const connection = await db.pool.getConnection();
            const [usernameCheck] = await connection.query(usernameQuery, username);
            connection.release();

            if (usernameCheck.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user data and generate save files
            const queries = [
                'INSERT INTO userTbl(name, password, isAdmin) VALUES (?, ?, ?)',
                'INSERT INTO savedata(userId, saveId, lvl, money, time, cpuId, gpuId, ramId, stgId) VALUES'
                + ' ((SELECT uid FROM userTbl WHERE name = ?), ?, ?, ?, ?, ?, ?, ?, ?),'
                + ' ((SELECT uid FROM userTbl WHERE name = ?), ?, ?, ?, ?, ?, ?, ?, ?),'
                + ' ((SELECT uid FROM userTbl WHERE name = ?), ?, ?, ?, ?, ?, ?, ?, ?)'
            ];
            const values = [
                [username, hashedPassword, isAdmin],
                [
                    username, 1, -1, 0, 0, 0, 0, 0, 0,
                    username, 2, -1, 0, 0, 0, 0, 0, 0,
                    username, 3, -1, 0, 0, 0, 0, 0, 0
                ]
            ];
            const registerSuccessMessage = 'User registered successfully and savefiles generated successfully';
            executeMultipleQueries(queries, values, res, registerSuccessMessage);
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(error.status || 500).json({ error: error.message || 'User registration failed' });
        }
    },

    loginUser: async function(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ error: "Don't leave fields empty" });
        }
    
        try {
          const connection = await db.pool.getConnection();
          const query = 'SELECT * FROM userTbl WHERE name = ?';
          const [user] = await connection.query(query, username)
            
         if(user.length == 0){
            return res.status(404).json({ error: 'User not found' });
        };

          const passwordMatch = await bcrypt.compare(password, user[0].password);
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          
          const informationSent = [
            user[0].name,
            user[0].password
          ]
    
          res.status(200).json({ message: 'Login successful', data: informationSent});
        } catch (error) {
          console.error('Error during user login:', error);
          res.status(500).json({ error: 'User login failed' });
        }
      },

    getSaves: async function (req, res) {
        const query = "SELECT saveId, lvl, time, money, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM userTbl "
            + "INNER JOIN savedata ON savedata.userId = userTbl.uid "
            + "INNER JOIN cpuTbl c ON savedata.cpuId = c.hardwareId "
            + "INNER JOIN gpuTbl g ON savedata.gpuId = g.hardwareId "
            + "INNER JOIN ramTbl r ON savedata.ramId = r.hardwareId "
            + "INNER JOIN stgTbl s ON savedata.stgId = s.hardwareId "
            + "WHERE userId = ?"
            + "ORDER BY saveId";
        var value = req.body.uId;
        executeQuery(query, value, res, 'Player found!');
    },

    playerDataPUT: async function (req, res) {
        const query = "UPDATE savedata SET lvl = ?, money = ?, time = ?, cpuId = ?, gpuId = ?, ramId = ?, stgId = ? WHERE saveId = ? AND userId = ?";
        const { lvl, money, time, cpuId, gpuId, ramId, stgId, saveId, userId } = req.body;
        const values = [lvl, money, time, cpuId, gpuId, ramId, stgId, saveId, userId];
        executeQuery(query, values, res, 'The save for ID:' + req.body.saveId + ' save has been updated!');
    }

};

module.exports = { playerController };