import { Notelist } from './notelist';
export class NotelistFactory {
  static empty(): Notelist {
    return new Notelist(
      0,
      '',
      '',
      [{id: 0, title: ''}],
      [{id: 0, url: '', title: ''}],
      [{id:0,firstname: '', lastname:''}]);
  }
  static fromObject(rawNotelist: any): Notelist {

    return new Notelist(
      rawNotelist.id,
      rawNotelist.title || '',
      rawNotelist.description || '',
      rawNotelist.tag || '',
      rawNotelist.images || [],
      rawNotelist.users || [],
      //rawNotelist.user_id,
    );
  }
}
