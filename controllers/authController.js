import AuthModel from "../models/auth.models.js";
import { sendResponse } from "../utils/sendResponse.js";

class AuthController {
	static async userSignup(res, username, password){
		const authModel = new AuthModel(username, password);
		
		try{
			await authModel.signup()	
			sendResponse(res, 200, {
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
