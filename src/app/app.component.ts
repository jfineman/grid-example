import { Component, OnInit } from '@angular/core';
import { IGrid } from './grid/interface/igrid';
import { ITransaction } from './grid/interface/itransaction';
import { IColumn } from './grid/interface/icolumn';
import { GridComponent } from './grid/component/grid.component';
import { GridOptions } from './grid/contract/grid-options';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { InputGridComponent } from './grid/component/input-grid.component';
import { TypeaheadGridComponent } from './grid/component/typeahead-grid.component';
import { ComboItem } from './common/contract/combo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IGrid, OnInit {
  rows: Todo[] = [];
  columns: IColumn[];
  gridComponent: GridComponent;
  options: GridOptions = new GridOptions();;

  constructor(private _todoService: TodoService) { }

  ngOnInit(): void {
    this.options.primaryKey = 'id';

    this.columns = [
      {
        name: 'User Id',
        prop: 'userId',
        component: InputGridComponent
      },
      {
        name: 'Todo Id',
        prop: 'id',
        component: InputGridComponent
      },
      {
        name: 'Title',
        prop: 'title',
        component: InputGridComponent
      },
      {
        name: 'Completed',
        prop: 'completed',
        id: 'completed',
        data: [
          new ComboItem<string>('true', "true"),
          new ComboItem<string>('false', "false")
        ],
        component: TypeaheadGridComponent
      }
    ]

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
