import { noteRoutes } from "../routes/notes.routes.js";
import { isPathAPI } from "../utils/isPathAPI.js";

export const routeHandler = async (req, res) => {
  noteRoutes(req, res);
};
