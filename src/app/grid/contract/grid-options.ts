import { ITransaction } from "../interface/itransaction";
import { IColumn } from "../interface/icolumn";
import { IChildGrid } from "../interface/ichild-grid";

export class GridOptions {
    primaryKey?: any;
    noDataMessage?: string;
    addNewRowMessage?: string;
    canDelete?: boolean = true;
    checkBoxes?: boolean;
    enableFilters?: boolean = true;
    canAdd?: boolean = true;
    hideAddNewRowBar?: boolean;
    canEdit?: boolean = true;
    defaultColumnSort?: IColumn;
    canSort?: boolean = true;
    canSearch?: boolean;
    groupHeader?: boolean;
    rowSelector?: boolean;
    isRowEditable?: (row: ITransaction) => boolean;
    isDeleteIconVisible?: (row: ITransaction) => boolean;
    canDeleteRow?: (row: ITransaction) => boolean;
    checkRequired?: boolean;
    checkboxMessage?: string;
    deleteIconTooltip?: string;
    childGrid?: IChildGrid;
    height?: string;

    constructor() {
        this.addNewRowMessage = 'Add new row';
        this.noDataMessage = 'No Data';
        this.primaryKey = 'Id';
    }
}