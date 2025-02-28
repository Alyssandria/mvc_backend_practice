import jwt from "jsonwebtoken"
import process from "node:process"
import { sendResponse } from "../utils/sendResponse.js";
import UserModel from "../models/users.models.js";

class DashboardController{

	static async getUserDetails(res, token){
		try{
			const payload = jwt.verify(token, process.env.JWT_SECRET);
			const user = new UserModel(payload.userId);

			const result = await user.getUserDetails()
			
			if(!result){
				return sendResponse(res, 401, {
					message: "Invalid authorization details"
				})	
			}


			sendResponse(res, 200, {
				message: "User details found successfully",
				data: result
			})

			} catch(err){
				sendResponse(res, 401, {
					message: "Invalid authorization header"
				})
		}
		
			
	}

}

export default DashboardController;
