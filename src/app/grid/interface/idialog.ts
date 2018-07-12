import { IColumn } from "./icolumn";
import { GridOptions } from "../contract/grid-options";

export interface IDialog extends IColumn {
    size?: 'sm' | 'lg';
    dialogHeader?: string;
    dialogHeight?: string | number;
    options?: GridOptions;
    columns?: IColumn[];
}