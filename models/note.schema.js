import Schema from "../utils/class/Schema.js";

export const AddNoteSchema = new Schema({
	title: {
		type: 'string',
		required: true
	}, 
	content: {
		type: "string",
		required: true
	}
})

export const UpdateNoteSchema = new Schema({
	title: {
		type: "string",
	},
	content: {
		type: "string"
	}
})
