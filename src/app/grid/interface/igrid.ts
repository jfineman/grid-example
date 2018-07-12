import { IColumn } from "./icolumn";
import { GridComponent } from "../component/grid.component";
import { ITransaction } from "./itransaction";
import { GridOptions } from "../contract/grid-options";

export interface IGrid {
    rows: Array<ITransaction>
    columns: Array<IColumn>;
    gridComponent: GridComponent;
    options: GridOptions;
    save(): void;
    cancelChanges(): void;
}

export interface IGridContainer<T> {
    rows: Array<ITransaction>
    columns: Array<IColumn>;
    gridComponent: GridComponent;
    options: GridOptions;
    save(): void;
    cancelChanges(): void;
    initView(): void;
    initBindings(vm: T): void;
    initGrid(): void;
}