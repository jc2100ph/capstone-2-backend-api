const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const auth = require("../authentication/auth")

router.route("/register").post(userController.userRegister)
router.route("/login").post(userController.userLogin)
router.route("/retrieve").get(auth.verifyToken, userController.retrieveUser)

module.exports = router
