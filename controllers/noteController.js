import { ObjectId } from "mongodb";
import NoteModel from "../models/notes.models.js";
import { sendResponse } from "../utils/sendResponse.js";
import jwt from "jsonwebtoken"
import process from "node:process"
import { warn } from "node:console";

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

	// should title and content be merged into a single param?
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
				data: addNote.notes[addNote.notes.length - 1] // ONLY RETURN THE LATEST
			})

		} catch(err){
			console.error(err.message);
			sendResponse(res, 401, {
				message: "Unauthorized request"
			})		
		}
	}

	static async getUserNote(res, token, id){
		try{
			const userId = jwt.verify(token, process.env.JWT_SECRET).userId;

			const noteModel = new NoteModel({userId: userId});
			
			const note = await noteModel.findNote(id);

			if(!note){
				return sendResponse(res, 404, {
					message: "Note with the specified ID is not found",
					noteId: id,
				})
			}

			return sendResponse(res, 200, {
				message: "Note retrieved successfully",
				data: note
			})

		} catch(err){
			console.error(err);
			return sendResponse(res, 401, {
				message: "Unauthorized request"	
			})
		}
	}

	static async updateUserNote(res, token, id, updateData){
		try{
			const userid = jwt.verify(token, process.env.JWT_SECRET).userId;

			const notemodel = new NoteModel({userId: userid});

			const update = await notemodel.updateNote(id, updateData);

			if(!update){
				return sendResponse(res, 404, {
					message: "Note with the specified ID is not found",
					noteId: id,
				})
			}

			const updatedNote = await notemodel.findNote(id);

			return sendResponse(res, 200, {
				message: "Note updated successfully",
				data: updatedNote,
			})
		} catch(err){
			console.error(err);
			return sendResponse(res, 401, {
				message: "Unauthorized request",
			})

		}
	}
}

export default NoteController;
