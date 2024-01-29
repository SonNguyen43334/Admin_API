const { Artwork } = require("../model/artworksModel");
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCreator: async (req, res) => {
    try {
      const creators = await User.find({roleID: "3"})
      res.status(200).json(creators)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getUserByID: async (req, res) => {
    try {
      const userID = req.params.userID;
      const user = await User.findById(userID).populate("artworks");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user); // Gửi phản hồi về khi user được tìm thấy
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchUserByName: async (req, res) => {
    try {
      const searchName = req.query.name;
      if (!searchName) {
        return res.status(400).json({ message: "Name parameter is missing" });
      }
      const users = await User.find({ name: { $regex: searchName, $options: "i" } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params._id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully");
    } catch (error) {
      req.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Artwork.updateMany(
        { creatorID: req.params._id },
        { creatorID: null }
      );
      await User.findByIdAndDelete(req.params._id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
