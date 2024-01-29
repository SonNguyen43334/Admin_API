const searchArtworkController = require("../controllers/searchArtworkController"); 

const router = require("express").Router(); 


router.post("/", searchArtworkController.addArtwork); 

router.get("/api/creator/:creatorID/", searchArtworkController.searchArtwork);

module.exports = router;