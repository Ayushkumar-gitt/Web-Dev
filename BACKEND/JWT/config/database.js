const db = require("mongoose")
require("dotenv").config()

function connecttoDb(){
    db.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected");
    
})
}

module.exports = connecttoDb