const managementController = require("..//controller//managementController");

const router = require("express").Router();

//create a creator by userID
router.put("/api/moderators/creator-management/:userID");
//delete a creator by userID
router.delete("/api/moderators/creator-management/:userID");


module.exports = router;