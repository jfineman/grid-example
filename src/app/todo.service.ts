import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Todo } from '../app/todo';

@Injectable()
export class TodoService {
  private _url = 'assets/todos.json';
  constructor(private _http: HttpClient) { }


  getTodos() {
    return this._http.get<Todo[]>(this._url);
  }
}