const searchArtworkController = require("../controllers/searchArtworkController"); 

const router = require("express").Router(); 


router.post("/", searchArtworkController.addArtwork); 

router.get("/api/user/:userID/", searchArtworkController.searchArtwork);

module.exports = router;