import { Component, Input, ViewChild, Output, EventEmitter, SimpleChange, forwardRef } from "@angular/core";
import { NgbDateStruct, NgbInputDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { NgModel, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from "@angular/forms";
import { DateService } from "../service/date.service";
declare var $: any;

@Component({
    selector: 'star-datepicker',
    moduleId: module.id,
    templateUrl: "datepicker.component.html",
    host: {
        '(document:click)': 'onClickAway($event)',
    },
    styles: [
        `
            .input-group-addon {
                height: 30px;
            }
            .input-group{
                position: inherit;
            }
            ngb-datepicker{
                top: 588px;
                left: 37px;
            }
        `
    ],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Datepicker), multi: true }
    ],
})
export class Datepicker implements ControlValueAccessor {
    myDate: NgbDateStruct;

    constructor(private _dateService: DateService) { }

    writeValue(value: NgbDateStruct): void {
        this.myDate = value;
    }
    registerOnTouched(fn: any): void { }

    propagateChange: any = () => { };

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    @Input() name: string;
    @Input() required: boolean;
    @Input() disabled: boolean;
    @Input() readonly: boolean;
    @Input() datepickerTooltip: any;
    @Input() calendarTooltip: any;
    @Input() minDate: NgbDateStruct;
    @Input() maxDate: NgbDateStruct;
    @Input() markDisabled: (date: NgbDateStruct, current: { year: number; month: number; }) => boolean;
    @Input() validators: ValidatorFn[];

    @Output() onDateChange: EventEmitter<NgbDateStruct> = new EventEmitter<NgbDateStruct>();
    @Output() onCalendarChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('model') myModel: NgModel;
    @ViewChild('myDatepicker') myDatepicker: NgbInputDatepicker;

    ngOnInit() {
        if (this.validators)
            this.myModel.control.setValidators(this.validators);
    }

    onClickAway($event: MouseEvent) {
        let ngbDatepicker = $($event.target).closest('ngb-datepicker').add($($event.target).closest(`#${this.name}-calendar`));
        if (!ngbDatepicker.length) {
            if (this.myDatepicker && this.myDatepicker.isOpen()) this.myDatepicker.close();
        }
    }
    onOpenCalendar() {
        if (this.readonly || this.disabled) return;

        this.myDatepicker.toggle();
        this.onCalendarChange.emit(true);
    }

    dateChangeEvt(date: NgbDateStruct) {
        this.myModel.control.markAsTouched();

        if (typeof date !== 'string') {
            this.propagateChange(date);
            this.onDateChange.emit(date)
        }
    }


}