import { Directive, ElementRef, Input } from '@angular/core';
import { ITransaction } from "../interface/itransaction";

@Directive({ selector: '[star-column-filter]' })
export class ColumnFilterDirective {
    @Input() filterLogic: any;
    @Input() fieldName: string;

    constructor(public _elementRef: ElementRef) { };

}
