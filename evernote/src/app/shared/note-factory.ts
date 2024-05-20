import { Note } from './note';
export class NoteFactory {
  static empty(): Note {
    return new Note(
      0,
      '',
      '',
      [{id: 0, title: ''}],
      [{id: 0, url: '', title: ''}],
      [{id:0,firstname: '', lastname:''}]);
  }
  static fromObject(rawNote: any): Note {

    return new Note(
      rawNote.id,
      rawNote.title || '',
      rawNote.description || '',
      rawNote.notetag || [],
      rawNote.images || [],
      rawNote.users || [],
    );
  }
}
