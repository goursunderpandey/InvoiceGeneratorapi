const express = require("express");
const router = express.Router();
const authController = require("../Controller/Auth.controller");
const userController = require("../Controller/User.controller")
const {upload} = require("../../Middleware/upload");
const jwtmiddleware = require("../../Middleware/authMiddleware")

// User Auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);


//User detiles 

router.post("/add-user", upload.single("profileImage"),userController.Userdetiles)
router.get('/user-details/:userId', jwtmiddleware,userController.getUserDetailsByUserId);

module.exports = router;
