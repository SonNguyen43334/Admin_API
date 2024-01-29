const router = require("express").Router();
const midderwareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

// GET ALL USER
router.get("/", midderwareController.verifyToken, userController.getAllUser);

//GET ALL CREATOR
router.get("/creator", userController.getAllCreator)

//SEARCH BY NAME
router.get("/search", userController.searchUserByName)

//GET USER BY ID
router.get("/:userID", userController.getUserByID);

//UPDATE USER
router.put("/:_id", userController.updateUser);

//DETELE USER
router.delete("/:_id", userController.deleteUser);

module.exports = router;
