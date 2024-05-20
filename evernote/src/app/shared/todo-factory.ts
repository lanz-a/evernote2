import { Todo } from './todo';
export class TodoFactory {
  static empty(): Todo {
    return new Todo(
      0,
      '',
      '',
      [{id: 0, title: ''}],
      [{id: 0, url: '', title: ''}],
      [{id:0,firstname: '', lastname:''}]);
  }
  static fromObject(rawTodo: any): Todo {

    return new Todo(
      rawTodo.id,
      rawTodo.title || '',
      rawTodo.description || '',
      rawTodo.tag || '',
      rawTodo.images || [],
      rawTodo.users || [],
      //rawTodo.user_id,
    );
  }
}
