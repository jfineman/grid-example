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
var CheckboxGridComponent = /** @class */ (function () {
    function CheckboxGridComponent() {
        this.customMessage = 'Required';
        this.onCheckEvent = new core_1.EventEmitter();
    }
    CheckboxGridComponent.prototype.onCheckboxEventHandler = function (value) {
        this.onCheckEvent.next(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CheckboxGridComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], CheckboxGridComponent.prototype, "myForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CheckboxGridComponent.prototype, "customMessage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CheckboxGridComponent.prototype, "onCheckEvent", void 0);
    CheckboxGridComponent = __decorate([
        core_1.Component({
            selector: 'checkbox-grid',
            moduleId: module.id,
            template: "\n        <input \n            type=\"checkbox\"            \n            name=\"checkbox\"   \n            [(ngModel)]=\"row.checkbox\"\n            (ngModelChange)=\"onCheckboxEventHandler($event)\"\n            [ngClass]=\"{'custom-error': myForm.hasError('checkboxError')}\"\n            [ngbTooltip]=\"myForm.hasError('checkboxError') ? customMessage : ''\"    >\n    "
        })
    ], CheckboxGridComponent);
    return CheckboxGridComponent;
}());
exports.CheckboxGridComponent = CheckboxGridComponent;
//# sourceMappingURL=checkbox-grid.component.js.map