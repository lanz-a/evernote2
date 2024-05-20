import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notelist} from "../shared/notelist";
import {Note} from "../shared/note";
import {NotelistStoreService} from "../shared/notelist-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotelistFactory} from "../shared/notelist-factory";
import {relative} from "@angular/compiler-cli";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
//import {AuthenticationService} from "../shared/authentication.service"

@Component({
  selector: 'app-notelist-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './notelist-details.component.html',
  styles: ``
})
export class NotelistDetailsComponent implements OnInit{
  notelist: Notelist = NotelistFactory.empty();
  @Input() note: Note | undefined;
  constructor(
    private app: NotelistStoreService,
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
      .subscribe((n:Notelist)=>this.notelist = n);
    console.log('Notelist fetched:', this.notelist);
  }

  removeNotelist(){
    if (confirm('Liste wirklich löschen?')){
      let notelistId = this.notelist.id +'';
      console.log('removeNotelist ID:', notelistId);

      this.app.remove(notelistId)
        .subscribe((res:any) => {
        this.router.navigate(['../'],
          {relativeTo:this.route});
        //this.toastr.success('Liste gelöscht!',"Evernote");
      });
  }}}
