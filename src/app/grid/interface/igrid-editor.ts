import { ColumnContext } from "../contract/column-context";
import { ComboItem } from "../../common/contract/combo-item";
import { NgModel, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";

export interface IGridEditor {
    columnContext: ColumnContext;
    myModel: any;
    ngModel: NgModel;
    customMessage: string;
    warningMessage: string;
    name: string;
    setCellComboValue(selected: ComboItem<any>): void;
    setCellValue(value: any): void;
    onKeydown(e: KeyboardEvent): void;
}