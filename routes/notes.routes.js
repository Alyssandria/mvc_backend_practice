import NoteController from "../controllers/noteController.js";
import NoteSchema from "../models/note.schema.js";
import Url from "../utils/class/Url.js";
import { CONSTANTS } from "../utils/constants.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export const noteRoutes = async (req, res) => {
  const {url, method } = req;

	// CHECK FOR ROUTES WITHOUT ID
	if(Url.getSegmentLength(url) === 2){

		// GET NOTES
		if(method === CONSTANTS.HTTP_METHODS.GET){
			const token = req.headers['authorization'].split("Bearer ")[1];
			return NoteController.getUserNotes(res, token);
		}

		// ADD NEW NOTES
		if(method === CONSTANTS.HTTP_METHODS.POST) {

			const token = req.headers['authorization'].split("Bearer ")[1];

			try{
				const body = await parseBody(req);

				const validate = NoteSchema.validate(body);

				if(!validate.ok) {
					sendResponse(res, 400, {
						message: validationResult.message,
						error: {...validationResult.error}
					})
				}

				return NoteController.addUserNotes(res, token, body.title,body.content);
			}	catch(err){
				console.error(err);
				sendResponse(res, 400, {
					errorMsg: err.message,
					message: "Unable to parse request! Make sure it is valid JSON"	
				})
			}
		}


	}
};
