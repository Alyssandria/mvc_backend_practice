import Schema from "../utils/class/Schema.js";

const NoteSchema = new Schema({
	title: {
		type: 'string',
		required: true
	}, 
	content: {
		type: "string",
		required: true
	}
})

export default NoteSchema;
