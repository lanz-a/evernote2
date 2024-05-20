import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note, User, Image} from "../shared/note";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Todo} from "../shared/todo";

@Component({
  selector: 'a.app-todo-list-item',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './todo-list-item.component.html',
  styles: ``
})
export class TodoListItemComponent implements OnInit {
  @Input() todo: Todo | undefined;

  ngOnInit() {
    console.log(this.todo!);
  }


}
