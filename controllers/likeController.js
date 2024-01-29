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
        try {
            const likes = await like.findOne({artworkID: artworkId});
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = likeController;