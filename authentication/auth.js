const jwt = require("jsonwebtoken")
const placeholder = "secret"

module.exports.createToken = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user._id
    }
    const secret = placeholder
    const option = { expiresIn: '30m' }

    return jwt.sign(payload, secret, option)
}

module.exports.verifyToken = (req, res, next) => {
    const secret = placeholder
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({"error":"unauthorized"})
    }

    try{
        const decoded =  jwt.verify(token, secret)
        req.verifiedUser = decoded
        next()
    }catch(err) {
        console.log(err)
        res.status(401).json({ "error": 'Unauthorized' })
    }
}