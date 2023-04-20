const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {type: Number, require: true},
    purchasedOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Order", orderSchema)