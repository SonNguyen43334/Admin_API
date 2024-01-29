const { model } = require('mongoose')
const artworkController = require('../controllers/artworkController')

const router = require('express').Router()

//ADD AN ARTWORK
router.post("/", artworkController.addArtwork)

//GET ALL ARTWORK
router.get("/", artworkController.getAllArtwork)

//GET AN ARTWORK
router.get("/:_id", artworkController.getAnArtwork)

//UPDATE AN ARTWORK
router.put("/:_id", artworkController.updateArtwork)

//DELETE AN ARTWORK
router.delete("/:_id", artworkController.deleteArtwork)
module.exports = router;