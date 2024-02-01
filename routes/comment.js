const commentController = require("../controllers/commentConntroler");

const router = require("express").Router(); 

//add comment 
router.post("/", commentController.addComment); 

//find comment by artworkId
router.get("/api/users/:userId/artwork/:artworkId/", commentController.getComment);



module.exports = router;