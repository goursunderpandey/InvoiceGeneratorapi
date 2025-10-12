const express = require("express");
const router = express.Router();
const supplierController = require("../Controller/Supplier.Controller")
const jwtmiddleware = require("../../Middleware/authMiddleware");


// Routes
router.post("/addSupplier", jwtmiddleware, supplierController.createSupplier);
router.get("/getSupplier",jwtmiddleware ,supplierController.getSuppliers);
router.get("/getSupplierbyId/:id",jwtmiddleware, supplierController.getSupplierById);
router.put("/updateSupplier/:id",jwtmiddleware, supplierController.updateSupplier);
router.delete("/deleteSupplier/:id", supplierController.deleteSupplier);

module.exports = router;
