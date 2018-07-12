import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DateService } from "../../common/service/date.service";
import { DatePipe } from "@angular/common";




@Pipe({ name: 'ngbdate' })
export class NgbDatePipe extends DatePipe implements PipeTransform {

    constructor(private _format: string, private _local: string = 'en-US') { super(_local) }

    transform(value: NgbDateStruct): string {
        let date = new Date(value.year, value.month - 1, value.day);
        return super.transform(date, this._format);
    }
}