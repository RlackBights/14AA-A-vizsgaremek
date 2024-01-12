const db = require('../config/db');


const gameController = {

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

module.exports = { gameController };