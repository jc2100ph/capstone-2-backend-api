const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const auth = require("../authentication/auth")

router.route("/all").get(productController.productGetAll)
router.route("/allActive").get(productController.productGetAllActive)
router.route("/singleItem").post(productController.productGetSingleItem)
router.route("/create").post(auth.verifyToken, productController.productCreate)
router.route("/update").patch(auth.verifyToken, productController.productUpdate)
router.route("/archive").patch(auth.verifyToken, productController.productArchive)
router.route("/activate").patch(auth.verifyToken, productController.productActivate)

module.exports = router