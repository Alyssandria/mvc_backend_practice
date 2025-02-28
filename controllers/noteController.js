import NoteModel from "../models/notes.models.js";
import { sendResponse } from "../utils/sendResponse.js";
import jwt from "jsonwebtoken"
import process from "node:process"

class NoteController {
  static async getUserNotes(res, token) {
		try{
			const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
			
			const noteModel = new NoteModel({userId});
			const notes = await noteModel.findUserNotes();
			if(!notes){
				return sendResponse(res, 401, {
					messsage: "Unauthorized request"
				})
			}

			sendResponse(res, 200, {
				message: "Notes retrieved successfully",
				notes: notes
			})
		} catch(error){
			console.error(error.message);
			sendResponse(res, 401, {
				message: "Unauthorized request"
			})
		}
  }

	static async addUserNotes(res, token, title, content){
		try{
			const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

			const noteModel = new NoteModel({userId, title, content})
			
			const addNote = await noteModel.addNewNote();


			if(!addNote){
				return sendResponse(res, 400, {
					message: "Invalid request"
				})
			}

			sendResponse(res, 201, {
				message: "Note created",
				data: {title, content}
			})

		} catch(err){
			console.error(err.message);
			sendResponse(res, 401, {
				message: "Unauthorized request"
			})		
		}
	}
}

export default NoteController;
