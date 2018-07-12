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
var Equal = /** @class */ (function () {
    function Equal() {
    }
    Equal_1 = Equal;
    Equal.prototype.validate = function (c) {
        if (!this.equal)
            return forms_1.Validators.nullValidator;
        var controlValue = c.value;
        var otherControl = this.equal.control; //c.root.get(this.equal);
        if (this.equalOrGreater && otherControl) {
            if (controlValue < otherControl.value)
                return {
                    equal: true
                };
            return null;
        }
        if (otherControl && controlValue != otherControl.value) {
            return {
                equal: true
            };
        }
        if (this.subs)
            this.subs.unsubscribe();
        if (otherControl)
            this.subs = otherControl.valueChanges.subscribe(function (v) {
                c.updateValueAndValidity({ emitEvent: false });
            });
        return forms_1.Validators.nullValidator;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.NgModel)
    ], Equal.prototype, "equal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Equal.prototype, "equalOrGreater", void 0);
    Equal = Equal_1 = __decorate([
        core_1.Directive({
            selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
            providers: [
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return Equal_1; }), multi: true }
            ]
        })
    ], Equal);
    return Equal;
    var Equal_1;
}());
exports.Equal = Equal;
//# sourceMappingURL=equal.directive.js.map