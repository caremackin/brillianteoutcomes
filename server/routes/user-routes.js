const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUser);
router.post("/login", userController.authenticateLogin);
module.exports = router;
