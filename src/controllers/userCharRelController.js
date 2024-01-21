const model = require("../models/userCharRelModel");

//check if rel exists
module.exports.checkRel = (req,res,next) => {
    if (req.body.player_id == undefined || req.body.user_id == undefined){
        res.status(400).json({
            message: "Error: player_id or user_id is undefined"
        });
        return;
    }
    const data = {
        player_id: req.body.player_id,
        user_id: req.body.user_id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkRel",error)
            res.status(500).json(error)
        }
        else if (results[0].length == 0 && results[1].length!=0 && results[2].length!=0){ // rel does not exist yet, but user and player exists 
            next()
        } else {
            res.status(409).send("Rel already exists or player/user ID does not exist")
        }
    }
    model.checkRelExist(data,callback)
}

// check rel ID exists
module.exports.checkRelID = (req,res,next) => {
    if (req.params.id == undefined ){ 
        res.status(400).json({
            message: "Error: Rel id is undefined"
        });
        return;
    }
    const data = {
        id : req.params.id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkRelID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){
            res.status(404).json({
                message:"requested Rel id does not exist"
            })  
        } 
        else next()
        
    }
    model.selectRelById(data,callback)
}



//create new rel 
module.exports.createNewRel = (req, res, next) =>
{
    if (req.body.player_id == undefined || req.body.user_id == undefined){
        res.status(400).json({
            message: "Error: player_id or user_id is undefined"
        });
        return;
    }
    const data = {
        player_id: req.body.player_id,
        user_id: req.body.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewRel:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    model.insertRel(data, callback);
}

// get/display all relationships
module.exports.readAllRels = (req, res, next) =>{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllRels:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAllRels(callback);
}

// get/display relationships by ID
module.exports.readRelById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRelById:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);
        
    }

    model.selectRelById(data, callback);
}

// get/display relationships by user ID
module.exports.readRelByUser = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRelByUser:", error);
            res.status(500).json(error);
        } 
        else if(results.length == 0) 
        {
            res.status(404).json({
                message: "User_id not found"
            });
        }
        else res.status(200).json(results);
        
    }

    model.selectRelByUserID(data, callback);
}

// update relationships by ID
module.exports.updateRels = (req, res, next) =>
{
    if (req.body.player_id == undefined || req.body.user_id == undefined){
        res.status(400).json({
            message: "Error: player_id or user_id is undefined"
        });
        return;
    }
    const data = {
        id: req.params.id,
        player_id: req.body.player_id,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateRels:", error);
            res.status(500).json(error);
        } 
        else res.status(204).send(); // 204 No Content

    }

    model.updateRelById(data, callback);
}

// delete Rel by ID
module.exports.deleteRelById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteRelById:", error);
            res.status(500).json(error);
        } 
        else {
            console.log(results)
            res.status(204).send(); // 204 No Content    
        }       
        }
    model.deleteRelById(data, callback);
}