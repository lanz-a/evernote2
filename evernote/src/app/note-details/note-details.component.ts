import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../shared/note";
import {NoteStoreService} from "../shared/note-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {relative} from "@angular/compiler-cli";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
//import {AuthenticationService} from "../shared/authentication.service"

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-details.component.html',
  styles: ``
})
export class NoteDetailsComponent implements OnInit{
  note: Note = NoteFactory.empty();
  constructor(
    private app: NoteStoreService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    // public authService:AuthenticationService)
  ) { }
  ngOnInit() {
    console.log('ngoninit called');
    const params = this.route.snapshot.params;
    console.log('Route params:', params);
    this.app.getSingle(params['id'])
      .subscribe((n:Note)=>this.note = n);
    console.log('Note fetched:', this.note);
  }

  removeNote(){
    if (confirm('Note wirklich löschen?')){
      let noteId = this.note.id +'';
      console.log('removeNote ID:', noteId);

      this.app.remove(noteId)
        .subscribe((res:any) => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          //this.toastr.success('Note gelöscht!',"Evernote");
        });
    }}}
