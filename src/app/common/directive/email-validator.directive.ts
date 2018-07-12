import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

export function emailFormat(control: AbstractControl): { [key: string]: any } {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
        return { "emailFormat": true };
    }

    return Validators.nullValidator;
}

@Directive({
    selector: '[emailFormat]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }]
})
export class EmailValidator implements Validator {
    private valFn = emailFormat;

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
