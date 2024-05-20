import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {TodoFactory} from "../shared/todo-factory";
import {TodoStoreService} from "../shared/todo-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../shared/todo";
import {TodoFormErrorMessages} from "./todo-form-error-messages";

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit{
  todoForm: FormGroup;
  todo = TodoFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingTodo = false;
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private ns: TodoStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingTodo = true;
      this.ns.getSingle(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
    this.initTodo();
  }

  initTodo() {
    this.buildThumbnailsArray();
    this.todoForm = this.fb.group({
      id: this.todo.id,
      title: [this.todo.title, Validators.required],
      description: this.todo.description,
      images: this.images,
      notetags: this.todo.notetags,
    });
    this.todoForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  private buildThumbnailsArray() {
    if (this.todo.images) {
      this.images = this.fb.array([]);
      for (let img of this.todo.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url, ),
          title: new FormControl(img.title, )
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({url: null, title: null}));
  }

  submitForm() {
    this.todoForm.value.images = this.todoForm.value.images.filter(
      (thumbnail: { url: string }) => thumbnail.url
    );

    const todo: Todo = TodoFactory.fromObject(this.todoForm.value);
    todo.users = this.todo.users;

    if (this.isUpdatingTodo) {
      this.ns.update(todo).subscribe(res => {
        this.router.navigate(['../../', todo.id], {relativeTo: this.route});
      });
    } else {
      this.ns.create(todo).subscribe(res => {
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty());
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
    console.log('Submitting Todo:', todo);
  }

  private updateErrorMessages() {
    console.log("Is invalid? " + this.todoForm.invalid);
    this.errors = {};
    for (const message of TodoFormErrorMessages) {
      const control = this.todoForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
