import { ObjectId } from "mongodb";
import NoteController from "../controllers/noteController.js";
import {AddNoteSchema, UpdateNoteSchema} from "../models/note.schema.js";
import Url from "../utils/class/Url.js";
import { CONSTANTS } from "../utils/constants.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export const noteRoutes = async (req, res) => {
  const {url, method } = req;
	const token = req.headers['authorization'].split("Bearer ")[1];

	// CHECK FOR ROUTES WITHOUT ID
	if(Url.getSegmentLength(url) === 2){

		// GET NOTES
		if(method === CONSTANTS.HTTP_METHODS.GET){
			
			return NoteController.getUserNotes(res, token);
		}

		// ADD NEW NOTES
		if(method === CONSTANTS.HTTP_METHODS.POST) {
			try{
				const body = await parseBody(req);

				const validation = AddNoteSchema.validate(body);

				if(!validation.ok) {
					return sendResponse(res, 400, {
						message: validation.message,
						error: {...validation.error}
					})
				}

				return NoteController.addUserNotes(res, token, body.title,body.content);
			}	catch(err){
				return sendResponse(res, 400, {
					errorMsg: err.message,
					message: "Unable to parse request! Make sure it is valid JSON"	
				})
			}
		}
	}

	// CHECK FOR ROUTES WITH ID
	if(Url.getSegmentLength(url) === 3){

		// GET ID
		let id;
		try{
			const paramId = Url.getSegmentPosition(url, 2).split("/")[1];
			ObjectId.isValid(paramId);
			id = ObjectId.createFromHexString(paramId);
		}catch(err){
			return sendResponse(res, 400, {
				message: "Id must be a valid ObjectId",
				error: err.message
			})
		}


		// FIND NOTE ":id"
		if(method === CONSTANTS.HTTP_METHODS.GET){
			return NoteController.getUserNote(res, token, id)
		}
		
		// UPDATE  NOTE  ":id"
		if(method === CONSTANTS.HTTP_METHODS.POST){

			try{
				const body = await parseBody(req);

				const validation = UpdateNoteSchema.validate(body);

				if(!validation.ok){
					return sendResponse(res, 400, {
						 message: validation.message,
						 error: {...validation.error}
					});
				}


			return NoteController.updateUserNote(res, token, id, body);
				
			} catch(err){
				console.error(err);
				return sendResponse(res, 400, {
					message: "Unable to parse request! Make sure it is valid JSON",
					error: err.message
				})
			}
			

			
		}


	}
};
