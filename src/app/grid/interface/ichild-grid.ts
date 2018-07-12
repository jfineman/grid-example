import { IColumn } from "./icolumn";
import { GridOptions } from "../contract/grid-options";

export interface IChildGrid extends IColumn {
    options: GridOptions;
    columns?: IColumn[];
}