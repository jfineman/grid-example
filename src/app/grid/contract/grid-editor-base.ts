import { NgModel, FormControl, ValidatorFn, AbstractControl, Validators } from "@angular/forms";
import { ColumnContext } from "./column-context";
import { ComboItem } from "../../common/contract/combo-item";
import { ViewChild, OnDestroy, OnInit, Input, SimpleChange } from "@angular/core";
import { ITransaction } from "../interface/itransaction";
import { IGridEditor } from "../interface/igrid-editor";
import { EditMode } from "../enum/edit-mode";
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/takeWhile';


export class GridEditorBase implements IGridEditor {
    _columnContext: ColumnContext;
    myModel: any;
    warningMessage: string;
    customMessage: string;
    name: string;

    @ViewChild('model') ngModel: NgModel;

    @Input()
    set columnContext(value: ColumnContext) {
        if (!value) return;

        this._columnContext = value;
        this.name = this.columnContext.column.prop;
        this.customMessage = this.columnContext.column.customMessage || this.customMessage;

        this.columnContext.formGroup.removeControl(this.name);
        this.columnContext.formGroup.addControl(this.name, this.ngModel.control);

        if (this.columnContext.column.customValidator)
            this.ngModel.control.setValidators(this.columnContext.column.customValidator(this));

        if (this.columnContext.column.onValueChange)
            this.ngModel.control.valueChanges
                .skipWhile(() => this.columnContext.formGroup.pristine)
                .subscribe((v: any) => this.columnContext.column.onValueChange(v, this));

        if (this.columnContext.column.onEditStart)
            this.ngModel.control.valueChanges
                .takeWhile(() => this.columnContext.formGroup.pristine)
                .subscribe((v: any) => this.columnContext.column.onEditStart(v, this));

        this.myModel = this.columnContext.row[this.columnContext.column.prop] || this.columnContext.column.defaultValue;

        this.columnContext.row[this.columnContext.column.prop] = this.myModel;

        this.format();
    }

    get columnContext() {
        return this._columnContext;
    }

    private format() {
        if (this.columnContext.column.format && this.myModel) {
            this.columnContext.row[this.columnContext.column.formatted] = this.columnContext.column.format.transform(this.myModel);
        }
    }

    onKeydown(e: KeyboardEvent) {
        if (this.columnContext.column.preventTab !== null && this.columnContext.column.preventTab === false) return;

        if (e.which == 9 && this.ngModel.invalid) {
            e.preventDefault();
        }
    }

    setCellValue(value: any) {
        this.myModel = value;
        this.columnContext.row[this.columnContext.column.prop] = value;
        this.format();

    }
    setCellComboValue(selected: ComboItem<any>) {
        if (!selected) selected = new ComboItem<any>('', '');

        this.setCellValue(selected.Text);

        if (this.columnContext.column.id)
            this.columnContext.row[this.columnContext.column.id] = selected.Value;
    }

    displayTooltipMessage(model: NgModel) {
        if (!model) return;

        //depracated, use customError.message
        if (this.customMessage) return this.customMessage;

        if (model.hasError('customError') && model.getError('customError').message)
            return model.getError('customError').message;

        if (model.hasError('required'))
            return 'Required';

        return this.warningMessage;
    }

    setNgClass(model: NgModel) {
        if (model.hasError('customError'))
            return {
                'custom-error': true
            };

        if (this.warningMessage)
            return {
                'warning': true
            };
    }
}