const db = require('../config/db');
const { executeQuery } = require('./userController');


const gameController = {

    getSaves: async function (req, res) {

        const username = req.body.authCode.split(' ')[0];

        const uIdQuery = 'SELECT uid FROM userTbl WHERE username = ?';
        const uId = await executeQuery(uIdQuery, username,res, "");

        const query = "SELECT saveId, lvl, time, money, c.name AS 'cpu', g.name AS 'gpu', r.name AS 'ram', s.name AS 'stg' FROM userTbl "
            + "INNER JOIN savedata ON savedata.userId = userTbl.uid "
            + "INNER JOIN cpuTbl c ON savedata.cpuId = c.hardwareId "
            + "INNER JOIN gpuTbl g ON savedata.gpuId = g.hardwareId "
            + "INNER JOIN ramTbl r ON savedata.ramId = r.hardwareId "
            + "INNER JOIN stgTbl s ON savedata.stgId = s.hardwareId "
            + "WHERE userId = ? "
            + "ORDER BY last_modified DESC";
        const savesResults = await executeQuery(query, uId[1].data[0].uid, res, 'Player found!');


        if(savesResults[1].data == 0){
            return res.status(404).json({message: "User doesn't have saves!"});
        }

        res.status(savesResults[0]).json(savesResults[1]);
    },

    // playerDataPUT: async function (req, res) {
    //     const query = "UPDATE savedata SET lvl = ?, money = ?, time = ?, cpuId = ?, gpuId = ?, ramId = ?, stgId = ? WHERE saveId = ? AND userId = ?";
    //     const { lvl, money, time, cpuId, gpuId, ramId, stgId, saveId, userId } = req.body;
    //     const values = [lvl, money, time, cpuId, gpuId, ramId, stgId, saveId, userId];
    //     executeQuery(query, values, res, 'The save for ID:' + req.body.saveId + ' save has been updated!');
    // }


};

module.exports = { gameController };