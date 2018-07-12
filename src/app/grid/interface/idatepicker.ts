import { IColumn } from "./icolumn";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface IDatePicker extends IColumn {
    calendarTooltip?: string;
    minDate?: NgbDateStruct;
    maxDate?: NgbDateStruct;
    markDisabled?: (date: NgbDateStruct, current: { year: number; month: number; }) => boolean;
}