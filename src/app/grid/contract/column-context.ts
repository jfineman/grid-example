import { FormGroup } from "@angular/forms";
import { ITransaction } from "../interface/itransaction";
import { IColumn } from "../interface/icolumn";
import { Observable } from "rxjs/Observable";
import { EditMode } from "../enum/edit-mode";


export class ColumnContext {
    row: ITransaction;
    column: IColumn;
    formGroup: FormGroup;   
    parentId: number | string; 
}