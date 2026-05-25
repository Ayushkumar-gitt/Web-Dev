const mongodb = require("mongoose")

function connectDb() {
    mongodb.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected");
        })
}

module.exports = connectDb
