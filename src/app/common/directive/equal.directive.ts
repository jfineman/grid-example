import { Directive, forwardRef, Attribute, Input, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, Validators, FormControl, NgModel } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

@Directive({
    selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => Equal), multi: true }
    ]
})
export class Equal implements Validator {
    subs: Subscription;
    @Input() public equal: NgModel;
    @Input() public equalOrGreater: boolean;

    otherControl: AbstractControl;
    thisControl: AbstractControl;

    validate(c: AbstractControl): { [key: string]: any } {

        if (!this.equal) return Validators.nullValidator;

        let controlValue = c.value;
        let otherControl = this.equal.control;//c.root.get(this.equal);

        if (this.equalOrGreater && otherControl) {
            if (controlValue < otherControl.value)
                return {
                    equal: true
                }
            return null;
        }

        if (otherControl && controlValue != otherControl.value) {
            return {
                equal: true
            }
        }

        if (this.subs) this.subs.unsubscribe();

        if (otherControl)
            this.subs = otherControl.valueChanges.subscribe((v: any) => {
                c.updateValueAndValidity({ emitEvent: false });
            })

        return Validators.nullValidator;
    }
}