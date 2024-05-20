import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notelist, User, Image} from "../shared/notelist";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'a.app-notelist-list-item',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './notelist-list-item.component.html',
  styles: ``
})
export class NotelistListItemComponent implements OnInit {
  @Input() notelist: Notelist | undefined;

  ngOnInit() {
    console.log(this.notelist!);
  }


}
