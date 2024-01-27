const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// sectionA
router.post('/',jwtMiddleware.verifyToken, controller.createNewTask) // task 6
router.get('/',controller.getTasks) // task 7
router.get('/:task_id',jwtMiddleware.verifyToken, controller.checkTaskID,controller.getTaskByID) // task 8
router.put('/:task_id',jwtMiddleware.verifyToken, controller.checkTaskID,controller.putTaskByID,controller.getTaskByID) // task 9
router.delete('/:task_id',jwtMiddleware.verifyToken, controller.checkTaskID,controller.deleteTask) // task 10




module.exports = router;