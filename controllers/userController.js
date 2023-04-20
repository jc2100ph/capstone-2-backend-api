const bcrypt = require("bcrypt")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const auth = require("../authentication/auth")

module.exports.userRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(200).json({"message": "User is successfully registered"})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error": "failed to register User"})
    }
    
}

module.exports.userLogin = async (req, res) => {
    try{
        const findUser = await User.findOne({email: req.body.email})

        if(!findUser){
            return res.status(401).json({"message": "Invalid Username"})
        }

        const comparePassword = await bcrypt.compare(req.body.password, findUser.password)
        
        if(!comparePassword) {
            return res.status(401).json({"message": "Invalid Password"})
        }
        
        const generateToken = auth.createToken(findUser)

        res.cookie("token", generateToken, {httpOnly: true})
        return res.status(200).json({"message": "User Successfully Log in"})
    }catch(err){
        console.log(err)
        return res.status(400).json({"error": "User Failed to Log in"})
    }
}

module.exports.retrieveUser = async (req,res) => {
    try{
        const userId = req.verifiedUser.userId
        const userInfo = await User.findById(userId, {password: ""})
        const orderInfo = await Order.find({userId: userId})
        return res.status(200).json({userInfo, orderInfo})
    }catch(err) {
        console.log(err)
        return res.status(400).json({"error": "Failed to retrieve user"})
    }
}