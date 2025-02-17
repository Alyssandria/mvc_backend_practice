import NoteModel from "../models/notes.models.js";
import { sendResponse } from "../utils/sendResponse.js";

class NoteController {
  static async getAllNotes(res) {
    try {
      const Notes = await NoteModel.findAll();
      sendResponse(res, 200, {
        data: Notes,
        status: res.statusCode,
        message: "GET all notes",
      });
    } catch (error) {
      sendResponse(res, 500, {
        status: res.statusCode,
        error: "Internal Server Error",
      });
    }
  }
}

export default NoteController;
