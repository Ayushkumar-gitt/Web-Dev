const express = require("express")
const app = require("./src/app");
const mongoose = require("mongoose")
const connectToDb = require("./config/database");

app.listen(3000,()=>{
    console.log("connected to server");
})
connectToDb()

// module.exports = 