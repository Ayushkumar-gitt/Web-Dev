import connectToDb from "./config/database.js";
import { generateResponse } from "./services/ai.service.js";
import app from "./src/app.js";
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4']);

connectToDb()
// generateResponse()

app.listen(3000, () => {
    console.log("server is running on port 3000");
})