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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var date_service_1 = require("../service/date.service");
var Datepicker = /** @class */ (function () {
    function Datepicker(_dateService) {
        this._dateService = _dateService;
        this.propagateChange = function () { };
        this.onDateChange = new core_1.EventEmitter();
        this.onCalendarChange = new core_1.EventEmitter();
    }
    Datepicker_1 = Datepicker;
    Datepicker.prototype.writeValue = function (value) {
        this.myDate = value;
    };
    Datepicker.prototype.registerOnTouched = function (fn) { };
    Datepicker.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Datepicker.prototype.ngOnInit = function () {
        if (this.validators)
            this.myModel.control.setValidators(this.validators);
    };
    Datepicker.prototype.onClickAway = function ($event) {
        var ngbDatepicker = $($event.target).closest('ngb-datepicker').add($($event.target).closest("#" + this.name + "-calendar"));
        if (!ngbDatepicker.length) {
            if (this.myDatepicker && this.myDatepicker.isOpen())
                this.myDatepicker.close();
        }
    };
    Datepicker.prototype.onOpenCalendar = function () {
        if (this.readonly || this.disabled)
            return;
        this.myDatepicker.toggle();
        this.onCalendarChange.emit(true);
    };
    Datepicker.prototype.dateChangeEvt = function (date) {
        this.myModel.control.markAsTouched();
        if (typeof date !== 'string') {
            this.propagateChange(date);
            this.onDateChange.emit(date);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Datepicker.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Datepicker.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Datepicker.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Datepicker.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Datepicker.prototype, "datepickerTooltip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Datepicker.prototype, "calendarTooltip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Datepicker.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Datepicker.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], Datepicker.prototype, "markDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Datepicker.prototype, "validators", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Datepicker.prototype, "onDateChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Datepicker.prototype, "onCalendarChange", void 0);
    __decorate([
        core_1.ViewChild('model'),
        __metadata("design:type", forms_1.NgModel)
    ], Datepicker.prototype, "myModel", void 0);
    __decorate([
        core_1.ViewChild('myDatepicker'),
        __metadata("design:type", ng_bootstrap_1.NgbInputDatepicker)
    ], Datepicker.prototype, "myDatepicker", void 0);
    Datepicker = Datepicker_1 = __decorate([
        core_1.Component({
            selector: 'star-datepicker',
            moduleId: module.id,
            templateUrl: "datepicker.component.html",
            host: {
                '(document:click)': 'onClickAway($event)',
            },
            styles: [
                "\n            .input-group-addon {\n                height: 30px;\n            }\n            .input-group{\n                position: inherit;\n            }\n            ngb-datepicker{\n                top: 588px;\n                left: 37px;\n            }\n        "
            ],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return Datepicker_1; }), multi: true }
            ],
        }),
        __metadata("design:paramtypes", [date_service_1.DateService])
    ], Datepicker);
    return Datepicker;
    var Datepicker_1;
}());
exports.Datepicker = Datepicker;
//# sourceMappingURL=datepicker.component.js.map