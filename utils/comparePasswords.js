import bcrypt from "bcrypt"

export const comparePasswords = (plain, hash) => {
	return bcrypt.compare(plain, hash);

}
