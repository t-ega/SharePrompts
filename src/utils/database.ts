import mongoose from "mongoose";

let isConnected = false;
export const connectToDb = async () => {
  console.log("Called");
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.DBNAME,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Unable to connect to the database", err);
  }
};
