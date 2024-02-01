const { Artwork } = require("../model/artworksModel");
const { User } = require("../model/userModel");

const artworkController = {
  addArtwork: async (req, res) => {
    try {
      console.log("Request body:", req.body); // Kiểm tra dữ liệu gửi từ client
      const newArtwork = new Artwork(req.body);
      const saveArtwork = await newArtwork.save();
      if (req.body.creatorID) {
        const user = await User.findById(req.body.creatorID);
        console.log("User found:", user); // Kiểm tra user được tìm thấy
        await user.updateOne({ $push: { artworks: saveArtwork._id } });
      }
      res.status(200).json(saveArtwork);
    } catch (error) {
      console.error("Error:", error); // In ra thông báo lỗi nếu có lỗi xảy ra
      res.status(500).json(error);
    }
  },
  getAllArtwork: async (req, res) => {
    try {
      const allArtwork = await Artwork.find();
      res.status(200).json(allArtwork);
    } catch (error) {
      console.error("Error:", error); // In ra thông báo lỗi nếu có lỗi xảy ra
      res.status(500).json(error);
    }
  },
  getAnArtwork: async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params._id).populate({
        path: "creatorID",
        select: "name",
      });
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
      res.status(200).json(artwork);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateArtwork: async (req, res) => {
    try {
      const artwork = await Artwork.findById(req.params._id);
      await artwork.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteArtwork: async (req, res) => {
    try {
      await User.updateMany(
        { artworks: req.params._id },
        { $pull: { artworks: req.params._id } }
      );
      await Artwork.findByIdAndDelete(req.params._id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = artworkController;
