const model = require("../models/taskProgressModal");

// check user and task id exist or not
module.exports.checkUserTaskId = (req,res,next) => {
    const data = {
        user_id: res.locals.userId,
        task_id: req.body.task_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserTaskId:", error); 
            res.status(500).json(error);
        } if (results[0].length == 0 || results[1].length == 0){ // user and task ID does not exist
            console.log(results)
            res.status(404).json({
                message: "requested user_id or task_id does not exist"
            })
        }
        else next()
    }
    model.checkId(data, callback)
}

// check progress id exist or not
module.exports.checkTaskProgressID = (req,res,next) => {
    if (req.params.progress_id == undefined ){ 
        res.status(400).json({
            message: "Error: progress_id is undefined"
        });
        return;
    }
    const data = {
        progress_id : req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkTaskProgressID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // check progress id does not exist 
            res.status(404).json({
                message:"requested progress_id does not exist"
            })  
        } else {
            next()
        }
    }
    model.checkTaskProgressID(data,callback)
}

// task 11, create (POST) new task Progress
module.exports.createNewTaskProgress = (req,res,next) => {
    const data = {
        user_id: res.locals.userId,
        task_id: req.body.task_id,
        notes: req.body.notes
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTaskProgress:", error); 
            res.status(500).json(error);
        } else {
            console.log(results); //display results
            res.locals.points = results[1][0].points
            console.log(`points: ${res.locals.points}`)
            next()
        }
    }
    model.createTaskProgress(data,callback)
}

//task 12, get task progress by id
module.exports.getTaskProgressByID = (req,res,next) => {
    const data ={
        id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTaskProgressByID:", error); 
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);  //display results
    }
    model.getTaskProgressByID(data, callback)
}

//task 13, update task progress by id 
module.exports.putTaskProgressByID = (req,res,next) => {
    if (req.body.notes == undefined || req.body.notes.trim() == ""){
        res.status(400).json({message: "Missing notes"});
        return;
    }
    const data ={
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes,
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error putTaskProgressByID:", error); 
            res.status(500).json(error);
        } 
        else next() 
    }
    model.updateTaskProgress(data, callback)
}

//task 14, delete task progress by id 
module.exports.deleteTaskProgress = (req,res,next) => {
    const data ={
        id: req.params.progress_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error ddeleteTaskProgresseleteTask:", error); 
            res.status(500).json(error);
        }
        else {
            console.log(results)
            res.status(204).send()
        }
    }
    model.deleteTaskId(data, callback)
}