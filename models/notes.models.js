import { connectDB } from "../config/db.js";

const DB = await connectDB();

class NoteModel {
  constructor(title, content) {
    (this.title = title), (this.content = content);
  }

  static async findAll() {
    const NOTES = DB.collection("notes");
    return await NOTES.find().toArray();
  }
}

export default NoteModel;
