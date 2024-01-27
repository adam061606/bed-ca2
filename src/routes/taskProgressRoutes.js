const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskProgressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// sectionA
router.post("/",jwtMiddleware.verifyToken, controller.checkUserTaskId, controller.createNewTaskProgress) // task 11
router.get("/:progress_id",jwtMiddleware.verifyToken, controller.checkTaskProgressID, controller.getTaskProgressByID) // task 12
router.put("/:progress_id",jwtMiddleware.verifyToken, controller.checkTaskProgressID, controller.putTaskProgressByID,controller.getTaskProgressByID) //task 13
router.delete("/:progress_id",jwtMiddleware.verifyToken, controller.checkTaskProgressID, controller.deleteTaskProgress) //task 14

module.exports = router;