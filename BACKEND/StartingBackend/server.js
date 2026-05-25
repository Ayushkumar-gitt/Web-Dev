const app = require('./app.js')
const connectDb = require('./config/database.js')
app.listen(3000, () => {  // server run hua port 3000 pr
    console.log("server is running on port - http://localhost:3000/");
})

connectDb()
