import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UtilService } from "./util.service";

@Injectable()
export class NgbDateFormatter extends NgbDateParserFormatter {

    constructor(private _utilService: UtilService) {
        super();
    }

    parse(value: string): NgbDateStruct {
        if (value) {
            let dateParts = value.trim().split('/');

            if (dateParts.length !== 3) {
                if (value.length === 6) {
                    dateParts = [
                        value.slice(0, 2),
                        value.slice(2, 4),
                        value.slice(4, 6)
                    ];
                }
                if (value.length === 8) {
                    dateParts = [
                        value.slice(0, 2),
                        value.slice(2, 4),
                        value.slice(4, 8)
                    ];
                }
            }

            if (this._utilService.isNumber(dateParts[0]) && this._utilService.isNumber(dateParts[1]) && this._utilService.isNumber(dateParts[2])) {
                if (dateParts[2].length === 2) {
                    dateParts[2] = "20" + dateParts[2];
                }
                return { month: this._utilService.toInteger(dateParts[0]), day: this._utilService.toInteger(dateParts[1]), year: this._utilService.toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    format(date: NgbDateStruct): string {
        return date ? `${this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : ''}/${this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : ''}/${date.year}`
            : '';
    }
}