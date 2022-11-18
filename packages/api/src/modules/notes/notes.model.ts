import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: { collection: 'Note' },
  options: { allowMixed: Severity.ALLOW },
})
export class NoteClass extends TimeStamps {
  @prop({ default: '' }) title!: string;
  @prop({ default: '' }) message!: string;
}

export type NoteModel = DocumentType<NoteClass>;

export const Note = getModelForClass(NoteClass);
