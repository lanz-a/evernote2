import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {NoteFactory} from "../shared/note-factory";
import {NoteStoreService} from "../shared/note-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm: FormGroup;
  note = NoteFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingNote = false;
  images: FormArray;

  constructor(
    private fb: FormBuilder,
    private ns: NoteStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingNote = true;
      this.ns.getSingle(id).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote() {
    this.buildThumbnailsArray();
    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: this.note.description,
      images: this.images,
      notetags: this.note.notetags
    });
    this.noteForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  private buildThumbnailsArray() {
    if (this.note.images) {
      this.images = this.fb.array([]);
      for (let img of this.note.images) {
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
    this.noteForm.value.images = this.noteForm.value.images.filter(
      (thumbnail: { url: string }) => thumbnail.url
    );

    const note: Note = NoteFactory.fromObject(this.noteForm.value);
    note.users = this.note.users;

    if (this.isUpdatingNote) {
      this.ns.update(note).subscribe(res => {
        this.router.navigate(['../../', note.id], {relativeTo: this.route});
      });
    } else {
      this.ns.create(note).subscribe(res => {
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(['../notes'], {relativeTo: this.route});
      });
    }
    console.log('Submitting Note:', note);
  }

  private updateErrorMessages() {
    console.log("Is invalid? " + this.noteForm.invalid);
    this.errors = {};
    for (const message of NoteFormErrorMessages) {
      const control = this.noteForm.get(message.forControl);
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
