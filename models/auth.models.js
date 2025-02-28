import { ObjectId } from "mongodb";
import { connectDB } from "../config/db.js";

const DB = await connectDB();

class AuthModel{
	constructor(username, password){
		this.username = username;	
		this.password = password;
	}

	#usersCollection = DB.collection("users");

	async signup(){
		const users = this.#usersCollection;
		const existingUsername = await users.findOne({username: this.username});
		if(existingUsername){
			return null;
		}
		return users.insertOne({username: this.username, password: this.password, notes: []});
	}

	async findUser(){
			const users = DB.collection("users");
			
			const user = await users.findOne({username: this.username});

			if(!user){
				return null;
			}

			return user;
	}

	static async validateToken(userId){
		const users = DB.collection("users");
		
		try{

			ObjectId.isValid(userId);

			const userIdHex = ObjectId.createFromHexString(userId)
			const user = await users.findOne({_id: new ObjectId(userIdHex)})
			
			// IF USER CANNOT BE FOUND
			if(!user){
				return {
					success: false,
					message: "Invalid Authorization request"
				} 
			}
			return {
				success: true,
				message: "Token validation successfull"
			}


		} catch(err){
			// IF USER ID IS INVALID
			return {
				success: false,
				message: "Invalid Authorization request"
			}
		}
	}
}

export default AuthModel;
