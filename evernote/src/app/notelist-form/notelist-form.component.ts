import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {NotelistFactory} from "../shared/notelist-factory";
import {NotelistStoreService} from "../shared/notelist-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Notelist} from "../shared/notelist";
import {NotelistFormErrorMessages} from "./notelist-form-error-messages";

@Component({
  selector: 'app-notelist-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notelist-form.component.html',
  styles: ``
})
export class NotelistFormComponent implements OnInit{
  notelistForm: FormGroup;
  notelist = NotelistFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingNotelist = false;
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private ns: NotelistStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.notelistForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingNotelist = true;
      this.ns.getSingle(id).subscribe(notelist => {
        this.notelist = notelist;
        this.initNotelist();
      });
    }
    this.initNotelist();
  }

  initNotelist() {
    this.buildThumbnailsArray();
    this.notelistForm = this.fb.group({
      id: this.notelist.id,
      title: [this.notelist.title, Validators.required],
      description: this.notelist.description,
      images: this.images,
      users: this.notelist.users,
      notetags: this.notelist.notetags,
    });
    this.notelistForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  private buildThumbnailsArray() {
    if (this.notelist.images) {
      this.images = this.fb.array([]);
      for (let img of this.notelist.images) {
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
    this.notelistForm.value.images = this.notelistForm.value.images.filter(
      (thumbnail: { url: string }) => thumbnail.url
    );

    const notelist: Notelist = NotelistFactory.fromObject(this.notelistForm.value);
    notelist.users = this.notelist.users;

    if (this.isUpdatingNotelist) {
      this.ns.update(notelist).subscribe(res => {
        this.router.navigate(['../../', notelist.id], {relativeTo: this.route});
      });
    } else {
      this.ns.create(notelist).subscribe(res => {
        this.notelist = NotelistFactory.empty();
        this.notelistForm.reset(NotelistFactory.empty());
        this.router.navigate(['../notelists'], {relativeTo: this.route});
      });
    }
    console.log('Submitting Notelist:', notelist);
  }

  private updateErrorMessages() {
    console.log("Is invalid? " + this.notelistForm.invalid);
    this.errors = {};
    for (const message of NotelistFormErrorMessages) {
      const control = this.notelistForm.get(message.forControl);
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
