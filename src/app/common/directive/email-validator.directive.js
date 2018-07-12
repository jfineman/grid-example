"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
function emailFormat(control) {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
        return { "emailFormat": true };
    }
    return forms_1.Validators.nullValidator;
}
exports.emailFormat = emailFormat;
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
        this.valFn = emailFormat;
    }
    EmailValidator_1 = EmailValidator;
    EmailValidator.prototype.validate = function (control) {
        return this.valFn(control);
    };
    EmailValidator = EmailValidator_1 = __decorate([
        core_1.Directive({
            selector: '[emailFormat]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: EmailValidator_1, multi: true }]
        })
    ], EmailValidator);
    return EmailValidator;
    var EmailValidator_1;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email-validator.directive.js.map