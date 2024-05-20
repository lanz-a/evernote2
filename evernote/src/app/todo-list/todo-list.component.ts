import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Image, Note, User} from "../shared/note";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {TodoStoreService} from "../shared/todo-store.service";
import {RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";

@Component({
  selector: 'app-todoTodo-list',
  standalone: true,
  imports: [TodoListItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];
  constructor(private app: TodoStoreService) {
  }
  ngOnInit(){
    this.app.getAll().subscribe(res=>this.todos = res);
  }

}
