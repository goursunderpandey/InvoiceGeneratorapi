const express = require("express");
const router = express.Router();
const purchaseController = require("../Controller/purchase.controller");
const jwtmiddleware = require("../../Middleware/authMiddleware");

// Add Sale
router.post("/addpurchase", jwtmiddleware, purchaseController.addpurchase);

// Get All Sales
router.get("/allPurchase", jwtmiddleware, purchaseController.getPurchase);

// Get Sale by ID
router.get("/purchase/:id", jwtmiddleware, purchaseController.getPurchaseById);

router.put("/updatepurchase/:id",jwtmiddleware, purchaseController.updatePurchase);

module.exports = router;
