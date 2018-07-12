import { Type, TemplateRef, PipeTransform } from '@angular/core';
import { ComboItem } from "../../common/contract/combo-item";
import { ValidatorFn } from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { IGridEditor } from "./igrid-editor";
import { EditorType } from "../../common/enum/editor-type";
import { GridOptions } from "../contract/grid-options";

export interface IColumn {
    name: string;
    prop: string;
    component?: Type<any>;
    id?: string;
    data?: any;

    notSortable?: boolean;
    headerContent?: TemplateRef<any>;
    header?: string;
    headerWidth?: number | string;
    width?: number | string;

    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;   
    defaultValue?: any;
    format?: PipeTransform;
    formatted?: string;
    hidden?: boolean;
    preventTab?: boolean;

    customMessage?: string;
    customTemplate?: TemplateRef<any>;
    customValidator?: (component: IGridEditor) => ValidatorFn | ValidatorFn[];
    onValueChange?: (value: any, component: IGridEditor) => void;
    onEditStart?: (value: any, component: IGridEditor) => void;
}