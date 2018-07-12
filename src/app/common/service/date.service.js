"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_service_1 = require("./util.service");
var DateService = /** @class */ (function () {
    function DateService(_utilService) {
        this._utilService = _utilService;
    }
    DateService.prototype.convertISOtoDate = function (isoDate) {
        if (isoDate)
            return new Date(isoDate.replace(/-/, '/'));
    };
    DateService.prototype.convertISOtoShortDate = function (isodate) {
        var date = new Date(isodate.replace(/-/g, '\/'));
        return this.convertDateToShortDate(date);
    };
    DateService.prototype.convertDateToShortDate = function (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        return month + "/" + day + "/" + year;
    };
    DateService.prototype.convertJsonDateToDate = function (jsonDate) {
        return new Date(parseInt(jsonDate.substr(6)));
    };
    DateService.prototype.convertJsonDateToShortDate = function (jsonDate) {
        return this.convertDateToShortDate(this.convertJsonDateToDate(jsonDate));
    };
    DateService.prototype.convertJsonDateToNgbDateStruct = function (jsonDate) {
        return this.convertDateToNgbDateStruct(this.convertJsonDateToDate(jsonDate));
    };
    DateService.prototype.convertShortDateToISO = function (shortDate) {
        var newdate = new Date(shortDate);
        var isoDate = newdate.getFullYear() + '-' + (newdate.getMonth() + 1) + '-' + newdate.getDate();
        return isoDate;
    };
    DateService.prototype.convertDateToNgbDateStruct = function (date) {
        return this.convertISOtoNgbDateStruct(date.toISOString());
    };
    DateService.prototype.convertISOtoNgbDateStruct = function (isoDate) {
        if (isoDate) {
            var dateParts = isoDate.trim().split('-');
            if (dateParts.length === 1 && this._utilService.isNumber(dateParts[0])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && this._utilService.isNumber(dateParts[0]) && this._utilService.isNumber(dateParts[1])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: this._utilService.toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && this._utilService.isNumber(dateParts[0]) && this._utilService.isNumber(dateParts[1]) && this._utilService.isNumber(dateParts[2])) {
                return { year: this._utilService.toInteger(dateParts[0]), month: this._utilService.toInteger(dateParts[1]), day: this._utilService.toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    DateService.prototype.convertShortDateToNgbDateStruct = function (shortDate) {
        var isoDate = this.convertShortDateToISO(shortDate);
        return this.convertISOtoNgbDateStruct(isoDate);
    };
    DateService.prototype.convertNgDateStructToISO = function (date) {
        return date ? (this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : '') + "/" + (this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : '') + "/" + date.year
            : '';
    };
    DateService.prototype.convertNgDateStructToDate = function (date) {
        var isoDate = date ? (this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : '') + "/" + (this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : '') + "/" + date.year
            : '';
        return new Date(isoDate);
    };
    DateService.prototype.convertNgDateStructToShortDate = function (date) {
        return this.convertDateToShortDate(this.convertNgDateStructToDate(date));
    };
    DateService.prototype.getPrevMonth = function (date) {
        var thisMonth = date.getMonth();
        date.setMonth(thisMonth - 1);
        if (date.getMonth() != thisMonth - 1 && (date.getMonth() != 11 || (thisMonth == 11 && date.getDate() == 1)))
            date.setDate(0);
    };
    DateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService])
    ], DateService);
    return DateService;
}());
exports.DateService = DateService;
//# sourceMappingURL=date.service.js.map