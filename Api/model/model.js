const mongoose = require("mongoose");

const artServiceSchema  = new mongoose.Schema({
    customerID: {
        type: String,
        require: true
    },
    creatorID: {
        type: String,
        require: true
    },
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
    proposalDate: {
        type: Date,
        require: true
    }
})

let artService = mongoose.model("ArtService", artServiceSchema);

module.exports = {artService};
