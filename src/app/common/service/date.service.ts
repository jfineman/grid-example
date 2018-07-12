import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { UtilService } from "./util.service";

@Injectable()
export class DateService {

    constructor(private _utilService: UtilService) {

    }

    convertISOtoDate(isoDate: string) {
        if (isoDate)
            return new Date(isoDate.replace(/-/, '/'));
    }

    convertISOtoShortDate(isodate: string) {
        let date = new Date(isodate.replace(/-/g, '\/'));
        return this.convertDateToShortDate(date);
    }

    convertDateToShortDate(date: Date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    convertJsonDateToDate(jsonDate: any): Date {
        return new Date(parseInt(jsonDate.substr(6)));
    }

    convertJsonDateToShortDate(jsonDate: any): string {
        return this.convertDateToShortDate(this.convertJsonDateToDate(jsonDate));
    }

    convertJsonDateToNgbDateStruct(jsonDate: any): NgbDateStruct {
        return this.convertDateToNgbDateStruct(this.convertJsonDateToDate(jsonDate));
    }

    convertShortDateToISO(shortDate: string): string {
        let newdate = new Date(shortDate);
        let isoDate = newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate();
        return isoDate;
    }

    convertDateToNgbDateStruct(date: Date): NgbDateStruct {
        return this.convertISOtoNgbDateStruct(date.toISOString());
    }

    convertISOtoNgbDateStruct(isoDate: string): NgbDateStruct {
        if (isoDate) {
            const dateParts = isoDate.trim().split('-');
            if (dateParts.length === 1 && this._utilService.isNumber(dateParts[0])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: null, day: null };
            } else if (dateParts.length === 2 && this._utilService.isNumber(dateParts[0]) && this._utilService.isNumber(dateParts[1])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: this._utilService.toInteger(dateParts[1]), day: null };
            } else if (dateParts.length === 3 && this._utilService.isNumber(dateParts[0]) && this._utilService.isNumber(dateParts[1]) && this._utilService.isNumber(dateParts[2])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: this._utilService.toInteger(dateParts[1]), day: this._utilService.toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    convertShortDateToNgbDateStruct(shortDate: string): NgbDateStruct {
        let isoDate = this.convertShortDateToISO(shortDate);
        return this.convertISOtoNgbDateStruct(isoDate);
    }

    convertNgDateStructToISO(date: NgbDateStruct): string {
        return date ? `${this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : ''}/${this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : ''}/${date.year}`
            : '';
    }

    convertNgDateStructToDate(date: NgbDateStruct): Date {
        let isoDate = date ? `${this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : ''}/${this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : ''}/${date.year}`
            : '';
        return new Date(isoDate);
    }

    convertNgDateStructToShortDate(date: NgbDateStruct): string {
        return this.convertDateToShortDate(this.convertNgDateStructToDate(date));
    }

    getPrevMonth(date: Date) {
        var thisMonth = date.getMonth();
        date.setMonth(thisMonth - 1);
        if (date.getMonth() != thisMonth - 1 && (date.getMonth() != 11 || (thisMonth == 11 && date.getDate() == 1)))
            date.setDate(0);
    }
}

