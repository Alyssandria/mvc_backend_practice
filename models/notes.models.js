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
			const id = ObjectId.createFromHexString(this.userId);
			return id;
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
		
		const notes = await users.findOneAndUpdate({_id: new ObjectId(id)}, {$push: {notes: {title: this.title, content: this.content} } }, {returnDocument: "after"})
	
		return notes;
	}
}

export default NoteModel;
