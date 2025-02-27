import AuthController from "../controllers/authController.js";
import AuthSchema from "../models/auth.schema.js";
import Url from "../utils/class/Url.js"
import { CONSTANTS } from "../utils/constants.js";
import { hashPassword } from "../utils/hashPassword.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export const authHandler = async (req, res, next) => {
	const {url, method} = req;

	// HANDLES AUTH ROUTES (/SIGNUP ; /SIGNIN)
	if(url.startsWith(CONSTANTS.ROUTES.API_AUTH) && Url.getSegmentLength(url) === 3){

		// HANDLE SIGNUP
		if(Url.getSegmentPosition(url, 2) === CONSTANTS.ROUTES.AUTH.SIGNUP && method === CONSTANTS.HTTP_METHODS.POST){

			try{
			const body = await parseBody(req);
			// VALIDATE BODY
			const validationResult = AuthSchema.validate(body);
			if(!validationResult.ok){
				sendResponse(res, 400, {
					message: validationResult.message,
					error: {...validationResult.error}
				})
			}
			
			const hashedPassword =  await hashPassword(body.password);
			
			return AuthController.userSignup(res, body.username, hashedPassword);

			} catch(err){
				sendResponse(res, 400, {
					errorMsg: err.message,
					message:`Unable to parse request! Make sure it is valid JSON`,
				})
			}
		}


		if(Url.getSegments(url, 2) === CONSTANTS.ROUTES.AUTH.SIGNIN && method === CONSTANTS.HTTP_METHODS.POST){	
		
		try{
			const body = await parseBody(req);

			// VALIDATE BODY
			const validationResult = AuthSchema.validate(body);
			if(!validationResult.ok){
				sendResponse(res, 400, {
					message: validationResult.message,
					error: {...validationResult.error}
				})
			}
			
		} catch(err){
			sendResponse(res, 400, {
				errorMsg: err.message,
				message: "Unable to parse request! Make sure it is valid JSON"
			})
		}

		}

	}


	// HANDLES AUTHENTICATION
	if(url.startsWith(CONSTANTS.ROUTES.API_NOTES))	{
		next()
	}
}
