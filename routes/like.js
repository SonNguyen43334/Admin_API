const likeController = require("../controllers/likeController"); 

const router = require("express").Router(); 

//add like 
router.post("/", likeController.addLike); 

//find like by artworkId
router.get("/api/users/:userId/artwork/:artworkId/", likeController.getLike);

module.exports = router;