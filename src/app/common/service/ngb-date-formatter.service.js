"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var util_service_1 = require("./util.service");
var NgbDateFormatter = /** @class */ (function (_super) {
    __extends(NgbDateFormatter, _super);
    function NgbDateFormatter(_utilService) {
        var _this = _super.call(this) || this;
        _this._utilService = _utilService;
        return _this;
    }
    NgbDateFormatter.prototype.parse = function (value) {
        if (value) {
            var dateParts = value.trim().split('/');
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
    };
    NgbDateFormatter.prototype.format = function (date) {
        return date ? (this._utilService.isNumber(date.month) ? this._utilService.padNumber(date.month) : '') + "/" + (this._utilService.isNumber(date.day) ? this._utilService.padNumber(date.day) : '') + "/" + date.year
            : '';
    };
    NgbDateFormatter = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService])
    ], NgbDateFormatter);
    return NgbDateFormatter;
}(ng_bootstrap_1.NgbDateParserFormatter));
exports.NgbDateFormatter = NgbDateFormatter;
//# sourceMappingURL=ngb-date-formatter.service.js.map