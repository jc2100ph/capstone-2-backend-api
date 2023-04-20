const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")
const auth = require("../authentication/auth")

router.route("/createOrder").post(auth.verifyToken, orderController.orderCreate)

module.exports = router