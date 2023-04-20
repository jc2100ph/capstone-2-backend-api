const Order = require("../models/Order")
const Product = require("../models/Product")


module.exports.orderCreate = async (req, res) => {
    if(req.verifiedUser.isAdmin){
        return res.status(401).json({"error":"Admins cant create order"})
    }

    try{
        const newProductOrder = {
            productId: req.body.productId,
            quantity: req.body.productQuantity
        }
        const productPrice = await Product.findById(req.body.productId)
        const totalAmountCalculated = productPrice.price * req.body.productQuantity

        const newOrder = new Order({
            userId: req.verifiedUser.userId,
            products:[newProductOrder],
            totalAmount: totalAmountCalculated
        })

        await newOrder.save()
        return res.status(200).json({"message": "successfully created order"})
    }catch(err) {
        console.log(err)
        res.status(400).json({"error": "failed to create order"})
    }
}