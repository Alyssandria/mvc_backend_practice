import AuthModel from "../models/auth.models.js";
import { comparePasswords } from "../utils/comparePasswords.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/sendResponse.js";
import jwt from "jsonwebtoken"

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

	static async userLogin(res, username, password){
		const authModel = new AuthModel(username, password);

		const user = await authModel.findUser();

		if(!user || !(await comparePasswords(password, user.password))){
			return sendResponse(res, 401, {
				message: "Incorrect username or password",
			})
		}
		
		// SEND AUTH TOKEN TO USER
		sendResponse(res, 200, {
			token: generateToken(user),
		})

		
	}
}


export default AuthController;
