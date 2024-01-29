const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    complain: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "complain"
        },
    ]
});

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    roleID: {
        type: Number,
        require: true
    }
});

const complainSchema = new mongoose.Schema({
    complainID: {
        type: String,
        require: true
    },
    complainText: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    complainDate: {
        type: String 
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

let complain = mongoose.model("complain",complainSchema);
let User = mongoose.model("User", userSchema);


module.exports = {complain, User};