const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// SECTION A
router.post('/', jwtMiddleware.verifyToken, controller.checkUsernameOrEmailExist,controller.createNewUser); //task 1
router.get('/', controller.getUsers); //task 2
router.get('/:user_id',jwtMiddleware.verifyToken, controller.checkUserID,controller.getTaskProgressByUserID,controller.getUsersByID) // task 3
router.put('/:user_id',jwtMiddleware.verifyToken, controller.checkUserID,controller.checkUsernameOrEmailExist,controller.putUsersByID,controller.displayResults) // task 4
router.delete('/:user_id',jwtMiddleware.verifyToken, controller.checkUserID, controller.deleteUser) // task 5

//SECTION B
router.get('/email/:email',controller.readUserByEmail) // read users by email
router.get('/id/:user_id',controller.checkUserID, controller.readUserById) // check user id exists, if yes then read user by id 
router.get('/username/:username',controller.readUserByUsername) // read user by username



module.exports = router;