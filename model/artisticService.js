const mongoose = require('mongoose')

const artisticServiceSchema = new mongoose.Schema({
    serviceID:{
        type: String,
    },
    customerID: {
        type: String
    },
    creatorID: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number
    },
    proposalDate:{
        type: Date
    }
})