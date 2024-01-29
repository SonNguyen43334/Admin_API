const {complain} = require("../model/model");

const complainController ={
    // add complain
    addComplain: async(req, res) =>{
        try {
            const newComplain = new complain(req.body);
            const saveComplain = await newComplain.save();
            res.status(200).json(saveComplain);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    // show complain
    getComplain: async(req, res) =>{
        try {
            const getcomplain = await complain.find();
            res.status(200).json(getcomplain);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // get compalain theo complaiID

    findComplain: async(req, res) =>{
        const complainID = req.params.complainID;
        try {
            const findcomplain = await complain.findOne({complainID: complainID });
            res.status(200).json(findcomplain);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Delete complain by complainID

    deleteComplain: async(req, res) =>{
        const complainID = req.params.complainID;
        try{
            const deleteComplain = await complain.deleteOne({complainID: complainID});
            res.status(200).json(deleteComplain);
        }catch(error){
            res.status(500).json(error);
        }
    },

};

module.exports = complainController;