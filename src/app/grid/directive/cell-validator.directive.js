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
var forms_1 = require("@angular/forms");
var CellValidator = /** @class */ (function () {
    function CellValidator() {
        this.validator = this.cellValidator();
        console.log('cellvalidator', this);
    }
    CellValidator_1 = CellValidator;
    CellValidator.prototype.validate = function (c) {
        if (!this.validator)
            return;
        return this.validator(c);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], CellValidator.prototype, "cellValidator", void 0);
    CellValidator = CellValidator_1 = __decorate([
        core_1.Directive({
            selector: '[cellValidator]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: CellValidator_1, multi: true }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CellValidator);
    return CellValidator;
    var CellValidator_1;
}());
exports.CellValidator = CellValidator;
//# sourceMappingURL=cell-validator.directive.js.map