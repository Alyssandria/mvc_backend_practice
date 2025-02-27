import { connectDB } from "../config/db.js";

const DB = await connectDB();
class AuthModel{
	constructor(username, password){
		this.username = username;	
		this.password = password;
	}

	async signup(){
		const users = DB.collection("users");
		return users.insertOne({username: this.username, password: this.password, notes: []});
	}
}

export default AuthModel;
