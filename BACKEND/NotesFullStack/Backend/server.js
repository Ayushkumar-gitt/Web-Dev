const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = require('./app.js')
const connectDb = require('./config/database.js')

connectDb()

app.listen(3000, () => {  // server run hua port 3000 pr
    console.log("server is running on port - http://localhost:3000/");
})
