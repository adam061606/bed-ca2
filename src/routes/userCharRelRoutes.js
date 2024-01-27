const express = require('express');
const router = express.Router();
const controller = require('../controllers/userCharRelController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// sectionB
router.post('/',jwtMiddleware.verifyToken, controller.checkRel,controller.createNewRel); // check if rel and users and players exists, if rel does not exists but player and user exists then create new rel
router.get('/',controller.readAllRels); // read all rels 
router.get('/:id',jwtMiddleware.verifyToken, controller.checkRelID, controller.readRelById); // check rel id exists, if yes then read rel by id 
router.get('/user/:user_id',jwtMiddleware.verifyToken, controller.readRelByUser); // read rel by user ID
router.put('/:id',jwtMiddleware.verifyToken, controller.checkRelID,controller.checkRel,controller.updateRels); // check rel id exists, if yes then update rel by id 
router.delete('/:id',jwtMiddleware.verifyToken, controller.checkRelID, controller.deleteRelById); // check rel id exists, if yes then delete rel by id 

module.exports = router;
