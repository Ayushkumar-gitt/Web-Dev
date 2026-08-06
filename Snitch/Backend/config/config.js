import dotenv from "dotenv";
dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not provided in env file")
}
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET doesn't exists in env file")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID doesn't exists in env file")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET doesn't exists in env file")
}

if (!process.env.IMAKEKIT_SECRET_KEY) {
    throw new Error("Imagekit secret key doesn't exists")
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IMAKEKIT_SECRET_KEY: process.env.IMAKEKIT_SECRET_KEY
}
