const cartController = require("../controllers/cartController"); 

const router = require("express").Router(); 

//add cart
router.post("/", cartController.addCart); 

//find like by artworkId
router.get("/api/user/:userId/", cartController.getCart);

//find & delete cart 
router.delete("/api/user/:userId/", cartController.deleteCart);

module.exports = router;