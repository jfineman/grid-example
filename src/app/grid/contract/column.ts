import { IColumn } from "../interface/icolumn";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { EditorType } from "../../common/enum/editor-type";
import { PipeTransform, TemplateRef, Type } from "@angular/core";
import { IGridEditor } from "../interface/igrid-editor";
import { ValidatorFn } from "@angular/forms";

export class Column implements IColumn {
    name: string;
    prop: string;
    component: Type<any>;
    id: string;
    data: any;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    minlength: string;
    maxlength: string;
    min: number;
    max: number;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    pattern: string;
    width: string | number;
    headerWidth: string | number;
    editorType: EditorType;
    defaultValue: any;
    format: PipeTransform;
    formatted: string;
    hidden: boolean;
    header: string;
    preventTab: boolean;
    dialogHeader: string;
    dialogHeight: string | number;
    customTemplate: TemplateRef<any>;
    customValidator: (component: IGridEditor) => ValidatorFn;
    onValueChange: (value: any, component: IGridEditor) => void;
}