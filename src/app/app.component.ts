import { Component, OnInit } from '@angular/core';
import { IGrid } from './grid/interface/igrid';
import { ITransaction } from './grid/interface/itransaction';
import { IColumn } from './grid/interface/icolumn';
import { GridComponent } from './grid/component/grid.component';
import { GridOptions } from './grid/contract/grid-options';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IGrid, OnInit {
  rows: Todo[];
  columns: IColumn[];
  gridComponent: GridComponent;
  options: GridOptions;

  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this._todoService.getTodos()
      .subscribe((todos: Todo[]) => {
        this.rows = todos;
        console.log(this.rows)
      });
  }

  save(): void {
    throw new Error("Method not implemented.");
  }
  cancelChanges(): void {
    throw new Error("Method not implemented.");
  }

}
