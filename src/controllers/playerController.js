const model = require("../models/playerModel");

// check player exists 
module.exports.checkPlayerID = (req,res,next) => {
    if (req.params.id == undefined ){ 
        res.status(400).json({
            message: "Error: player id is undefined"
        });
        return;
    }
    const data = {
        id : req.params.id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkPlayerID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // player id does not exist 
            res.status(404).json({
                message:"requested player id does not exist"
            })  
        } 
        else next()
        
    }
    model.selectById(data,callback)
}

// check if name already exists  
module.exports.checkPlayerName = (req,res,next) => {
    if (req.body.name == undefined ){ 
        res.status(400).json({
            message: "Error: Player Name is undefined"
        });
        return;
    }
    const data = {
        name : req.body.name
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkPlayerName",error)
            res.status(500).json(error)
        }
        else if (results.length != 0){ // player name already exists
            res.status(404).json({
                message:"Player Name already exist, please choose a different name"
            })  
        } 
        else next()
        
    }
    model.selectPlayerByName(data,callback)
}

//create new player 
module.exports.createNewPlayer = (req, res, next) =>
{
    if(req.body.name == undefined, req.body.level == undefined, req.body.PlayType == undefined, req.body.specialty==undefined)
    {
        res.status(400).send("Error: data undefined");
        return;
    }
    const data = {
        name: req.body.name,
        level: req.body.level,
        PlayType: req.body.PlayType,
        partner: req.body.partner,
        specialty: req.body.specialty,
        racket: req.body.racket,
        shoe: req.body.shoe,
        shirt: req.body.shirt,
        pants: req.body.pants
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    model.insertPlayer(data, callback);
}

// get/display all players
module.exports.readAllPlayer = (req, res, next) =>{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// get/display players by ID
module.exports.readPlayerById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);
        }

    model.selectById(data, callback);
}

// update player details by ID
module.exports.updatePlayer = (req, res, next) =>
{
    if(req.body.name == undefined, req.body.level == undefined, req.body.PlayType == undefined, req.body.specialty==undefined)
    {
        res.status(400).send("Error: data undefined");
        return;
    }
    const data = {
        id: req.params.id,
        name: req.body.name,
        level: req.body.level,
        // PlayType: req.body.PlayType,
        // partner: req.body.partner,
        specialty: req.body.specialty,
        racket: req.body.racket,
        shoe: req.body.shoe,
        shirt: req.body.shirt,
        pants: req.body.pants
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayer:", error);
            res.status(500).json(error);
        } 
        else res.status(204).send(); // 204 No Content
        }
    model.updateById(data, callback);
}

// delete player by ID
module.exports.deletePlayerById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } 
        else {
                console.log(results)
                res.status(204).send(); // 204 No Content    
        }       
        
    }
    model.deleteById(data, callback);
}