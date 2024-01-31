const { artService } = require("../model/model");

const artServiceController = {

    // Add service
    addArtService: async(req,res) => {
        try {
            const newService = new artService(req.body);
            const savedService = await newService.save();
            res.status(200).json(savedService);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get all services
    getAllServices: async(req,res) => {
        try {
            const service = await artService.find();
            res.status(200).json(service);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete all services
    deleteAllServices: async (req, res) => {
        try {
            const deleteResult = await artService.deleteMany({});

            if (deleteResult.deletedCount > 0) {
                res.status(200).json({ message: 'All services deleted successfully' });
            } else {
                res.status(404).json({ message: 'No services found to delete' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get service by ID
    getServicebyID: async(req,res) => {
        const id = req.params.id;
        try {            
            const service = await artService.findById(id); 
            if (service) {
                res.status(200).json(service);
            } else {
                res.status(404).json({ message: 'Service not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update Service by ID
    updateServicebyID: async (req, res) => {
        const id = req.params.id;
        const updateData = req.body;
        try {
            const updatedService = await artService.findByIdAndUpdate(
                id, updateData, { new: true } // Trả về tài khoản đã được cập nhật
            );
            if (updatedService) {
                res.status(200).json(updatedService);
            } else {
                res.status(404).json({ message: 'Service not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    
    // delete service by ID
    deleteServicebyID: async (req, res) => {
        const id = req.params.id;
        try {
            const deleteService = await artService.findByIdAndDelete(id);

            if (deleteService) {
                res.status(200).json({ message: 'Service deleted successfully' });
            } else {
                res.status(404).json({ message: 'Service not found' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = artServiceController;







