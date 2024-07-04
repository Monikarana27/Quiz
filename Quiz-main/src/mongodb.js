const mongoose = require("mongoose")

//to create database
mongoose.connect("mongodb://localhost:27017/LoginSignup")   //to connect node to mongodb database, loginSignup is name of db

.then(() =>{
    console.log("mongodb connected");
})

.catch(() => {
    console.log("failed to connect");
})

//to create format of document
const LogInSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true //compulsory to fill
    },
    email: {
        type:String, 
        required:true
    },
    password: {
        type:String, 
        required:true
    }
})

const collection = new mongoose.model("LogInConnection", LogInSchema)

module.exports = collection