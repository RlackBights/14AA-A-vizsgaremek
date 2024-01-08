const express = require('express');
const router = express.Router();
const { playerController } = require('../controllers/playerController');

router.post('/getPlayerSaves', playerController.getSaves);

module.exports = router;