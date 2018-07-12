import { Injectable } from "@angular/core";
import { ITransaction } from "../../grid/interface/itransaction";

@Injectable()
export class UtilService {

    toInteger(value: any) {
        return parseInt("" + value, 10);
    }
    toString(value: any) {
        return (value !== undefined && value !== null) ? "" + value : '';
    }
    getValueInRange(value: any, max: any, min: any) {
        if (min === void 0) { min = 0; }
        return Math.max(Math.min(value, max), min);
    }
    isString(value: any) {
        return typeof value === 'string';
    }
    isNumber(value: any) {
        return !isNaN(this.toInteger(value));
    }
    isInteger(value: any) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    isDefined(value: any) {
        return value !== undefined && value !== null;
    }
    padNumber(value: any) {
        if (this.isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    }
    regExpEscape(text: string) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    copyArray(source: any[]): any[] {
        return JSON.parse(JSON.stringify(source));
    }
}