const mongoose = require("mongoose");

const artServiceSchema  = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    status: {
        type: [String],
        enum: ['pending', 'processing', 'done'],
        require: true
    },
})

let artService = mongoose.model("ArtService", artServiceSchema);

module.exports = {artService};
