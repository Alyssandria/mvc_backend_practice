import { noteRoutes } from "../routes/notes.routes.js";

export const routeHandler = async (req, res) => {
  noteRoutes(req, res);
};
