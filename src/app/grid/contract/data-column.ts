import { Type } from "@angular/core/src/type";
import { IColumn } from "../interface/icolumn";
import { ComboItem } from "../../common/contract/combo-item";

export class DataColumn implements IColumn {
    name: string;
    id: string;
    prop: string;

    //validations
    required?: boolean;
    readonly?: boolean;
    minlength?: string;
    maxlength?: string;
    pattern?: string;

    data?: Array<ComboItem<any>>;
    comparator?: Function;
    pipe?: any;
    sortable?: boolean;
    minWidth?: number | string;
    width?: number | string;
    maxWidth?: number | string;
    checkboxable?: boolean;
    headerCheckboxable?: boolean;
    component: Type<any>;
}