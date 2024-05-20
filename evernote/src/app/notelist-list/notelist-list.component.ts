import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Image, Notelist, User} from "../shared/notelist";
import {NotelistListItemComponent} from "../notelist-list-item/notelist-list-item.component";
import {NotelistStoreService} from "../shared/notelist-store.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-notelist-list',
  standalone: true,
  imports: [NotelistListItemComponent, RouterLink],
  templateUrl: './notelist-list.component.html',
  styles: ``
})
export class NotelistListComponent implements OnInit{

  notelists: Notelist[] = [];
  constructor(private app: NotelistStoreService) {
  }
  ngOnInit(){
    this.app.getAll().subscribe(res=>this.notelists = res);
  }

}
