const express = require("express");
const router = express.Router();
const customerController = require("../Controller/Customer.controller");
const jwtmiddleware = require("../../Middleware/authMiddleware")

router.post("/addcustomer",jwtmiddleware, customerController.createCustomer);
router.get("/getcustomer", jwtmiddleware,customerController.getCustomers);
router.get("/getcustomer:id",jwtmiddleware, customerController.getCustomerById);
router.put("/updatecustomer:id",jwtmiddleware, customerController.updateCustomer);
router.delete("/deletecustomer/:id",jwtmiddleware, customerController.deleteCustomer);

module.exports = router;
