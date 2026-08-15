import dns from "node:dns";
import mongoose from "mongoose";
import { config } from "./config.js";

// Atlas connection strings use DNS SRV records. Use public resolvers when the
// network's default resolver refuses those queries.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectToDb() {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to DB");
}

export default connectToDb;
