const { Artwork } = require("../modules/module");

const ArtworkController = {
  getAllArtworks: async (req, res) => {
    try {
      const artworks = await Artwork.find();
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getArtworkByTitle: async (req, res) => {
    const { title } = req.query;
    try {
      const artworks = await Artwork.find({
        title: { $regex: title, $options: "i" },
      });
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getArtworkById: async (req, res) => {
    const { artworkID } = req.params;
    try {
      const artwork = await Artwork.findById(artworkID);
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getArtworkComments: async (req, res) => {
    const { artworkID } = req.params;
    try {
      const artwork = await Artwork.findById(artworkID).populate("comments");
      console.log(artwork.comments);
      res.json(artwork.comments);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addComment: async (req, res) => {
    const { artworkID } = req.params;
    const { text } = req.body;

    try {
      const artwork = await Artwork.findById(artworkID);
      const comment = await Comment.create({ text, artwork: artworkID });

      artwork.comments.push(comment);
      await artwork.save();

      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getArtworkLikes: async (req, res) => {
    const { artworkID } = req.params;
    try {
      const artwork = await Artwork.findById(artworkID).populate("likes");
      res.json(artwork.likes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addLike: async (req, res) => {
    const { artworkID } = req.params;

    try {
      const artwork = await Artwork.findById(artworkID);
      const like = await Like.create({ artwork: artworkID });

      artwork.likes.push(like);
      await artwork.save();

      res.json(like);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = ArtworkController;
