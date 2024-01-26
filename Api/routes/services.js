const artServiceController = require("../controllers/artServiceController");

const router = require("express").Router();

//Get all service 
router.get("/", artServiceController.getAllServices);

//Delete all service 
router.delete("/", artServiceController.deleteAllServices);

//Add services
router.post("/", artServiceController.addArtService);

//Get service by id
router.get("/:id", artServiceController.getServicebyID);

//Update service by id
router.put('/:id', artServiceController.updateServicebyID);

//Delete service 
router.delete('/:id', artServiceController.deleteServicebyID);

module.exports = router;




