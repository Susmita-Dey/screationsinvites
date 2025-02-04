import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Check your database connection string");
}

// An assumption that we have a cached connection 
let cached = global.mongoose;