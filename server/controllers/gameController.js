const db = require('../config/db');
const { executeQuery } = require('./userController');


const gameController = {

    getSaves: async function (req, res) {

        const username = req.body.authCode.split(' ')[0];

        const uIdQuery = 'SELECT uid FROM userTbl WHERE username = ?';
        const uId = await executeQuery(uIdQuery, username,res, "");

        const query = "SELECT saveId, lvl, time, money, cpuId, gpuId, ramId, stgId FROM savedata "
            + "WHERE userId = ? "
            + "ORDER BY last_modified DESC";
        const savesResults = await executeQuery(query, uId[1].data[0].uid, res, 'Player found!');


        if(savesResults[1].data == 0){
            return res.status(404).json({message: "User doesn't have saves!"});
        }

        res.status(savesResults[0]).json(savesResults[1]);
    },



};

module.exports = { gameController };