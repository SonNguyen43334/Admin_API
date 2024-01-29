const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const financialSchema = new mongoose.Schema({
  reportID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});
const artworkShema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  premium: {
    type: Boolean,
  },
  price: {
    type: Number,
    require: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});
let Account = mongoose.model("Account", accountSchema);

let Finance = mongoose.model("Finance", financialSchema);

let Artwork = mongoose.model("Artwork", artworkShema);

module.exports = { Account, Finance, Artwork };
