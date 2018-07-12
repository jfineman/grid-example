import { Validator, NG_VALIDATORS, AbstractControl, Validators } from "@angular/forms";
import { Directive, Input } from "@angular/core";

export function MinMaxValueFn(value: number, min?: number, max?: number): { [key: string]: any } {
    if (!value) return Validators.nullValidator;

    if (min && value < min)
        return { 'minValue': { min } }

    if (max && value > max)
        return { 'maxValue': { max } }

    return Validators.nullValidator;
}

@Directive({
    selector: '[min],[max]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinMaxValueValidator, multi: true }]
})
export class MinMaxValueValidator implements Validator {
    @Input() min: number;
    @Input() max: number;

    validate(control: AbstractControl): { [key: string]: any } {
        return MinMaxValueFn(control.value, this.min, this.max);
    }
}
