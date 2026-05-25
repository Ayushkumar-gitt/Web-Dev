const mongodb = require("mongoose")
function connectDb() {
    mongodb.connect("mongodb+srv://starsoul04_db_user:9yigOlydcQ2ADM3Q@cluster0.iap0hso.mongodb.net/notes")
        .then(() => {
            console.log("Database connected");
        })
}

module.exports = connectDb