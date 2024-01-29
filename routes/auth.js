const router = require('express').Router()
const authenController = require("../controllers/authenController")

//REGISTER
router.post("/register", authenController.register)

//LOGIN
router.post("/login", authenController.login)

//REFRESH
router.post("/refresh", authenController.requestRefreshToken)

//LOGOUT
router.post("/logout", authenController.logout)
module.exports = router