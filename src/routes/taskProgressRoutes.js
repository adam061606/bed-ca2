const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskProgressController');

// sectionA
router.post("/", controller.checkUserTaskId, controller.createNewTaskProgress) // task 11
router.get("/:progress_id", controller.checkTaskProgressID, controller.getTaskProgressByID) // task 12
router.put("/:progress_id", controller.checkTaskProgressID, controller.putTaskProgressByID,controller.getTaskProgressByID) //task 13
router.delete("/:progress_id", controller.checkTaskProgressID, controller.deleteTaskProgress) //task 14

module.exports = router;