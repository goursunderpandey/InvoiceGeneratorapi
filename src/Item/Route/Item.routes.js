const express = require("express");
const router = express.Router();
const itemController = require("../Controller/Item.controller");
const jwtmiddleware = require("../../Middleware/authMiddleware");
// CRUD Routes
router.post("/additem",jwtmiddleware, itemController.createItem);
router.get("/items", jwtmiddleware,itemController.getItems);
router.get("/itemsbyid/:id",jwtmiddleware, itemController.getItemById);
router.get("/searchItem",jwtmiddleware,itemController.searchItem);
router.put("/updateitems/:id", jwtmiddleware,itemController.updateItem);
router.delete("/deleteitems/:id",jwtmiddleware, itemController.deleteItem);

module.exports = router;
