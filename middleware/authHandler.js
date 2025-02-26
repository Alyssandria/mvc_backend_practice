import Url from "../utils/class/Url.js"
import Schema from "../utils/class/Schema.js";
    import { CONSTANTS } from "../utils/constants.js";
import { parseBody } from "../utils/parseBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export const authHandler = async (req, res, next) => {
	const {url, method} = req;

	const hello = new Schema({
		sheesh: {
			type: "string",
		}
	});


	console.log(hello.definition);

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

			// TODO: VALIDATE BODY IF IT MATCHES THE SCHEMA
			
			
			console.log(body);
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
