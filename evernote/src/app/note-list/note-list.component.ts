import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Image, Note, User} from "../shared/note";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {NoteStoreService} from "../shared/note-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteListItemComponent, RouterLink],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];
  constructor(private app: NoteStoreService) {
  }

  ngOnInit(){
    this.app.getAll().subscribe(res=>this.notes = res);
  }

}
