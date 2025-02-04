import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Check your database connection string");
}

// An assumption that we have a cached connection
let cached = global.mongoose;

// not cached means no connection
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// connecting to database
export async function connectToDatabase() {
  // Case 1 : when we have the connection
  if (cached.conn) {
    return cached.conn;
  }

  // Case 2: when someone might have initiated the connection so promise is on the go
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  // Case 3: When we don't have the promise
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
  }

  return cached.conn; // Return the connection
}
