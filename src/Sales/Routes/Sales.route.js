const express = require("express");
const router = express.Router();
const saleController = require("../Controller/Sales.controller");
const jwtmiddleware = require("../../Middleware/authMiddleware");

// Add Sale
router.post("/addSales", jwtmiddleware, saleController.createSale);

// Get All Sales
router.get("/allSales", jwtmiddleware, saleController.getSales);

// Get Sale by ID
router.get("/sales/:id", jwtmiddleware, saleController.getSaleById);

module.exports = router;
