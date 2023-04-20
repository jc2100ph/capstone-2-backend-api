const Product = require("../models/Product")

module.exports.productGetAll = async (req, res) => {
    try{
        const products = await Product.find({})
        return res.status(200).json(products)
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to get all product"})
    }
}

module.exports.productGetAllActive = async (req,res) => {
    try{
        const products = await Product.find({isActive: true})
        return res.status(200).json(products)
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to get all product"})
    }
}

module.exports.productGetSingleItem = async (req,res) => {
    try{
        const productId = req.body.id
        const products = await Product.findById(productId)
        
        return res.status(200).json(products)
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to get all product"})
    }
}

module.exports.productCreate = async (req, res) => {
    if(!req.verifiedUser.isAdmin){
        return res.status(401).json({"error":"Unauthorized"})
    }

    try{
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })

        await newProduct.save()
        return res.status(200).json({"message": "Product is successfully created"})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to create a product"})
    }
}

module.exports.productUpdate = async (req, res) => {
    if(!req.verifiedUser.isAdmin){
        return res.status(401).json({"error":"Unauthorized"})
    }

    try {
        const productId = req.body.id
        const updateField = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        }

        await Product.findByIdAndUpdate(productId, updateField)
        return res.status(200).json({"message": "Product is successfully updated"})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to update a product"})
    }
}

module.exports.productArchive = async (req, res) => {
    if(!req.verifiedUser.isAdmin){
        return res.status(401).json({"error":"Unauthorized"})
    }

    try {
        const productId = req.body.id

        await Product.findByIdAndUpdate(productId, {isActive: false})
        return res.status(200).json({"message": "Product is successfully archive"})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to update a product"})
    }
}

module.exports.productActivate = async (req, res) => {
    if(!req.verifiedUser.isAdmin){
        return res.status(401).json({"error":"Unauthorized"})
    }

    try {
        const productId = req.body.id

        await Product.findByIdAndUpdate(productId, {isActive: true})
        return res.status(200).json({"message": "Product is successfully activated"})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error":"Failed to update a product"})
    }
}