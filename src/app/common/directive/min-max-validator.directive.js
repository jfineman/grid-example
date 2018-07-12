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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
function MinMaxValueFn(value, min, max) {
    if (!value)
        return forms_1.Validators.nullValidator;
    if (min && value < min)
        return { 'minValue': { min: min } };
    if (max && value > max)
        return { 'maxValue': { max: max } };
    return forms_1.Validators.nullValidator;
}
exports.MinMaxValueFn = MinMaxValueFn;
var MinMaxValueValidator = /** @class */ (function () {
    function MinMaxValueValidator() {
    }
    MinMaxValueValidator_1 = MinMaxValueValidator;
    MinMaxValueValidator.prototype.validate = function (control) {
        return MinMaxValueFn(control.value, this.min, this.max);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MinMaxValueValidator.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MinMaxValueValidator.prototype, "max", void 0);
    MinMaxValueValidator = MinMaxValueValidator_1 = __decorate([
        core_1.Directive({
            selector: '[min],[max]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MinMaxValueValidator_1, multi: true }]
        })
    ], MinMaxValueValidator);
    return MinMaxValueValidator;
    var MinMaxValueValidator_1;
}());
exports.MinMaxValueValidator = MinMaxValueValidator;
//# sourceMappingURL=min-max-validator.directive.js.map