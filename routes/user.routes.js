const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.get("/user", userController.getAllUsers);
router.post("/user",
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ], 
    userController.userRegister);
router.post("/user/login", userController.userLogin);
router.get("/user/:id", userController.getUserById);   
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
