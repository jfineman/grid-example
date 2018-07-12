import { Component } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DateService } from "../../common/service/date.service";
import { GridEditorBase } from "../contract/grid-editor-base";
import { IDatePicker } from "../interface/idatepicker";

@Component({
    selector: 'datepicker-grid',
    template: `
          <star-datepicker
              [(ngModel)]="myModel"
              #model="ngModel"
              [name]="name" 
              [required]="columnContext.column.required"
              [disabled]="columnContext.column.disabled || columnContext.column.readonly"           
              [readonly]="columnContext.column.readonly"  
              [minDate]="columnContext.column.minDate"
              [maxDate]="columnContext.column.maxDate"
              (onDateChange)="setDateValue($event)"
              [ngClass]="setNgClass(model)"
              [validators]="setValidators()"
              [markDisabled]="columnContext.column.markDisabled"
              [calendarTooltip]="columnContext.column.calendarTooltip"
              [datepickerTooltip]="displayTooltipMessage(model)">                                
          </star-datepicker>      
    `
})
export class DatepickerGridComponent extends GridEditorBase {
    constructor(private _dateService: DateService) {
        super();
    }

    setValidators() {
        if (this.columnContext.column.customValidator) {
            return this.columnContext.column.customValidator(this);
        }
    }

    setDateValue(value: NgbDateStruct) {
        this.setCellValue(value);
        this.ngModel.control.markAsTouched();
        let isoDate = this._dateService.convertNgDateStructToISO(value);
        this.columnContext.row[this.columnContext.column.id] = isoDate;
    }

}