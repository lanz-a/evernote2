import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NotelistListComponent} from "./notelist-list/notelist-list.component";
import {NotelistDetailsComponent} from "./notelist-details/notelist-details.component";
import {NotelistFormComponent} from "./notelist-form/notelist-form.component";

import {NoteDetailsComponent} from "./note-details/note-details.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteFormComponent} from "./note-form/note-form.component";

import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},

  {path: 'notelists', component: NotelistListComponent},
  {path: 'notelists/:id', component: NotelistDetailsComponent},
  {path: 'notelists/:id/edit', component: NotelistFormComponent},

  {path: 'notes', component: NoteListComponent},
  {path: 'notes/:id', component: NoteDetailsComponent},
  {path: 'notes/:id/edit', component: NoteFormComponent},

  {path: 'todos', component: TodoListComponent},
  {path: 'todos/:id', component: TodoDetailsComponent},
  {path: 'todos/:id/edit', component: TodoFormComponent},

  {path: 'createNotelist', component: NotelistFormComponent},
  {path: 'createNotelist/:id', component: NotelistFormComponent},

  {path: 'createNote', component: NoteFormComponent},
  {path: 'createNote/:id', component: NoteFormComponent},

];
