const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    isActive: {type: Boolean, default: true},
    createdOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Product", productSchema)