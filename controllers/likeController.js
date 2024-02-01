const{like} = require("../model/model"); 

const likeController = {
    addLike: async (req, res) => {
        try {
            const newLike = new like(req.body);
            const saveLike = await newLike.save();
            res.status(200).json(saveLike);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getLike: async(req, res) => {
        const artworkId = req.params.artworkId;
        const userId = req.params.userId;
        try {
            const likes = await like.findOne({artworkID: artworkId, userID: userId});
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = likeController;