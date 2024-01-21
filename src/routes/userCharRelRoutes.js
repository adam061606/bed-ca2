const express = require('express');
const router = express.Router();
const controller = require('../controllers/userCharRelController');

// sectionB
router.post('/',controller.checkRel,controller.createNewRel); // check if rel and users and players exists, if rel does not exists but player and user exists then create new rel
router.get('/',controller.readAllRels); // read all rels 
router.get('/:id',controller.checkRelID, controller.readRelById); // check rel id exists, if yes then read rel by id 
router.get('/user/:user_id',controller.readRelByUser); // read rel by user ID
router.put('/:id',controller.checkRelID,controller.checkRel,controller.updateRels); // check rel id exists, if yes then update rel by id 
router.delete('/:id',controller.checkRelID, controller.deleteRelById); // check rel id exists, if yes then delete rel by id 

module.exports = router;
