require('dotenv').config()
const app = require("./src/app");
const connectToDb = require("./config/database");


app.listen(3000, () => {
    console.log("connected to server on port 3000");
})
connectToDb()