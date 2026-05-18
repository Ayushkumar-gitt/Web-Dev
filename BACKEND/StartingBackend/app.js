const express = require("express")

const app = express() // server create hua express ko call krne se 


app.get('/', (req, res) => {
    res.send('hello')
})
app.listen(3000) // server run hua port 3000 pr