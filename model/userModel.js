const mongoose = require("mongoose");
const Artwork = require("./artworksModel")

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  roleID: {
    type: String,
  },
  artworks:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork"
    }
  ],
  status :{
    type: Boolean,
  },
  followerID: [
    {type: String}
  ],
  followingID: [
    {type: String}
  ]
});

let User = mongoose.model("User", userSchema)

module.exports = {User}
