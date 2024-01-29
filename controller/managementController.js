const {User} = require("../model/model");

const managementController = {
    // create creator by userID
    createCreator: async(req, res) =>{
        const userID = req.params.userID;
        try {
            const creator = await User.findOne({userID: userID});
            if(creator){
                
            }
            res.status(200).json(createCreator);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // delete creator by userID
    deleteCreator: async(req, res) =>{
        const userID = req.params.User;
        try {
            
        } catch (error) {
            res.status(500).json(error);
        }
    },

     
};

module.exports = managementController;