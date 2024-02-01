const model = require("../models/courtModel");

// add court game
// check that players versus are of the same playing style 
module.exports.checkPlayType = (req, res, next) =>{
    const data = {
        player1_id: req.params.player1_id,
        player2_id: req.params.player2_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkPlayType:", error);
            res.status(500).json(error);
        } else {
            if(results[0].length == 0 || results[1].length == 0)  // check if players IDs exists
            {
                res.status(404).json({
                    message: "Player(s) not found"
                });
            }
            else if (results[0][0].PlayType == results[1][0].PlayType){ // check that they play the same type of game
                console.log(results[0][0].PlayType)
                console.log(results[1][0])
                res.locals.playType = results[0][0].PlayType
                if (res.locals.playType == 'double'){
                    res.locals.player1 = req.params.player1_id
                    res.locals.player1Pair = results[0][0].partner
                    res.locals.player2 = req.params.player2_id
                    res.locals.player2Pair = results[1][0].partner
                }
                next()
            } else {
                res.status(409).json({
                    message: "Player play types do not match"
                });
            }
        }
    }
    model.checkPlayerStyle(data, callback);
}

// get the equipment that player 1 and 2 are using
module.exports.getEquipment = (req, res, next) => {
    const data = {
        player1_id: req.params.player1_id,
        player2_id: req.params.player2_id
    }
    const data2 = {
        player1_id: req.params.player1_id,
        player2_id: req.params.player2_id,
        player1Pair_id: res.locals.player1Pair,
        player2Pair_id: res.locals.player2Pair
    }

    if (res.locals.playType == 'single'){
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error countStats (single):", error);
                res.status(500).json(error);
            } else { // store equipement used by player 1 and 2 in res.locals
                console.log(results)
                res.locals.player1_racket = results[0][0].racket
                res.locals.player1_shoe = results[0][0].shoe                
                res.locals.player1_shirt = results[0][0].shirt
                res.locals.player1_pants = results[0][0].pants        
                res.locals.player2_racket = results[1][0].racket
                res.locals.player2_shoe = results[1][0].shoe                
                res.locals.player2_shirt = results[1][0].shirt
                res.locals.player2_pants = results[1][0].pants
                next()
            };
        }
            model.getEquipmentNames1(data, callback);
        }
    else if (res.locals.playType == 'double'){
        const callback2 = (error, results, fields) => {
            if (error) {
                console.error("Error countStats (double):", error);
                res.status(500).json(error);
            } else {
                // console.log(results[0])
                res.locals.player1_racket = results[0][0].racket
                res.locals.player1_shoe = results[0][0].shoe                
                res.locals.player1_shirt = results[0][0].shirt
                res.locals.player1_pants = results[0][0].pants        
                res.locals.player2_racket = results[1][0].racket
                res.locals.player2_shoe = results[1][0].shoe                
                res.locals.player2_shirt = results[1][0].shirt
                res.locals.player2_pants = results[1][0].pants
                res.locals.player1Pair_racket = results[2][0].racket
                res.locals.player1Pair_shoe = results[2][0].shoe                
                res.locals.player1Pair_shirt = results[2][0].shirt
                res.locals.player1Pair_pants = results[2][0].pants        
                res.locals.player2Pair_racket = results[3][0].racket
                res.locals.player2Pair_shoe = results[3][0].shoe                
                res.locals.player2Pair_shirt = results[3][0].shirt
                res.locals.player2Pair_pants = results[3][0].pants
                next()
            };
        }
        model.getEquipmentNames2(data2, callback2);
    }

}

// calculate the sum of atk and def of equipment , higher one wins
module.exports.countStats = (req, res, next) => {
    const data = { // singles equipment 
        player1_racket: res.locals.player1_racket, 
        player1_shoe: res.locals.player1_shoe,                
        player1_shirt: res.locals.player1_shirt, 
        player1_pants: res.locals.player1_pants,         
        player2_racket: res.locals.player2_racket, 
        player2_shoe: res.locals.player2_shoe,                
        player2_shirt: res.locals.player2_shirt, 
        player2_pants: res.locals.player2_pants 
    }
    const data2 = { // doubles equipment
        player1_racket: res.locals.player1_racket,
        player1_shoe: res.locals.player1_shoe,
        player1_shirt: res.locals.player1_shirt,
        player1_pants: res.locals.player1_pants,
        player2_racket: res.locals.player2_racket,
        player2_shoe: res.locals.player2_shoe,
        player2_shirt: res.locals.player2_shirt,
        player2_pants: res.locals.player2_pants,
        player1Pair_racket: res.locals.player1Pair_racket,
        player1Pair_shoe: res.locals.player1Pair_shoe,
        player1Pair_shirt: res.locals.player1Pair_shirt,
        player1Pair_pants: res.locals.player1Pair_pants,
        player2Pair_racket: res.locals.player2Pair_racket,
        player2Pair_shoe: res.locals.player2Pair_shoe,
        player2Pair_shirt: res.locals.player2Pair_shirt,
        player2Pair_pants: res.locals.player2Pair_pants,
    }

    // calculate singles scores
    if (res.locals.playType == 'single'){
        const callback = (error, results, fields) => {
            res.locals.player1sum = 0
            res.locals.player2sum = 0
            if (error) {
                console.error("Error countStats (single):", error);
                res.status(500).json(error);
            } else {  
                res.locals.player1sum += parseInt(results[0][0].total_atk) + parseInt(results[0][0].total_def)
                res.locals.player2sum += parseInt(results[1][0].total_atk) + parseInt(results[1][0].total_def)
                console.log("player 1 score", res.locals.player1sum)
                console.log("player 2 score", res.locals.player2sum)
                next()
            };
            }
            model.getSum1(data, callback);
        }
    // calculate doubles scores
    else if (res.locals.playType == 'double'){
        const callback2 = (error, results, fields) => {
            res.locals.pair1sum = 0
            res.locals.pair2sum = 0
            if (error) {
                console.error("Error countStats (double):", error);
                res.status(500).json(error);
            } else {
                res.locals.pair1sum += parseInt(results[0][0].total_atk) + parseInt(results[0][0].total_def) + parseInt(results[2][0].total_atk) + parseInt(results[2][0].total_def)
                res.locals.pair2sum += parseInt(results[1][0].total_atk) + parseInt(results[1][0].total_def) + parseInt(results[3][0].total_atk) + parseInt(results[3][0].total_def)
                console.log("pair 1 score", res.locals.pair1sum)
                console.log("pair 2 score", res.locals.pair2sum)
                next()
            };
        }
        model.getSum2(data2, callback2);
    }

}

// insert game info and winner
module.exports.addCourtGame = (req,res,next) => {
    if (res.locals.playType == "single"){
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error addCourtGame (single):", error);
                res.status(500).json(error);
            } else {
                res.status(200).send(results)
                }
            }
        // singles player 1 won
        if (res.locals.player1sum > res.locals.player2sum){
            const data = {
                player1: req.params.player1_id,
                player2: req.params.player2_id,
                winner: req.params.player1_id
            }
            model.singlesWinner(data,callback)
        
        // singles player 2 won
        } else if (res.locals.player1sum < res.locals.player2sum){
            const data = {
                player1: req.params.player1_id,
                player2: req.params.player2_id,
                winner: req.params.player2_id
            }
            model.singlesWinner(data,callback)

        //singles draw 
        } else {
            const data = {
                player1: req.params.player1_id,
                player2: req.params.player2_id            
            }
            model.singlesDraw(data,callback)
        }
    } else if (res.locals.playType == "double"){
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error addCourtGame (double):", error);
                res.status(500).json(error);
            } else {
                res.status(200).send(results)
                }
            }
        
        // doubles pair 1 won
        if (res.locals.pair1sum > res.locals.pair2sum){
            const data = {
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair,
                winner: req.params.player1_id,
                winnerPair: res.locals.player1Pair
            }
            model.doublesWinner(data,callback)
        } 

        // doubles pair 2 won
        else if (res.locals.pair1sum < res.locals.pair2sum){
            const data = {
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair,
                winner: req.params.player2_id,
                winnerPair: res.locals.player2Pair
            }
            model.doublesWinner(data,callback)
        } 

        // doubles draw 
        else {
            const data = {
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair           
            }
            model.doublesDraw(data,callback)
        }
    }
}

// check court ID exists
module.exports.checkCourtID = (req,res,next) => {
    if (req.params.court_id == undefined ){ 
        res.status(400).json({
            message: "Error: court_id is undefined"
        });
        return;
    }
    const data = {
        court_id : req.params.court_id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkCourtID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // court ID does not exist 
            res.status(404).json({
                message:"requested court_id does not exist"
            })  
        } else {
            next()
        }
    }
    model.checkCourtID(data,callback)
}

// get all games played in the court 
module.exports.getCourts = (req,res,next) => {

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getCourts:", error); 
            res.status(500).json(error);
        } 
        else res.status(200).json(results); 
        }
        model.getAllCourts(callback)
}

// get court game by ID 
module.exports.getCourtByID = (req,res,next) => {
    if (req.params.court_id == undefined || req.params.court_id.trim() == ""){
        res.status(400).json({message: "Missing court_id"});
        return;
    }
    const data ={
        court_id: req.params.court_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getCourtByID:", error); 
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]); 
    }
    model.checkCourtID(data, callback)
}


// update court game by ID
module.exports.putCourtByID = (req,res,next) => {
    if (res.locals.playType == "single"){
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error putCourtByID (single):", error);
                res.status(500).json(error);
            } else {
                res.status(204).send()
                }
            }
        if (res.locals.player1sum > res.locals.player2sum){
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player2: req.params.player2_id,
                winner: req.params.player1_id
            }
            model.updateSinglesWinner(data,callback) // update new winner
        } else if (res.locals.player1sum < res.locals.player2sum){
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player2: req.params.player2_id,
                winner: req.params.player2_id
            }
            model.updateSinglesWinner(data,callback) // update new winner
        } else {
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player2: req.params.player2_id            
            }
            model.updateSinglesDraw(data,callback)
        }
    } else if (res.locals.playType == "double"){
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error putCourtByID (double):", error);
                res.status(500).json(error);
            } else {
                res.status(204).send()
                }
            }
        if (res.locals.pair1sum > res.locals.pair2sum){
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair,
                winner: req.params.player1_id,                
                winnerPair: res.locals.player1Pair

            }
            model.updateDoublesWinner(data,callback) // update new winner
        } else if (res.locals.pair1sum < res.locals.pair2sum){
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair,
                winner: req.params.player2_id,
                winnerPair: res.locals.player2Pair
            }
            model.updateDoublesWinner(data,callback) // update new winner
        } else {
            const data = {
                court_id: req.params.court_id,
                player1: req.params.player1_id,
                player1Pair: res.locals.player1Pair,
                player2: req.params.player2_id,
                player2Pair: res.locals.player2Pair           
            }
            model.updateDoublesDraw(data,callback)
        }
    }
}


// delete court game by ID
module.exports.deleteCourtGame = (req,res,next) => {
    const data ={
        id: req.params.court_id,
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCourtGame:", error); 
            res.status(500).json(error);
        }
        else {
            console.log(results)
            res.status(204).send()
        }
        }
        model.deleteCourt(data, callback)
}


