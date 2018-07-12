import { QueryList } from "@angular/core";
import { DataTableColumnDirective } from "../directive/data-column.directive";
import { IColumn } from "./icolumn";

export interface ITransaction {
    Id: any;
    parentId?: any;
    transactionType: string;
    checkbox?: boolean;
    expanded?: boolean;
}
