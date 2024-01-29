const mongoose = require("mongoose");
const User = require("./userModel");

const artworkSchema = new mongoose.Schema({
  artworkID: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  publishedDate: {
    type: String,
  },
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  countLike: {
    type: Number,
  },
  premium: {
    type: Boolean,
  },
  typeID: {
    type: [String],
  },
});

let Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = { Artwork };
