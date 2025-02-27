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
		const users = this.#usersCollection;
		
		const user = await users.findOne({username: this.username});

		if(!user){
			return null;
		}

		return user;
	}
}

export default AuthModel;
