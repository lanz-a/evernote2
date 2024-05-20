import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note, User, Image} from "../shared/note";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'a.app-note-list-item',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './note-list-item.component.html',
  styles: ``
})
export class NoteListItemComponent implements OnInit {
  @Input() note: Note | undefined;

  ngOnInit() {
    console.log(this.note!);
  }


}
