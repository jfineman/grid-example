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
var common_1 = require("@angular/common");
var NgbDatePipe = /** @class */ (function (_super) {
    __extends(NgbDatePipe, _super);
    function NgbDatePipe(_format, _local) {
        if (_local === void 0) { _local = 'en-US'; }
        var _this = _super.call(this, _local) || this;
        _this._format = _format;
        _this._local = _local;
        return _this;
    }
    NgbDatePipe.prototype.transform = function (value) {
        var date = new Date(value.year, value.month - 1, value.day);
        return _super.prototype.transform.call(this, date, this._format);
    };
    NgbDatePipe = __decorate([
        core_1.Pipe({ name: 'ngbdate' }),
        __metadata("design:paramtypes", [String, String])
    ], NgbDatePipe);
    return NgbDatePipe;
}(common_1.DatePipe));
exports.NgbDatePipe = NgbDatePipe;
//# sourceMappingURL=ngb-date.pipe.js.map