import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ITransaction } from "../interface/itransaction";

@Component({
    selector: 'checkbox-grid',
    template: `
        <input 
            type="checkbox"            
            name="checkbox"   
            [(ngModel)]="row.checkbox"
            (ngModelChange)="onCheckboxEventHandler($event)"
            [ngClass]="{'custom-error': myForm.hasError('checkboxError')}"
            [ngbTooltip]="myForm.hasError('checkboxError') ? customMessage : ''"    >
    `
})
export class CheckboxGridComponent {
    @Input() row: ITransaction;
    @Input() myForm: FormGroup;
    @Input() customMessage:string = 'Required';

    @Output() onCheckEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    onCheckboxEventHandler(value: boolean) {
        this.onCheckEvent.next(value);
    }
}