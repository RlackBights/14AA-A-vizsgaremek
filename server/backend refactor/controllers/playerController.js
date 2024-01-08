const db = require('../database/db');

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
    getSaves: async function (req, res) {
        const query = "SELECT saveId, lvl, time, money, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM userTbl "
            + "INNER JOIN savedata ON savedata.userId = userTbl.uid "
            + "INNER JOIN cpuTbl c ON savedata.cpuId = c.hardwareId "
            + "INNER JOIN gpuTbl g ON savedata.gpuId = g.hardwareId "
            + "INNER JOIN ramTbl r ON savedata.ramId = r.hardwareId "
            + "INNER JOIN stgTbl s ON savedata.stgId = s.hardwareId "
            + "WHERE userId = ?";
        const value = req.body.uId;
        executeQuery(query, value, res, 'Player found!');
    },

};

module.exports = { playerController };