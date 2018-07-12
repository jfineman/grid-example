"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService.prototype.toInteger = function (value) {
        return parseInt("" + value, 10);
    };
    UtilService.prototype.toString = function (value) {
        return (value !== undefined && value !== null) ? "" + value : '';
    };
    UtilService.prototype.getValueInRange = function (value, max, min) {
        if (min === void 0) {
            min = 0;
        }
        return Math.max(Math.min(value, max), min);
    };
    UtilService.prototype.isString = function (value) {
        return typeof value === 'string';
    };
    UtilService.prototype.isNumber = function (value) {
        return !isNaN(this.toInteger(value));
    };
    UtilService.prototype.isInteger = function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
    UtilService.prototype.isDefined = function (value) {
        return value !== undefined && value !== null;
    };
    UtilService.prototype.padNumber = function (value) {
        if (this.isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    };
    UtilService.prototype.regExpEscape = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    UtilService.prototype.copyArray = function (source) {
        return JSON.parse(JSON.stringify(source));
    };
    UtilService = __decorate([
        core_1.Injectable()
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map