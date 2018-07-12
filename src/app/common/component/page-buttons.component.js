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
var result_service_1 = require("../service/result.service");
var PageButtonsComponent = /** @class */ (function () {
    function PageButtonsComponent(_resultsService) {
        this._resultsService = _resultsService;
    }
    PageButtonsComponent.prototype.save = function () {
        this.saving = true;
        if (this.saveFn()) {
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], PageButtonsComponent.prototype, "cancelFn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PageButtonsComponent.prototype, "saveNgClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PageButtonsComponent.prototype, "saveDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], PageButtonsComponent.prototype, "saveFn", void 0);
    PageButtonsComponent = __decorate([
        core_1.Component({
            selector: 'page-buttons',
            moduleId: module.id,
            template: "\n        <div>\n            <button type=\"button\" class=\"btn btn-link\" (click)=\"cancelFn()\">Cancel</button>\n            <button title=\"Click here to save changes\"\n                [ngClass]=\"saveNgClass\" \n                [disabled]=\"saveDisabled\"\n                type=\"button\" (click)=\"saveFn()\" class=\"btn btn-primary\">\n                Save Changes\n            </button>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [result_service_1.ResultService])
    ], PageButtonsComponent);
    return PageButtonsComponent;
}());
exports.PageButtonsComponent = PageButtonsComponent;
//# sourceMappingURL=page-buttons.component.js.map