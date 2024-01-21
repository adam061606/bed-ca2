const express = require('express');
const router = express.Router();
const controller = require('../controllers/courtController');

// sectionB
router.post('/:player1_id/:player2_id',controller.checkPlayType, controller.getEquipment, controller.countStats, controller.addCourtGame) //check players are of the same PlayType, then get their equipment names and count their total stats to determin the winner then insert new court game record 
router.get('/',controller.getCourts) // get all court games
router.get('/:court_id',controller.checkCourtID,controller.getCourtByID) // check if court id exists, if yes get court game by ID
router.put('/:court_id/:player1_id/:player2_id',controller.checkCourtID,controller.checkPlayType, controller.getEquipment, controller.countStats, controller.putCourtByID) // same process as adding a new court game but at the end update existing court game
router.delete('/:court_id',controller.checkCourtID,controller.deleteCourtGame) // check if court id exists, if yes then delete court game by ID

module.exports = router;