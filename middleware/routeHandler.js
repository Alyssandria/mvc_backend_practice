import { noteRoutes } from "../routes/notes.routes.js";

export const routeHandler = async (req, res) => {

	// TODO: HANDLE PRIVATE ROUTES
  noteRoutes(req, res);
};
