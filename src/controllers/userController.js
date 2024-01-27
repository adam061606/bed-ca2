const model = require("../models/userModel");

// check if user ID exists
module.exports.checkUserID = (req,res,next) => {
    if (req.params.user_id == undefined ){ 
        res.status(400).json({
            message: "Error: user_id is undefined"
        });
        return;
    }
    const data = {
        user_id : req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkUserID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // user ID does not exist, error.
            res.status(404).json({
                message:"requested user_id does not exist"
            })  
        } else {
            next()
        }
    }
    model.checkUserID(data,callback)

}


// task 1, create (POST) new user 
module.exports.createNewUser = (req,res,next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else res.status(201).json(results[1][0]); // successfully created user 
    }
    model.createUser(data,callback)
}

//task 2, get users
module.exports.getUsers = (req,res,next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error); 
            res.status(500).json(error);
        } else res.status(200).json(results); // display results
    }
    model.getAllUsers(callback)
}

//task 3, get user by id
module.exports.getTaskProgressByUserID = (req,res,next) => {
    const data = {
        id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTaskProgressByUserID:", error); 
            res.status(500).json(error);
        } else if (results.length==0){
            res.locals.taskID = null // no tasks 
            next()
        } else {
            res.locals.taskID = results.map(x => x.task_id) // get task IDs in format (1,2,3...)
            console.log(res.locals.taskID)
            next()
        }
    }
    model.getTaskProgress(data, callback)
}


module.exports.getUsersByID = (req,res,next) => {
    const data ={
        id: req.locals.userId,
        task_id: res.locals.taskID
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUsersByID:", error); 
            res.status(500).json(error);
        } 
        else {
            console.log(results)
            res.status(200).json({ //display results
                user_id:results[0][0].user_id,
                username:results[0][0].username,
                email:results[0][0].email,
                total_points: parseInt(results[1][0].total_points) 
            }); 
        }
    }
    model.getUserByID(data, callback)
}

//task 4, update user by id 
module.exports.putUsersByID = (req,res,next) => {
    const data ={
        id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }
    const callback = (error, results, fields) => {
        console.log(results)
        if (error) {
            console.error("Error putUsersByID:", error); 
            res.status(500).json(error);
        } 
        else next() 
    }
    model.updateUser(data, callback)
}

//display results of the updated user
module.exports.displayResults = (req,res,next) => {
    const data ={
        id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error displayResults:", error); 
            res.status(500).json(error);
        } else res.status(200).json(results[0]); 
    }
    model.displayPutUser(data, callback)
}

//task 5, delete user by id 
module.exports.deleteUser = (req,res,next) => {
    const data ={
        id: req.params.user_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUser:", error); 
            res.status(500).json(error);
        } 
        else {
            console.log(results)
            res.status(204).send() //delete successful 
        }
    }
    model.deleteUserId(data, callback)
}




////////// SECTION B CODE /////////////

// get/display Users by ID
module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);
        
    }

    model.selectUserById(data, callback);
}

// get/display Users by email
module.exports.readUserByEmail = (req, res, next) =>
{
    const data = {
        email: req.params.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByEmail:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectUserByEmail(data, callback);
}

// get/display Users by username
module.exports.readUserByUsername = (req, res, next) =>
{
    const data = {
        username: req.params.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUsername:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectUserByUsername(data, callback);
}



//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined || req.body.username.trim()==""){ // check if res body is filled 
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
        return;
    }
    const data = {
        username: req.body.username    
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error login",error)
            res.status(500).json(error)
        } else if (results.length==0){
            res.status(404).json({message: "User not found"})
        }
        else {
            res.locals.userId = results[0].user_id
            res.locals.hash = results[0].password
            res.locals.username = results[0].username
            next()
        }
    }
    model.selectUserByUsername(data,callback)
}


//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    res.locals.username = req.body.username
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkUsernameAndEmail",error)
            res.status(500).json(error)
        }
        else {
            res.locals.message = `User ${res.locals.username} created successfully.`
            res.locals.userId = results[1][0].user_id
            next()
        }
    }
    model.createUser(data,callback)
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.username.trim()=="" || req.body.email.trim()==""){ // check if res body is filled 
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
        return;
    }
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkUsernameAndEmail",error)
            res.status(500).json(error)
        }
        else if (results[0].length == 0 && results[1].length == 0){ // username and email does not exist yet 
            next()
        } else {
            res.status(409).json({message:"Username or email already exists"}) // username and email exist already
        }
    }
    model.checkUsernameEmail(data,callback)

}

//////////////////////////////////////////////////////
// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////

