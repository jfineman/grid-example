import { Component } from "@angular/core";
import { NumericType } from "../enum/numeric-type";
import { GridEditorBase } from "../contract/grid-editor-base";
import { EditorType } from "../../common/enum/editor-type";
import { IField } from "../interface/ifield";

@Component({
    selector: 'input-grid',
    moduleId: module.id,
    template: `
        <input 
            type="text" 
            (keypress)="onKeypress($event)"
            (keydown)="onKeydown($event)"
            [name]="name" 
            [min]="columnContext.column.min"
            [max]="columnContext.column.max"
            [maxlength]="columnContext.column.maxlength"
            [minlength]="columnContext.column.minlength"
            class="form-control"
            #model="ngModel"
            [(ngModel)]="myModel"
            (ngModelChange)="setCellValue($event)"
            [ngbTooltip]="displayTooltipMessage(model)"
            [ngClass]="{
                'custom-error': model.hasError('customError'), 
                'max-length': model.hasError('maxlength'),                 
                'min-length': model.hasError('minlength'),                               
                'warning': warningMessage
            }"
            [pattern]="_pattern"
            [readonly]="columnContext.column.readonly"
            [disabled]="columnContext.column.disabled || columnContext.column.readonly"
            [required]="columnContext.column.required" >
    `,
    styles: [`

    `]
})
export class InputGridComponent extends GridEditorBase {
    private _editorType: EditorType;
    private _decimalRegex: RegExp = /^[1-9]\d*(\.\d+)?$/;
    private _numberRegex: RegExp = /^[1-9]\d*$/;
    private _pattern: RegExp;

    ngOnInit() {
        let editorType = (<IField>this.columnContext.column).editorType;
        this._editorType = editorType !== null ? editorType : EditorType.text;

        if (this._editorType === EditorType.decimal)
            this._pattern = this._decimalRegex;
    }

    onKeypress(event: KeyboardEvent) {
        if (event.charCode === 8)
            return true;
        if (this._editorType === EditorType.numeric)
            return (event.charCode >= 48 && event.charCode <= 57);
        if (this._editorType === EditorType.decimal) {
            return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 110 || event.charCode === 190;
        }
        if (this._editorType === EditorType.alpha) {
            return event.charCode === 32 || /[a-zA-Z]/.test(event.key);
        }
        if (this._editorType === EditorType.alphanumeric) {
            return event.charCode === 32 || /[a-zA-Z]/.test(event.key) || (event.charCode >= 48 && event.charCode <= 57);
        }
    }
}