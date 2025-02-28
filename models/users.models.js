import { ObjectId } from "mongodb";
import { connectDB } from "../config/db.js";

const DB = await connectDB();

class UserModel {
	constructor(userId){
		this.userId = userId;
	}

	async getUserDetails(){
		const users = await DB.collection("users");
		
		try{
			ObjectId.isValid(this.userId);
			const id = ObjectId.createFromHexString(this.userId);

			const user = await users.findOne({_id: id});
			return user
		} catch(err) {
			console.error(err.message);
			return null;

		}

	}
	
	

	

}

export default UserModel;
