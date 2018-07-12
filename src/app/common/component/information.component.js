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
var InformationComponent = /** @class */ (function () {
    function InformationComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InformationComponent.prototype, "result", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InformationComponent.prototype, "error", void 0);
    InformationComponent = __decorate([
        core_1.Component({
            selector: 'star-information',
            moduleId: module.id,
            templateUrl: 'information.component.html',
            styles: ["\n        :host {\n            margin-top: 10px;\n            margin-bottom: 5px;\n            margin-left: 15px;\n            font-size: 14pt;\n            font-weight: bold;\n            display: block;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [])
    ], InformationComponent);
    return InformationComponent;
}());
exports.InformationComponent = InformationComponent;
//# sourceMappingURL=information.component.js.map