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

			const requiredPrompt = (field) => `${field} must be of type string and is required`;

			// INIT USERS COLLECTION
			DB.createCollection("users", {
				validator: {
					$jsonSchema: {
						bsonType: "object",
						title: "User object validation",
						required: ["username", "password"],
						properties: {
							username: {
								bsonType: "string",
								description: requiredPrompt("username"),
							},
							password: {
								bsonType: "string",
								description: requiredPrompt("Password"),
							},
							notes: {
								bsonType: "array",
								items: {
									bsonType: "object",
									required: ["title", "content"],
									properties: {
										title: {
											bsonType: "string",
											description: requiredPrompt("Title"),
										},
										password: {
											bsonType: "string",
											description: requiredPrompt("Password"),
										}
									} 
								}
							}
						}
					}
				}
			})


			process.on("SIGINT", async () => {
				console.log("Connection Terminated: closing mongoDB connection");
				await client.close();
				console.log("MongoDB client successfully closed");
				process.exit();
			})
    } catch (error) {
      console.error(new Error(error));
			process.exit(1);
    }
  }
  return DB;
};
