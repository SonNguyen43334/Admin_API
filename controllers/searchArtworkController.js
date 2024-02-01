const {artwork} = require("../model/model"); 

const searchArtworkController = {
    addArtwork: async (req, res) => {
        try {
            const newArtwork = new artwork(req.body);
            const saveArtwork = await newArtwork.save();
            res.status(200).json(saveArtwork);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    searchArtwork: async(req, res) => {
        const userId = req.params.userID;
        try {
            const likes = await artwork.findOne({userID: userId});
            res.status(200).json(likes);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = searchArtworkController;