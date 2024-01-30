const { default: mongoose } = require("mongoose");

const accountSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: { 
        type: String, 
        required: true
    },
    name: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    roleId: { 
        type: String, 
        required: true
    },
    roleName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
});
const financialSchema = new mongoose.Schema({
    reportID: { 
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
});
let Account = mongoose.model('Account', accountSchema);

let Finance = mongoose.model('Finance', financialSchema);

module.exports = {Account, Finance};