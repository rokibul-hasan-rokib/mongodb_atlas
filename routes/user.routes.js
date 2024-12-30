const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/user", userController.getAllUsers);
router.post("/user", userController.userRegister);
router.post("/user/login", userController.userLogin);
router.get("/user/:id", userController.getUserById);   
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
