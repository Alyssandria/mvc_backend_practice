import NoteController from "../controllers/noteController.js";
import { CONSTANTS } from "../utils/constants.js";

export const noteRoutes = async (req, res) => {
  const { url, method } = req;
  if (url === CONSTANTS.ROUTES.API_NOTES && method === CONSTANTS.HTTP_METHODS.GET) {
    return NoteController.getAllNotes(res);
  }

  if (url === CONSTANTS.ROUTES.API_NOTES && method === CONSTANTS.HTTP_METHODS.POST) {
  }
};
