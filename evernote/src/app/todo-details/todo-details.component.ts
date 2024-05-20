import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../shared/todo";
import {TodoStoreService} from "../shared/todo-store.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoFactory} from "../shared/todo-factory";
import {relative} from "@angular/compiler-cli";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
//import {AuthenticationService} from "../shared/authentication.service"

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-details.component.html',
  styles: ``
})
export class TodoDetailsComponent implements OnInit{
  todo: Todo = TodoFactory.empty();
  constructor(
    private app: TodoStoreService,
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
      .subscribe((n:Todo)=>this.todo = n);
    console.log('Todo fetched:', this.todo);
  }

  removeTodo(){
    if (confirm('Todo wirklich löschen?')){
      let todoId = this.todo.id +'';
      console.log('removeTodo ID:', todoId);

      this.app.remove(todoId)
        .subscribe((res:any) => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          //this.toastr.success('Liste gelöscht!',"Evernote");
        });
    }}}
