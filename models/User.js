const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", userSchema)