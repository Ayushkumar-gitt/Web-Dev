const app = require("./src/app")
const connecttoDb = require("./config/database");

connecttoDb()
app.listen(3000,()=>{
    console.log("server is running");
    
})