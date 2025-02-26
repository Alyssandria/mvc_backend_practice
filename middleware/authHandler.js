import Url from "../utils/class/Url.js"
import { CONSTANTS } from "../utils/constants.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export const authHandler = async (req, res, next) => {
	const {url, method} = req;

	// HANDLES AUTH ROUTES (/SIGNUP ; /SIGNIN)
	if(url.startsWith(CONSTANTS.ROUTES.API_AUTH) && Url.getSegmentLength(url) === 3){
		if(Url.getSegmentPosition(url, 2) === CONSTANTS.ROUTES.AUTH.SIGNIN && method === CONSTANTS.HTTP_METHODS.POST){
			if(!req.headers["content-type"] || req.headers["content-type"] !== 'application/json'){
				sendResponse(res, 415, {
					message:"Unsupported Media Type: Content must have a mime type of application/json",
				});
			}
			try{
			const body = await parseBody(req);

			// TODO: HANDLE VALIDATION
			// TODO: CREATE AUTH MODEL -> HANDLE DB

			} catch(err){
				console.error(`Unable to parse request make sure it is valid json: Error message: ${err.message}`);
				return;
			}
		}

	}


	// HANDLES AUTHENTICATION
	if(url.startsWith(CONSTANTS.ROUTES.API_NOTES))	{
		next()
	}
}
