import connectToDb from "./config/database.js";
import app from "./src/app.js";

connectToDb()
app.listen(3000, () => {
  console.log("Server is running on port 3000");
})