require('dotenv').config()
const app = require("./src/app");
const connectToDb = require("./config/database");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.listen(3000, () => {
    console.log("connected to server on port 3000");
})
connectToDb()