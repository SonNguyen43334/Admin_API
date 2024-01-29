const mongoose = require("mongoose"); 

const artworkSchema = new mongoose.Schema({
    artworkID: {
        type: String, 
        required: true,
    },
    title: {
        type: String, 
        required: true,
    }, 
    description: {
        type: String
    }, 
    imageURL: {
        type: String, 
        required: true,
    }, 
    creatorID: {
        type: String, 
        required: true,
    }, 
    countLike: {
        type: Number
    }, 
    premium: {
        type: String
    }, 
    typeID: {
        type: String, 
        required: true,
    }, 
    price: {
        type: Number
    }
});

const commentSchema = new mongoose.Schema({
    commentID: {
        type: String, 
        required: true,
    },
    artworkID: {
        type: String, 
        required: true,
    }, 
    userID: {
        type: String, 
        required: true,
    }, 
    commentText: {
        type: String
    }, 
    commentDate: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
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
    email: {
        type: String, 
        required: true,
    }, 
    roleID: {
        type: String, 
        required: true,
    }
});

const likeSchema = new mongoose.Schema({
    likeID: {
        type: String, 
        required: true,
    },
    artworkID: {
        type: String, 
        required: true,
    }, 
    userID: {
        type: String, 
        required: true,
    }, 
    status: {
        type: String
    }, 
    likeTime: {
        type: String
    }
});

const cartSchema = new mongoose.Schema({
    cartID: {
        type: String, 
        required: true,
    }, 
    userID: {
        type: String, 
        required: true,
    },
    cartDate: {
        type: String, 
        required: true,
    }
});

let artwork = mongoose.model("artwork", artworkSchema); 
let user = mongoose.model("user", userSchema); 
let comment = mongoose.model("comment", commentSchema); 
let like = mongoose.model("like", likeSchema); 
let cart = mongoose.model("cart", cartSchema);

module.exports = {artwork, user, comment, like, cart}; 