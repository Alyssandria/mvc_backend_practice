import NoteController from "../controllers/noteController.js";
import { CONSTANTS } from "../utils/constants.js";
import { ROUTES } from "../utils/routes.js";

export const noteRoutes = async (req, res) => {
  const { url, method } = req;
  if (url === ROUTES.API_BASE && method === CONSTANTS.HTTP_METHODS.GET) {
    return NoteController.getAllNotes(res);
  }

  if (url === ROUTES.API_BASE && method === CONSTANTS.HTTP_METHODS.POST) {
  }
};
