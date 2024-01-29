const complainController = require("../controller/complainController");

const router = require("express").Router();

// Add complain
router.post("/",complainController.addComplain);
// Show complain
router.get("/api/moderators/complaints",complainController.getComplain);
//find a complain by complainID
router.get("/api/moderators/complaints/:complainID",complainController.findComplain);
// Delete a complain by complainID
router.delete("/api/moderators/complaints/:complainID", complainController.deleteComplain);


module.exports = router;