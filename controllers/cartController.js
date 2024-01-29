const{cart} = require("../model/model"); 

const cartController = {
    addCart: async (req, res) => {
        try {
            const newCart = new cart(req.body);
            const saveCart = await newCart.save();
            res.status(200).json(saveCart);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getCart: async(req, res) => {
        const userId = req.params.userId;
        try {
            const carts = await cart.findOne({userID: userId});
            res.status(200).json(carts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteCart: async(req, res) => {
        const userId = req.params.userId;
        try {
            const deletedCart = await cart.findOneAndDelete({userID: userId}); 
            if(deletedCart){
                res.status(200).json({message: 'Deleted!'}); 
            } else{
                res.status(404).json({message: 'User not found!'});
            }
        } catch (err) {
            res.status(500).json(err)
        }
    },
};

module.exports = cartController;