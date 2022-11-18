import { Note, NoteModel } from './notes.model';

export default class NotesController {
  public static listNotes = async (limit = 50, skip = 0) =>
    await Note.find().limit(limit).skip(skip).lean();

  public static countNotes = async () => await Note.countDocuments();

  public static getNote = async (_id: string) =>
    await Note.findById(_id).lean();

  public static createNote = async (data: Partial<NoteModel>) =>
    await Note.create(data);

  public static updateNote = async ({ _id, ...data }: Partial<NoteModel>) =>
    await Note.findByIdAndUpdate(_id, { $set: data }, { new: true });

  public static deleteNote = async (_id: string) =>
    await Note.findByIdAndRemove(_id);
}
