import jwt from "jsonwebtoken"
import process from "node:process"
export const generateToken = (user) => {
	return jwt.sign({userId: user._id, username: user.username},process.env.JWT_SECRET, {expiresIn: '1h'})
}
