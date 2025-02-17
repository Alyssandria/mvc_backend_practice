import process from "node:process";

export const CONSTANTS = {
  SERVER: {
    PORT: process.env.PORT,
    HOSTNAME: process.env.HOSTNAME,
  },
  DATABASE: {
    CONNECTION_STRING: process.env.URI,
  },
  HTTP_METHODS: {
    DELETE: "DELETE",
    PUT: "PUT",
    POST: "POST",
    GET: "GET",
  },
};
