const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

// sectionB
router.post('/',controller.checkPlayerName, controller.createNewPlayer) // check player name exists, if no then create new player 
router.get('/',controller.readAllPlayer) // read all players
router.get('/:id',controller.checkPlayerID, controller.readPlayerById) // check player id exists, if yes then read player by id 
router.put("/:id",controller.checkPlayerID, controller.checkPlayerName, controller.updatePlayer) // check player id exists, if yes then update player by id 
router.delete("/:id",controller.checkPlayerID, controller.deletePlayerById) // check player id exists, if yes then delete player by id 


module.exports = router;