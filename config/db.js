import { MongoClient } from "mongodb";
import process from "node:process";
const CONNECTION_STRING = process.env.URI;

const client = new MongoClient(CONNECTION_STRING, {
  connectTimeoutMS: 10000,
});

// OUTSIDE TO MAKE SURE ONLY ONE INSTANCE
let DB;

export const connectDB = async () => {
  if (!DB) {
    try {
      await client.connect();

      console.log("Database Connected Successfully");
      DB = client.db();
    } catch (error) {
      console.log(error);
    }
  }

  return DB;
};
