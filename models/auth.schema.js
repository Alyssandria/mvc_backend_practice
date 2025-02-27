import Schema from "../utils/class/Schema.js";
const AuthSchema =  new Schema({
	username: {
		type: "string",
		required: true
	}, 
	password: {
		type: "string",
		required: true
	}
})


export default AuthSchema;
