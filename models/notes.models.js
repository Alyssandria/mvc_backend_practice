import { ObjectId } from "mongodb";
import { connectDB } from "../config/db.js";

const DB = await connectDB();

class NoteModel {
  constructor({userId = "", title = "", content = ""}) {

		(this.userId = userId),(this.title = title), (this.content = content);
  }

	#validateObjectId(){
		try{
			ObjectId.isValid(this.userId)
			const objectId = ObjectId.createFromHexString(this.userId);
			return objectId;
		}	catch(err){
			console.error(err.message);
			return null
		}
	}

  async findUserNotes() {
    const users = await DB.collection("users");
		
		const id = this.#validateObjectId()
		if(!id){
			return null;
		}

		const notes = await users.findOne({_id: new ObjectId(id)}, {projection: {notes: 1}});
		return notes;	
		
  }

	async addNewNote(){
		const users = await DB.collection("users");

		const id = this.#validateObjectId()
		if(!id){
			return null;
		}
		
		const notes = await users.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {notes: {noteId: new ObjectId(), title: this.title, content: this.content} } }, {returnDocument: "after"})
	
		return notes;
	}

	async findNote(noteId){
		const users = await DB.collection("users");

		const id = this.#validateObjectId()
		if(!id){
			return null;	
		}

		const note = await users.aggregate([
			{
				$match : {
				_id: new ObjectId(id)
				}
			}, 
			{
				$project : {
					_id: 0,	
				notes: {
					$filter : {
						input: "$notes",
						as: "note",
						cond: { $eq: ["$$note.noteId", new ObjectId(noteId)]}
						}
					}
				}
			}
			
		]).toArray();

		return note[0]?.notes[0] || null;
	}
}

export default NoteModel;
