import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {Notelist} from "./shared/notelist";
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {NotelistDetailsComponent} from "./notelist-details/notelist-details.component";

import {Note} from "./shared/note";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";

import {Todo} from "./shared/todo";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {AuthenticationService} from "./shared/authentication.service";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NotelistDetailsComponent, NotelistListComponent,
    NoteDetailsComponent, NoteListComponent, TodoDetailsComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
note: Note | undefined;
notelist: Notelist | undefined;
todo: Todo | undefined;
  constructor(private authService: AuthenticationService) {}
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if (this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }

}
