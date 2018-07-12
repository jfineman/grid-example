import { Directive, ViewChild, Input, ElementRef, HostBinding } from '@angular/core';
import { NgModel } from "@angular/forms";
import { ColumnContext } from "../contract/column-context";

@Directive({ selector: '[star-grid-cell]' })
export class GridCellDirective {
    @Input('star-grid-cell')
    columnContext: ColumnContext;

    public highlighted: boolean;
    public error: boolean;

    constructor(public elRef: ElementRef) { };

    @HostBinding('style.backgroundColor')
    get background() {
        return this.highlighted ? '#ff0' : 'inherit';
    }

    @HostBinding('class.border-red-highlight')
    get border() {
        return this.error;
    }
}
