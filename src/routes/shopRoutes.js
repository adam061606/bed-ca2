const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// sectionB
router.post("/",jwtMiddleware.verifyToken, controller.checkItemName, controller.createNewItem) // check item name exists, if no then create new item
router.get("/",controller.readAllItems) // get all items from the shop
router.get("/brand/:brand",controller.readItemByBrand) // get items by brand
router.get("/id/:id",controller.checkItemID,controller.readItemById) // check item id exists, if yes then read item by id 
router.get("/type/:type",controller.readItemByType) // get item by type
router.put("/:id",jwtMiddleware.verifyToken,controller.checkItemID, controller.checkItemName, controller.updateItems) // check item id exists, if yes check if item name already exists, if no then update item details
router.delete("/:id",jwtMiddleware.verifyToken,controller.checkItemID, controller.deleteItemById) // check item id exists, if yes then delete item by id 





module.exports = router;