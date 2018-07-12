import { Injectable } from "@angular/core";
import { IGridEditor } from "../../grid/interface/igrid-editor";
import { AbstractControl, Validators } from "@angular/forms";
import { ITransaction } from "../../grid/interface/itransaction";
import { IGrid } from "../../grid/interface/igrid";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class ValidatorService {

    public isUnique(component: IGridEditor, gridContainer: IGrid,
        columnName: string = component.columnContext.column.prop): boolean {

        let myRow = component.columnContext.row;
        let excludedId = myRow[gridContainer.options.primaryKey];
        let myColumn = myRow[columnName] ? myRow[columnName].toLowerCase().trim() : myRow[columnName];

        if (!gridContainer.rows.every((row: ITransaction) => {
            let column = row[columnName] ? row[columnName].toString().toLowerCase().trim() : row[columnName];

            return column !== myColumn || row[gridContainer.options.primaryKey] === excludedId
        })) {
            return false;
        }

        return true;
    }

    public isUniqueCombo(component: IGridEditor, gridContainer: IGrid,
        columnA: string, columnB: string): boolean {

        let myRow = component.columnContext.row;
        let excludedId = myRow[gridContainer.options.primaryKey];
        let myColumnA = myRow[columnA] ? myRow[columnA].toLowerCase().trim() : myRow[columnA];
        let myColumnB = myRow[columnB] ? myRow[columnB].toLowerCase().trim() : myRow[columnB];

        if (!gridContainer.rows.every((row: ITransaction) => {
            let _columnA = row[columnA] ? row[columnA].toString().toLowerCase().trim() : row[columnA];
            let _columnB = row[columnB] ? row[columnB].toString().toLowerCase().trim() : row[columnB];

            return (_columnA !== myColumnA || _columnB !== myColumnB) || row[gridContainer.options.primaryKey] === excludedId
        })) {
            return false;
        }

        return true;
    }

    public uniqueComboFn(component: IGridEditor, gridContainer: IGrid,
        columnA: string, columnB: string,
        message?: string) {

        let mySub: Subscription;

        return (control: AbstractControl): { [key: string]: any } => {
            if (mySub) mySub.unsubscribe();

            let nameOfOtherControl = component.columnContext.column.prop === columnA ? columnB : columnA;
            let rowId = component.columnContext.row[gridContainer.options.primaryKey];
            let otherControl = gridContainer.gridComponent.getEditorFormControlBy(rowId, nameOfOtherControl);

            if (!otherControl) return;

            mySub = otherControl.valueChanges.subscribe((val: any) => control.updateValueAndValidity({ emitEvent: false }));

            if (!this.isUniqueCombo(component, gridContainer, columnA, columnB)) {
                return {
                    'customError': {
                        message: message || `Combination value for ${columnA} and ${columnB} must be unique`
                    }
                }
            }

            return Validators.nullValidator;
        }
    }

    public uniqueFn(component: IGridEditor, gridContainer: IGrid, message?: string) {
        return (control: AbstractControl): { [key: string]: any } => {

            if (!this.isUnique(component, gridContainer)) {
                return {
                    'customError': {
                        message: message || `Value for ${component.columnContext.column.name} must be unique`
                    }
                }
            }

            return Validators.nullValidator;
        }
    }

}
