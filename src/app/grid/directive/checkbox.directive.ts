import { Directive, ViewChild, Input } from '@angular/core';
import { NgModel } from "@angular/forms";

@Directive({ selector: '[star-checkbox]' })
export class CheckboxDirective {
    @Input('star-checkbox') ngModel: NgModel;

    constructor() { };

}
