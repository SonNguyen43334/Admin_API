const {
  getAllArtworks,
  getArtworkByTitle,
  getArtworkById,
  getArtworkComments,
  addComment,
  getArtworkLikes,
  addLike,
} = require("../controllers/artworkController");

const router = require("express").Router();

router.get("/api/artwork/all", getAllArtworks);
router.get("/api/artwork/search", getArtworkByTitle);
router.get("/api/artwork/:artworkID", getArtworkById);
router.get("/api/artwork/comment", getArtworkComments);
router.post("/api/artwork/comment", addComment);
router.get("/api/artwork/like", getArtworkLikes);
router.post("/api/artwork/like", addLike);

module.exports = router;
