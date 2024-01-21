const model = require("../models/taskModel");

// check if task ID exists
module.exports.checkTaskID = (req,res,next) => {
    if (req.params.task_id == undefined ){ 
        res.status(400).json({
            message: "Error: task_id is undefined"
        });
        return;
    }
    const data = {
        task_id : req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkTaskID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // task id does not exist 
            res.status(404).json({
                message:"requested task_id does not exist"
            })  
        } else {
            next()
        }
    }
    model.checkTaskID(data,callback)
}

// task 6, create (POST) new task 
module.exports.createNewTask = (req,res,next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined || req.body.title.trim() == "" ||req.body.description.trim() == ""){
        res.status(400).json({message: "Missing title or description or points"});
        return;
    }
    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error); 
            res.status(500).json(error);
        } else res.status(201).json(results[1][0]); // display new task
    }
    model.createTasks(data,callback)
}

//task 7, get all tasks
module.exports.getTasks = (req,res,next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTasks:", error); 
            res.status(500).json(error);
        } else res.status(200).json(results); 
    }
    model.getAllTasks(callback)
}

//task 8, get task by id
module.exports.getTaskByID = (req,res,next) => {
    const data ={
        taskId: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTaskByID:", error); 
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]); //display task by id 
    }
    model.getTaskByID(data, callback)
}

//task 9, update task by id 
module.exports.putTaskByID = (req,res,next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined || req.body.title.trim() == "" ||req.body.description.trim() == ""){
        res.status(400).json({message: "Missing title or description or points"});
        return;
    }
    const data ={
        taskId: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error putTaskByID:", error); 
            res.status(500).json(error);
        } 
        else next() 
    }
    model.updateTask(data, callback)
}

//task 10, delete task by id 
module.exports.deleteTask = (req,res,next) => {
    const data ={
        id: req.params.task_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTask:", error); // toDo : verify if email already exists
            res.status(500).json(error);
        } 
        else {
            console.log(results)
            res.status(204).send() //deleted task successfully 
        }
    }
    model.deleteTaskId(data, callback)
}