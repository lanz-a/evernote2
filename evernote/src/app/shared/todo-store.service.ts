import { Injectable } from '@angular/core';
import {Image, Todo, User} from "./todo";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private api = 'http://evernote.s2110456015.student.kwmhgb.at/api';

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  getAll(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(todo: Todo): Observable<any> {
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(todo: Todo): Observable<any> {
    return this.http.put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}

