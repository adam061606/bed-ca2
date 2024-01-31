const model = require("../models/shopModel");

// check Item exists 
module.exports.checkItemID = (req,res,next) => {
    if (req.params.id == undefined ){ 
        res.status(400).json({
            message: "Error: Item id is undefined"
        });
        return;
    }
    const data = {
        id : req.params.id
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkItemID",error)
            res.status(500).json(error)
        }
        else if (results.length == 0){ // item id does not exist 
            res.status(404).json({
                message:"requested Item id does not exist"
            })  
        } 
        else next()
        
    }
    model.selectItemById(data,callback)
}

// check if name already exists  
module.exports.checkItemName = (req,res,next) => {
    if (req.body.name == undefined ){ 
        res.status(400).json({
            message: "Error: Item Name is undefined"
        });
        return;
    }
    const data = {
        name : req.body.name
    }
    const callback = (error, results, fields) => {
        if (error){
            console.log("Error checkItemName",error)
            res.status(500).json(error)
        }
        else if (results.length != 0){ // item name exists
            res.status(404).json({
                message:"Item Name already exist, please choose a different name"
            })  
        } 
        else next()
        
    }
    model.selectItemByName(data,callback)
}


//create new item in the shop
module.exports.createNewItem = (req, res, next) =>
{
    if(req.body.brand == undefined, req.body.type == undefined, req.body.name == undefined, req.body.atk==undefined, req.body.def==undefined)
    {
        res.status(400).send("Error: data undefined");
        return;
    }
    const data = {
        name: req.body.name,
        brand: req.body.brand,
        type: req.body.type,
        atk: req.body.atk,
        def: req.body.def,
        price: req.body.price   
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewItem:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    model.insertItem(data, callback);
}

// get/display all items in the shop
module.exports.readAllItems = (req, res, next) =>{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAllItems(callback);
}

// get/display items by ID
module.exports.readItemById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemById:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results[0]);
        }
    model.selectItemById(data, callback);
}

// get/display items by Type (racket shoe pants etc)
module.exports.readItemByType = (req, res, next) =>
{
    const data = {
        type: req.params.type
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemByType:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Type not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectItemByType(data, callback);
}

// get/display items by brand (yonex, lining, victor, etc)
module.exports.readItemByBrand = (req, res, next) =>
{
    const data = {
        brand: req.params.brand
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readItemByBrand:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Brand not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectItemByBrand(data, callback);
}

// update items in the shop
module.exports.updateItems = (req, res, next) =>
{
    if(req.body.brand == undefined, req.body.type == undefined, req.body.name == undefined, req.body.atk==undefined, req.body.def==undefined)
    {
        res.status(400).send("Error: data undefined");
        return;
    }
    const data = {
        id: req.params.id,
        name: req.body.name,
        brand: req.body.brand,
        type: req.body.type,
        atk: req.body.atk,
        def: req.body.def
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateItems:", error);
            res.status(500).json(error);
        } 
        else res.status(204).send(); // 204 No Content
    }
    model.updateItemsById(data, callback);
}

// delete Item from shop by ID
module.exports.deleteItemById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteItemById:", error);
            res.status(500).json(error);
        } 
        else {
                console.log(results)
                res.status(204).send(); // 204 No Content    
        }       
    }

    model.deleteItemById(data, callback);
}

// deduct points 
module.exports.userBuyItem = (req, res, next) =>
{
    const data = {
        price: req.body.price,
        user_id: res.locals.userId
    }
    console.log(data)

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error userBuyItem:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                console.log('result length is 0')
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                console.log(results)
                res.status(201).json(results);}
        }
    }

    model.deductPoints(data, callback);
}