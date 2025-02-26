import "./config/env.js";
import { connectDB } from "./config/db.js";
import { middlwareHandler } from "./middleware/middlewareHandler.js";
import { CONSTANTS } from "./utils/constants.js";
import http from "node:http";

// HTTP SERVER
const client = http.createServer((req, res) => {
  // SEND THE REQUEST AND RESPONSE TO THE MIDDLEWARE FOR HANDLING
  middlwareHandler(req, res);
});

client.listen(CONSTANTS.SERVER.PORT, CONSTANTS.SERVER.HOSTNAME, () => {
  console.log(`Server running at port ${CONSTANTS.SERVER.PORT}`);

  // CONNECT TO THE DATABASE ON SERVER START
  connectDB().catch(error => console.error(error));
});
