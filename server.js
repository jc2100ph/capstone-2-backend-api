const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const orderRoute = require("./routes/orderRoutes")

const app = express()

const mongoURI = "mongodb+srv://admin:admin1234@b256-cruz.rvtoo2s.mongodb.net/capstone-2?retryWrites=true&w=majority"

app.use(express.json())
app.use(cookieParser())

const dbConnection = async() => {
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("mongoDB is connected")
    }catch(err){
        console.log(err)
    }
}
dbConnection()

app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)

app.listen(4000,() => {
    console.log("Listening at port 4000")
})
