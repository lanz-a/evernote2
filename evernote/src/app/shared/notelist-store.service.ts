import { Injectable } from '@angular/core';
import {Image, Notelist, User} from "./notelist";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotelistStoreService {
  private api = 'http://evernote.s2110456015.student.kwmhgb.at/api';

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  getAll(): Observable<Array<Notelist>> {
    return this.http.get<Array<Notelist>>(`${this.api}/notelists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: string): Observable<Notelist> {
    return this.http.get<Notelist>(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/notelists/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(notelist: Notelist): Observable<any> {
    return this.http.post(`${this.api}/notelists`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(notelist: Notelist): Observable<any> {
    return this.http.put(`${this.api}/notelists/${notelist.id}`, notelist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}

