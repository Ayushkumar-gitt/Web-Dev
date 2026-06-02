const db = require("mongoose")
require("dotenv").config()

async function connectToDb() {
    await db.connect(process.env.MONGO_URI)

    console.log("Connected to DB");
}

module.exports = connectToDb