import bcrypt from "bcrypt"

class Auth{
	constructor(username, password){
		this.username = username;	
		// TODO: HASH THIS PASSWORD FIRST
		this.password = password;
	}
}
