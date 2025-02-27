import { connectDB } from "../config/db";

const DB = await connectDB();

class User {
	constructor(userId){
		this.userId = userId;
	}

	getUserData(){
				
	}
	

	

}

export default User;
