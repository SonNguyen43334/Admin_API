const router = require('express').Router()
const authenController = require("../controllers/authenController")
const midderwareController = require('../controllers/middlewareController')

//REGISTER
router.post("/register", authenController.register)

//LOGIN
router.post("/login", authenController.login)

//REFRESH
router.post("/refresh", authenController.requestRefreshToken)

//LOGOUT
router.post("/logout", midderwareController.verifyToken ,authenController.logout)
module.exports = router