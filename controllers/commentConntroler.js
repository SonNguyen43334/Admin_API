const {comment} = require("../model/model"); 

const commentController = {
    addComment: async(req, res) => {
        try{
            const newComment = new comment(req.body);
            const saveComment = await newComment.save();
            res.status(200).json(saveComment);
        } catch(err){
            res.status(500).json(err);
        }
    },
    getComment: async(req, res) => {
        const artworkId = req.params.artworkId;
        try {
            const comments = await comment.findOne({artworkID: artworkId});
            res.status(200).json(comments);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = commentController;