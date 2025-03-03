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


	async updateNote(noteId, updateObj){
		const users = await DB.collection("users");
		
		// get the keys then create another object using this format "notes.$.<fieldname>: <value>"

		const updateKeys = Object.keys(updateObj);
		const updateFields = updateKeys.reduce((acc, key) => {
			acc[`notes.$.${key}`] = updateObj[key];
			return acc;
		}, {})



		const userId = this.#validateObjectId();

		if(!userId){
			return null;
		}


		const update = await users.findOneAndUpdate(
		{
			_id: new ObjectId(userId), 
			"notes.noteId": new ObjectId(noteId)
		}, 
		{
			$set: updateFields
		},
		{
			returnDocument: "after" 
		}
		);
		return update;
	}


	async deleteNote(noteId){
		const users = await DB.collection("users");

		const userId = this.#validateObjectId();

		const deletedUser = await users.findOneAndUpdate(
		{
			_id: new ObjectId(userId),
			"notes.noteId": new ObjectId(noteId)
		}, 
		{
			$pull: {
				notes: {
					noteId: new ObjectId(noteId),
				}
			}	
		},
		{
			returnDocument: "after",
			projection: {
				_id: 0,
				username: 0,
				password: 0,
			}
		}
		);

		return deletedUser;
	}
}

export default NoteModel;
