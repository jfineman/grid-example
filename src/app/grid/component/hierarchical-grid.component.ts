import { Component, ViewChild, Input, EventEmitter, forwardRef, Output } from "@angular/core";
import { GridEditorBase } from "../contract/grid-editor-base";
import { ITransaction } from "../interface/itransaction";
import { IColumn } from "../interface/icolumn";
import { GridComponent } from "./grid.component";
import { GridOptions } from "../contract/grid-options";
import { IGrid } from "../interface/igrid";
import { ColumnContext } from "../contract/column-context";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { RowUpdateValuePair } from "../contract/row-update-value-pair";
import { IChildGrid } from "../interface/ichild-grid";

@Component({
    selector: 'hierarchical-grid',
    moduleId: module.id,
    templateUrl: 'hierarchical-grid.component.html',
    styles: [`
        :host /deep/ #star-grid-add-row {
            background-color: #d9e7fe;
            padding: 2px;
            height: 20px;
            margin: 2px;
            font-size: small;
            color: #104e97;
        }
        :host /deep/ #grid-footer {
            display: none;
        }
        :host /deep/ thead > tr {
            height: 20px;
            
        }
        :host /deep/ thead > tr > th {
            height: 20px;
        }
        :host /deep/ thead > tr:first-child > th {
            background-color: #c0d6fb;
            color: #104e97;
            font-size: small;
        }
        :host /deep/ .grid-container {
            overflow-y: inherit;
        }
        :host /deep/ .grid-container tbody tr {
            background-color: #f3f7fe;
        }
        :host /deep/ .popover-content {
            color: black;
        }
    `]
})
export class HierarchicalGridComponent implements IGrid {
    rows: ITransaction[];
    columns: IColumn[];
    options: GridOptions = new GridOptions();
    selectedRow: ITransaction;
    @Output()
    onChildViewUpdate: EventEmitter<ITransaction[]> = new EventEmitter<ITransaction[]>();
    @Output()
    onChildRowAdd: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();
    @Output()
    onChildRowAdded: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();
    @Output()
    onChildRowUpdate: EventEmitter<RowUpdateValuePair> = new EventEmitter<RowUpdateValuePair>();

    @ViewChild(forwardRef(() => GridComponent)) gridComponent: GridComponent;

    private _columnContext: ColumnContext;

    @Input()
    get columnContext(): ColumnContext {
        return this._columnContext;
    };

    set columnContext(value: ColumnContext) {
        this._columnContext = value;

        this.rows = this.columnContext.row[this.columnContext.column.prop] || [];
        this.columns = (<IChildGrid>this.columnContext.column).columns.map((c: IColumn) => Object.assign({}, c));
        Object.assign(this.options, (<IChildGrid>this.columnContext.column).options);
    }

    private onViewUpdate(rows: ITransaction[]) {
        this.onChildViewUpdate.next(rows);
    }

    private onRowAdd(row: ITransaction) {
        row.parentId = this.columnContext.parentId;
        this.onChildRowAdd.next(row);
    }

    private onRowAdded(row: ITransaction) {
        row.parentId = this.columnContext.parentId;
        this.onChildRowAdded.next(row);
    }

    private onRowUpdate(pair: RowUpdateValuePair) {
        this.onChildRowUpdate.next(pair);
    }

    save(): void {
        throw new Error('Method not implemented.');
    }
    cancelChanges(): void {
        throw new Error('Method not implemented.');
    }


}
