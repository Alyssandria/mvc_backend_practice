import AuthModel from "../models/auth.models.js";
import { sendResponse } from "../utils/sendResponse.js";

class AuthController {
	static async userSignup(res, username, password){
		const authModel = new AuthModel(username, password);
		
		try{
			const signup = await authModel.signup()	

			if(!signup){
				return sendResponse(res, 409, {
					message: "Username already exists",
				})
			}
			sendResponse(res, 201, {
				message: "Sign in Successfull"
			})
		} catch(err){
			console.error(err);
			sendResponse(res, 500, {
				message: "Internal Server Error"
			})
		}
	}
}


export default AuthController;
