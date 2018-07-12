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
var date_service_1 = require("../../common/service/date.service");
var grid_editor_base_1 = require("../contract/grid-editor-base");
var DatepickerGridComponent = /** @class */ (function (_super) {
    __extends(DatepickerGridComponent, _super);
    function DatepickerGridComponent(_dateService) {
        var _this = _super.call(this) || this;
        _this._dateService = _dateService;
        return _this;
    }
    DatepickerGridComponent.prototype.setValidators = function () {
        if (this.columnContext.column.customValidator) {
            return this.columnContext.column.customValidator(this);
        }
    };
    DatepickerGridComponent.prototype.setDateValue = function (value) {
        this.setCellValue(value);
        this.ngModel.control.markAsTouched();
        var isoDate = this._dateService.convertNgDateStructToISO(value);
        this.columnContext.row[this.columnContext.column.id] = isoDate;
    };
    DatepickerGridComponent = __decorate([
        core_1.Component({
            selector: 'datepicker-grid',
            moduleId: module.id,
            template: "\n          <star-datepicker\n              [(ngModel)]=\"myModel\"\n              #model=\"ngModel\"\n              [name]=\"name\" \n              [required]=\"columnContext.column.required\"\n              [disabled]=\"columnContext.column.disabled || columnContext.column.readonly\"           \n              [readonly]=\"columnContext.column.readonly\"  \n              [minDate]=\"columnContext.column.minDate\"\n              [maxDate]=\"columnContext.column.maxDate\"\n              (onDateChange)=\"setDateValue($event)\"\n              [ngClass]=\"setNgClass(model)\"\n              [validators]=\"setValidators()\"\n              [markDisabled]=\"columnContext.column.markDisabled\"\n              [calendarTooltip]=\"columnContext.column.calendarTooltip\"\n              [datepickerTooltip]=\"displayTooltipMessage(model)\">                                \n          </star-datepicker>      \n    "
        }),
        __metadata("design:paramtypes", [date_service_1.DateService])
    ], DatepickerGridComponent);
    return DatepickerGridComponent;
}(grid_editor_base_1.GridEditorBase));
exports.DatepickerGridComponent = DatepickerGridComponent;
//# sourceMappingURL=datepicker-grid.component.js.map