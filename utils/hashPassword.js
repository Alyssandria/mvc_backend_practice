import bcrypt from "bcrypt"

export const hashPassword = (password) => {
	return bcrypt.hash(password, 10) 
}
