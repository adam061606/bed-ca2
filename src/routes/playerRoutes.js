const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// sectionB
router.post('/',jwtMiddleware.verifyToken,controller.checkPlayerName, controller.createNewPlayer) // check player name exists, if no then create new player 
router.get('/',controller.readAllPlayer) // read all players
router.get('/:id',jwtMiddleware.verifyToken,controller.checkPlayerID, controller.readPlayerById) // check player id exists, if yes then read player by id 
router.put("/:id",jwtMiddleware.verifyToken,controller.checkPlayerID, controller.checkPlayerName, controller.updatePlayer) // check player id exists, if yes then update player by id 
router.delete("/:id",jwtMiddleware.verifyToken,controller.checkPlayerID, controller.deletePlayerById) // check player id exists, if yes then delete player by id 


module.exports = router;