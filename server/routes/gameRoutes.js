const express = require('express');
const router = express.Router();
const { gameController } = require('../controllers/gameController');

router.post('/getPlayerSaves', gameController.getSaves);
// router.put('/savePlayerData', gameController.playerDataPUT);

module.exports = router;