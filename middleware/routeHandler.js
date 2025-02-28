import { noteRoutes } from "../routes/notes.routes.js";

export const routeHandler = async (req, res) => {

	// HANDLE PRIVATE ROUTES
  noteRoutes(req, res);
};
