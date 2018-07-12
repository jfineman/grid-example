import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


@Directive({
    selector: '[cellValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: CellValidator, multi: true }
    ]
})
export class CellValidator implements Validator {
    validator: ValidatorFn;
    @Input() cellValidator: () => ValidatorFn;

    constructor() {
        this.validator = this.cellValidator();
        console.log('cellvalidator', this)

    }

    validate(c: FormControl) {
        if (!this.validator) return;
        return this.validator(c);
    }

}